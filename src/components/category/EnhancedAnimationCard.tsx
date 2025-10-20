import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Download, 
  ShoppingCart, 
  Eye, 
  Sparkles,
  Play,
  ExternalLink
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import VideoPreview from '@/components/ui/VideoPreview';
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

      await supabase.from('user_downloads').insert({
        user_id: user.id,
        animation_id: id,
      });

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
        "group relative overflow-hidden rounded-xl border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300",
        "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1",
        isHovered && "border-primary/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Preview */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <VideoPreview
          thumbnailUrl={thumbnailUrl}
          videoUrl={videoUrl || thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="default"
              className="backdrop-blur-md bg-background text-foreground border border-border hover:bg-primary hover:text-primary-foreground shadow-lg"
              onClick={handleViewDetails}
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button
              size="sm"
              variant="default"
              className="backdrop-blur-md bg-background text-foreground border border-border hover:bg-primary hover:text-primary-foreground shadow-lg"
              onClick={handleDiscoverSimilar}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Similar
            </Button>
          </div>
        </div>

        {/* Top Right Badges */}
        <div className="absolute top-2 right-2 flex gap-2">
          {format && (
            <Badge className="bg-card/95 backdrop-blur-md text-foreground border-2 border-primary/40 shadow-[0_4px_12px_rgba(0,0,0,0.5)] font-bold px-3 py-1">
              {format}
            </Badge>
          )}
          {resolution && (
            <Badge className="bg-card/95 backdrop-blur-md text-foreground border-2 border-primary/40 shadow-[0_4px_12px_rgba(0,0,0,0.5)] font-bold px-3 py-1">
              {resolution}
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "absolute top-2 left-2 backdrop-blur-md transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)] border-2 h-9 w-9 hover:scale-110",
            isFavorite 
              ? "bg-primary/95 hover:bg-primary text-primary-foreground border-primary" 
              : "bg-card/95 hover:bg-card border-primary/40"
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
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title & Category */}
        <div>
          <h3 className="font-semibold text-base line-clamp-1 mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {category}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs px-2 py-0 bg-muted/50"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-0 bg-muted/50">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Actions Row */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1 gap-2"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Downloading...' : 'Download'}
          </Button>
          
          {onCartToggle && (
            <Button
              variant={isInCart ? "secondary" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                if (isGuest && onAuthRequired) {
                  onAuthRequired();
                } else {
                  onCartToggle();
                }
              }}
              className={cn(
                "flex-1 gap-2",
                isInCart && "bg-primary/20 text-primary border-primary/50"
              )}
            >
              <ShoppingCart className="w-4 h-4" />
              {isInCart ? 'In Cart' : 'Add'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
