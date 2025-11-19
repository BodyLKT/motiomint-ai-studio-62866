import { useRef, useState, useEffect } from 'react';

interface VideoPreviewProps {
  thumbnailUrl: string;
  videoUrl?: string;
  alt: string;
  className?: string;
}

export default function VideoPreview({
  thumbnailUrl,
  videoUrl,
  alt,
  className = '',
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const touchTimerRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Lazy load video when in viewport
  useEffect(() => {
    if (!videoUrl || !containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && !isVideoLoaded) {
            // Load video source when visible
            videoRef.current.load();
            setIsVideoLoaded(true);
          }
        });
      },
      { rootMargin: '50px' }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [videoUrl, isVideoLoaded]);

  // Handle hover for desktop
  const handleMouseEnter = () => {
    if (!videoUrl || hasError) return;
    setIsHovered(true);
    setShowVideo(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowVideo(false);
    setIsTouched(false);
  };

  // Handle touch for mobile/tablet
  const handleTouchStart = () => {
    if (!videoUrl || hasError) return;
    
    // Long press detection
    touchTimerRef.current = setTimeout(() => {
      setIsTouched(true);
      setShowVideo(true);
    }, 300);
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }
    
    if (isTouched) {
      setIsTouched(false);
      setShowVideo(false);
    }
  };

  // Handle tap to toggle
  const handleClick = (e: React.MouseEvent) => {
    if (!videoUrl || hasError) return;
    
    if ('ontouchstart' in window) {
      e.preventDefault();
      setIsTouched(!isTouched);
      setShowVideo(!showVideo);
    }
  };

  // Play/pause video based on state
  useEffect(() => {
    if (!videoRef.current || !isVideoLoaded) return;

    if (showVideo) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Video play failed:', error);
          // Autoplay might be blocked, that's okay
        });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [showVideo, isVideoLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {/* Thumbnail image */}
      <img
        src={thumbnailUrl}
        alt={alt}
        className={`object-cover w-full h-full transition-opacity duration-300 ${
          showVideo && videoUrl ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Video element */}
      {videoUrl && !hasError && (
        <video
          ref={videoRef}
          src={videoUrl}
          loop
          muted
          playsInline
          preload="none"
          onError={() => setHasError(true)}
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ${
            showVideo && isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Watermark */}
      <div className="absolute bottom-2 right-2 text-xs font-semibold text-white/70 bg-black/40 px-2 py-1 rounded pointer-events-none backdrop-blur-sm">
        motiomint
      </div>
    </div>
  );
}
