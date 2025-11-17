import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRandomAnimations();
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplayActive || animations.length === 0) return;

    const autoplayInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animations.length);
    }, 4000);

    return () => clearInterval(autoplayInterval);
  }, [isAutoplayActive, animations.length]);

  // Pause autoplay on user interaction
  const handleUserInteraction = useCallback(() => {
    setIsAutoplayActive(false);
    setTimeout(() => setIsAutoplayActive(true), 10000);
  }, []);

  const fetchRandomAnimations = async () => {
    try {
      const { data, error } = await supabase
        .from('animations')
        .select('id, title, thumbnail_url, file_url, category')
        .limit(12);

      if (error) throw error;

      if (data) {
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
    if (isDragging) return;
    handleUserInteraction();
    navigate(`/animation/${id}`);
  };

  const goToPrevious = () => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev - 1 + animations.length) % animations.length);
  };

  const goToNext = () => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev + 1) % animations.length);
  };

  // Drag/Swipe handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    handleUserInteraction();
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    setDragOffset(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    if (carouselRef.current) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [animations.length]);

  // Calculate position and styling for each card
  const getCardStyle = (index: number) => {
    const position = index - currentIndex;
    const absPosition = Math.abs(position);
    
    // Only show cards within range of -2 to 2
    if (absPosition > 2) {
      return {
        opacity: 0,
        transform: 'translateX(0) scale(0.5) rotateY(0deg)',
        zIndex: 0,
        pointerEvents: 'none' as const,
      };
    }

    let translateX = position * 280; // Base spacing
    let scale = 1;
    let opacity = 1;
    let rotateY = 0;
    let zIndex = 10;
    let blur = 0;

    if (position === 0) {
      // Center card
      scale = 1;
      opacity = 1;
      zIndex = 30;
      translateX += dragOffset * 0.3;
    } else if (absPosition === 1) {
      // Adjacent cards
      scale = 0.85;
      opacity = 0.7;
      rotateY = position > 0 ? -15 : 15;
      zIndex = 20;
      translateX += dragOffset * 0.2;
      blur = 1;
    } else if (absPosition === 2) {
      // Far cards
      scale = 0.7;
      opacity = 0.4;
      rotateY = position > 0 ? -25 : 25;
      zIndex = 10;
      translateX += dragOffset * 0.1;
      blur = 2;
    }

    return {
      opacity,
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg) translateZ(0)`,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      pointerEvents: position === 0 ? ('auto' as const) : ('none' as const),
    };
  };

  if (animations.length === 0) {
    return (
      <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center">
        <div className="text-muted-foreground">Loading animations...</div>
      </div>
    );
  }

  return (
    <div 
      ref={carouselRef}
      className="relative w-full h-full min-h-[500px] lg:min-h-[600px] border-2 border-dashed border-yellow-500"
      onMouseEnter={handleUserInteraction}
      tabIndex={0}
      role="region"
      aria-label="3D Animation Carousel"
      style={{ outline: '2px dashed yellow' }}
    >
      {/* Carousel Container - BLUE: Centers Red */}
      <div 
        className="w-full h-full flex items-center justify-center border-2 border-dashed border-blue-500"
        style={{ 
          perspective: '1200px',
          perspectiveOrigin: 'center center',
          outline: '2px dashed blue',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Cards Container - RED: Hugs cards, centered by Blue */}
        <div className="relative flex items-center justify-center border-2 border-dashed border-red-500" style={{ outline: '2px dashed red' }}>
          {/* Card positioning wrapper */}
          <div className="relative flex items-center justify-center">
            {animations.map((animation, index) => {
            const style = getCardStyle(index);
            const isCenter = index === currentIndex;
            
            return (
              <Card 
                key={animation.id}
                className={`group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] lg:w-[320px] h-[460px] lg:h-[560px] overflow-hidden rounded-2xl cursor-pointer glass border-primary/30 transition-all duration-700 ease-out ${
                  isCenter ? 'glow-primary border-2 border-dashed border-green-500' : 'border-2 border-dashed border-purple-500'
                }`}
                onClick={() => handleAnimationClick(animation.id)}
                style={{
                  ...style,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  {/* Video Preview */}
                  <video
                    src={animation.video_url}
                    poster={animation.thumbnail_url}
                    className="w-full h-full object-cover transition-transform duration-700"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => isCenter && e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white border-0 shadow-lg text-xs">
                    {animation.category}
                  </Badge>
                  
                  {/* Play Icon Overlay - only visible on center card */}
                  {isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                        <Play className="w-7 h-7 text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                  
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-base line-clamp-2 drop-shadow-lg">
                      {animation.title}
                    </h3>
                  </div>

                  {/* Glow Effect */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                </div>
              </Card>
            );
          })}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <Button
        variant="outline"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 h-10 w-10 md:h-12 md:w-12 rounded-full bg-background/90 backdrop-blur-sm border-primary/30 hover:bg-primary/20 hover:border-primary shadow-lg transition-all hover:scale-110 border-4 border-dashed border-orange-500"
        aria-label="Previous animation"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={goToNext}
        className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 h-10 w-10 md:h-12 md:w-12 rounded-full bg-background/90 backdrop-blur-sm border-primary/30 hover:bg-primary/20 hover:border-primary shadow-lg transition-all hover:scale-110 border-4 border-dashed border-orange-500"
        aria-label="Next animation"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2 border-2 border-dashed border-pink-500 p-2" style={{ outline: '2px dashed pink' }}>
        {animations.slice(0, 8).map((_, index) => (
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
            aria-label={`Go to animation ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
