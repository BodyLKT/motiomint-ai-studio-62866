import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, LogOut, ShoppingCart, Trash2, Download, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import VideoPreview from '@/components/ui/VideoPreview';

interface CartItem {
  id: string;
  animation_id: string;
  animation: {
    id: string;
    title: string;
    description: string;
    category: string;
    file_url: string;
    thumbnail_url: string;
    tags: string[];
  };
}

export default function CartPage() {
  const { t } = useTranslation();
  const { user, session, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !session) {
      navigate('/');
    }
  }, [session, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;

    try {
      setLoadingData(true);
      const { data, error } = await supabase
        .from('user_cart')
        .select(`
          id,
          animation_id,
          animations (
            id,
            title,
            description,
            category,
            file_url,
            thumbnail_url,
            tags
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedData = (data || []).map((item: any) => ({
        id: item.id,
        animation_id: item.animation_id,
        animation: item.animations
      }));

      setCartItems(formattedData);
    } catch (error: any) {
      toast({
        title: t('cart.errorLoading'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoadingData(false);
    }
  };

  const removeFromCart = async (cartItemId: string, animationTitle: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_cart')
        .delete()
        .eq('id', cartItemId);

      if (error) throw error;

      setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));

      toast({
        title: t('animation.removedFromCart'),
        description: animationTitle,
      });
    } catch (error: any) {
      toast({
        title: t('animation.error'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDownload = async (animation: CartItem['animation']) => {
    if (!user) {
      toast({
        title: t('animation.loginRequired'),
        variant: 'destructive',
      });
      return;
    }

    try {
      setDownloadingId(animation.id);

      // Track download
      await supabase.from('user_downloads').insert({
        user_id: user.id,
        animation_id: animation.id,
      });

      // Trigger download
      const link = document.createElement('a');
      link.href = animation.file_url;
      link.download = `${animation.title}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: t('animation.downloadStarted'),
        description: animation.title,
      });

      window.dispatchEvent(new Event('download-complete'));
    } catch (error: any) {
      toast({
        title: t('animation.downloadError'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setDownloadingId(null);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_cart')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setCartItems([]);

      toast({
        title: t('cart.cleared'),
      });
    } catch (error: any) {
      toast({
        title: t('animation.error'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-primary/20 bg-background/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            motiomint
          </button>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft size={16} />
              {t('nav.backToDashboard')}
            </Button>
            <LanguageSelector />
            <ThemeToggle />
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <LogOut size={16} />
              {t('nav.logout')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  <ShoppingCart className="inline-block mr-3 mb-1" />
                  {t('cart.title')}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {cartItems.length === 0 
                    ? t('cart.empty')
                    : t('cart.itemCount', { count: cartItems.length })}
                </p>
              </div>
              {cartItems.length > 0 && (
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="gap-2"
                >
                  <Trash2 size={16} />
                  {t('cart.clearAll')}
                </Button>
              )}
            </div>
          </div>

          {/* Cart Items */}
          {loadingData ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : cartItems.length === 0 ? (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-primary/20">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">{t('cart.emptyTitle')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('cart.emptyDescription')}
              </p>
              <Button onClick={() => navigate('/dashboard')} variant="default">
                {t('cart.browseCatalog')}
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all"
                >
                  <div className="p-6">
                    <div className="grid md:grid-cols-[200px_1fr_auto] gap-6 items-center">
                      {/* Thumbnail */}
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                        <VideoPreview
                          thumbnailUrl={item.animation.thumbnail_url}
                          videoUrl={item.animation.file_url}
                          alt={item.animation.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          {item.animation.title}
                        </h3>
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {item.animation.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {item.animation.category}
                          </span>
                          {item.animation.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/50 text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => handleDownload(item.animation)}
                          disabled={downloadingId === item.animation.id}
                          variant="default"
                          className="gap-2"
                        >
                          {downloadingId === item.animation.id ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              {t('animation.downloading')}
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4" />
                              {t('animation.download')}
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => removeFromCart(item.id, item.animation.title)}
                          variant="outline"
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          {t('cart.remove')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
