import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  ArrowLeft, 
  Heart, 
  Download, 
  ShoppingCart, 
  Loader2, 
  Share2,
  Info,
  Eye,
  Sparkles,
  CheckCircle2,
  Calendar,
  Tag
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import MainNavigation from '@/components/navigation/MainNavigation';
import { ModernVideoPlayer } from '@/components/ui/ModernVideoPlayer';
import DownloadOptions from '@/components/details/DownloadOptions';
import RelatedAnimations from '@/components/details/RelatedAnimations';
import ShareModal from '@/components/details/ShareModal';
import EditShareModal from '@/components/dashboard/EditShareModal';
import { LoginModal } from '@/components/auth/LoginModal';
import { SignUpModal } from '@/components/auth/SignUpModal';
import { cn } from '@/lib/utils';

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
  created_at: string;
}

interface DownloadConfig {
  format: string;
  resolution: string;
  aspectRatio: string;
  platform?: string;
}

export default function VideoDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const [animation, setAnimation] = useState<Animation | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEditShare, setShowEditShare] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());

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
        title: 'Error loading animation',
        description: error.message,
        variant: 'destructive',
      });
      navigate('/');
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
          .eq('user_id', user.id),
        supabase
          .from('user_cart')
          .select('animation_id')
          .eq('user_id', user.id),
      ]);

      if (favoritesRes.data) {
        const favSet = new Set(favoritesRes.data.map((f: any) => f.animation_id));
        setFavorites(favSet);
        setIsFavorite(favSet.has(id));
      }
      if (cartRes.data) {
        const cartSet = new Set(cartRes.data.map((c: any) => c.animation_id));
        setCart(cartSet);
        setIsInCart(cartSet.has(id));
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!user || !id) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (isFavorite) {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('animation_id', id);

        setIsFavorite(false);
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });

        toast({
          title: t('animation.removedFromFavorites'),
        });
      } else {
        await supabase.from('user_favorites').insert({
          user_id: user.id,
          animation_id: id,
        });

        setIsFavorite(true);
        setFavorites(prev => new Set(prev).add(id));

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
    if (!user || !id) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (isInCart) {
        await supabase
          .from('user_cart')
          .delete()
          .eq('user_id', user.id)
          .eq('animation_id', id);

        setIsInCart(false);
        setCart(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });

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
        setCart(prev => new Set(prev).add(id));

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

  const handleRelatedFavoriteToggle = async (animationId: string) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const isFav = favorites.has(animationId);
    try {
      if (isFav) {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('animation_id', animationId);

        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(animationId);
          return newSet;
        });

        toast({
          title: t('animation.removedFromFavorites'),
        });
      } else {
        await supabase.from('user_favorites').insert({
          user_id: user.id,
          animation_id: animationId,
        });

        setFavorites(prev => new Set(prev).add(animationId));

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

  const handleRelatedCartToggle = async (animationId: string) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const inCart = cart.has(animationId);
    try {
      if (inCart) {
        await supabase
          .from('user_cart')
          .delete()
          .eq('user_id', user.id)
          .eq('animation_id', animationId);

        setCart(prev => {
          const newSet = new Set(prev);
          newSet.delete(animationId);
          return newSet;
        });

        toast({
          title: t('animation.removedFromCart'),
        });
        
        window.dispatchEvent(new Event('cart-updated'));
      } else {
        await supabase.from('user_cart').insert({
          user_id: user.id,
          animation_id: animationId,
        });

        setCart(prev => new Set(prev).add(animationId));

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

  const handleDownload = async (config: DownloadConfig) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!animation) return;

    setIsDownloading(true);
    try {
      // Track download in database
      await supabase.from('user_downloads').insert({
        user_id: user.id,
        animation_id: animation.id,
      });

      // Trigger file download
      const link = document.createElement('a');
      link.href = animation.file_url;
      link.download = `${animation.title.replace(/\s+/g, '-').toLowerCase()}-${config.resolution}.${config.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: t('animation.downloadComplete'),
        description: `Downloaded as ${config.format.toUpperCase()} (${config.resolution})`,
      });

      window.dispatchEvent(new Event('download-complete'));
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
      {/* Main Navigation */}
      <MainNavigation 
        onLoginClick={() => setShowLoginModal(true)}
        onSignUpClick={() => setShowSignUpModal(true)}
      />

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

      {/* Video Player Modal */}
      <ModernVideoPlayer
        open={showVideoPlayer}
        onClose={() => setShowVideoPlayer(false)}
        videoUrl={animation.preview_url || animation.file_url}
        title={animation.title}
      />

      {/* Share Modal */}
      <ShareModal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={animation.title}
        animationId={animation.id}
      />

      {/* Edit & Share Modal */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-16">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')} className="cursor-pointer">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={() => navigate(`/category/${encodeURIComponent(animation.category)}`)}
                className="cursor-pointer"
              >
                {animation.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{animation.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 mb-12">
          {/* Left Column - Preview & Info */}
          <div className="space-y-6">
            {/* Video Preview */}
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 group">
              <div 
                className="relative aspect-video bg-muted cursor-pointer"
                onClick={() => setShowVideoPlayer(true)}
              >
                <img
                  src={animation.thumbnail_url}
                  alt={animation.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-primary/90 rounded-full p-4">
                    <Eye className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  {animation.format && (
                    <Badge className="bg-background/90 backdrop-blur-sm text-foreground">
                      {animation.format}
                    </Badge>
                  )}
                  {animation.resolution && (
                    <Badge className="bg-background/90 backdrop-blur-sm text-foreground">
                      {animation.resolution}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>

            {/* Title & Actions */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{animation.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">{animation.category}</Badge>
                  <span>•</span>
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(animation.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  size="lg"
                  onClick={toggleFavorite}
                  className={cn(
                    "gap-2",
                    isFavorite && "bg-primary/20 border-primary text-primary hover:bg-primary/30"
                  )}
                >
                  <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
                  {isFavorite ? 'Favorited' : 'Add to Favorites'}
                </Button>

                <Button
                  variant={isInCart ? "default" : "outline"}
                  size="lg"
                  onClick={toggleCart}
                  className={cn(
                    "gap-2",
                    isInCart && "bg-primary/20 border-primary text-primary hover:bg-primary/30"
                  )}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isInCart ? 'In Cart' : 'Add to Cart'}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowShareModal(true)}
                  className="gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowEditShare(true)}
                  className="gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Edit & Share
                </Button>
              </div>
            </div>

            {/* Tabs - Description & Details */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">
                  <Info className="w-4 h-4 mr-2" />
                  Description
                </TabsTrigger>
                <TabsTrigger value="details" className="flex-1">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="license" className="flex-1">
                  <Tag className="w-4 h-4 mr-2" />
                  License
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <p className="text-muted-foreground leading-relaxed">
                    {animation.description || 'No description available for this animation.'}
                  </p>
                  {animation.tags.length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <p className="text-sm font-medium mb-2">Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {animation.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="details" className="mt-4">
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                      <dd className="text-base mt-1">{animation.category}</dd>
                    </div>
                    {animation.format && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Format</dt>
                        <dd className="text-base mt-1">{animation.format}</dd>
                      </div>
                    )}
                    {animation.resolution && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Resolution</dt>
                        <dd className="text-base mt-1">{animation.resolution}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                      <dd className="text-base mt-1">
                        {new Date(animation.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </dd>
                    </div>
                  </dl>
                </Card>
              </TabsContent>

              <TabsContent value="license" className="mt-4">
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Commercial Use</p>
                      <p className="text-sm text-muted-foreground">
                        Use in commercial projects without attribution
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Social Media</p>
                      <p className="text-sm text-muted-foreground">
                        Share on all social platforms
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Client Projects</p>
                      <p className="text-sm text-muted-foreground">
                        Use for client work and presentations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Unlimited Downloads</p>
                      <p className="text-sm text-muted-foreground">
                        Download as many times as you need
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Download Options */}
          <div className="lg:sticky lg:top-32 h-fit">
            <DownloadOptions 
              onDownload={handleDownload}
              isDownloading={isDownloading}
            />
          </div>
        </div>

        {/* Related Animations */}
        <RelatedAnimations
          currentAnimationId={animation.id}
          category={animation.category}
          tags={animation.tags}
          onFavoriteToggle={handleRelatedFavoriteToggle}
          onCartToggle={handleRelatedCartToggle}
          favorites={favorites}
          cart={cart}
          isGuest={!user}
          onAuthRequired={() => setShowLoginModal(true)}
        />
      </main>
    </div>
  );
}
