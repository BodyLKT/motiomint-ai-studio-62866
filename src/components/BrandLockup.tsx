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
    sm: { logo: 'h-7 w-7', text: 'text-lg' },
    md: { logo: 'h-9 w-9', text: 'text-xl' },
    lg: { logo: 'h-10 w-10', text: 'text-2xl' },
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
          'bg-clip-text text-transparent'
        )}
        style={{
          fontFamily: "'MuseoModerno', sans-serif",
          backgroundImage: isDark
            ? 'linear-gradient(135deg, #2ed577, #6f0dd1)'
            : 'linear-gradient(135deg, #6f0dd1, #2ed577)',
        }}
      >
        motiomint
      </span>
    </button>
  );
}
