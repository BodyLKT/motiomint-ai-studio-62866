import { useRef, useState, useEffect, useCallback } from 'react';
import { Eye, ImageOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface DetailMediaPreviewProps {
  thumbnailUrl: string;
  videoUrl: string;
  title: string;
  format?: string;
  resolution?: string;
  onClickPlay: () => void;
  // New thumbnail system fields
  thumbPosterUrl?: string | null;
  thumbStatus?: string | null;
  thumbSource?: string | null;
}

// Check if URL is a real video file (not a placeholder)
function isRealVideoUrl(url?: string): boolean {
  if (!url) return false;
  
  // Exclude placeholder URLs
  if (url.includes('placehold.co') || url.includes('placeholder')) return false;
  
  // Check for valid video extensions
  const hasVideoExtension = 
    url.endsWith('.mp4') ||
    url.endsWith('.webm') ||
    url.endsWith('.mov');
  
  return hasVideoExtension;
}

// Check if a URL is a placeholder (not real)
function isPlaceholderUrl(url?: string | null): boolean {
  if (!url) return true;
  return url.includes('placehold.co') || url.includes('placeholder');
}

export default function DetailMediaPreview({
  thumbnailUrl,
  videoUrl,
  title,
  format,
  resolution,
  onClickPlay,
  thumbPosterUrl,
  thumbStatus,
  thumbSource,
}: DetailMediaPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isValidVideoUrl = isRealVideoUrl(videoUrl);

  // Determine which thumbnail to use (prefer new extracted frame)
  const hasRealThumbnail = 
    thumbSource === 'extracted_frame' && 
    thumbStatus === 'ready' && 
    thumbPosterUrl && 
    !isPlaceholderUrl(thumbPosterUrl);
  
  // Check if legacy thumbnail is usable
  const hasUsableLegacy = 
    thumbnailUrl && 
    !isPlaceholderUrl(thumbnailUrl) &&
    (thumbnailUrl.startsWith('/thumbnails/') || thumbnailUrl.includes('supabase'));

  const effectiveThumbnailUrl = hasRealThumbnail 
    ? thumbPosterUrl 
    : hasUsableLegacy 
      ? thumbnailUrl 
      : null;

  const showFallback = !effectiveThumbnailUrl || imageError;

  // Preload video on mount
  useEffect(() => {
    if (isValidVideoUrl && videoRef.current) {
      videoRef.current.src = videoUrl;
      videoRef.current.load();
    }
  }, [videoUrl, isValidVideoUrl]);

  const handleVideoLoaded = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setHasError(true);
    setIsVideoReady(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isValidVideoUrl || hasError) return;
    setIsHovered(true);
  }, [isValidVideoUrl, hasError]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Control video playback based on hover state
  useEffect(() => {
    if (!videoRef.current) return;

    if (isHovered && isVideoReady) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Video play failed:', error);
        });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, isVideoReady]);

  const showVideo = isHovered && isVideoReady && !hasError;

  return (
    <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 group">
      <div 
        className="relative aspect-video bg-muted cursor-pointer"
        onClick={onClickPlay}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail or fallback */}
        {showFallback ? (
          // Neutral fallback - solid color with title
          <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10 transition-opacity duration-200 ${
            showVideo ? 'opacity-0' : 'opacity-100'
          }`}>
            <ImageOff className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <span className="text-sm text-muted-foreground text-center font-medium px-4">
              {title}
            </span>
            <span className="text-xs text-muted-foreground/70 mt-2">
              Thumbnail pending extraction
            </span>
          </div>
        ) : (
          <img
            src={effectiveThumbnailUrl!}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-200 ${
              showVideo ? 'opacity-0' : 'opacity-100'
            }`}
            onError={() => setImageError(true)}
          />
        )}

        {/* Video element - plays on hover */}
        {isValidVideoUrl && !hasError && (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            poster={effectiveThumbnailUrl || undefined}
            onLoadedData={handleVideoLoaded}
            onCanPlayThrough={handleVideoLoaded}
            onError={handleVideoError}
            className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-200 ${
              showVideo ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Hover overlay with play button */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-primary/90 rounded-full p-4">
            <Eye className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          {format && (
            <Badge className="bg-background/90 backdrop-blur-sm text-foreground">
              {format}
            </Badge>
          )}
          {resolution && (
            <Badge className="bg-background/90 backdrop-blur-sm text-foreground">
              {resolution}
            </Badge>
          )}
        </div>

        {/* Watermark */}
        <div className="absolute bottom-2 right-2 text-xs font-semibold text-white/70 bg-black/40 px-2 py-1 rounded pointer-events-none backdrop-blur-sm">
          motiomint
        </div>

        {/* Debug info - only visible in dev */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-4 left-4 text-[9px] bg-black/80 text-white p-1 rounded font-mono">
            <div>Source: {thumbSource || 'legacy'}</div>
            <div>Status: {thumbStatus || 'n/a'}</div>
          </div>
        )}
      </div>
    </Card>
  );
}
