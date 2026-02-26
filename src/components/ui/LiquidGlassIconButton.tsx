import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LiquidGlassIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'lg';
}

/**
 * Liquid Glass / Glassmorphism icon button.
 * Used for the expand icon on animation cards and detail page.
 */
const LiquidGlassIconButton = forwardRef<HTMLButtonElement, LiquidGlassIconButtonProps>(
  ({ className, children, size = 'sm', ...props }, ref) => {
    const sizeClasses = size === 'lg' ? 'p-4' : 'p-2.5';

    return (
      <button
        ref={ref}
        className={cn(
          // Layout
          "inline-flex items-center justify-center rounded-full",
          sizeClasses,
          // Glassmorphism
          "bg-white/15 dark:bg-white/10",
          "backdrop-blur-md",
          "border border-white/30 dark:border-white/20",
          // Inner highlight / specular sheen
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_4px_16px_rgba(0,0,0,0.25)]",
          // Text / icon color
          "text-white",
          // Transitions
          "transition-all duration-200 ease-out",
          // Hover
          "hover:bg-white/25 dark:hover:bg-white/20",
          "hover:border-white/45 dark:hover:border-white/35",
          "hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_6px_20px_rgba(0,0,0,0.3)]",
          // Active / pressed
          "active:scale-[0.98] active:bg-white/20 active:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_8px_rgba(0,0,0,0.2)]",
          // Focus
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-1 focus-visible:ring-offset-black/50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

LiquidGlassIconButton.displayName = 'LiquidGlassIconButton';

export { LiquidGlassIconButton };
