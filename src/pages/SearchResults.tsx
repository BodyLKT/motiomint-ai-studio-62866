import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  LogOut, 
  ArrowLeft, 
  Search, 
  Sparkles, 
  Layers, 
  Wrench, 
  FileText,
  AlertCircle 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import AnimationCard from '@/components/dashboard/AnimationCard';
import GlobalSearchBar from '@/components/GlobalSearchBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CartButton } from '@/components/CartButton';
import { LoginModal } from '@/components/auth/LoginModal';
import { SignUpModal } from '@/components/auth/SignUpModal';
import { getCachedSearch, UnifiedSearchResult } from '@/lib/unifiedSearch';

export default function SearchResults() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('q') || '';
  const filterParam = searchParams.get('filter') || 'all';
  
  const [results, setResults] = useState<UnifiedSearchResult[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    } else {
      setResults([]);
      setLoading(false);
    }
    if (user) {
      fetchUserData();
    }
  }, [searchQuery, filterParam, user]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const searchResults = await getCachedSearch(searchQuery, filterParam);
      setResults(searchResults);
    } catch (error: any) {
      toast({
        title: 'Search Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
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
    if (!user) {
      setShowSignUpModal(true);
      return;
    }

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

        toast({ title: 'Removed from favorites' });
      } else {
        await supabase.from('user_favorites').insert({
          user_id: user.id,
          animation_id: animationId,
        });

        setFavorites((prev) => new Set(prev).add(animationId));
        toast({ title: 'Added to favorites' });
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
    if (!user) {
      setShowSignUpModal(true);
      return;
    }

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

        toast({ title: 'Removed from cart' });
        window.dispatchEvent(new Event('cart-updated'));
      } else {
        await supabase.from('user_cart').insert({
          user_id: user.id,
          animation_id: animationId,
        });

        setCart((prev) => new Set(prev).add(animationId));
        toast({ title: 'Added to cart' });
        window.dispatchEvent(new Event('cart-updated'));
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Group results by type
  const animationResults = results.filter(r => r.type === 'animation');
  const categoryResults = results.filter(r => r.type === 'category');
  const toolResults = results.filter(r => r.type === 'tool');
  const helpResults = results.filter(r => r.type === 'help');

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-primary/20 bg-background/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-xl lg:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              motiomint
            </button>
            
            <div className="hidden lg:block flex-1 max-w-2xl mx-4">
              <GlobalSearchBar autoFocus={false} />
            </div>
            
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <CartButton />
                  <ThemeToggle />
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="hidden lg:flex gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <ThemeToggle />
                  <Button
                    onClick={() => setShowLoginModal(true)}
                    variant="outline"
                    size="sm"
                    className="hidden lg:inline-flex"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setShowSignUpModal(true)}
                    size="sm"
                    className="hidden lg:inline-flex"
                  >
                    Sign Up
                  </Button>
                </>
              )}
              <div className="lg:hidden">
                <GlobalSearchBar />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          size="sm"
          className="mb-6 gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>

        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
            <h1 className="text-2xl lg:text-4xl font-bold">
              Search Results
            </h1>
          </div>
          {searchQuery && (
            <p className="text-muted-foreground text-sm lg:text-base">
              Showing results for: <span className="font-semibold text-foreground">"{searchQuery}"</span>
            </p>
          )}
          {results.length > 0 && (
            <p className="text-muted-foreground text-xs lg:text-sm mt-1">
              {results.length} {results.length === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* No Results State */}
        {!loading && searchQuery && results.length === 0 && (
          <Card className="p-8 lg:p-12 text-center max-w-2xl mx-auto">
            <div className="mb-6">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl lg:text-2xl font-bold mb-2">No results found</h2>
              <p className="text-muted-foreground">
                We couldn't find anything matching "{searchQuery}"
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Try:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Using different keywords</li>
                  <li>Checking your spelling</li>
                  <li>Using more general terms</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 justify-center pt-4">
                <Button variant="outline" size="sm" onClick={() => navigate('/help')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Visit Help Center
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Results Sections */}
        {!loading && results.length > 0 && (
          <div className="space-y-12">
            {/* Animations Section */}
            {animationResults.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="text-xl lg:text-2xl font-bold">
                    Animations ({animationResults.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {animationResults.map((result) => {
                    if (result.type !== 'animation') return null;
                    return (
                      <AnimationCard
                        key={result.id}
                        id={result.id}
                        title={result.title}
                        description={result.description}
                        category={result.category}
                        thumbnailUrl={result.thumbnail_url}
                        tags={result.tags}
                        isFavorite={favorites.has(result.id)}
                        isInCart={cart.has(result.id)}
                        onFavoriteToggle={() => toggleFavorite(result.id)}
                        onCartToggle={() => toggleCart(result.id)}
                      />
                    );
                  })}
                </div>
              </section>
            )}

            {animationResults.length > 0 && (categoryResults.length > 0 || toolResults.length > 0 || helpResults.length > 0) && (
              <Separator className="my-8" />
            )}

            {/* Categories Section */}
            {categoryResults.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Layers className="w-5 h-5 text-secondary" />
                  <h2 className="text-xl lg:text-2xl font-bold">
                    Categories ({categoryResults.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryResults.map((result) => {
                    if (result.type !== 'category') return null;
                    return (
                      <Link
                        key={result.name}
                        to={`/category?name=${encodeURIComponent(result.name)}`}
                        className="group"
                      >
                        <Card className="p-6 hover:bg-secondary/10 hover:border-secondary/50 transition-all duration-200 cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Layers className="w-6 h-6 text-secondary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg group-hover:text-secondary transition-colors">
                                {result.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Browse all {result.name.toLowerCase()} animations
                              </p>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {categoryResults.length > 0 && (toolResults.length > 0 || helpResults.length > 0) && (
              <Separator className="my-8" />
            )}

            {/* Tools Section */}
            {toolResults.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Wrench className="w-5 h-5 text-accent" />
                  <h2 className="text-xl lg:text-2xl font-bold">
                    Tools ({toolResults.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {toolResults.map((result) => {
                    if (result.type !== 'tool') return null;
                    return (
                      <Link
                        key={result.name}
                        to={result.path}
                        className="group"
                      >
                        <Card className="p-6 hover:bg-accent/10 hover:border-accent/50 transition-all duration-200 cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                              {result.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg group-hover:text-accent transition-colors mb-1">
                                {result.name}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {result.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {toolResults.length > 0 && helpResults.length > 0 && (
              <Separator className="my-8" />
            )}

            {/* Help Articles Section */}
            {helpResults.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-xl lg:text-2xl font-bold">
                    Help Center ({helpResults.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {helpResults.map((result) => {
                    if (result.type !== 'help') return null;
                    return (
                      <Link
                        key={result.id}
                        to={result.path}
                        className="group"
                      >
                        <Card className="p-6 hover:bg-muted/50 hover:border-primary/30 transition-all duration-200 cursor-pointer">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                              <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                                {result.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                {result.description}
                              </p>
                              <Badge variant="secondary" className="text-xs">
                                {result.category}
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
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
