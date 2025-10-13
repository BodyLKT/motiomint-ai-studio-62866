import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import VideoConfigSelector, { VideoConfig } from './VideoConfigSelector';
import { Settings2 } from 'lucide-react';

interface CartConfigEditorProps {
  config: VideoConfig;
  animationTitle: string;
  onSave: (config: VideoConfig) => void;
}

export default function CartConfigEditor({ config, animationTitle, onSave }: CartConfigEditorProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<VideoConfig>(config);

  const handleSave = () => {
    onSave(currentConfig);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <Settings2 className="h-4 w-4" />
        {t('videoConfig.editConfig')}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('videoConfig.configureVideo')}</DialogTitle>
            <DialogDescription>
              {t('videoConfig.configureVideoDesc', { title: animationTitle })}
            </DialogDescription>
          </DialogHeader>

          <VideoConfigSelector
            value={currentConfig}
            onChange={setCurrentConfig}
            showPlatformPresets={true}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSave}>
              {t('common.save')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}