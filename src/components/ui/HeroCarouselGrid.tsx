import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface Animation {
  id: string;
  title: string;
  thumbnail_url: string;
  file_url: string;
  category: string;
}

export const HeroCarouselGrid = () => {
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const CARDS_PER_PAGE = 6;
  const totalPages = Math.ceil(animations.length / CARDS_PER_PAGE);

  useEffect(() => {
    fetchAnimations();
  }, []);

  const fetchAnimations = async () => {
    try {
      const { data, error } = await supabase
        .from('animations')
        .select('id, title, thumbnail_url, file_url, category')
        .limit(18);

      if (error) throw error;
      if (data) setAnimations(data);
    } catch (error) {
      console.error('Error fetching animations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (animationId: string) => {
    navigate(`/video/${animationId}`);
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const currentAnimations = animations.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-6 w-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-muted/20 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Grid Container */}
      <div className="grid grid-cols-3 gap-4 lg:gap-6 w-full">
        {currentAnimations.map((animation) => (
          <Card
            key={animation.id}
            className="group relative overflow-hidden rounded-xl cursor-pointer glass border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 aspect-[3/4]"
            onClick={() => handleCardClick(animation.id)}
          >
            {/* Video Preview */}
            <div className="absolute inset-0">
              <video
                src={animation.file_url}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                autoPlay
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>

            {/* Category Badge */}
            <Badge className="absolute top-3 left-3 z-10 bg-primary/90 text-primary-foreground">
              {animation.category}
            </Badge>

            {/* Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <PlayCircle className="w-12 h-12 text-primary drop-shadow-lg" />
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
              <h3 className="text-sm font-semibold text-foreground line-clamp-2">
                {animation.title}
              </h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Navigation Arrows */}
      {totalPages > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 glass hover:bg-primary/20"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 glass hover:bg-primary/20"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
