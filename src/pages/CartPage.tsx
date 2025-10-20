import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Loader2, LogOut, ShoppingCart, Trash2, Download, ArrowLeft, Monitor, Layers, Film, Package, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';
import VideoPreview from '@/components/ui/VideoPreview';
import CartConfigEditor from '@/components/dashboard/CartConfigEditor';
import { VideoConfig } from '@/components/dashboard/VideoConfigSelector';
import GlobalSearchBar from '@/components/GlobalSearchBar';

interface CartItem {
  id: string;
  animation_id: string;
  selected_size: string;
  selected_ratio: string;
  selected_format: string;
  selected_platform: string | null;
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
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

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
          selected_size,
          selected_ratio,
          selected_format,
          selected_platform,
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
        selected_size: item.selected_size,
        selected_ratio: item.selected_ratio,
        selected_format: item.selected_format,
        selected_platform: item.selected_platform,
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

  const handleConfigUpdate = async (cartItemId: string, config: VideoConfig) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_cart')
        .update({
          selected_size: config.size,
          selected_ratio: config.ratio,
          selected_format: config.format,
          selected_platform: config.platform || null,
        })
        .eq('id', cartItemId);

      if (error) throw error;

      // Update local state
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartItemId
            ? {
                ...item,
                selected_size: config.size,
                selected_ratio: config.ratio,
                selected_format: config.format,
                selected_platform: config.platform || null,
              }
            : item
        )
      );

      toast({
        title: t('videoConfig.configUpdated'),
      });
    } catch (error: any) {
      toast({
        title: t('animation.error'),
        description: error.message,
        variant: 'destructive',
      });
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
      setSelectedItems(new Set());

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

  const toggleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    }
  };

  const toggleSelectItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const removeSelectedItems = async () => {
    if (!user || selectedItems.size === 0) return;

    try {
      const { error } = await supabase
        .from('user_cart')
        .delete()
        .in('id', Array.from(selectedItems));

      if (error) throw error;

      setCartItems((prev) => prev.filter((item) => !selectedItems.has(item.id)));
      setSelectedItems(new Set());

      toast({
        title: t('cart.itemsRemoved'),
        description: t('cart.itemsRemovedCount', { count: selectedItems.size }),
      });
    } catch (error: any) {
      toast({
        title: t('animation.error'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const downloadAllSelected = async () => {
    if (!user || selectedItems.size === 0) return;

    try {
      setIsDownloadingAll(true);
      const itemsToDownload = cartItems.filter(item => selectedItems.has(item.id));

      for (const item of itemsToDownload) {
        // Track download
        await supabase.from('user_downloads').insert({
          user_id: user.id,
          animation_id: item.animation.id,
        });

        // Trigger download
        const link = document.createElement('a');
        link.href = item.animation.file_url;
        link.download = `${item.animation.title}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      toast({
        title: t('cart.downloadsStarted'),
        description: t('cart.downloadsCount', { count: selectedItems.size }),
      });

      window.dispatchEvent(new Event('download-complete'));
    } catch (error: any) {
      toast({
        title: t('animation.downloadError'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDownloadingAll(false);
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
      {/* Header with Integrated Search */}
      <header className="border-b border-primary/20 bg-background/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-[200px_1fr_auto] gap-4 items-center">
            {/* Logo - Left */}
            <button
              onClick={handleLogoClick}
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
              <Button
                onClick={() => navigate('/dashboard')}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <ArrowLeft size={16} />
                {t('nav.backToDashboard')}
              </Button>
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

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-3">
            {/* Top Row: Logo and Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleLogoClick}
                className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                motiomint
              </button>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="ghost"
                  size="sm"
                >
                  <ArrowLeft size={16} />
                </Button>
                <ThemeToggle />
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                >
                  <LogOut size={16} />
                </Button>
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
      <main className="container mx-auto px-4 pt-24 pb-8">
        {loadingData ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <Card className="p-16 text-center bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground relative" />
              </div>
              <h2 className="text-3xl font-bold mb-3">{t('cart.emptyTitle')}</h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t('cart.emptyDescription')}
              </p>
              <Button onClick={() => navigate('/dashboard')} size="lg" className="gap-2">
                <Package className="h-5 w-5" />
                {t('cart.browseCatalog')}
              </Button>
            </Card>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 max-w-7xl mx-auto">
            {/* Cart Items - Left Column */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                  <ShoppingCart className="h-8 w-8" />
                  {t('cart.title')}
                </h1>
                <p className="text-muted-foreground">
                  {t('cart.itemCount', { count: cartItems.length })}
                </p>
              </div>

              {/* Bulk Actions Bar */}
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedItems.size === cartItems.length}
                      onCheckedChange={toggleSelectAll}
                      id="select-all"
                    />
                    <label
                      htmlFor="select-all"
                      className="text-sm font-medium cursor-pointer"
                    >
                      {selectedItems.size === cartItems.length
                        ? t('cart.deselectAll')
                        : t('cart.selectAll')}
                    </label>
                    {selectedItems.size > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedItems.size} {t('cart.selected')}
                      </Badge>
                    )}
                  </div>
                  {selectedItems.size > 0 && (
                    <div className="flex gap-2">
                      <Button
                        onClick={downloadAllSelected}
                        disabled={isDownloadingAll}
                        size="sm"
                        className="gap-2"
                      >
                        {isDownloadingAll ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {t('cart.downloading')}
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            {t('cart.downloadSelected')}
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={removeSelectedItems}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        {t('cart.removeSelected')}
                      </Button>
                    </div>
                  )}
                </div>
              </Card>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 transition-all ${
                      selectedItems.has(item.id)
                        ? 'ring-2 ring-primary border-primary'
                        : 'hover:border-primary/40'
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex gap-4">
                        {/* Checkbox */}
                        <div className="flex items-start pt-1">
                          <Checkbox
                            checked={selectedItems.has(item.id)}
                            onCheckedChange={() => toggleSelectItem(item.id)}
                            id={`item-${item.id}`}
                          />
                        </div>

                        {/* Thumbnail */}
                        <div className="relative w-32 md:w-48 aspect-video overflow-hidden rounded-lg bg-muted flex-shrink-0">
                          <VideoPreview
                            thumbnailUrl={item.animation.thumbnail_url}
                            videoUrl={item.animation.file_url}
                            alt={item.animation.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 space-y-3">
                          <div>
                            <h3 className="text-lg font-bold mb-1 truncate">
                              {item.animation.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.animation.description}
                            </p>
                          </div>

                          {/* Configuration */}
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="gap-1">
                              <Monitor className="h-3 w-3" />
                              {item.selected_size}
                            </Badge>
                            <Badge variant="secondary" className="gap-1">
                              <Layers className="h-3 w-3" />
                              {item.selected_ratio}
                            </Badge>
                            <Badge variant="secondary" className="gap-1">
                              <Film className="h-3 w-3" />
                              {item.selected_format}
                            </Badge>
                          </div>

                          {/* Actions - Mobile */}
                          <div className="flex flex-wrap gap-2 lg:hidden">
                            <CartConfigEditor
                              config={{
                                size: item.selected_size,
                                ratio: item.selected_ratio,
                                format: item.selected_format,
                                platform: item.selected_platform || undefined,
                              }}
                              animationTitle={item.animation.title}
                              onSave={(config) => handleConfigUpdate(item.id, config)}
                            />
                            <Button
                              onClick={() => handleDownload(item.animation)}
                              disabled={downloadingId === item.animation.id}
                              size="sm"
                              className="gap-2"
                            >
                              {downloadingId === item.animation.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Download className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              onClick={() => removeFromCart(item.id, item.animation.title)}
                              variant="outline"
                              size="sm"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Actions - Desktop */}
                        <div className="hidden lg:flex flex-col gap-2 flex-shrink-0">
                          <CartConfigEditor
                            config={{
                              size: item.selected_size,
                              ratio: item.selected_ratio,
                              format: item.selected_format,
                              platform: item.selected_platform || undefined,
                            }}
                            animationTitle={item.animation.title}
                            onSave={(config) => handleConfigUpdate(item.id, config)}
                          />
                          <Button
                            onClick={() => handleDownload(item.animation)}
                            disabled={downloadingId === item.animation.id}
                            size="sm"
                            className="gap-2 w-full"
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
                            size="sm"
                            className="gap-2 w-full"
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
            </div>

            {/* Summary Sidebar - Right Column */}
            <div className="lg:sticky lg:top-24 h-fit space-y-4">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <h2 className="text-xl font-bold mb-4">{t('cart.summary')}</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('cart.totalItems')}</span>
                    <span className="font-medium">{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('cart.selected')}</span>
                    <span className="font-medium">{selectedItems.size}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{t('cart.freeDownload')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedItems.size > 0 ? (
                    <>
                      <Button
                        onClick={downloadAllSelected}
                        disabled={isDownloadingAll}
                        size="lg"
                        className="w-full gap-2"
                      >
                        {isDownloadingAll ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            {t('cart.downloading')}
                          </>
                        ) : (
                          <>
                            <Download className="h-5 w-5" />
                            {t('cart.downloadSelected')} ({selectedItems.size})
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={removeSelectedItems}
                        variant="outline"
                        size="lg"
                        className="w-full gap-2"
                      >
                        <Trash2 className="h-5 w-5" />
                        {t('cart.removeSelected')}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">
                        {t('cart.selectItemsPrompt')}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <h3 className="font-semibold mb-3">{t('cart.quickActions')}</h3>
                <div className="space-y-2">
                  <Button
                    onClick={toggleSelectAll}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {selectedItems.size === cartItems.length
                      ? t('cart.deselectAll')
                      : t('cart.selectAll')}
                  </Button>
                  <Button
                    onClick={clearCart}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    {t('cart.clearAll')}
                  </Button>
                  <Button
                    onClick={() => navigate('/dashboard')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <Package className="h-4 w-4" />
                    {t('cart.continueBrowsing')}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
