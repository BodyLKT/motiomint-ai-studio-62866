import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Maximize, Volume2, VolumeX, X } from 'lucide-react';
import { Button } from './button';
import { Dialog, DialogContent } from './dialog';

interface ModernVideoPlayerProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  /** Resolution hint like "1080x1920" or "1920x1080" to set initial aspect ratio */
  resolution?: string;
}

function parseResolution(resolution?: string): string {
  if (!resolution) return '16 / 9';
  // Handle formats like "1080x1920", "1920×1080", "1080 x 1920"
  const match = resolution.match(/(\d+)\s*[x×]\s*(\d+)/i);
  if (match) {
    return `${match[1]} / ${match[2]}`;
  }
  return '16 / 9';
}

export const ModernVideoPlayer = ({ open, onClose, videoUrl, title, resolution }: ModernVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [videoRatio, setVideoRatio] = useState<string>(() => parseResolution(resolution));
  const hideControlsTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Update ratio when resolution prop changes
  useEffect(() => {
    setVideoRatio(parseResolution(resolution));
  }, [resolution]);

  // Auto-play when dialog opens — wait for canplay event
  useEffect(() => {
    if (!open || !videoRef.current) return;
    
    const video = videoRef.current;
    const tryPlay = () => {
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => { /* user interaction required or source not ready */ });
    };

    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener('canplay', tryPlay, { once: true });
      return () => video.removeEventListener('canplay', tryPlay);
    }
  }, [open]);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      if (videoWidth && videoHeight) {
        setVideoRatio(`${videoWidth} / ${videoHeight}`);
      }
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const toggleFullscreen = useCallback(() => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  }, []);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(prev => {
        // Only hide if playing
        return isPlaying ? false : prev;
      });
    }, 3000);
  }, [isPlaying]);

  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    onClose();
  }, [onClose]);

  // Container uses aspect-ratio + height to auto-determine width
  const containerStyle: React.CSSProperties = {
    aspectRatio: videoRatio,
    maxHeight: '85vh',
    maxWidth: '90vw',
    height: '85vh',
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="flex items-center justify-center p-0 bg-transparent border-0 shadow-none overflow-visible gap-0 [&>button]:hidden w-auto max-w-[90vw]"
      >
        <div 
          className="relative group rounded-lg overflow-hidden bg-black"
          style={containerStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-contain"
            onClick={togglePlay}
            onLoadedMetadata={handleLoadedMetadata}
            loop
            muted={isMuted}
            playsInline
          />

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleClose}
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Title */}
          {title && (
            <div
              className={`absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-white transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h3 className="font-semibold">{title}</h3>
            </div>
          )}

          {/* Controls Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </Button>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleFullscreen}>
                <Maximize className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Center Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Button
                size="icon"
                className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary text-white shadow-2xl pointer-events-auto"
                onClick={togglePlay}
              >
                <Play className="w-10 h-10 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
