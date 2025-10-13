import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Crown, TrendingUp, Calendar, Download as DownloadIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Subscription {
  subscription_tier: string;
  status: string;
  expires_at: string | null;
}

const PLAN_LIMITS = {
  free: { downloads: 5, name: 'Free' },
  starter: { downloads: 20, name: 'Starter Pack' },
  pro: { downloads: 100, name: 'Pro Pack' },
  agency: { downloads: 999, name: 'Agency Pack' }
};

export default function SubscriptionStatus() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [downloadsThisMonth, setDownloadsThisMonth] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscriptionData();
    }
  }, [user]);

  const fetchSubscriptionData = async () => {
    if (!user) return;

    try {
      // Fetch active subscription
      const { data: subData, error: subError } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (subError && subError.code !== 'PGRST116') throw subError;

      setSubscription(subData);

      // Fetch downloads this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: downloadData, error: downloadError } = await supabase
        .from('user_downloads')
        .select('id')
        .eq('user_id', user.id)
        .gte('downloaded_at', startOfMonth.toISOString());

      if (downloadError) throw downloadError;

      setDownloadsThisMonth(downloadData?.length || 0);
    } catch (error: any) {
      console.error('Error fetching subscription data:', error);
      toast({
        title: t('common.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const currentPlan = subscription?.subscription_tier || 'free';
  const planInfo = PLAN_LIMITS[currentPlan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.free;
  const downloadsRemaining = Math.max(0, planInfo.downloads - downloadsThisMonth);
  const usagePercentage = Math.min(100, (downloadsThisMonth / planInfo.downloads) * 100);
  const isMaxTier = currentPlan === 'agency';

  const getStatusColor = () => {
    if (usagePercentage >= 90) return 'text-destructive';
    if (usagePercentage >= 70) return 'text-warning';
    return 'text-success';
  };

  const formatRenewalDate = () => {
    if (!subscription?.expires_at) {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      nextMonth.setDate(1);
      return nextMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    return new Date(subscription.expires_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 animate-pulse">
        <div className="h-32 bg-muted rounded" />
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-primary/30 glow-primary">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Crown className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t('dashboard.subscriptionStatus')}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={subscription?.status === 'active' ? 'default' : 'secondary'}>
                {planInfo.name}
              </Badge>
              {subscription?.status === 'active' && (
                <Badge variant="outline" className="text-success border-success/50">
                  {t('dashboard.active')}
                </Badge>
              )}
            </div>
          </div>
        </div>
        {!isMaxTier && (
          <Button 
            onClick={() => navigate('/pricing')}
            size="sm"
            className="btn-glow"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            {t('dashboard.upgrade')}
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Download Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <DownloadIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t('dashboard.downloadsThisMonth')}</span>
            </div>
            <span className={`text-sm font-semibold ${getStatusColor()}`}>
              {downloadsRemaining} {t('dashboard.remaining')} / {planInfo.downloads}
            </span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
        </div>

        {/* Renewal Date */}
        {subscription && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border/50">
            <Calendar className="h-4 w-4" />
            <span>
              {t('dashboard.renewsOn')}: <span className="font-medium text-foreground">{formatRenewalDate()}</span>
            </span>
          </div>
        )}

        {/* Usage Warning */}
        {usagePercentage >= 80 && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg text-sm">
            <p className="text-warning font-medium">
              {usagePercentage >= 100 
                ? t('dashboard.downloadLimitReached')
                : t('dashboard.downloadLimitWarning')}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
