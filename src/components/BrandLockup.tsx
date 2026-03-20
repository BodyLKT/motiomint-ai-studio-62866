import { useTheme } from 'next-themes';
import logoDay from '@/assets/motiomint-logo.png';
import logoDark from '@/assets/motiomint-logo-dark.png';
import { cn } from '@/lib/utils';

interface BrandLockupProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function BrandLockup({ size = 'md', onClick, className }: BrandLockupProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const sizeMap = {
    sm: { logo: 'h-6 w-6', text: 'text-lg' },
    md: { logo: 'h-7 w-7', text: 'text-2xl' },
    lg: { logo: 'h-8 w-8', text: 'text-2xl' },
  };

  const s = sizeMap[size];

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0',
        className
      )}
    >
      <img
        src={isDark ? logoDark : logoDay}
        alt="MotioMint logo"
        className={cn(s.logo, 'object-contain')}
      />
      <span
        className={cn(
          s.text,
          'font-bold tracking-tight whitespace-nowrap',
          'font-[Righteous]',
          isDark
            ? 'text-[#2ed577]'
            : 'text-[#6f0dd1]'
        )}
      >
        motiomint
      </span>
    </button>
  );
}
