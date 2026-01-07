import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Download, ShoppingCart, Loader2, Sparkles, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import VideoPreview from '@/components/ui/VideoPreview';
import EditShareModal from './EditShareModal';
import { CardOverlayButton } from '@/components/ui/CardOverlayButton';
import { cn } from '@/lib/utils';

interface AnimationCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  videoUrl?: string;
  tags: string[];
  isFavorite: boolean;
  isInCart?: boolean;
  onFavoriteToggle: () => void;
  onCartToggle?: () => void;
  isGuest?: boolean;
  onAuthRequired?: () => void;
  // New thumbnail system fields
  thumbCardUrl?: string | null;
  thumbStatus?: string | null;
  thumbSource?: string | null;
}

export default function AnimationCard({
  id,
  title,
  description,
  category,
  thumbnailUrl,
  videoUrl,
  tags,
  isFavorite,
  isInCart = false,
  onFavoriteToggle,
  onCartToggle,
  isGuest = false,
  onAuthRequired,
  thumbCardUrl,
  thumbStatus,
  thumbSource,
}: AnimationCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [showEditShare, setShowEditShare] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = async () => {
    if (isGuest && onAuthRequired) {
      onAuthRequired();
      return;
    }
    
    setIsDownloading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get animation file URL
      const { data: animation, error: fetchError } = await supabase
        .from('animations')
        .select('file_url')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Track download in database
      await supabase.from('user_downloads').insert({
        user_id: user.id,
        animation_id: id,
      });

      // Trigger file download
      const link = document.createElement('a');
      link.href = animation.file_url;
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: t('animation.downloadComplete'),
        description: t('animation.downloadCompleteDesc', { title }),
      });

      // Refresh page to update stats
      window.dispatchEvent(new CustomEvent('download-complete'));
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

  return (
    <>
      <Card 
        className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 rounded-lg h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Full-size edge-to-edge preview with overlaid elements */}
        <div 
          className="relative w-full h-full overflow-hidden bg-muted cursor-pointer"
          onClick={() => navigate(`/animation/${id}`)}
        >
          <VideoPreview
            thumbnailUrl={thumbnailUrl}
            videoUrl={videoUrl}
            alt={title}
            isHovering={isHovered}
            thumbCardUrl={thumbCardUrl}
            thumbStatus={thumbStatus}
            thumbSource={thumbSource}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Gradient overlay for readability - visible only on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite Button - Top Right - visible only on hover */}
          <Button
            size="icon"
            variant={isFavorite ? "default" : "secondary"}
            className={`absolute top-3 right-3 rounded-full z-10 h-9 w-9 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:scale-110 transition-all duration-300 border opacity-0 group-hover:opacity-100 ${
              isFavorite ? 'bg-primary text-primary-foreground border-primary' : 'bg-foreground/80 text-background border-foreground/40'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (isGuest && onAuthRequired) {
                onAuthRequired();
              } else {
                onFavoriteToggle();
              }
            }}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          
          {/* Title & Tags - Bottom Overlay - visible only on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
            <h3 className="text-white font-bold text-base line-clamp-1 drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
              {title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs bg-black/90 text-white border-white/40 backdrop-blur-sm shadow-lg font-semibold px-2.5 py-0.5">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Action Buttons - Overlaid on preview - visible only on hover */}
          <div className="absolute inset-x-0 bottom-[72px] px-4 space-y-2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
            {/* Primary Actions Row */}
            <div className="flex gap-2">
              {onCartToggle && (
                <CardOverlayButton
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isGuest && onAuthRequired) {
                      onAuthRequired();
                    } else {
                      onCartToggle();
                    }
                  }}
                  isActive={isInCart}
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span>{isInCart ? 'In Cart' : 'Add'}</span>
                </CardOverlayButton>
              )}
              <CardOverlayButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Download className="h-3.5 w-3.5" />
                )}
                <span>{isDownloading ? t('animation.downloading') : t('animation.download')}</span>
              </CardOverlayButton>
            </div>
            
            {/* Secondary Actions Row */}
            <div className="flex gap-2">
              <CardOverlayButton
                onClick={(e) => {
                  e.stopPropagation();
                  if (isGuest && onAuthRequired) {
                    onAuthRequired();
                  } else {
                    setShowEditShare(true);
                  }
                }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t('editShare.editAndShare')}</span>
              </CardOverlayButton>
              <CardOverlayButton
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/similar/${id}`);
                }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t('similar.discoverSimilar')}</span>
              </CardOverlayButton>
            </div>
          </div>
        </div>
      </Card>
      
      <EditShareModal
        open={showEditShare}
        onOpenChange={setShowEditShare}
        animation={{
          id,
          title,
          file_url: videoUrl || thumbnailUrl,
          thumbnail_url: thumbnailUrl,
        }}
      />
    </>
  );
}
