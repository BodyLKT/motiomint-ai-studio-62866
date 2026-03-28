import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import VideoPreview from '@/components/ui/VideoPreview';

interface Animation {
  id: string;
  title: string;
  thumbnail_url: string;
  file_url: string;
  category: string;
}

// Memoized card component to prevent re-renders during transitions
const HeroCarouselCard = memo(function HeroCarouselCard({ 
  animation, 
  onClick 
}: { 
  animation: Animation; 
  onClick: (id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden rounded-xl cursor-pointer glass border-primary/20 hover:border-primary/40 transition-[border-color,box-shadow] duration-300 hover:shadow-2xl aspect-[3/4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{ transform: 'translateZ(0)' }}
      onClick={() => onClick(animation.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(animation.id); }}
      role="link"
    >
      <div className="absolute inset-0">
        <VideoPreview
          thumbnailUrl={animation.thumbnail_url}
          videoUrl={animation.file_url}
          alt={animation.title}
          isHovering={isHovered}
          className="w-full h-full"
          hideOverlay
          mobileAutoplay
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-opacity pointer-events-none" />
      </div>


      <div
        className={`absolute bottom-3 left-3 z-10 max-w-[70%] transition-all duration-200 ease-out pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <div className="bg-background/30 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.15)]">
          <p className="text-sm font-semibold text-foreground line-clamp-2">
            {animation.title}
          </p>
        </div>
      </div>
    </Card>
  );
});

const CARDS_PER_PAGE = 6;
const AUTO_PLAY_INTERVAL = 7000;
const TRANSITION_MS = 400;

/**
 * Selects a category-balanced random set of animations.
 * Rounds-robin through shuffled category buckets so no single category dominates.
 */
function selectBalanced(all: Animation[], count: number): Animation[] {
  // Group by category
  const buckets: Record<string, Animation[]> = {};
  for (const a of all) {
    (buckets[a.category] ??= []).push(a);
  }

  // Shuffle each bucket
  for (const key of Object.keys(buckets)) {
    shuffleInPlace(buckets[key]);
  }

  const categoryKeys = Object.keys(buckets);
  shuffleInPlace(categoryKeys);

  const result: Animation[] = [];
  const usedIds = new Set<string>();
  let idx = 0;

  while (result.length < count && idx < all.length) {
    for (const key of categoryKeys) {
      if (result.length >= count) break;
      const bucket = buckets[key];
      const item = bucket.find(a => !usedIds.has(a.id));
      if (item) {
        result.push(item);
        usedIds.add(item.id);
      }
    }
    idx += categoryKeys.length;
  }

  // Final shuffle so categories aren't visually grouped
  shuffleInPlace(result);
  return result;
}

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const HeroCarouselGrid = () => {
  const [allAnimations, setAllAnimations] = useState<Animation[]>([]);
  const [pages, setPages] = useState<Animation[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [visiblePage, setVisiblePage] = useState(0);
  const navigate = useNavigate();
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalPages = pages.length;

  // Fetch all animations once
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('animations')
          .select('id, title, thumbnail_url, file_url, category');
        if (error) throw error;
        if (data) setAllAnimations(data);
      } catch (e) {
        console.error('Error fetching animations:', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Build pages from balanced selection whenever allAnimations changes
  useEffect(() => {
    if (allAnimations.length === 0) return;
    const totalCards = Math.min(allAnimations.length, 18);
    const selected = selectBalanced(allAnimations, totalCards);
    const newPages: Animation[][] = [];
    for (let i = 0; i < selected.length; i += CARDS_PER_PAGE) {
      newPages.push(selected.slice(i, i + CARDS_PER_PAGE));
    }
    setPages(newPages);
    setCurrentPage(0);
    setVisiblePage(0);
  }, [allAnimations]);

  // Smooth page transition: fade out → swap → fade in
  const goToPage = useCallback((nextPage: number) => {
    if (transitioning || nextPage === visiblePage) return;
    setCurrentPage(nextPage); // Update dot immediately
    setTransitioning(true);
    // After fade-out completes, swap content and fade back in
    setTimeout(() => {
      setVisiblePage(nextPage);
      requestAnimationFrame(() => {
        setTransitioning(false);
      });
    }, TRANSITION_MS);
  }, [transitioning, visiblePage]);

  // Reshuffle and rebuild pages for loop
  const reshufflePages = useCallback(() => {
    if (allAnimations.length === 0) return;
    const totalCards = Math.min(allAnimations.length, 18);
    const selected = selectBalanced(allAnimations, totalCards);
    const newPages: Animation[][] = [];
    for (let i = 0; i < selected.length; i += CARDS_PER_PAGE) {
      newPages.push(selected.slice(i, i + CARDS_PER_PAGE));
    }
    setPages(newPages);
  }, [allAnimations]);

  // Auto-play
  const currentPageRef = useRef(currentPage);
  currentPageRef.current = currentPage;

  useEffect(() => {
    if (isLoading || isPaused || totalPages <= 1) return;

    autoPlayRef.current = setInterval(() => {
      const next = (currentPageRef.current + 1) % totalPages;
      if (next === 0) reshufflePages();
      goToPage(next);
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isLoading, isPaused, totalPages, goToPage, reshufflePages]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  const handleCardClick = useCallback((id: string) => {
    navigate(`/animation/${id}`);
  }, [navigate]);

  const goPrev = useCallback(() => {
    setIsPaused(true);
    const prev = (currentPage - 1 + totalPages) % totalPages;
    goToPage(prev);
    setTimeout(() => setIsPaused(false), 3000);
  }, [currentPage, totalPages, goToPage]);

  const goNext = useCallback(() => {
    setIsPaused(true);
    const next = (currentPage + 1) % totalPages;
    goToPage(next);
    setTimeout(() => setIsPaused(false), 3000);
  }, [currentPage, totalPages, goToPage]);

  const handleDotClick = useCallback((page: number) => {
    setIsPaused(true);
    goToPage(page);
    setTimeout(() => setIsPaused(false), 3000);
  }, [goToPage]);

  const currentAnimations = pages[visiblePage] || [];

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
      {/* Grid with GPU-accelerated crossfade */}
      <div 
        className="grid grid-cols-3 gap-4 lg:gap-6 w-full will-change-[opacity,transform]"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'scale(0.98) translateY(4px)' : 'scale(1) translateY(0)',
          transition: `opacity ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        {currentAnimations.map((animation) => (
          <HeroCarouselCard 
            key={animation.id} 
            animation={animation} 
            onClick={handleCardClick} 
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {totalPages > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goPrev}
            onMouseEnter={handleMouseEnter}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 glass hover:bg-primary/20 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goNext}
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
              onClick={() => handleDotClick(index)}
              onMouseEnter={handleMouseEnter}
              className={`relative flex items-center justify-center min-w-[24px] min-h-[24px] rounded-full transition-all duration-300`}
              aria-label={`Go to page ${index + 1}`}
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2'
              }`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
