import { useRef, useState, useEffect, useCallback } from 'react';

interface VideoPreviewProps {
  thumbnailUrl: string;
  videoUrl?: string;
  alt: string;
  className?: string;
}

// Track currently playing videos to limit concurrent playback
const playingVideos = new Set<HTMLVideoElement>();
const MAX_CONCURRENT_VIDEOS = 2;

function pauseOldestVideo() {
  if (playingVideos.size >= MAX_CONCURRENT_VIDEOS) {
    const oldest = playingVideos.values().next().value;
    if (oldest) {
      oldest.pause();
      playingVideos.delete(oldest);
    }
  }
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
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const touchTimerRef = useRef<NodeJS.Timeout>();

  // Check if the videoUrl is actually a video file (not an image)
  const isValidVideoUrl = videoUrl && 
    (videoUrl.endsWith('.mp4') || 
     videoUrl.endsWith('.webm') || 
     videoUrl.endsWith('.mov') ||
     videoUrl.includes('/animations/'));

  // Lazy load video when in viewport
  useEffect(() => {
    if (!isValidVideoUrl || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
          
          // Load video source when entering viewport
          if (entry.isIntersecting && videoRef.current && !videoRef.current.src) {
            videoRef.current.src = videoUrl!;
            videoRef.current.load();
          }
        });
      },
      { rootMargin: '100px', threshold: 0 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isValidVideoUrl, videoUrl]);

  // Handle video loaded
  const handleVideoLoaded = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  // Handle video error
  const handleVideoError = useCallback(() => {
    setHasError(true);
    setIsVideoReady(false);
  }, []);

  // Play video
  const playVideo = useCallback(() => {
    if (!videoRef.current || !isVideoReady || hasError) return;
    
    pauseOldestVideo();
    
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          playingVideos.add(videoRef.current!);
        })
        .catch((error) => {
          // Autoplay might be blocked, that's okay
          console.warn('Video play failed:', error);
        });
    }
  }, [isVideoReady, hasError]);

  // Pause video
  const pauseVideo = useCallback(() => {
    if (!videoRef.current) return;
    
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    playingVideos.delete(videoRef.current);
  }, []);

  // Desktop hover handlers
  const handleMouseEnter = useCallback(() => {
    if (!isValidVideoUrl || hasError) return;
    setIsHovered(true);
  }, [isValidVideoUrl, hasError]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsTouched(false);
  }, []);

  // Mobile touch handlers
  const handleTouchStart = useCallback(() => {
    if (!isValidVideoUrl || hasError) return;
    
    // Long press detection for preview
    touchTimerRef.current = setTimeout(() => {
      setIsTouched(true);
    }, 200);
  }, [isValidVideoUrl, hasError]);

  const handleTouchEnd = useCallback(() => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }
  }, []);

  // Tap to toggle on mobile
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!isValidVideoUrl || hasError) return;
    
    // Only handle tap-to-play on touch devices
    if ('ontouchstart' in window) {
      e.stopPropagation();
      setIsTouched(prev => !prev);
    }
  }, [isValidVideoUrl, hasError]);

  // Control video playback based on state
  useEffect(() => {
    const shouldPlay = (isHovered || isTouched) && isInViewport;
    
    if (shouldPlay && isVideoReady) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [isHovered, isTouched, isInViewport, isVideoReady, playVideo, pauseVideo]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
      }
      if (videoRef.current) {
        playingVideos.delete(videoRef.current);
      }
    };
  }, []);

  const showVideo = (isHovered || isTouched) && isVideoReady && !hasError;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Thumbnail image - always visible as poster */}
      <img
        src={thumbnailUrl}
        alt={alt}
        className={`object-cover w-full h-full transition-opacity duration-300 ${
          showVideo ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
      />

      {/* Video element - only render if we have a valid video URL */}
      {isValidVideoUrl && !hasError && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          poster={thumbnailUrl}
          onLoadedData={handleVideoLoaded}
          onCanPlayThrough={handleVideoLoaded}
          onError={handleVideoError}
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ${
            showVideo ? 'opacity-100' : 'opacity-0'
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
