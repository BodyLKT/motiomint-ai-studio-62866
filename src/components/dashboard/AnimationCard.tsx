import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface AnimationCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export default function AnimationCard({
  id,
  title,
  description,
  category,
  thumbnailUrl,
  isFavorite,
  onFavoriteToggle,
}: AnimationCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_downloads')
        .insert({ 
          user_id: user.id,
          animation_id: id 
        });

      if (error) throw error;

      toast({
        title: 'Download started',
        description: `${title} is being downloaded.`,
      });
    } catch (error: any) {
      toast({
        title: 'Download failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
      <div className="aspect-video relative overflow-hidden bg-muted">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              onClick={onFavoriteToggle}
              variant="outline"
              size="sm"
              className="aspect-square p-0"
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? 'fill-primary' : ''}`}
              />
            </Button>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">
            {category}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
