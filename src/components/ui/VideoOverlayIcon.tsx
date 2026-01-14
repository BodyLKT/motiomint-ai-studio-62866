import { Play, Expand } from 'lucide-react';

interface VideoOverlayIconProps {
  isHovered: boolean;
  className?: string;
  /** Size variant - 'sm' for cards, 'lg' for detail page */
  size?: 'sm' | 'lg';
}

/**
 * Shared overlay icon for video previews.
 * - Default: Play icon visible
 * - Hover: Expand icon visible (lighter background)
 * - Touch devices: Play icon stays visible (no hover)
 */
export function VideoOverlayIcon({ 
  isHovered, 
  className = '',
  size = 'sm' 
}: VideoOverlayIconProps) {
  const iconSize = size === 'lg' ? 'w-8 h-8' : 'w-5 h-5';
  const expandIconSize = size === 'lg' ? 'w-7 h-7' : 'w-4 h-4';
  const padding = size === 'lg' ? 'p-4' : 'p-2.5';

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}>
      {/* Play icon - visible by default, hidden on hover */}
      <div 
        className={`absolute transition-opacity duration-200 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className={`bg-black/50 backdrop-blur-sm rounded-full ${padding} shadow-lg`}>
          <Play className={`${iconSize} text-white fill-white`} />
        </div>
      </div>

      {/* Expand icon - hidden by default, visible on hover */}
      <div 
        className={`absolute transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className={`bg-black/35 backdrop-blur-sm rounded-full ${padding} shadow-lg`}>
          <Expand className={`${expandIconSize} text-white`} />
        </div>
      </div>
    </div>
  );
}
