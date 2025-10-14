import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DownloadOption {
  format: string;
  resolution: string;
  label: string;
}

interface DownloadWithOptionsProps {
  onDownload: (format: string, resolution: string) => Promise<void>;
  isDownloading: boolean;
}

const downloadOptions: DownloadOption[] = [
  { format: 'MP4', resolution: '4K', label: 'MP4 4K (3840×2160)' },
  { format: 'MP4', resolution: '1080p', label: 'MP4 1080p (1920×1080)' },
  { format: 'MP4', resolution: '720p', label: 'MP4 720p (1280×720)' },
  { format: 'MOV', resolution: '4K', label: 'MOV 4K (3840×2160)' },
  { format: 'MOV', resolution: '1080p', label: 'MOV 1080p (1920×1080)' },
  { format: 'MOV', resolution: '720p', label: 'MOV 720p (1280×720)' },
  { format: 'GIF', resolution: '1080p', label: 'GIF 1080p' },
  { format: 'GIF', resolution: '720p', label: 'GIF 720p' },
];

const aspectRatios = [
  { value: '16:9', label: '16:9 (Landscape)' },
  { value: '9:16', label: '9:16 (Portrait)' },
  { value: '1:1', label: '1:1 (Square)' },
  { value: '4:5', label: '4:5 (Instagram)' },
];

export default function DownloadWithOptions({ onDownload, isDownloading }: DownloadWithOptionsProps) {
  const { t } = useTranslation();
  const [selectedFormat, setSelectedFormat] = useState('MP4');
  const [selectedResolution, setSelectedResolution] = useState('1080p');
  const [selectedRatio, setSelectedRatio] = useState('16:9');

  const handleDownload = async () => {
    await onDownload(selectedFormat, selectedResolution);
  };

  const currentLabel = `${selectedFormat} ${selectedResolution} (${selectedRatio})`;

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex-1"
        size="lg"
        variant="hero"
      >
        {isDownloading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Download className="mr-2 h-5 w-5" />
        )}
        {isDownloading ? t('animation.downloading') : `${t('animation.download')} ${currentLabel}`}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="hero"
            size="lg"
            className="px-3"
            disabled={isDownloading}
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-background/95 backdrop-blur-lg border-primary/30">
          <DropdownMenuLabel className="text-base">{t('videoConfig.selectFormat')}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primary/20" />
          
          {downloadOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={`${option.format}-${option.resolution}`}
              checked={selectedFormat === option.format && selectedResolution === option.resolution}
              onCheckedChange={() => {
                setSelectedFormat(option.format);
                setSelectedResolution(option.resolution);
              }}
              className="cursor-pointer hover:bg-primary/10"
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}

          <DropdownMenuSeparator className="bg-primary/20" />
          <DropdownMenuLabel className="text-base">{t('videoConfig.aspectRatio')}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primary/20" />
          
          {aspectRatios.map((ratio) => (
            <DropdownMenuCheckboxItem
              key={ratio.value}
              checked={selectedRatio === ratio.value}
              onCheckedChange={() => setSelectedRatio(ratio.value)}
              className="cursor-pointer hover:bg-primary/10"
            >
              {ratio.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
