import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Download, Heart, Sparkles, Calendar, Filter, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import VideoPreview from '@/components/ui/VideoPreview';
import EditShareModal from './EditShareModal';
import { format } from 'date-fns';

interface DownloadHistoryItem {
  id: string;
  downloaded_at: string;
  animation: {
    id: string;
    title: string;
    description: string;
    category: string;
    file_url: string;
    thumbnail_url: string;
    tags: string[];
    format?: string;
    resolution?: string;
  };
}

export default function DownloadHistory() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [downloads, setDownloads] = useState<DownloadHistoryItem[]>([]);
  const [filteredDownloads, setFilteredDownloads] = useState<DownloadHistoryItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('all');
  const [selectedAnimation, setSelectedAnimation] = useState<any>(null);
  const [showEditShare, setShowEditShare] = useState(false);

  useEffect(() => {
    if (user) {
      fetchDownloadHistory();
      fetchFavorites();
    }
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [downloads, searchQuery, selectedCategory, selectedDateRange]);

  const fetchDownloadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('user_downloads')
        .select(`
          id,
          downloaded_at,
          animation_id,
          animations (
            id,
            title,
            description,
            category,
            file_url,
            thumbnail_url,
            tags,
            format,
            resolution
          )
        `)
        .eq('user_id', user?.id)
        .order('downloaded_at', { ascending: false });

      if (error) throw error;

      const formattedData = data.map((item: any) => ({
        id: item.id,
        downloaded_at: item.downloaded_at,
        animation: item.animations,
      }));

      setDownloads(formattedData);
    } catch (error: any) {
      toast({
        title: t('downloadHistory.errorLoading'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const { data } = await supabase
        .from('user_favorites')
        .select('animation_id')
        .eq('user_id', user?.id);

      if (data) {
        setFavorites(new Set(data.map((f: any) => f.animation_id)));
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...downloads];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.animation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.animation.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.animation.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.animation.category === selectedCategory);
    }

    // Date range filter
    if (selectedDateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter((item) => {
        const downloadDate = new Date(item.downloaded_at);
        switch (selectedDateRange) {
          case 'today':
            return downloadDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return downloadDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return downloadDate >= monthAgo;
          case 'year':
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            return downloadDate >= yearAgo;
          default:
            return true;
        }
      });
    }

    setFilteredDownloads(filtered);
  };

  const handleRedownload = async (animation: any) => {
    try {
      // Track download in database
      await supabase.from('user_downloads').insert({
        user_id: user?.id,
        animation_id: animation.id,
      });

      // Trigger file download
      const link = document.createElement('a');
      link.href = animation.file_url;
      link.download = `${animation.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: t('downloadHistory.redownloadSuccess'),
        description: t('downloadHistory.redownloadSuccessDesc', { title: animation.title }),
      });

      // Refresh download history
      fetchDownloadHistory();
    } catch (error: any) {
      toast({
        title: t('downloadHistory.redownloadError'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleFavorite = async (animationId: string) => {
    const isFavorite = favorites.has(animationId);

    try {
      if (isFavorite) {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user?.id)
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
          user_id: user?.id,
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

  const handleEditShare = (animation: any) => {
    setSelectedAnimation({
      id: animation.id,
      title: animation.title,
      file_url: animation.file_url,
      thumbnail_url: animation.thumbnail_url,
    });
    setShowEditShare(true);
  };

  const categories = Array.from(new Set(downloads.map((d) => d.animation.category)));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3">{t('downloadHistory.title')}</h2>
        <p className="text-muted-foreground">
          {t('downloadHistory.subtitle', { count: downloads.length })}
        </p>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('downloadHistory.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('downloadHistory.category')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('dashboard.all')}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date Range Filter */}
          <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
            <SelectTrigger>
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('downloadHistory.dateRange')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('downloadHistory.allTime')}</SelectItem>
              <SelectItem value="today">{t('downloadHistory.today')}</SelectItem>
              <SelectItem value="week">{t('downloadHistory.thisWeek')}</SelectItem>
              <SelectItem value="month">{t('downloadHistory.thisMonth')}</SelectItem>
              <SelectItem value="year">{t('downloadHistory.thisYear')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Results */}
      {filteredDownloads.length === 0 ? (
        <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-primary/20">
          <Download className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">{t('downloadHistory.noDownloads')}</h3>
          <p className="text-muted-foreground">
            {searchQuery || selectedCategory !== 'all' || selectedDateRange !== 'all'
              ? t('downloadHistory.noResults')
              : t('downloadHistory.noDownloadsDesc')}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDownloads.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <VideoPreview
                  thumbnailUrl={item.animation.thumbnail_url}
                  videoUrl={item.animation.file_url}
                  alt={item.animation.title}
                  className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    size="icon"
                    variant={favorites.has(item.animation.id) ? "default" : "secondary"}
                    className="rounded-full"
                    onClick={() => toggleFavorite(item.animation.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.has(item.animation.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Title & Category */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{item.animation.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.animation.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {item.animation.category}
                  </Badge>
                </div>

                {/* Download Date & Details */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(item.downloaded_at), 'MMM d, yyyy')}</span>
                  {item.animation.resolution && (
                    <>
                      <span>•</span>
                      <span>{item.animation.resolution}</span>
                    </>
                  )}
                  {item.animation.format && (
                    <>
                      <span>•</span>
                      <span>{item.animation.format}</span>
                    </>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {item.animation.tags?.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.animation.tags && item.animation.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.animation.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button
                    onClick={() => handleRedownload(item.animation)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    {t('downloadHistory.redownload')}
                  </Button>
                  <Button
                    onClick={() => handleEditShare(item.animation)}
                    variant="outline"
                    size="sm"
                    className="w-full border-primary/30 hover:bg-primary/10"
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    {t('downloadHistory.editShare')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit & Share Modal */}
      {selectedAnimation && (
        <EditShareModal
          open={showEditShare}
          onOpenChange={setShowEditShare}
          animation={selectedAnimation}
        />
      )}
    </div>
  );
}
