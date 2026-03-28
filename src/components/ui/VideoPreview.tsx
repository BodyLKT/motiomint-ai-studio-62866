import { useRef, useState, useEffect, useCallback } from 'react';
import RealThumbnail from './RealThumbnail';
import { VideoOverlayIcon } from './VideoOverlayIcon';

interface VideoPreviewProps {
  thumbnailUrl: string;
  videoUrl?: string;
  alt: string;
  className?: string;
  /** External hover control - when provided, overrides internal hover detection */
  isHovering?: boolean;
  /** New thumbnail system fields */
  thumbCardUrl?: string | null;
  thumbStatus?: string | null;
  thumbSource?: string | null;
  /** Debug mode - show thumbnail source info */
  debug?: boolean;
  /** Hide the play/expand overlay icon */
  hideOverlay?: boolean;
  /** Enable mobile autoplay when card is in view (uses IntersectionObserver) */
  mobileAutoplay?: boolean;
}

// Track currently playing video - only allow ONE at a time for performance
let currentlyPlayingVideo: HTMLVideoElement | null = null;

function pauseCurrentVideo() {
  if (currentlyPlayingVideo) {
    try {
      currentlyPlayingVideo.pause();
      currentlyPlayingVideo.currentTime = 0;
    } catch (_) {
      // ignore if element was removed
    }
    currentlyPlayingVideo = null;
  }
}

// Check if URL is a real video file (not a placeholder)
function isRealVideoUrl(url?: string): boolean {
  if (!url) return false;
  if (url.includes('placehold.co') || url.includes('placeholder')) return false;
  return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov');
}

export default function VideoPreview({
  thumbnailUrl,
  videoUrl,
  alt,
  className = '',
  isHovering: externalHover,
  thumbCardUrl,
  thumbStatus,
  thumbSource,
  debug = false,
  hideOverlay = false,
  mobileAutoplay = false,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalHover, setInternalHover] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [mobileInView, setMobileInView] = useState(false);
  const [videoSrcSet, setVideoSrcSet] = useState(false);
  const mobileDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect touch device once
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // Use external hover if provided, otherwise use internal
  const isHovered = externalHover !== undefined ? externalHover : internalHover;

  // On mobile with autoplay, treat "in view" as hovered
  const shouldPlay = isTouchDevice && mobileAutoplay ? mobileInView : isHovered;

  const isValidVideoUrl = isRealVideoUrl(videoUrl);

  // Determine which thumbnail URL to use (prefer new system)
  const effectiveThumbnailUrl =
    (thumbStatus === 'ready' && thumbSource === 'extracted_frame' && thumbCardUrl)
      ? thumbCardUrl
      : thumbnailUrl;

  // Set video src eagerly when in viewport — separated from observer to avoid race
  useEffect(() => {
    if (!isValidVideoUrl || !videoUrl || videoSrcSet || hasError) return;
    if (!isInViewport) return;
    const video = videoRef.current;
    if (!video) return;

    // Only set src once
    video.src = videoUrl;
    video.load();
    setVideoSrcSet(true);
  }, [isValidVideoUrl, videoUrl, isInViewport, videoSrcSet, hasError]);

  // Viewport observer — only tracks visibility, does NOT touch the video element
  useEffect(() => {
    if (!isValidVideoUrl || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsInViewport(entry.isIntersecting);

          // When leaving viewport, pause immediately
          if (!entry.isIntersecting && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            if (currentlyPlayingVideo === videoRef.current) {
              currentlyPlayingVideo = null;
            }
          }
        }
      },
      { rootMargin: '100px', threshold: 0 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isValidVideoUrl]);

  // Mobile autoplay: observe with high threshold to find "most centered" card
  useEffect(() => {
    if (!mobileAutoplay || !isTouchDevice || !isValidVideoUrl || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (mobileDebounceRef.current) clearTimeout(mobileDebounceRef.current);
          mobileDebounceRef.current = setTimeout(() => {
            setMobileInView(entry.isIntersecting && entry.intersectionRatio >= 0.6);
          }, 150);
        }
      },
      { threshold: [0, 0.3, 0.6, 0.8, 1.0] }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (mobileDebounceRef.current) clearTimeout(mobileDebounceRef.current);
    };
  }, [mobileAutoplay, isTouchDevice, isValidVideoUrl]);

  const handleVideoLoaded = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setHasError(true);
    setIsVideoReady(false);
  }, []);

  // Play video
  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isVideoReady || hasError) return;

    if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
      pauseCurrentVideo();
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          currentlyPlayingVideo = video;
        })
        .catch(() => {
          // Autoplay blocked — ok
        });
    }
  }, [isVideoReady, hasError]);

  // Pause video
  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    if (currentlyPlayingVideo === video) {
      currentlyPlayingVideo = null;
    }
  }, []);

  // Desktop hover handlers
  const handleMouseEnter = useCallback(() => {
    if (externalHover !== undefined) return;
    if (!isValidVideoUrl || hasError) return;
    setInternalHover(true);
  }, [externalHover, isValidVideoUrl, hasError]);

  const handleMouseLeave = useCallback(() => {
    if (externalHover !== undefined) return;
    setInternalHover(false);
  }, [externalHover]);

  // Control playback
  useEffect(() => {
    if (shouldPlay && isInViewport && isVideoReady) {
      playVideo();
    } else if (!shouldPlay) {
      pauseVideo();
    }
  }, [shouldPlay, isInViewport, isVideoReady, playVideo, pauseVideo]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (videoRef.current && currentlyPlayingVideo === videoRef.current) {
        currentlyPlayingVideo = null;
      }
    };
  }, []);

  const showVideo = shouldPlay && isVideoReady && !hasError;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail */}
      <RealThumbnail
        thumbnailUrl={thumbCardUrl}
        legacyThumbnailUrl={thumbnailUrl}
        thumbStatus={thumbStatus}
        thumbSource={thumbSource}
        title={alt}
        className={`w-full h-full transition-opacity duration-200 ${
          showVideo ? 'opacity-0' : 'opacity-100'
        }`}
        debug={debug}
      />

      {/* Video element */}
      {isValidVideoUrl && !hasError && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          poster={effectiveThumbnailUrl}
          onLoadedData={handleVideoLoaded}
          onCanPlayThrough={handleVideoLoaded}
          onError={handleVideoError}
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-200 ${
            showVideo ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Overlay icon */}
      {!hideOverlay && <VideoOverlayIcon isHovered={isHovered} size="sm" />}

      {/* Watermark */}
      <div className="absolute bottom-2 right-2 text-xs font-semibold text-white/70 bg-black/40 px-2 py-1 rounded pointer-events-none backdrop-blur-sm">
        motiomint
      </div>

      {/* Debug overlay */}
      {debug && (
        <div className="absolute top-0 left-0 right-0 bg-black/80 text-[9px] text-white p-1 font-mono z-20">
          <div>Source: {thumbSource || 'legacy'}</div>
          <div>Status: {thumbStatus || 'n/a'}</div>
          <div>Video: {isValidVideoUrl ? 'real' : 'placeholder'}</div>
          <div>Ready: {isVideoReady ? 'yes' : 'no'}</div>
          <div>SrcSet: {videoSrcSet ? 'yes' : 'no'}</div>
        </div>
      )}
    </div>
  );
}
