import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Loader2,
  ArrowLeft,
  Grid3x3,
  LayoutGrid,
  SlidersHorizontal,
  Search
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import MainNavigation from '@/components/navigation/MainNavigation';
import EnhancedAnimationCard from '@/components/category/EnhancedAnimationCard';
import FilterPanel from '@/components/category/FilterPanel';
import SortDropdown, { SortOption } from '@/components/category/SortDropdown';
import { LoginModal } from '@/components/auth/LoginModal';
import { SignUpModal } from '@/components/auth/SignUpModal';
import { Input } from '@/components/ui/input';

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

type GridView = 'comfortable' | 'compact';

export default function CategoryPage() {
  const { category: categoryParam } = useParams<{ category: string }>();
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const category = decodeURIComponent(categoryParam || '');
  const categoryInfo = CATEGORY_INFO[category];

  const [animations, setAnimations] = useState<Animation[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedResolutions, setSelectedResolutions] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [gridView, setGridView] = useState<GridView>('comfortable');
  const [loadingData, setLoadingData] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    fetchAnimations();
    if (user) {
      fetchUserData();
    }
  }, [category, user]);

  const fetchAnimations = async () => {
    try {
      const { data, error } = await supabase
        .from('animations')
        .select('*')
        .eq('category', category)
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
        setFavorites(new Set(favoritesRes.data.map((f: any) => f.animation_id)));
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

  // Extract unique values for filters
  const allFormats = Array.from(new Set(animations.map(a => a.format).filter(Boolean))) as string[];
  const allResolutions = Array.from(new Set(animations.map(a => a.resolution).filter(Boolean))) as string[];
  const allTags = Array.from(new Set(animations.flatMap(a => a.tags)));

  // Apply filters and sorting
  const filteredAndSortedAnimations = animations
    .filter((animation) => {
      const matchesSearch =
        searchQuery === '' ||
        animation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animation.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animation.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFormat = selectedFormats.length === 0 || 
        (animation.format && selectedFormats.includes(animation.format));

      const matchesResolution = selectedResolutions.length === 0 || 
        (animation.resolution && selectedResolutions.includes(animation.resolution));

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => animation.tags.includes(tag));

      return matchesSearch && matchesFormat && matchesResolution && matchesTags;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'popular':
        case 'trending':
          // For now, use created_at as a proxy
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

  const clearAllFilters = () => {
    setSelectedFormats([]);
    setSelectedResolutions([]);
    setSelectedTags([]);
  };

  const handleAuthRequired = () => {
    setShowLoginModal(true);
  };

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The category you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Card>
      </div>
    );
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

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-16">
        {/* Category Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>

          <div className="flex items-start gap-4 mb-4">
            <div className="text-5xl">{categoryInfo.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{category}</h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {categoryInfo.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">
              {filteredAndSortedAnimations.length} {filteredAndSortedAnimations.length === 1 ? 'animation' : 'animations'}
            </Badge>
          </div>
        </div>

        {/* Filters & Controls Bar */}
        <div className="mb-6 space-y-4">
          {/* Mobile Filter & Sort */}
          <div className="lg:hidden flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {(selectedFormats.length + selectedResolutions.length + selectedTags.length) > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedFormats.length + selectedResolutions.length + selectedTags.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel
                    formats={allFormats}
                    resolutions={allResolutions}
                    tags={allTags}
                    selectedFormats={selectedFormats}
                    selectedResolutions={selectedResolutions}
                    selectedTags={selectedTags}
                    onFormatChange={setSelectedFormats}
                    onResolutionChange={setSelectedResolutions}
                    onTagChange={setSelectedTags}
                    onClearAll={clearAllFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search in this category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/50 backdrop-blur-sm border-border/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <SortDropdown value={sortBy} onChange={setSortBy} />
              
              <div className="flex items-center gap-1 border rounded-lg p-1 bg-card/50">
                <Button
                  variant={gridView === 'comfortable' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setGridView('comfortable')}
                  className="h-8 px-3"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={gridView === 'compact' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setGridView('compact')}
                  className="h-8 px-3"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex gap-6">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <FilterPanel
                  formats={allFormats}
                  resolutions={allResolutions}
                  tags={allTags}
                  selectedFormats={selectedFormats}
                  selectedResolutions={selectedResolutions}
                  selectedTags={selectedTags}
                  onFormatChange={setSelectedFormats}
                  onResolutionChange={setSelectedResolutions}
                  onTagChange={setSelectedTags}
                  onClearAll={clearAllFilters}
                />
              </Card>
            </div>
          </aside>

          {/* Animation Grid */}
          <div className="flex-1">
            {loadingData ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredAndSortedAnimations.length === 0 ? (
              <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-border/50">
                <p className="text-muted-foreground text-lg mb-4">No animations found</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                {(selectedFormats.length > 0 || selectedResolutions.length > 0 || selectedTags.length > 0) && (
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                )}
              </Card>
            ) : (
              <div className={
                gridView === 'comfortable'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'
              }>
                {filteredAndSortedAnimations.map((animation) => (
                  <EnhancedAnimationCard
                    key={animation.id}
                    id={animation.id}
                    title={animation.title}
                    description={animation.description || ''}
                    category={animation.category}
                    thumbnailUrl={animation.thumbnail_url}
                    videoUrl={animation.preview_url || animation.file_url}
                    tags={animation.tags}
                    format={animation.format}
                    resolution={animation.resolution}
                    isFavorite={favorites.has(animation.id)}
                    isInCart={cart.has(animation.id)}
                    onFavoriteToggle={() => toggleFavorite(animation.id)}
                    onCartToggle={() => toggleCart(animation.id)}
                    isGuest={!user}
                    onAuthRequired={handleAuthRequired}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
