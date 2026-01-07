import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Maximize, Volume2, VolumeX, X } from 'lucide-react';
import { Button } from './button';
import { Dialog, DialogContent } from './dialog';

interface ModernVideoPlayerProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

export const ModernVideoPlayer = ({ open, onClose, videoUrl, title }: ModernVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [videoAspect, setVideoAspect] = useState<'landscape' | 'portrait' | 'square'>('landscape');
  const hideControlsTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [open]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      if (videoWidth > videoHeight) {
        setVideoAspect('landscape');
      } else if (videoHeight > videoWidth) {
        setVideoAspect('portrait');
      } else {
        setVideoAspect('square');
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    onClose();
  };

  // Dynamic sizing based on video aspect ratio
  const getContainerClasses = () => {
    switch (videoAspect) {
      case 'portrait':
        return 'max-w-[50vw] sm:max-w-[40vw] md:max-w-[35vw]';
      case 'square':
        return 'max-w-[70vw] sm:max-w-[60vw] md:max-w-[50vw]';
      default:
        return 'max-w-[90vw] md:max-w-5xl';
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`${getContainerClasses()} max-h-[90vh] p-0 bg-black border-0 overflow-hidden [&>button]:hidden`}>
        <div 
          className="relative group"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Video */}
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-auto max-h-[85vh] object-contain"
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
            className={`absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white transition-opacity duration-300 ${
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
              {/* Play/Pause */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </Button>

              {/* Volume */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </Button>

              <div className="flex-1" />

              {/* Fullscreen */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                <Maximize className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Center Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="icon"
                className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary text-white shadow-2xl"
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
