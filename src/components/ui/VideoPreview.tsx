import { useRef, useState, useEffect, useCallback } from 'react';

interface VideoPreviewProps {
  thumbnailUrl: string;
  videoUrl?: string;
  alt: string;
  className?: string;
}

// Track currently playing video - only allow ONE at a time for performance
let currentlyPlayingVideo: HTMLVideoElement | null = null;

function pauseCurrentVideo() {
  if (currentlyPlayingVideo) {
    currentlyPlayingVideo.pause();
    currentlyPlayingVideo.currentTime = 0;
    currentlyPlayingVideo = null;
  }
}

// Check if URL is a real video file (not a placeholder)
function isRealVideoUrl(url?: string): boolean {
  if (!url) return false;
  
  // Exclude placeholder URLs
  if (url.includes('placehold.co') || url.includes('placeholder')) return false;
  
  // Check for valid video extensions or paths
  return (
    url.endsWith('.mp4') ||
    url.endsWith('.webm') ||
    url.endsWith('.mov') ||
    url.includes('/animations/')
  );
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
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  // Check if the videoUrl is actually a real video file
  const isValidVideoUrl = isRealVideoUrl(videoUrl);

  // Lazy load video when in viewport
  useEffect(() => {
    if (!isValidVideoUrl || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
          
          // Preload video metadata when entering viewport for smoother hover experience
          if (entry.isIntersecting && videoRef.current && !videoRef.current.src) {
            videoRef.current.src = videoUrl!;
            videoRef.current.load();
          }
          
          // Pause if leaving viewport
          if (!entry.isIntersecting && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            if (currentlyPlayingVideo === videoRef.current) {
              currentlyPlayingVideo = null;
            }
          }
        });
      },
      { rootMargin: '50px', threshold: 0 }
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

  // Play video - pause any currently playing video first
  const playVideo = useCallback(() => {
    if (!videoRef.current || !isVideoReady || hasError) return;
    
    // Pause currently playing video if different
    if (currentlyPlayingVideo && currentlyPlayingVideo !== videoRef.current) {
      pauseCurrentVideo();
    }
    
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          currentlyPlayingVideo = videoRef.current;
        })
        .catch((error) => {
          // Autoplay might be blocked, that's okay
          console.warn('Video play failed:', error);
        });
    }
  }, [isVideoReady, hasError]);

  // Pause video and reset
  const pauseVideo = useCallback(() => {
    if (!videoRef.current) return;
    
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    
    if (currentlyPlayingVideo === videoRef.current) {
      currentlyPlayingVideo = null;
    }
  }, []);

  // Desktop hover handlers
  const handleMouseEnter = useCallback(() => {
    if (!isValidVideoUrl || hasError) return;
    setIsHovered(true);
  }, [isValidVideoUrl, hasError]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Control video playback based on hover state
  useEffect(() => {
    if (isHovered && isInViewport && isVideoReady) {
      playVideo();
    } else if (!isHovered) {
      pauseVideo();
    }
  }, [isHovered, isInViewport, isVideoReady, playVideo, pauseVideo]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && currentlyPlayingVideo === videoRef.current) {
        currentlyPlayingVideo = null;
      }
    };
  }, []);

  const showVideo = isHovered && isVideoReady && !hasError;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail image - always visible as poster */}
      <img
        src={thumbnailUrl}
        alt={alt}
        className={`object-cover w-full h-full transition-opacity duration-200 ${
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
          preload="metadata"
          poster={thumbnailUrl}
          onLoadedData={handleVideoLoaded}
          onCanPlayThrough={handleVideoLoaded}
          onError={handleVideoError}
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-200 ${
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
