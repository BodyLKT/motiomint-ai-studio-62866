import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const CARDS_PER_PAGE = 6;
  const AUTO_PLAY_INTERVAL = 7000;
  const totalPages = Math.ceil(animations.length / CARDS_PER_PAGE);

  useEffect(() => {
    fetchAnimations();
  }, []);

  // Shuffle animations array
  const shuffleArray = useCallback((array: Animation[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (isLoading || isPaused || totalPages <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentPage((prev) => {
        const nextPage = (prev + 1) % totalPages;
        // Shuffle when looping back to start
        if (nextPage === 0) {
          setAnimations((current) => shuffleArray(current));
        }
        return nextPage;
      });
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isLoading, isPaused, totalPages, shuffleArray]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
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
    navigate(`/animation/${animationId}`);
  };

  const goToPrevious = useCallback(() => {
    setIsPaused(true);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setTimeout(() => setIsPaused(false), 3000);
  }, [totalPages]);

  const goToNext = useCallback(() => {
    setIsPaused(true);
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setTimeout(() => setIsPaused(false), 3000);
  }, [totalPages]);

  const goToPage = useCallback((page: number) => {
    setIsPaused(true);
    setCurrentPage(page);
    setTimeout(() => setIsPaused(false), 3000);
  }, []);

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
    <div 
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grid Container with fade transition */}
      <div 
        key={currentPage}
        className="grid grid-cols-3 gap-4 lg:gap-6 w-full animate-fade-in"
      >
        {currentAnimations.map((animation) => (
          <Card
            key={animation.id}
            className="group relative overflow-hidden rounded-xl cursor-pointer glass border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl aspect-[3/4]"
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
            onMouseEnter={handleMouseEnter}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 glass hover:bg-primary/20 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            onMouseEnter={handleMouseEnter}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 glass hover:bg-primary/20 transition-all"
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
              onClick={() => goToPage(index)}
              onMouseEnter={handleMouseEnter}
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
