import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Animation {
  id: string;
  title: string;
  thumbnail_url: string;
  video_url: string;
  category: string;
}

export const AnimationCarousel3D = () => {
  const [animations, setAnimations] = useState<Animation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRandomAnimations();
  }, []);

  const fetchRandomAnimations = async () => {
    try {
      // Fetch 10 random animations from the database
      const { data, error } = await supabase
        .from('animations')
        .select('id, title, thumbnail_url, file_url, category')
        .limit(10);

      if (error) throw error;

      if (data) {
        // Shuffle the animations and map file_url to video_url
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setAnimations(shuffled.map(item => ({
          ...item,
          video_url: item.file_url
        })));
      }
    } catch (error) {
      console.error('Error fetching animations:', error);
    }
  };

  const handleAnimationClick = (id: string) => {
    navigate(`/animation/${id}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto perspective-1000">
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {animations.map((animation, index) => (
            <CarouselItem key={animation.id} className="pl-2 md:pl-4 basis-4/5 md:basis-1/2 lg:basis-2/5">
              <div className="p-1">
                <Card 
                  className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:rotate-y-3 glass border-primary/30 glow-primary"
                  onClick={() => handleAnimationClick(animation.id)}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative aspect-[9/16] overflow-hidden">
                    {/* Video Preview */}
                    <video
                      src={animation.video_url}
                      poster={animation.thumbnail_url}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white border-0 shadow-lg">
                      {animation.category}
                    </Badge>
                    
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-2xl animate-pulse">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg line-clamp-2 drop-shadow-lg">
                        {animation.title}
                      </h3>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-1/2 bg-background/80 backdrop-blur-sm border-primary/30" />
        <CarouselNext className="right-0 translate-x-1/2 bg-background/80 backdrop-blur-sm border-primary/30" />
      </Carousel>
    </div>
  );
};
