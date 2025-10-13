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

  useEffect(() => {
    if (id && user) {
      fetchAnimationDetails();
      fetchUserData();
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
    if (!user || !id) return;

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
    if (!user || !id) return;

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
        await supabase.from('user_cart').insert({
          user_id: user.id,
          animation_id: id,
        });

        setIsInCart(true);
        toast({
          title: t('animation.addedToCart'),
        });
        
        window.dispatchEvent(new Event('cart-updated'));
      }
    } catch (error: any) {
      toast({
        title: t('animation.error'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDownload = async () => {
    if (!animation || !user) return;

    setIsDownloading(true);
    try {
      await supabase.from('user_downloads').insert({
        user_id: user.id,
        animation_id: animation.id,
      });

      const link = document.createElement('a');
      link.href = animation.file_url;
      link.download = `${animation.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
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
      {/* Header */}
      <header className="border-b border-primary/20 bg-background/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            motiomint
          </button>
          <div className="flex items-center gap-2">
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('nav.backToDashboard')}
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video Preview */}
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="relative aspect-video bg-muted">
                <VideoPreview
                  thumbnailUrl={animation.thumbnail_url}
                  videoUrl={animation.preview_url || animation.file_url}
                  alt={animation.title}
                  className="w-full h-full"
                />
              </div>
            </Card>

            {/* Video Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h1 className="text-4xl font-bold">{animation.title}</h1>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {animation.category}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground">{animation.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {animation.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Format & Resolution */}
              {(animation.format || animation.resolution) && (
                <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
                  <div className="grid grid-cols-2 gap-4">
                    {animation.format && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Format</p>
                        <p className="font-semibold">{animation.format}</p>
                      </div>
                    )}
                    {animation.resolution && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Resolution</p>
                        <p className="font-semibold">{animation.resolution}</p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full"
                  size="lg"
                  variant="hero"
                >
                  {isDownloading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-5 w-5" />
                  )}
                  {isDownloading ? t('animation.downloading') : t('animation.download')}
                </Button>

                <Button
                  onClick={() => setShowEditShare(true)}
                  variant="outline"
                  size="lg"
                  className="w-full border-primary/30 hover:bg-primary/10"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  {t('editShare.editAndShare')}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={toggleFavorite}
                    variant={isFavorite ? "default" : "outline"}
                    size="lg"
                    className="gap-2"
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? t('animation.favorited') : t('animation.addToFavorites')}
                  </Button>

                  <Button
                    onClick={toggleCart}
                    variant={isInCart ? "default" : "outline"}
                    size="lg"
                    className="gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
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
    </div>
  );
}
