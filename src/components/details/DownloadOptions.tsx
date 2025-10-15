import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DownloadConfig {
  format: string;
  resolution: string;
  aspectRatio: string;
  platform?: string;
}

interface DownloadOptionsProps {
  onDownload: (config: DownloadConfig) => void;
  isDownloading: boolean;
}

const PLATFORMS = [
  { value: 'instagram-story', label: 'Instagram Story', resolution: '1080x1920', ratio: '9:16' },
  { value: 'instagram-post', label: 'Instagram Post', resolution: '1080x1080', ratio: '1:1' },
  { value: 'instagram-reel', label: 'Instagram Reel', resolution: '1080x1920', ratio: '9:16' },
  { value: 'tiktok', label: 'TikTok', resolution: '1080x1920', ratio: '9:16' },
  { value: 'youtube-short', label: 'YouTube Short', resolution: '1080x1920', ratio: '9:16' },
  { value: 'youtube-video', label: 'YouTube Video', resolution: '1920x1080', ratio: '16:9' },
  { value: 'facebook-post', label: 'Facebook Post', resolution: '1080x1080', ratio: '1:1' },
  { value: 'twitter-post', label: 'Twitter/X Post', resolution: '1920x1080', ratio: '16:9' },
  { value: 'linkedin-post', label: 'LinkedIn Post', resolution: '1920x1080', ratio: '16:9' },
];

const FORMATS = [
  { value: 'mp4', label: 'MP4 (Recommended)', description: 'Universal compatibility' },
  { value: 'mov', label: 'MOV', description: 'Apple devices' },
  { value: 'webm', label: 'WebM', description: 'Web optimized' },
  { value: 'gif', label: 'GIF', description: 'Animated image' },
];

const RESOLUTIONS = [
  { value: '3840x2160', label: '4K (3840x2160)', description: 'Ultra HD' },
  { value: '1920x1080', label: 'Full HD (1920x1080)', description: 'Standard' },
  { value: '1080x1920', label: 'Vertical HD (1080x1920)', description: 'Mobile' },
  { value: '1080x1080', label: 'Square HD (1080x1080)', description: 'Social' },
  { value: '1280x720', label: 'HD (1280x720)', description: 'Compact' },
];

const ASPECT_RATIOS = [
  { value: '16:9', label: '16:9 (Landscape)', description: 'YouTube, Desktop' },
  { value: '9:16', label: '9:16 (Portrait)', description: 'TikTok, Stories' },
  { value: '1:1', label: '1:1 (Square)', description: 'Instagram Feed' },
  { value: '4:3', label: '4:3 (Classic)', description: 'Traditional' },
];

export default function DownloadOptions({ onDownload, isDownloading }: DownloadOptionsProps) {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [format, setFormat] = useState<string>('mp4');
  const [resolution, setResolution] = useState<string>('1920x1080');
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [useCustom, setUseCustom] = useState(false);

  const handlePlatformChange = (platformValue: string) => {
    setSelectedPlatform(platformValue);
    const platform = PLATFORMS.find(p => p.value === platformValue);
    if (platform) {
      setResolution(platform.resolution);
      setAspectRatio(platform.ratio);
      setUseCustom(false);
    }
  };

  const handleCustomChange = () => {
    setUseCustom(true);
    setSelectedPlatform('');
  };

  const handleDownload = () => {
    onDownload({
      format,
      resolution,
      aspectRatio,
      platform: selectedPlatform || undefined,
    });
  };

  return (
    <Card className="p-6 space-y-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div>
        <h3 className="text-lg font-semibold mb-2">Download Options</h3>
        <p className="text-sm text-muted-foreground">
          Select your preferred format and quality settings
        </p>
      </div>

      <Separator />

      {/* Platform Presets */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium">Platform Presets</h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Choose a platform for optimized settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PLATFORMS.map((platform) => (
            <Button
              key={platform.value}
              variant={selectedPlatform === platform.value ? "default" : "outline"}
              size="sm"
              onClick={() => handlePlatformChange(platform.value)}
              className={cn(
                "justify-start text-left h-auto py-2",
                selectedPlatform === platform.value && "shadow-glow"
              )}
            >
              <div className="flex items-start gap-2 w-full">
                {selectedPlatform === platform.value && (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{platform.label}</div>
                  <div className="text-xs text-muted-foreground">{platform.ratio}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCustomChange}
          className={cn(
            "w-full",
            useCustom && "border-primary text-primary"
          )}
        >
          Custom Settings
        </Button>
      </div>

      <Separator />

      {/* Format Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Format</label>
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FORMATS.map((fmt) => (
              <SelectItem key={fmt.value} value={fmt.value}>
                <div className="flex items-center justify-between w-full gap-4">
                  <span>{fmt.label}</span>
                  <span className="text-xs text-muted-foreground">{fmt.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Resolution Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Resolution</label>
        <Select 
          value={resolution} 
          onValueChange={(val) => {
            setResolution(val);
            handleCustomChange();
          }}
          disabled={!!selectedPlatform && !useCustom}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RESOLUTIONS.map((res) => (
              <SelectItem key={res.value} value={res.value}>
                <div className="flex items-center justify-between w-full gap-4">
                  <span>{res.label}</span>
                  <span className="text-xs text-muted-foreground">{res.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Aspect Ratio Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Aspect Ratio</label>
        <Select 
          value={aspectRatio} 
          onValueChange={(val) => {
            setAspectRatio(val);
            handleCustomChange();
          }}
          disabled={!!selectedPlatform && !useCustom}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ASPECT_RATIOS.map((ratio) => (
              <SelectItem key={ratio.value} value={ratio.value}>
                <div className="flex items-center justify-between w-full gap-4">
                  <span>{ratio.label}</span>
                  <span className="text-xs text-muted-foreground">{ratio.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Download Button */}
      <Button
        size="lg"
        className="w-full gap-2 shadow-glow"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Downloading...
          </>
        ) : (
          <>
            Download {format.toUpperCase()} ({resolution})
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Commercial license included • Instant download
      </p>
    </Card>
  );
}
