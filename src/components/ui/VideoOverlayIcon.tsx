import { Expand } from 'lucide-react';
import { LiquidGlassIconButton } from './LiquidGlassIconButton';

interface VideoOverlayIconProps {
  isHovered: boolean;
  className?: string;
  /** Size variant - 'sm' for cards, 'lg' for detail page */
  size?: 'sm' | 'lg';
}

/**
 * Shared overlay icon for video previews.
 * Shows a glassmorphism expand icon on hover.
 * No play icon — cards are clickable as-is.
 */
export function VideoOverlayIcon({ 
  isHovered, 
  className = '',
  size = 'sm' 
}: VideoOverlayIconProps) {
  const expandIconSize = size === 'lg' ? 'w-7 h-7' : 'w-4 h-4';

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}>
      {/* Expand icon with liquid glass styling - visible on hover */}
      <div 
        className={`absolute transition-all duration-200 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <LiquidGlassIconButton size={size} tabIndex={-1}>
          <Expand className={`${expandIconSize} text-white`} />
        </LiquidGlassIconButton>
      </div>
    </div>
  );
}
