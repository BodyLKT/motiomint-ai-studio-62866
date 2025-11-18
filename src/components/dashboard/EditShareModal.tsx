import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Edit3,
  Share2,
  Facebook,
  Instagram,
  Smartphone,
  Linkedin,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Video,
  X,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EditShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  animation: {
    id: string;
    title: string;
    file_url: string;
    thumbnail_url: string;
  };
}

export default function EditShareModal({ open, onOpenChange, animation }: EditShareModalProps) {
  const { t } = useTranslation();
  const [isSharing, setIsSharing] = useState(false);

  const handleEditInCanva = () => {
    // Canva Design API - Opens Canva editor with the image
    const canvaUrl = `https://www.canva.com/design/create?template=${encodeURIComponent(
      animation.file_url
    )}`;
    window.open(canvaUrl, '_blank', 'noopener,noreferrer');
    
    toast({
      title: t('editShare.openedInCanva'),
      description: t('editShare.openedInCanvaDesc'),
    });
  };

  const handleEditInCapCut = () => {
    // CapCut web editor URL
    const capCutUrl = `https://www.capcut.com/editor?media=${encodeURIComponent(
      animation.file_url
    )}`;
    window.open(capCutUrl, '_blank', 'noopener,noreferrer');
    
    toast({
      title: t('editShare.openedInCapCut'),
      description: t('editShare.openedInCapCutDesc'),
    });
  };

  const handleEditInVEED = () => {
    // VEED.io editor URL
    const veedUrl = `https://www.veed.io/new?url=${encodeURIComponent(
      animation.file_url
    )}`;
    window.open(veedUrl, '_blank', 'noopener,noreferrer');
    
    toast({
      title: t('editShare.openedInVEED'),
      description: t('editShare.openedInVEEDDesc'),
    });
  };

  const handleShare = async (platform: string) => {
    setIsSharing(true);

    try {
      const shareData = {
        title: animation.title,
        text: `Check out this animation: ${animation.title}`,
        url: window.location.origin + `/animation/${animation.id}`,
      };

      let shareUrl = '';

      switch (platform) {
        case 'native':
          // Use Web Share API if available
          if (navigator.share) {
            await navigator.share(shareData);
            toast({
              title: t('editShare.shareSuccess'),
              description: t('editShare.shareSuccessDesc'),
            });
            return;
          }
          break;

        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareData.url
          )}`;
          break;

        case 'x':
          shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
            shareData.text
          )}&url=${encodeURIComponent(shareData.url)}`;
          break;

        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareData.url
          )}`;
          break;

        case 'instagram':
          // Instagram doesn't have a web share URL, guide users
          toast({
            title: t('editShare.instagramGuide'),
            description: t('editShare.instagramGuideDesc'),
          });
          return;

        case 'tiktok':
          // TikTok web upload
          shareUrl = 'https://www.tiktok.com/upload';
          toast({
            title: t('editShare.tiktokGuide'),
            description: t('editShare.tiktokGuideDesc'),
          });
          break;
      }

      if (shareUrl) {
        window.open(
          shareUrl,
          '_blank',
          'width=600,height=400,noopener,noreferrer'
        );
        
        toast({
          title: t('editShare.shareOpened'),
          description: t('editShare.shareOpenedDesc', { platform }),
        });
      }
    } catch (error) {
      console.error('Share error:', error);
      toast({
        title: t('editShare.shareError'),
        description: t('editShare.shareErrorDesc'),
        variant: 'destructive',
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            {t('editShare.title')}
          </DialogTitle>
          <DialogDescription>
            {t('editShare.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Animation Preview */}
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex items-center gap-4">
              <img
                src={animation.thumbnail_url}
                alt={animation.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{animation.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('editShare.selectedAnimation')}
                </p>
              </div>
            </div>
          </Card>

          {/* Edit Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Edit3 className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">{t('editShare.editSection')}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t('editShare.editSectionDesc')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={handleEditInCanva}
                size="lg"
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Edit3 className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold">{t('editShare.editInCanva')}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('editShare.canvaDesc')}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </Button>

              <Button
                onClick={handleEditInVEED}
                size="lg"
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold">{t('editShare.editInVEED')}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('editShare.veedDesc')}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </Button>

              <Button
                onClick={handleEditInCapCut}
                size="lg"
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold">{t('editShare.editInCapCut')}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('editShare.capCutDesc')}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-primary/10">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-1">{t('editShare.editTip')}</p>
                  <p className="text-muted-foreground text-xs">
                    {t('editShare.editTipDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Share Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">{t('editShare.shareSection')}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t('editShare.shareSectionDesc')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {/* Native Share (Mobile) */}
              {navigator.share && (
                <Button
                  onClick={() => handleShare('native')}
                  disabled={isSharing}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-primary/5"
                >
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm">{t('editShare.shareNative')}</span>
                </Button>
              )}

              {/* Facebook */}
              <Button
                onClick={() => handleShare('facebook')}
                disabled={isSharing}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-primary/5"
              >
                <Facebook className="h-5 w-5" />
                <span className="text-sm">Facebook</span>
              </Button>

              {/* Instagram */}
              <Button
                onClick={() => handleShare('instagram')}
                disabled={isSharing}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-primary/5"
              >
                <Instagram className="h-5 w-5" />
                <span className="text-sm">Instagram</span>
              </Button>

              {/* TikTok */}
              <Button
                onClick={() => handleShare('tiktok')}
                disabled={isSharing}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-primary/5"
              >
                <Smartphone className="h-5 w-5" />
                <span className="text-sm">TikTok</span>
              </Button>

              {/* X (Twitter) */}
              <Button
                onClick={() => handleShare('x')}
                disabled={isSharing}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-primary/5"
              >
                <X className="h-5 w-5" />
                <span className="text-sm">X (Twitter)</span>
              </Button>

              {/* LinkedIn */}
              <Button
                onClick={() => handleShare('linkedin')}
                disabled={isSharing}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-primary/5"
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-sm">LinkedIn</span>
              </Button>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-primary/10">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-1">{t('editShare.shareTip')}</p>
                  <p className="text-muted-foreground text-xs">
                    {t('editShare.shareTipDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
