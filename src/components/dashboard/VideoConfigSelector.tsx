import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Monitor, Smartphone, Square, Layers, Film, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface VideoConfig {
  size: string;
  ratio: string;
  format: string;
  platform?: string;
}

interface VideoConfigSelectorProps {
  value: VideoConfig;
  onChange: (config: VideoConfig) => void;
  showPlatformPresets?: boolean;
}

const platformPresets = {
  facebook: {
    name: 'Facebook',
    icon: '📘',
    size: '1080p',
    ratio: '16:9',
    format: 'MP4',
    description: 'Best for Facebook Feed & Stories',
  },
  instagram: {
    name: 'Instagram',
    icon: '📸',
    size: '1080p',
    ratio: '9:16',
    format: 'MP4',
    description: 'Optimized for Reels & Stories',
  },
  tiktok: {
    name: 'TikTok',
    icon: '🎵',
    size: '1080p',
    ratio: '9:16',
    format: 'MP4',
    description: 'Perfect for TikTok videos',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    size: '1080p',
    ratio: '1:1',
    format: 'MP4',
    description: 'Professional square format',
  },
  twitter: {
    name: 'X (Twitter)',
    icon: '𝕏',
    size: '720p',
    ratio: '16:9',
    format: 'MP4',
    description: 'Optimized for X/Twitter',
  },
};

const sizeOptions = [
  { value: '720p', label: '720p HD', description: 'Good quality, smaller file' },
  { value: '1080p', label: '1080p Full HD', description: 'High quality (recommended)' },
  { value: '4K', label: '4K Ultra HD', description: 'Maximum quality, large file' },
];

const ratioOptions = [
  { value: '16:9', label: '16:9', icon: Monitor, description: 'Landscape - YouTube, Facebook' },
  { value: '9:16', label: '9:16', icon: Smartphone, description: 'Portrait - Stories, Reels, TikTok' },
  { value: '1:1', label: '1:1', icon: Square, description: 'Square - Instagram, LinkedIn' },
  { value: '4:5', label: '4:5', icon: Layers, description: 'Portrait - Instagram Feed' },
];

const formatOptions = [
  { value: 'MP4', label: 'MP4', description: 'Universal format (recommended)' },
  { value: 'MOV', label: 'MOV', description: 'Apple/professional editing' },
  { value: 'GIF', label: 'GIF', description: 'Animated loops, smaller size' },
];

export default function VideoConfigSelector({ value, onChange, showPlatformPresets = true }: VideoConfigSelectorProps) {
  const { t } = useTranslation();
  const [selectedConfig, setSelectedConfig] = useState<VideoConfig>(value);

  useEffect(() => {
    setSelectedConfig(value);
  }, [value]);

  const handlePlatformSelect = (platform: string) => {
    const preset = platformPresets[platform as keyof typeof platformPresets];
    const newConfig = {
      size: preset.size,
      ratio: preset.ratio,
      format: preset.format,
      platform,
    };
    setSelectedConfig(newConfig);
    onChange(newConfig);
  };

  const handleManualChange = (field: keyof VideoConfig, newValue: string) => {
    const newConfig = { ...selectedConfig, [field]: newValue, platform: undefined };
    setSelectedConfig(newConfig);
    onChange(newConfig);
  };

  return (
    <div className="space-y-6">
      {showPlatformPresets && (
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
              <Film className="h-5 w-5 text-primary" />
              {t('videoConfig.platformPresets')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('videoConfig.platformPresetsDesc')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(platformPresets).map(([key, preset]) => (
              <TooltipProvider key={key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedConfig.platform === key ? 'default' : 'outline'}
                      className="h-auto flex-col gap-2 p-4 relative"
                      onClick={() => handlePlatformSelect(key)}
                    >
                      <span className="text-2xl">{preset.icon}</span>
                      <span className="text-xs font-semibold">{preset.name}</span>
                      {selectedConfig.platform === key && (
                        <Badge className="absolute -top-2 -right-2 text-xs px-2">
                          ✓
                        </Badge>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">{preset.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {preset.size} • {preset.ratio} • {preset.format}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">
            {t('videoConfig.manualConfig')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('videoConfig.manualConfigDesc')}
          </p>
        </div>

        <div className="space-y-6">
          {/* Size Selection */}
          <div>
            <label className="text-sm font-medium mb-3 flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              {t('videoConfig.videoSize')}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {sizeOptions.map((option) => (
                <TooltipProvider key={option.value}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={selectedConfig.size === option.value ? 'default' : 'outline'}
                        className="h-auto flex-col gap-1 p-3"
                        onClick={() => handleManualChange('size', option.value)}
                      >
                        <span className="font-semibold">{option.label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{option.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          {/* Ratio Selection */}
          <div>
            <label className="text-sm font-medium mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4" />
              {t('videoConfig.aspectRatio')}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ratioOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <TooltipProvider key={option.value}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={selectedConfig.ratio === option.value ? 'default' : 'outline'}
                          className="h-auto flex-col gap-2 p-3"
                          onClick={() => handleManualChange('ratio', option.value)}
                        >
                          <IconComponent className="h-5 w-5" />
                          <span className="font-semibold">{option.label}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{option.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <label className="text-sm font-medium mb-3 flex items-center gap-2">
              <Film className="h-4 w-4" />
              {t('videoConfig.fileFormat')}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {formatOptions.map((option) => (
                <TooltipProvider key={option.value}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={selectedConfig.format === option.value ? 'default' : 'outline'}
                        className="h-auto flex-col gap-1 p-3"
                        onClick={() => handleManualChange('format', option.value)}
                      >
                        <span className="font-semibold">{option.label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{option.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-primary/5 backdrop-blur-sm border-primary/20">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-primary mb-1">{t('videoConfig.currentSelection')}</p>
            <p className="text-muted-foreground">
              {selectedConfig.platform && (
                <span className="font-medium text-foreground">
                  {platformPresets[selectedConfig.platform as keyof typeof platformPresets]?.name} Preset:{' '}
                </span>
              )}
              <span className="font-medium">
                {selectedConfig.size} • {selectedConfig.ratio} • {selectedConfig.format}
              </span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}