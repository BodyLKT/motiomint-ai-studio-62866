import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LiquidGlassIconButton } from '@/components/ui/LiquidGlassIconButton';
import { 
  Heart, 
  Download, 
  Sparkles
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import VideoPreview from '@/components/ui/VideoPreview';
import { CardOverlayButton } from '@/components/ui/CardOverlayButton';
import { cn } from '@/lib/utils';

interface EnhancedAnimationCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  videoUrl?: string;
  tags: string[];
  format?: string;
  resolution?: string;
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

export default function EnhancedAnimationCard({
  id,
  title,
  description,
  category,
  thumbnailUrl,
  videoUrl,
  tags,
  format,
  resolution,
  isFavorite,
  isInCart = false,
  onFavoriteToggle,
  onCartToggle,
  isGuest = false,
  onAuthRequired,
  thumbCardUrl,
  thumbStatus,
  thumbSource,
}: EnhancedAnimationCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isGuest && onAuthRequired) {
      onAuthRequired();
      return;
    }
    
    setIsDownloading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: animation, error: fetchError } = await supabase
        .from('animations')
        .select('file_url')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Track download via server-side RPC (enforces quota)
      const { error: rpcError } = await supabase.rpc('record_download', {
        _animation_id: id,
      });
      if (rpcError) throw rpcError;

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

  const handleViewDetails = () => {
    navigate(`/animation/${id}`);
  };

  const handleDiscoverSimilar = () => {
    navigate(`/similar/${id}`);
  };

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden rounded-xl border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 h-full",
        "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20",
        "dark:hover:border-accent/50 dark:hover:shadow-accent/20",
        isHovered && "border-primary/50 dark:border-accent/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Full-size edge-to-edge preview with overlaid elements */}
      <div 
        className="relative w-full h-full overflow-hidden bg-muted cursor-pointer"
        onClick={handleViewDetails}
      >
        <VideoPreview
          thumbnailUrl={thumbnailUrl}
          videoUrl={videoUrl}
          alt={title}
          isHovering={isHovered}
          thumbCardUrl={thumbCardUrl}
          thumbStatus={thumbStatus}
          thumbSource={thumbSource}
          hideOverlay
          mobileAutoplay
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Gradient overlay - visible only on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Favorite Button - Top Right - visible only on hover */}
        <LiquidGlassIconButton
          className={cn(
            "absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
            isFavorite && "bg-primary/50 dark:bg-accent/40 border-primary/50 dark:border-accent/50"
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (isGuest && onAuthRequired) {
              onAuthRequired();
            } else {
              onFavoriteToggle();
            }
          }}
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-all",
              isFavorite && "fill-current"
            )} 
          />
        </LiquidGlassIconButton>

        {/* Title & Tags - Bottom Overlay - visible only on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
          <p className="text-white font-bold text-base line-clamp-1 drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
            {title}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs bg-black/90 text-white border-white/40 backdrop-blur-sm shadow-lg font-semibold px-2.5 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons - Overlaid on preview - visible only on hover */}
        <div className="absolute inset-x-0 bottom-[72px] px-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
          <div className="flex gap-2">
            <CardOverlayButton
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              disabled={isDownloading}
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isDownloading ? 'Downloading...' : 'Download'}</span>
            </CardOverlayButton>
            <CardOverlayButton
              onClick={(e) => {
                e.stopPropagation();
                handleDiscoverSimilar();
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Similar</span>
            </CardOverlayButton>
          </div>
        </div>
      </div>
    </Card>
  );
}
