/**
 * CardOverlayButton - Shared button component for animation card hover overlays
 * Provides consistent glassy styling across Light and Dark themes
 */

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardOverlayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Whether button represents an active/selected state (e.g., "In Cart") */
  isActive?: boolean;
}

const CardOverlayButton = forwardRef<HTMLButtonElement, CardOverlayButtonProps>(
  ({ className, children, isActive = false, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base layout
          "flex-1 h-9 px-3 rounded-md text-xs font-medium inline-flex items-center justify-center gap-1.5",
          // Transitions
          "transition-all duration-200",
          // Glassy background - dark glass that works on image overlays
          "backdrop-blur-md border",
          "bg-black/50 border-white/20",
          // Text always white for contrast on dark glass
          "text-white",
          // Hover state - slightly stronger opacity
          "hover:bg-black/70 hover:border-white/30",
          // Focus state - visible ring
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-1 focus-visible:ring-offset-black/50",
          // Active/pressed state
          "active:bg-black/80",
          // Disabled state
          "disabled:opacity-50 disabled:pointer-events-none",
          // Active state (e.g., "In Cart") - use primary color
          isActive && "bg-primary/80 border-primary/50 hover:bg-primary/90 hover:border-primary/60",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CardOverlayButton.displayName = 'CardOverlayButton';

export { CardOverlayButton };
