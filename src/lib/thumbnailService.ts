/**
 * Thumbnail service - handles extraction and storage of real video frame thumbnails
 * NO AI generation - only real frame extraction from actual MP4 files
 */

import { supabase } from '@/integrations/supabase/client';
import { generateThumbnailSet, isRealVideoUrl, ThumbnailSet } from './thumbnailExtractor';

export interface ThumbnailResult {
  success: boolean;
  animationId: string;
  thumbCardUrl?: string;
  thumbPosterUrl?: string;
  thumbFrameUrl?: string;
  thumbFrameTime?: number;
  error?: string;
}

export interface BackfillProgress {
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
  current?: string;
  errors: Array<{ id: string; title: string; error: string }>;
}

/**
 * Upload thumbnail blob to Supabase storage
 */
async function uploadThumbnail(
  blob: Blob,
  animationId: string,
  suffix: string
): Promise<string> {
  const filename = `${animationId}_${suffix}.jpg`;
  
  // Delete existing file if present
  await supabase.storage.from('thumbnails').remove([filename]);
  
  const { data, error } = await supabase.storage
    .from('thumbnails')
    .upload(filename, blob, {
      contentType: 'image/jpeg',
      upsert: true
    });
  
  if (error) {
    throw new Error(`Failed to upload ${suffix}: ${error.message}`);
  }
  
  const { data: urlData } = supabase.storage
    .from('thumbnails')
    .getPublicUrl(filename);
  
  return urlData.publicUrl;
}

/**
 * Extract and store thumbnails for a single animation
 */
export async function extractAndStoreThumbnail(
  animationId: string,
  videoUrl: string,
  onProgress?: (message: string) => void
): Promise<ThumbnailResult> {
  const log = (msg: string) => {
    console.log(`[ThumbnailService] ${msg}`);
    onProgress?.(msg);
  };
  
  log(`Processing animation: ${animationId}`);
  
  // Validate video URL
  if (!isRealVideoUrl(videoUrl)) {
    log(`Skipping - not a real video URL: ${videoUrl}`);
    
    // Update status to fallback
    await supabase
      .from('animations')
      .update({
        thumb_status: 'failed',
        thumb_source: 'fallback',
        thumb_error: 'Not a valid video URL (placeholder or non-video)'
      })
      .eq('id', animationId);
    
    return {
      success: false,
      animationId,
      error: 'Not a valid video URL'
    };
  }
  
  try {
    // Mark as processing
    await supabase
      .from('animations')
      .update({ thumb_status: 'processing' })
      .eq('id', animationId);
    
    // Resolve relative URLs
    let fullVideoUrl = videoUrl;
    if (videoUrl.startsWith('/')) {
      fullVideoUrl = `${window.location.origin}${videoUrl}`;
    }
    
    log(`Extracting frame from: ${fullVideoUrl}`);
    
    // Extract thumbnails from video
    const thumbnails = await generateThumbnailSet(fullVideoUrl);
    
    log(`Uploading thumbnails to storage...`);
    
    // Upload all thumbnails
    const [cardUrl, posterUrl, frameUrl] = await Promise.all([
      uploadThumbnail(thumbnails.cardThumb, animationId, 'card'),
      uploadThumbnail(thumbnails.posterThumb, animationId, 'poster'),
      uploadThumbnail(thumbnails.cardThumb, animationId, 'frame') // Use card as frame reference
    ]);
    
    log(`Thumbnails uploaded successfully`);
    
    // Update database record
    const { error: updateError } = await supabase
      .from('animations')
      .update({
        thumb_card_url: cardUrl,
        thumb_poster_url: posterUrl,
        thumb_frame_url: frameUrl,
        thumb_source: 'extracted_frame',
        thumb_status: 'ready',
        thumb_frame_time: thumbnails.frameTime,
        thumb_extracted_at: new Date().toISOString(),
        thumb_error: null
      })
      .eq('id', animationId);
    
    if (updateError) {
      throw new Error(`Failed to update database: ${updateError.message}`);
    }
    
    log(`Database updated - thumbnail source: extracted_frame`);
    
    return {
      success: true,
      animationId,
      thumbCardUrl: cardUrl,
      thumbPosterUrl: posterUrl,
      thumbFrameUrl: frameUrl,
      thumbFrameTime: thumbnails.frameTime
    };
    
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    log(`Error: ${errorMessage}`);
    
    // Update status to failed
    await supabase
      .from('animations')
      .update({
        thumb_status: 'failed',
        thumb_source: 'fallback',
        thumb_error: errorMessage
      })
      .eq('id', animationId);
    
    return {
      success: false,
      animationId,
      error: errorMessage
    };
  }
}

/**
 * Backfill thumbnails for all animations missing real extracted frames
 */
export async function backfillThumbnails(
  onProgress: (progress: BackfillProgress) => void
): Promise<BackfillProgress> {
  console.log('[ThumbnailService] Starting backfill...');
  
  // Fetch animations that need thumbnail extraction
  const { data: animations, error } = await supabase
    .from('animations')
    .select('id, title, file_url, thumb_status, thumb_source')
    .or('thumb_status.eq.pending,thumb_status.eq.failed,thumb_source.neq.extracted_frame');
  
  if (error) {
    throw new Error(`Failed to fetch animations: ${error.message}`);
  }
  
  const progress: BackfillProgress = {
    total: animations?.length || 0,
    processed: 0,
    succeeded: 0,
    failed: 0,
    errors: []
  };
  
  onProgress(progress);
  
  if (!animations || animations.length === 0) {
    console.log('[ThumbnailService] No animations need processing');
    return progress;
  }
  
  console.log(`[ThumbnailService] Processing ${animations.length} animations`);
  
  // Process animations sequentially to avoid overwhelming the browser
  for (const animation of animations) {
    progress.current = animation.title;
    onProgress({ ...progress });
    
    const result = await extractAndStoreThumbnail(
      animation.id,
      animation.file_url
    );
    
    progress.processed++;
    
    if (result.success) {
      progress.succeeded++;
    } else {
      progress.failed++;
      progress.errors.push({
        id: animation.id,
        title: animation.title,
        error: result.error || 'Unknown error'
      });
    }
    
    onProgress({ ...progress });
    
    // Small delay between processing to prevent browser lockup
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  progress.current = undefined;
  onProgress(progress);
  
  console.log('[ThumbnailService] Backfill complete:', progress);
  return progress;
}

/**
 * Verify all thumbnails are properly extracted
 */
export async function verifyThumbnails(): Promise<{
  total: number;
  valid: number;
  invalid: Array<{ id: string; title: string; issue: string }>;
}> {
  const { data: animations, error } = await supabase
    .from('animations')
    .select('id, title, thumb_source, thumb_status, thumb_card_url, thumb_poster_url');
  
  if (error) {
    throw new Error(`Failed to fetch animations: ${error.message}`);
  }
  
  const result = {
    total: animations?.length || 0,
    valid: 0,
    invalid: [] as Array<{ id: string; title: string; issue: string }>
  };
  
  if (!animations) return result;
  
  for (const anim of animations) {
    const issues: string[] = [];
    
    if (anim.thumb_source !== 'extracted_frame') {
      issues.push(`thumb_source is "${anim.thumb_source}" (should be "extracted_frame")`);
    }
    
    if (anim.thumb_status !== 'ready') {
      issues.push(`thumb_status is "${anim.thumb_status}" (should be "ready")`);
    }
    
    if (!anim.thumb_card_url) {
      issues.push('Missing thumb_card_url');
    }
    
    if (!anim.thumb_poster_url) {
      issues.push('Missing thumb_poster_url');
    }
    
    if (issues.length > 0) {
      result.invalid.push({
        id: anim.id,
        title: anim.title,
        issue: issues.join('; ')
      });
    } else {
      result.valid++;
    }
  }
  
  return result;
}
