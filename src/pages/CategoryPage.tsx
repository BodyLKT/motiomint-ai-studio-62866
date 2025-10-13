import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Loader2, 
  LogOut, 
  Home, 
  ArrowLeft,
  TrendingUp,
  Star,
  Clock,
  Grid3x3,
  FileVideo,
  Monitor
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import AnimationCard from '@/components/dashboard/AnimationCard';
import SearchBar from '@/components/dashboard/SearchBar';
import { ThemeToggle } from '@/components/ThemeToggle';
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
  created_at: string;
  format?: string;
  resolution?: string;
}

const CATEGORY_INFO: Record<string, { description: string; icon: string }> = {
  'Tech & Futuristic': {
    description: 'Holographic interfaces, circuit patterns, AI visuals, and futuristic motion graphics',
    icon: '🚀'
  },
  'Fitness & Lifestyle': {
    description: 'Workout graphics, health metrics, energy flows, and wellness animations',
    icon: '💪'
  },
  'Business & Finance': {
    description: 'Charts, graphs, corporate motion graphics, and professional animations',
    icon: '💼'
  },
  'Travel & Nature': {
    description: 'Landscapes, travel routes, nature elements, and scenic animations',
    icon: '🌍'
  },
  'Abstract Backgrounds': {
    description: 'Flowing shapes, particles, gradient motions, and abstract patterns',
    icon: '✨'
  },
  'Social Media Hooks': {
    description: 'Attention-grabbing intros, transitions, and viral-ready animations',
    icon: '📱'
  }
};

const ALL_CATEGORIES = Object.keys(CATEGORY_INFO);

export default function CategoryPage() {
  const { category: categoryParam } = useParams<{ category: string }>();
  const { user, session, loading, signOut } = useAuth();
  const navigate = useNavigate();
  
  const category = decodeURIComponent(categoryParam || '');
  const categoryInfo = CATEGORY_INFO[category];

  const [animations, setAnimations] = useState<Animation[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedResolution, setSelectedResolution] = useState<string>('all');
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !session) {
      navigate('/');
    }
  }, [session, loading, navigate]);

  useEffect(() => {
    if (user && category) {
      fetchAnimations();
      fetchUserFavorites();
      fetchUserCart();
    }
  }, [user, category, sortBy]);

  const fetchAnimations = async () => {
    try {
      let query = supabase
        .from('animations')
        .select('*')
        .eq('category', category);

      // Apply sorting
      if (sortBy === 'recent') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'popular') {
        // For now, use created_at as proxy for popularity
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'trending') {
        // For now, use created_at as proxy for trending
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

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

  const fetchUserFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('animation_id')
        .eq('user_id', user.id);

      if (error) throw error;
      if (data) {
        setFavorites(new Set(data.map((f: any) => f.animation_id)));
      }
    } catch (error: any) {
      console.error('Error fetching favorites:', error);
    }
  };

  const fetchUserCart = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_cart')
        .select('animation_id')
        .eq('user_id', user.id);

      if (error) throw error;
      if (data) {
        setCart(new Set(data.map((c: any) => c.animation_id)));
      }
    } catch (error: any) {
      console.error('Error fetching cart:', error);
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
          title: 'Removed from cart',
        });
      } else {
        await supabase.from('user_cart').insert({
          user_id: user.id,
          animation_id: animationId,
        });

        setCart((prev) => new Set(prev).add(animationId));

        toast({
          title: 'Added to cart',
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
    navigate('/');
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

  if (!user || !categoryInfo) {
    return null;
  }

  const filteredAnimations = animations.filter((animation) => {
    const matchesSearch =
      searchQuery === '' ||
      animation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animation.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animation.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFormat = selectedFormat === 'all' || animation.format === selectedFormat;
    const matchesResolution = selectedResolution === 'all' || animation.resolution === selectedResolution;
    
    return matchesSearch && matchesFormat && matchesResolution;
  });

  const formats = ['all', ...Array.from(new Set(animations.map(a => a.format).filter(Boolean)))];
  const resolutions = ['all', ...Array.from(new Set(animations.map(a => a.resolution).filter(Boolean)))];

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
              <Home size={16} />
              Dashboard
            </Button>
            <CartButton />
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
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            size="sm"
            className="mb-6 gap-2"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>

          {/* Category Header */}
          <div className="mb-12 text-center">
            <div className="inline-block mb-4">
              <Badge className="text-4xl px-4 py-2 bg-primary/20 border-primary/30">
                {categoryInfo.icon}
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 gradient-text">
              {category}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {categoryInfo.description}
            </p>
          </div>

          {/* Category Navigation */}
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {ALL_CATEGORIES.map((cat) => (
                <Link key={cat} to={`/category/${encodeURIComponent(cat)}`}>
                  <Button
                    variant={cat === category ? "default" : "outline"}
                    size="sm"
                    className="gap-2"
                  >
                    {CATEGORY_INFO[cat].icon} {cat}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Grid3x3 className="h-4 w-4 text-primary" />
                <h3 className="text-sm text-muted-foreground">Total</h3>
              </div>
              <p className="text-2xl font-bold">{animations.length}</p>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-primary" />
                <h3 className="text-sm text-muted-foreground">Favorites</h3>
              </div>
              <p className="text-2xl font-bold">
                {filteredAnimations.filter(a => favorites.has(a.id)).length}
              </p>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-primary" />
                <h3 className="text-sm text-muted-foreground">Recent</h3>
              </div>
              <p className="text-2xl font-bold">
                {animations.filter(a => {
                  const daysOld = (Date.now() - new Date(a.created_at).getTime()) / (1000 * 60 * 60 * 24);
                  return daysOld < 7;
                }).length}
              </p>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h3 className="text-sm text-muted-foreground">Trending</h3>
              </div>
              <p className="text-2xl font-bold">{Math.min(animations.length, 12)}</p>
            </Card>
          </div>

          {/* Search & Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as any)} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="recent" className="gap-2">
                    <Clock className="h-4 w-4" />
                    Recent
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="gap-2">
                    <Star className="h-4 w-4" />
                    Popular
                  </TabsTrigger>
                  <TabsTrigger value="trending" className="gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Trending
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Format & Resolution Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <FileVideo className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Format:</span>
                <Tabs value={selectedFormat} onValueChange={setSelectedFormat} className="w-auto">
                  <TabsList>
                    {formats.map((format) => (
                      <TabsTrigger key={format} value={format} className="text-xs capitalize">
                        {format}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Resolution:</span>
                <Tabs value={selectedResolution} onValueChange={setSelectedResolution} className="w-auto">
                  <TabsList>
                    {resolutions.map((res) => (
                      <TabsTrigger key={res} value={res} className="text-xs capitalize">
                        {res}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Animations Grid */}
          {loadingData ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredAnimations.length === 0 ? (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-primary/20">
              <p className="text-muted-foreground text-lg">
                No animations found in this category.
              </p>
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
                  videoUrl={animation.preview_url || animation.file_url}
                  tags={animation.tags}
                  isFavorite={favorites.has(animation.id)}
                  isInCart={cart.has(animation.id)}
                  onFavoriteToggle={() => toggleFavorite(animation.id)}
                  onCartToggle={() => toggleCart(animation.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
