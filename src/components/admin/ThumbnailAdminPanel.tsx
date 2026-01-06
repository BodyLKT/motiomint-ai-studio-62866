/**
 * Admin panel for thumbnail management
 * Provides backfill and verification tools
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, CheckCircle2, RefreshCw, Shield, Image as ImageIcon } from 'lucide-react';
import { backfillThumbnails, verifyThumbnails, BackfillProgress } from '@/lib/thumbnailService';
import { toast } from 'sonner';

export default function ThumbnailAdminPanel() {
  const [isBackfilling, setIsBackfilling] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [backfillProgress, setBackfillProgress] = useState<BackfillProgress | null>(null);
  const [verificationResult, setVerificationResult] = useState<{
    total: number;
    valid: number;
    invalid: Array<{ id: string; title: string; issue: string }>;
  } | null>(null);

  const handleBackfill = async () => {
    setIsBackfilling(true);
    setBackfillProgress(null);
    
    try {
      const result = await backfillThumbnails((progress) => {
        setBackfillProgress(progress);
      });
      
      toast.success(`Backfill complete: ${result.succeeded} succeeded, ${result.failed} failed`);
    } catch (err) {
      toast.error(`Backfill failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsBackfilling(false);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setVerificationResult(null);
    
    try {
      const result = await verifyThumbnails();
      setVerificationResult(result);
      
      if (result.invalid.length === 0) {
        toast.success(`All ${result.total} thumbnails verified successfully`);
      } else {
        toast.warning(`${result.invalid.length} of ${result.total} thumbnails have issues`);
      }
    } catch (err) {
      toast.error(`Verification failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsVerifying(false);
    }
  };

  const progressPercent = backfillProgress 
    ? Math.round((backfillProgress.processed / backfillProgress.total) * 100) 
    : 0;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Thumbnail Management
        </CardTitle>
        <CardDescription>
          Extract real frames from MP4 videos - NO AI generation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Backfill Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Backfill Real Thumbnails</h3>
              <p className="text-sm text-muted-foreground">
                Extract frames from all videos missing real thumbnails
              </p>
            </div>
            <Button 
              onClick={handleBackfill} 
              disabled={isBackfilling}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isBackfilling ? 'animate-spin' : ''}`} />
              {isBackfilling ? 'Processing...' : 'Start Backfill'}
            </Button>
          </div>
          
          {backfillProgress && (
            <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span>Progress: {backfillProgress.processed} / {backfillProgress.total}</span>
                <span>{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
              
              {backfillProgress.current && (
                <p className="text-xs text-muted-foreground truncate">
                  Currently: {backfillProgress.current}
                </p>
              )}
              
              <div className="flex gap-4 text-sm mt-2">
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  {backfillProgress.succeeded} succeeded
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <AlertCircle className="h-3 w-3 text-red-500" />
                  {backfillProgress.failed} failed
                </Badge>
              </div>
              
              {backfillProgress.errors.length > 0 && (
                <ScrollArea className="h-32 mt-2">
                  <div className="space-y-1">
                    {backfillProgress.errors.map((err) => (
                      <div key={err.id} className="text-xs p-2 bg-destructive/10 rounded">
                        <span className="font-medium">{err.title}:</span> {err.error}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          )}
        </div>

        {/* Verification Section */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Verify Thumbnails</h3>
              <p className="text-sm text-muted-foreground">
                Check all thumbnails are real extracted frames
              </p>
            </div>
            <Button 
              onClick={handleVerify} 
              disabled={isVerifying}
              variant="outline"
              className="gap-2"
            >
              <Shield className={`h-4 w-4 ${isVerifying ? 'animate-spin' : ''}`} />
              {isVerifying ? 'Verifying...' : 'Verify All'}
            </Button>
          </div>
          
          {verificationResult && (
            <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
              <div className="flex gap-4">
                <Badge variant={verificationResult.invalid.length === 0 ? 'default' : 'secondary'}>
                  Total: {verificationResult.total}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  Valid: {verificationResult.valid}
                </Badge>
                {verificationResult.invalid.length > 0 && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Invalid: {verificationResult.invalid.length}
                  </Badge>
                )}
              </div>
              
              {verificationResult.invalid.length > 0 && (
                <ScrollArea className="h-40 mt-2">
                  <div className="space-y-1">
                    {verificationResult.invalid.map((item) => (
                      <div key={item.id} className="text-xs p-2 bg-destructive/10 rounded">
                        <span className="font-medium">{item.title}:</span> {item.issue}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
              
              {verificationResult.invalid.length === 0 && (
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  All thumbnails are verified as real extracted frames
                </p>
              )}
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            <strong>Thumbnail source:</strong> ffmpeg_extracted_frame (canvas-based extraction)
          </p>
          <p className="text-xs text-muted-foreground">
            Frame extraction uses browser canvas API - no AI generation
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
