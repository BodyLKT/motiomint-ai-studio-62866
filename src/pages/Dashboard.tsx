import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Heart, Download as DownloadIcon, Grid3x3, User, History } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import AnimationCard from '@/components/dashboard/AnimationCard';
import CategoryFilter from '@/components/dashboard/CategoryFilter';
import CategoryGrid from '@/components/dashboard/CategoryGrid';
import SubscriptionStatus from '@/components/dashboard/SubscriptionStatus';
import AccountSettings from '@/components/dashboard/AccountSettings';
import DownloadHistory from '@/components/dashboard/DownloadHistory';
import MainNavigation from '@/components/navigation/MainNavigation';
import { CartButton } from '@/components/CartButton';

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

export default function Dashboard() {
  const { t } = useTranslation();
  const { user, session, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [downloads, setDownloads] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState('categories');

  // Get search query and tab from URL params
  useEffect(() => {
    const q = searchParams.get('q');
    const filter = searchParams.get('filter');
    const tab = searchParams.get('tab');
    
    if (q) {
      setSearchQuery(q);
    }
    if (filter && filter !== 'all') {
      setSelectedCategory(filter);
    }
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loading && !session) {
      navigate('/');
    }
  }, [session, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchAnimations();
      fetchUserData();
    }
  }, [user]);

  // Listen for download events to refresh stats
  useEffect(() => {
    const handleDownloadComplete = () => {
      fetchUserData();
    };

    window.addEventListener('download-complete', handleDownloadComplete);
    return () => window.removeEventListener('download-complete', handleDownloadComplete);
  }, [user]);

  const fetchAnimations = async () => {
    try {
      const { data, error } = await supabase
        .from('animations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnimations(data || []);
    } catch (error: any) {
      toast({
        title: 'Error loading animations',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoadingData(false);
    }
  };

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const [favoritesRes, downloadsRes, cartRes] = await Promise.all([
        supabase
          .from('user_favorites')
          .select('animation_id')
          .eq('user_id', user.id),
        supabase
          .from('user_downloads')
          .select('id')
          .eq('user_id', user.id),
        supabase
          .from('user_cart')
          .select('animation_id')
          .eq('user_id', user.id),
      ]);

      if (favoritesRes.data) {
        setFavorites(new Set(favoritesRes.data.map((f: any) => f.animation_id)));
      }
      if (downloadsRes.data) {
        setDownloads(downloadsRes.data.length);
      }
      if (cartRes.data) {
        setCart(new Set(cartRes.data.map((c: any) => c.animation_id)));
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
    }
  };

  const toggleFavorite = async (animationId: string) => {
    if (!user) return;

    const isFavorite = favorites.has(animationId);

    try {
      if (isFavorite) {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('animation_id', animationId);

        setFavorites((prev) => {
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

        setFavorites((prev) => new Set(prev).add(animationId));

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

  const toggleCart = async (animationId: string) => {
    if (!user) return;

    const isInCart = cart.has(animationId);

    try {
      if (isInCart) {
        await supabase
          .from('user_cart')
          .delete()
          .eq('user_id', user.id)
          .eq('animation_id', animationId);

        setCart((prev) => {
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

        setCart((prev) => new Set(prev).add(animationId));

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

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
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

  const categories = Array.from(new Set(animations.map((a) => a.category)));

  const filteredAnimations = animations.filter((animation) => {
    const matchesSearch =
      searchQuery === '' ||
      animation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animation.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animation.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === null || animation.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const favoriteAnimations = animations.filter((a) => favorites.has(a.id));

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Main Navigation */}
      <MainNavigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {user.user_metadata?.full_name 
                ? t('dashboard.welcome', { name: user.user_metadata.full_name })
                : t('dashboard.welcomeDefault')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('dashboard.subtitle')}
            </p>
          </div>

          {/* Enhanced Navigation Tabs - Moved to Prominent Position */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="sticky top-[120px] z-40 bg-background/95 backdrop-blur-lg border-b border-primary/10 -mx-4 px-4 mb-8">
              <TabsList className="w-full md:w-auto h-auto p-1 bg-card/50 border border-primary/20 shadow-lg overflow-x-auto">
                <TabsTrigger 
                  value="categories" 
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow font-medium px-4 md:px-6 py-3"
                >
                  <Grid3x3 className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('dashboard.categories')}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="favorites" 
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow font-medium px-4 md:px-6 py-3"
                >
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('dashboard.myCollections')}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow font-medium px-4 md:px-6 py-3"
                >
                  <History className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('dashboard.downloadHistory')}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow font-medium px-4 md:px-6 py-3"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('dashboard.accountSettings')}</span>
                </TabsTrigger>
              </TabsList>
            </div>


            <TabsContent value="categories">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">{t('dashboard.browseByCategory')}</h2>
                  <p className="text-muted-foreground">
                    {t('dashboard.browseByCategorySubtitle')}
                  </p>
                </div>

                {/* Category Filters */}
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                {/* Filtered Results */}
                {loadingData ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredAnimations.length === 0 ? (
                  <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-primary/20">
                    <p className="text-muted-foreground">{t('dashboard.noAnimations')}</p>
                  </Card>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAnimations.map((animation) => (
                    <div key={animation.id} className="h-[400px]">
                      <AnimationCard
                        key={animation.id}
                        id={animation.id}
                        title={animation.title}
                        description={animation.description || ''}
                        category={animation.category}
                        thumbnailUrl={animation.thumbnail_url}
                        videoUrl={animation.preview_url || animation.file_url}
                        tags={animation.tags}
                        isFavorite={favorites.has(animation.id)}
                        isInCart={cart.has(animation.id)}
                        onFavoriteToggle={() => toggleFavorite(animation.id)}
                        onCartToggle={() => toggleCart(animation.id)}
                      />
                    </div>
                  ))}
                </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              {favoriteAnimations.length === 0 ? (
                <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-primary/20">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">{t('dashboard.noCollections')}</h3>
                  <p className="text-muted-foreground">
                    {t('dashboard.noCollectionsSubtitle')}
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteAnimations.map((animation) => (
                    <div key={animation.id} className="h-[400px]">
                      <AnimationCard
                      key={animation.id}
                      id={animation.id}
                      title={animation.title}
                      description={animation.description || ''}
                      category={animation.category}
                      thumbnailUrl={animation.thumbnail_url}
                      videoUrl={animation.preview_url || animation.file_url}
                      tags={animation.tags}
                      isFavorite={true}
                      isInCart={cart.has(animation.id)}
                        onFavoriteToggle={() => toggleFavorite(animation.id)}
                        onCartToggle={() => toggleCart(animation.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="history">
              <div className="mb-8">
                <SubscriptionStatus />
              </div>
              <DownloadHistory />
            </TabsContent>

            <TabsContent value="settings">
              <div className="mb-8">
                <SubscriptionStatus />
              </div>
              <AccountSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
