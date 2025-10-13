import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Download, ShoppingCart, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import VideoPreview from '@/components/ui/VideoPreview';

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
}: AnimationCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
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
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20">
      <div 
        className="relative aspect-video overflow-hidden bg-muted cursor-pointer"
        onClick={() => navigate(`/animation/${id}`)}
      >
        <VideoPreview
          thumbnailUrl={thumbnailUrl}
          videoUrl={videoUrl}
          alt={title}
          className="w-full h-full group-hover:scale-110 transition-transform duration-300"
        />
        <Button
          size="icon"
          variant={isFavorite ? "default" : "secondary"}
          className="absolute top-2 right-2 rounded-full z-10"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle();
          }}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge variant="secondary">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          {onCartToggle && (
            <Button
              onClick={onCartToggle}
              variant={isInCart ? "default" : "outline"}
              className="flex-1"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </Button>
          )}
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1"
            variant="hero"
          >
            {isDownloading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {isDownloading ? t('animation.downloading') : t('animation.download')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
