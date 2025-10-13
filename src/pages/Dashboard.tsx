import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, LogOut, Library, Heart, Download as DownloadIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import AnimationCard from '@/components/dashboard/AnimationCard';
import CategoryFilter from '@/components/dashboard/CategoryFilter';
import SearchBar from '@/components/dashboard/SearchBar';
import { ThemeToggle } from '@/components/ThemeToggle';

interface Animation {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string;
  thumbnail_url: string;
  tags: string[];
}

export default function Dashboard() {
  const { user, session, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [downloads, setDownloads] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);

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
      const [favoritesRes, downloadsRes] = await Promise.all([
        supabase
          .from('user_favorites')
          .select('animation_id')
          .eq('user_id', user.id),
        supabase
          .from('user_downloads')
          .select('id')
          .eq('user_id', user.id),
      ]);

      if (favoritesRes.data) {
        setFavorites(new Set(favoritesRes.data.map((f: any) => f.animation_id)));
      }
      if (downloadsRes.data) {
        setDownloads(downloadsRes.data.length);
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
          title: 'Removed from favorites',
        });
      } else {
        await supabase.from('user_favorites').insert({
          user_id: user.id,
          animation_id: animationId,
        });

        setFavorites((prev) => new Set(prev).add(animationId));

        toast({
          title: 'Added to favorites',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
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
            <ThemeToggle />
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hi {user.user_metadata?.full_name || 'there'}, welcome back 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Access your animation library, manage subscriptions, and download your favorite content.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Library className="h-5 w-5 text-primary" />
                <h3 className="text-sm text-muted-foreground">Total Animations</h3>
              </div>
              <p className="text-3xl font-bold">{animations.length}</p>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="h-5 w-5 text-primary" />
                <h3 className="text-sm text-muted-foreground">Favorites</h3>
              </div>
              <p className="text-3xl font-bold">{favorites.size}</p>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <DownloadIcon className="h-5 w-5 text-primary" />
                <h3 className="text-sm text-muted-foreground">Downloads</h3>
              </div>
              <p className="text-3xl font-bold">{downloads}</p>
            </Card>
          </div>

          {/* Animation Library */}
          <Tabs defaultValue="library" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="library" className="gap-2">
                <Library className="h-4 w-4" />
                Library
              </TabsTrigger>
              <TabsTrigger value="favorites" className="gap-2">
                <Heart className="h-4 w-4" />
                Favorites
              </TabsTrigger>
            </TabsList>

            <TabsContent value="library" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>
              </div>

              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              {loadingData ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredAnimations.length === 0 ? (
                <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-primary/20">
                  <p className="text-muted-foreground">No animations found matching your criteria.</p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAnimations.map((animation) => (
                    <AnimationCard
                      key={animation.id}
                      id={animation.id}
                      title={animation.title}
                      description={animation.description || ''}
                      category={animation.category}
                      thumbnailUrl={animation.thumbnail_url}
                      tags={animation.tags}
                      isFavorite={favorites.has(animation.id)}
                      onFavoriteToggle={() => toggleFavorite(animation.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="favorites">
              {favoriteAnimations.length === 0 ? (
                <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-primary/20">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground">
                    Start adding animations to your favorites to see them here!
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteAnimations.map((animation) => (
                    <AnimationCard
                      key={animation.id}
                      id={animation.id}
                      title={animation.title}
                      description={animation.description || ''}
                      category={animation.category}
                      thumbnailUrl={animation.thumbnail_url}
                      tags={animation.tags}
                      isFavorite={true}
                      onFavoriteToggle={() => toggleFavorite(animation.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
