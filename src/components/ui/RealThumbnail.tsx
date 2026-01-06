/**
 * RealThumbnail component
 * Displays ONLY real extracted frame thumbnails or a neutral fallback
 * NEVER shows AI-generated or placeholder images
 */

import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface RealThumbnailProps {
  /** URL to the real extracted frame thumbnail */
  thumbnailUrl?: string | null;
  /** Fallback to legacy thumbnail_url if new system not ready */
  legacyThumbnailUrl?: string;
  /** Thumbnail extraction status */
  thumbStatus?: string | null;
  /** Thumbnail source verification */
  thumbSource?: string | null;
  /** Animation title for fallback display */
  title: string;
  /** Additional CSS classes */
  className?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Debug mode - show thumbnail source info */
  debug?: boolean;
}

/**
 * Check if a URL is a placeholder (not real)
 */
function isPlaceholderUrl(url?: string | null): boolean {
  if (!url) return true;
  return url.includes('placehold.co') || url.includes('placeholder');
}

export default function RealThumbnail({
  thumbnailUrl,
  legacyThumbnailUrl,
  thumbStatus,
  thumbSource,
  title,
  className = '',
  alt,
  debug = false
}: RealThumbnailProps) {
  const [hasError, setHasError] = useState(false);

  // Determine if we have a valid real thumbnail
  const isRealThumbnail = 
    thumbSource === 'extracted_frame' && 
    thumbStatus === 'ready' && 
    thumbnailUrl && 
    !isPlaceholderUrl(thumbnailUrl);

  // Check if legacy thumbnail is usable (real file, not placeholder)
  const hasUsableLegacy = 
    legacyThumbnailUrl && 
    !isPlaceholderUrl(legacyThumbnailUrl) &&
    (legacyThumbnailUrl.startsWith('/thumbnails/') || legacyThumbnailUrl.includes('supabase'));

  // Decide what to show
  const showRealThumbnail = isRealThumbnail && !hasError;
  const showLegacyThumbnail = !showRealThumbnail && hasUsableLegacy && !hasError;
  const showFallback = !showRealThumbnail && !showLegacyThumbnail;

  const imageUrl = showRealThumbnail 
    ? thumbnailUrl 
    : showLegacyThumbnail 
      ? legacyThumbnailUrl 
      : null;

  return (
    <div className={`relative bg-muted ${className}`}>
      {imageUrl && !hasError ? (
        <img
          src={imageUrl}
          alt={alt || title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : (
        // Neutral fallback - solid color with title
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10 p-4">
          <ImageOff className="h-8 w-8 text-muted-foreground/50 mb-2" />
          <span className="text-xs text-muted-foreground text-center line-clamp-2 font-medium">
            {title}
          </span>
          <span className="text-[10px] text-muted-foreground/70 mt-1">
            Thumbnail pending
          </span>
        </div>
      )}

      {/* Debug overlay - only in development */}
      {debug && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[9px] text-white p-1 font-mono">
          <div>Source: {thumbSource || 'none'}</div>
          <div>Status: {thumbStatus || 'none'}</div>
          <div>Type: {showRealThumbnail ? 'REAL' : showLegacyThumbnail ? 'LEGACY' : 'FALLBACK'}</div>
        </div>
      )}
    </div>
  );
}
