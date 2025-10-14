import { useTranslation } from 'react-i18next';

interface WatermarkOverlayProps {
  show: boolean;
}

export default function WatermarkOverlay({ show }: WatermarkOverlayProps) {
  const { t } = useTranslation();
  
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-black/20 backdrop-blur-[2px]">
      <div className="text-center px-4">
        <div className="text-5xl sm:text-6xl md:text-8xl font-black opacity-40 gradient-text select-none drop-shadow-2xl">
          motiomint
        </div>
        <div className="text-base sm:text-lg md:text-2xl text-white font-bold mt-4 select-none drop-shadow-lg bg-black/30 px-6 py-3 rounded-full backdrop-blur-sm">
          {t('guest.watermark')}
        </div>
      </div>
    </div>
  );
}
