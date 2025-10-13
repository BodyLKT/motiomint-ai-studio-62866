import { useRef, useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface VideoPreviewProps {
  thumbnailUrl: string;
  videoUrl?: string;
  alt: string;
  className?: string;
  showPlayIcon?: boolean;
}

export default function VideoPreview({
  thumbnailUrl,
  videoUrl,
  alt,
  className = '',
  showPlayIcon = true,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const touchTimerRef = useRef<NodeJS.Timeout>();

  // Handle hover for desktop
  const handleMouseEnter = () => {
    if (!videoUrl) return;
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
    if (!videoUrl) return;
    
    // Long press detection
    touchTimerRef.current = setTimeout(() => {
      setIsTouched(true);
      setShowVideo(true);
    }, 300); // 300ms for long press
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }
    
    // If was touched, toggle video
    if (isTouched) {
      setIsTouched(false);
      setShowVideo(false);
    }
  };

  // Handle tap to toggle
  const handleClick = (e: React.MouseEvent) => {
    if (!videoUrl) return;
    
    // Only handle on touch devices
    if ('ontouchstart' in window) {
      e.preventDefault();
      setIsTouched(!isTouched);
      setShowVideo(!showVideo);
    }
  };

  // Play/pause video based on state
  useEffect(() => {
    if (!videoRef.current) return;

    if (showVideo) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, which is fine
      });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [showVideo]);

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
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          loop
          muted
          playsInline
          preload="metadata"
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ${
            showVideo ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Play icon overlay (only show when not playing) */}
      {showPlayIcon && videoUrl && !showVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-white/90 rounded-full p-3">
            <Play className="h-6 w-6 text-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}
