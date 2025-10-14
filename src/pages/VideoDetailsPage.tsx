import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Download, ShoppingCart, Loader2, LogOut, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import VideoPreview from '@/components/ui/VideoPreview';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CartButton } from '@/components/CartButton';
import EditShareModal from '@/components/dashboard/EditShareModal';
import VideoConfigSelector, { VideoConfig } from '@/components/dashboard/VideoConfigSelector';
import WatermarkOverlay from '@/components/ui/WatermarkOverlay';
import DownloadWithOptions from '@/components/dashboard/DownloadWithOptions';
import { LoginModal } from '@/components/auth/LoginModal';
import { SignUpModal } from '@/components/auth/SignUpModal';
import GlobalSearchBar from '@/components/GlobalSearchBar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Animation {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string;
  thumbnail_url: string;
  preview_url?: string;
  tags: string[];
  format?: string;
  resolution?: string;
}

export default function VideoDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const [animation, setAnimation] = useState<Animation | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEditShare, setShowEditShare] = useState(false);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [videoConfig, setVideoConfig] = useState<VideoConfig>({
    size: '1080p',
    ratio: '16:9',
    format: 'MP4',
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAnimationDetails();
      if (user) {
        fetchUserData();
      }
    }
  }, [id, user]);

  const fetchAnimationDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('animations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setAnimation(data);
    } catch (error: any) {
      toast({
        title: t('animation.error'),
        description: error.message,
        variant: 'destructive',
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    if (!user || !id) return;

    try {
      const [favoritesRes, cartRes] = await Promise.all([
        supabase
          .from('user_favorites')
          .select('animation_id')
          .eq('user_id', user.id)
          .eq('animation_id', id)
          .single(),
        supabase
          .from('user_cart')
          .select('animation_id')
          .eq('user_id', user.id)
          .eq('animation_id', id)
          .single(),
      ]);

      setIsFavorite(!!favoritesRes.data);
      setIsInCart(!!cartRes.data);
    } catch (error: any) {
      console.error('Error fetching user data:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      setShowSignUpModal(true);
      return;
    }
    if (!id) return;

    try {
      if (isFavorite) {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('animation_id', id);

        setIsFavorite(false);
        toast({
          title: t('animation.removedFromFavorites'),
        });
      } else {
        await supabase.from('user_favorites').insert({
          user_id: user.id,
          animation_id: id,
        });

        setIsFavorite(true);
        toast({
          title: t('animation.addedToFavorites'),
        });
      }
    } catch (error: any) {
      toast({
        title: t('animation.error'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleCart = async () => {
    if (!user) {
      setShowSignUpModal(true);
      return;
    }
    if (!id) return;

    try {
      if (isInCart) {
        await supabase
          .from('user_cart')
          .delete()
          .eq('user_id', user.id)
          .eq('animation_id', id);

        setIsInCart(false);
        toast({
          title: t('animation.removedFromCart'),
        });
        
        window.dispatchEvent(new Event('cart-updated'));
      } else {
        // Show config dialog before adding to cart
        setShowConfigDialog(true);
      }
    } catch (error: any) {
      toast({
        title: t('animation.error'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleAddToCartWithConfig = async () => {
    if (!user || !id) return;

    if (!videoConfig.size || !videoConfig.ratio || !videoConfig.format) {
      toast({
        title: t('videoConfig.incompleteSelection'),
        description: t('videoConfig.incompleteSelectionDesc'),
        variant: 'destructive',
      });
      return;
    }

    try {
      await supabase.from('user_cart').insert({
        user_id: user.id,
        animation_id: id,
        selected_size: videoConfig.size,
        selected_ratio: videoConfig.ratio,
        selected_format: videoConfig.format,
        selected_platform: videoConfig.platform || null,
      });

      setIsInCart(true);
      setShowConfigDialog(false);
      toast({
        title: t('animation.addedToCart'),
        description: t('videoConfig.configSaved'),
      });
      
      window.dispatchEvent(new Event('cart-updated'));
    } catch (error: any) {
      toast({
        title: t('animation.error'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDownload = async (format: string, resolution: string) => {
    if (!user) {
      setShowSignUpModal(true);
      return;
    }
    if (!animation) return;

    setIsDownloading(true);
    try {
      await supabase.from('user_downloads').insert({
        user_id: user.id,
        animation_id: animation.id,
      });

      const link = document.createElement('a');
      link.href = animation.file_url;
      const extension = format.toLowerCase();
      link.download = `${animation.title.replace(/\s+/g, '-').toLowerCase()}-${resolution}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: t('animation.downloadComplete'),
        description: t('animation.downloadCompleteDesc', { title: animation.title }),
      });
    } catch (error: any) {
      toast({
        title: t('animation.downloadFailed'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
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

  if (!animation) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header with Integrated Search */}
      <header className="border-b border-primary/20 bg-background/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-[200px_1fr_auto] gap-4 items-center">
            {/* Logo - Left */}
            <button
              onClick={() => navigate('/dashboard')}
              className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              motiomint
            </button>
            
            {/* Search Bar - Center */}
            <div className="max-w-2xl mx-auto w-full">
              <GlobalSearchBar autoFocus={false} />
            </div>
            
            {/* Actions - Right */}
            <div className="flex items-center gap-2 whitespace-nowrap">
              {user ? (
                <>
                  <CartButton />
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
                </>
              ) : (
                <>
                  <LanguageSelector />
                  <ThemeToggle />
                  <Button
                    onClick={() => setShowLoginModal(true)}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {t('nav.login')}
                  </Button>
                  <Button
                    onClick={() => setShowSignUpModal(true)}
                    variant="default"
                    size="sm"
                    className="gap-2 btn-glow"
                  >
                    {t('nav.signUp')}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-3">
            {/* Top Row: Logo and Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                motiomint
              </button>
              <div className="flex items-center gap-2">
                {user ? (
                  <>
                    <CartButton />
                    <LanguageSelector />
                    <ThemeToggle />
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      size="sm"
                    >
                      <LogOut size={16} />
                    </Button>
                  </>
                ) : (
                  <>
                    <LanguageSelector />
                    <ThemeToggle />
                  </>
                )}
              </div>
            </div>
            
            {/* Bottom Row: Search Bar */}
            <div className="w-full">
              <GlobalSearchBar autoFocus={false} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            className="mb-4 gap-2 text-sm"
          >
            <ArrowLeft className="h-3 w-3" />
            {t('nav.backToDashboard')}
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Preview - Takes up 2/3 of the space */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="relative aspect-video bg-muted">
                  <VideoPreview
                    thumbnailUrl={animation.thumbnail_url}
                    videoUrl={animation.preview_url || animation.file_url}
                    alt={animation.title}
                    className="w-full h-full"
                  />
                  <WatermarkOverlay show={!user} />
                </div>
              </Card>
            </div>

            {/* Video Details - Takes up 1/3 of the space */}
            <div className="space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h1 className="text-2xl font-bold leading-tight">{animation.title}</h1>
                  <Badge variant="secondary" className="text-sm px-3 py-1 shrink-0">
                    {animation.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{animation.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {animation.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Format & Resolution */}
              {(animation.format || animation.resolution) && (
                <Card className="p-3 bg-card/50 backdrop-blur-sm border-primary/20">
                  <div className="grid grid-cols-2 gap-3">
                    {animation.format && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Format</p>
                        <p className="text-sm font-semibold">{animation.format}</p>
                      </div>
                    )}
                    {animation.resolution && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Resolution</p>
                        <p className="text-sm font-semibold">{animation.resolution}</p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Actions */}
              <div className="space-y-2.5">
                <DownloadWithOptions 
                  onDownload={handleDownload}
                  isDownloading={isDownloading}
                />

                <Button
                  onClick={() => {
                    if (!user) {
                      setShowSignUpModal(true);
                    } else {
                      setShowEditShare(true);
                    }
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/30 hover:bg-primary/10 text-sm"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t('editShare.editAndShare')}
                </Button>

                <Button
                  onClick={() => navigate(`/similar/${animation.id}`)}
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/30 hover:bg-primary/10 text-sm"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t('similar.discoverSimilar')}
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={toggleFavorite}
                    variant={isFavorite ? "default" : "outline"}
                    size="sm"
                    className="gap-1.5 text-xs"
                  >
                    <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? t('animation.favorited') : t('animation.addToFavorites')}
                  </Button>

                  <Button
                    onClick={toggleCart}
                    variant={isInCart ? "default" : "outline"}
                    size="sm"
                    className="gap-1.5 text-xs"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {isInCart ? 'In Cart' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <EditShareModal
        open={showEditShare}
        onOpenChange={setShowEditShare}
        animation={{
          id: animation.id,
          title: animation.title,
          file_url: animation.file_url,
          thumbnail_url: animation.thumbnail_url,
        }}
      />

      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('videoConfig.configureBeforeAdd')}</DialogTitle>
            <DialogDescription>
              {t('videoConfig.configureBeforeAddDesc')}
            </DialogDescription>
          </DialogHeader>

          <VideoConfigSelector
            value={videoConfig}
            onChange={setVideoConfig}
            showPlatformPresets={true}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowConfigDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button 
              onClick={handleAddToCartWithConfig} 
              className="gap-2"
              disabled={!videoConfig.size || !videoConfig.ratio || !videoConfig.format}
            >
              <ShoppingCart className="h-4 w-4" />
              {t('animation.addToCart')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Auth Modals */}
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignUp={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
      />
      <SignUpModal
        open={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onSwitchToLogin={() => {
          setShowSignUpModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
}
