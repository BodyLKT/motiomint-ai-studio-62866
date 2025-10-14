import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRandomAnimations();
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplayActive || animations.length === 0) return;

    const autoplayInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(animations.length / 6));
    }, 4000); // Change every 4 seconds

    return () => clearInterval(autoplayInterval);
  }, [isAutoplayActive, animations.length]);

  // Pause autoplay on user interaction
  const handleUserInteraction = useCallback(() => {
    setIsAutoplayActive(false);
    // Resume autoplay after 10 seconds of no interaction
    setTimeout(() => setIsAutoplayActive(true), 10000);
  }, []);

  const fetchRandomAnimations = async () => {
    try {
      // Fetch 18 random animations for 3 sets of 6
      const { data, error } = await supabase
        .from('animations')
        .select('id, title, thumbnail_url, file_url, category')
        .limit(18);

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
    handleUserInteraction();
    navigate(`/animation/${id}`);
  };

  // Get current 6 animations to display
  const displayedAnimations = animations.slice(currentIndex * 6, (currentIndex * 6) + 6);
  const totalPages = Math.ceil(animations.length / 6);

  const goToPrevious = () => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToNext = () => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  return (
    <div className="relative w-full h-full min-h-[600px] lg:min-h-[700px]">
      <div 
        className="w-full h-full flex items-center perspective-1000"
        onMouseEnter={handleUserInteraction}
        onTouchStart={handleUserInteraction}
      >
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-fr">
        {displayedAnimations.map((animation, index) => (
          <Card 
            key={animation.id}
            className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10 glass border-primary/30 glow-primary animate-fade-in aspect-[9/16]"
            onClick={() => handleAnimationClick(animation.id)}
            style={{
              transformStyle: 'preserve-3d',
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
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
              <Badge className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-white border-0 shadow-lg text-xs">
                {animation.category}
              </Badge>
              
              {/* Play Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-2xl animate-pulse">
                  <Play className="w-6 h-6 text-white ml-0.5" />
                </div>
              </div>
              
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-bold text-sm line-clamp-2 drop-shadow-lg">
                  {animation.title}
                </h3>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Card>
        ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {totalPages > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary/20 hover:border-primary shadow-lg transition-all"
            aria-label="Previous animations"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary/20 hover:border-primary shadow-lg transition-all"
            aria-label="Next animations"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </Button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  handleUserInteraction();
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
