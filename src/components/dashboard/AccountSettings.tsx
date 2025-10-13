import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { User, Mail, Lock, Shield, Bell, Trash2, Camera, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export default function AccountSettings() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserData();
      checkActiveSubscription();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      setFullName(profile?.full_name || user.user_metadata?.full_name || '');
      setEmail(profile?.email || user.email || '');
    } catch (error: any) {
      console.error('Error loading user data:', error);
    }
  };

  const checkActiveSubscription = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      setHasActiveSubscription(!!data);
    } catch (error: any) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: t('dashboard.profileUpdated'),
        description: t('dashboard.profileUpdatedDesc'),
      });
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/`,
      });

      if (error) throw error;

      toast({
        title: t('dashboard.passwordResetSent'),
        description: t('dashboard.passwordResetSentDesc'),
      });
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // In production, this should be handled by an edge function
      // that properly deletes all user data and handles cleanup
      toast({
        title: t('dashboard.accountDeletionRequested'),
        description: t('dashboard.contactSupport'),
        variant: 'destructive',
      });
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (!fullName) return 'U';
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-2 mb-6">
          <User className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">{t('dashboard.accountSettings')}</h3>
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-4">{t('dashboard.profileDetails')}</h4>
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" />
                <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  <Camera className="h-4 w-4 mr-2" />
                  {t('dashboard.changePhoto')}
                </Button>
                <Button variant="ghost" size="sm" disabled>
                  {t('dashboard.remove')}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">{t('dashboard.fullName')}</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('dashboard.enterFullName')}
                />
              </div>
              <div>
                <Label htmlFor="email">{t('dashboard.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {t('dashboard.emailCannotBeChanged')}
                </p>
              </div>
              <Button 
                onClick={handleUpdateProfile} 
                disabled={loading}
                className="btn-glow"
              >
                <Save className="h-4 w-4 mr-2" />
                {t('dashboard.saveChanges')}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Password Management */}
          <div>
            <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              {t('dashboard.passwordManagement')}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t('dashboard.passwordDesc')}
            </p>
            <Button 
              variant="outline" 
              onClick={handlePasswordReset}
              disabled={loading}
            >
              {t('dashboard.setNewPassword')}
            </Button>
          </div>

          <Separator />

          {/* Security */}
          <div>
            <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {t('dashboard.security')}
            </h4>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('dashboard.twoFactorAuth')}</Label>
                <p className="text-xs text-muted-foreground">
                  {t('dashboard.twoFactorAuthDesc')}
                </p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
                disabled
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {t('dashboard.comingSoon')}
            </p>
          </div>

          <Separator />

          {/* Notifications */}
          <div>
            <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
              <Bell className="h-4 w-4" />
              {t('dashboard.notifications')}
            </h4>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('dashboard.emailNotifications')}</Label>
                <p className="text-xs text-muted-foreground">
                  {t('dashboard.emailNotificationsDesc')}
                </p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </div>

          <Separator />

          {/* Account Deletion */}
          <div>
            <h4 className="text-sm font-medium mb-4 flex items-center gap-2 text-destructive">
              <Trash2 className="h-4 w-4" />
              {t('dashboard.dangerZone')}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t('dashboard.deleteAccountDesc')}
            </p>
            
            {hasActiveSubscription ? (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive font-medium mb-2">
                  {t('dashboard.cannotDeleteWithSubscription')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('dashboard.contactSupportToDelete')}
                </p>
              </div>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={loading}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('dashboard.deleteAccount')}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('dashboard.confirmDeleteAccount')}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('dashboard.confirmDeleteAccountDesc')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteAccount}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      {t('dashboard.deleteAccount')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
