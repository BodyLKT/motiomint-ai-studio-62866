import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, LogOut, ArrowLeft, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import AnimationCard from '@/components/dashboard/AnimationCard';
import GlobalSearchBar from '@/components/GlobalSearchBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CartButton } from '@/components/CartButton';
import { LoginModal } from '@/components/auth/LoginModal';
import { SignUpModal } from '@/components/auth/SignUpModal';

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

export default function SearchResults() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('q') || '';
  const filterParam = searchParams.get('filter') || 'all';
  
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    }
    if (user) {
      fetchUserData();
    }
  }, [searchQuery, filterParam, user]);

  const performSearch = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('animations')
        .select('*');

      // Apply text search
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,tags.cs.{${searchQuery}}`);
      }

      // Apply filter
      if (filterParam && filterParam !== 'all') {
        query = query.eq('category', filterParam);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setAnimations(data || []);
    } catch (error: any) {
      toast({
        title: t('animation.error'),
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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-primary/20 bg-background/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
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
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <GlobalSearchBar autoFocus />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <Button
            onClick={() => navigate(user ? '/dashboard' : '/')}
            variant="ghost"
            size="sm"
            className="mb-6 gap-2"
          >
            <ArrowLeft size={16} />
            {user ? t('nav.backToDashboard') : t('nav.backToHome')}
          </Button>

          {/* Results Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {t('search.resultsFor')}{' '}
              <span className="gradient-text">&quot;{searchQuery}&quot;</span>
            </h1>
            {filterParam && filterParam !== 'all' && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-muted-foreground">{t('search.filteredBy')}:</span>
                <Badge variant="secondary" className="text-sm">
                  {filterParam}
                </Badge>
              </div>
            )}
            <p className="text-muted-foreground mt-2">
              {animations.length} {animations.length === 1 ? t('search.result') : t('search.results')}
            </p>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : animations.length === 0 ? (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-primary/20">
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">{t('search.noResults')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('search.noResultsDesc')}
              </p>
              <Button onClick={() => navigate(user ? '/dashboard' : '/')} variant="outline">
                {t('search.browseAll')}
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {animations.map((animation) => (
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
                  isGuest={!user}
                  onAuthRequired={() => setShowSignUpModal(true)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

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
