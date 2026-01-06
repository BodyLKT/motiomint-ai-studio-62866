/**
 * Client-side video frame extraction utility
 * Extracts real frames from MP4 videos using canvas - NO AI generation
 */

export interface ExtractedFrame {
  blob: Blob;
  width: number;
  height: number;
  frameTime: number;
}

export interface ThumbnailSet {
  cardThumb: Blob;    // Square-ish for grid cards (600x600 or aspect-preserved)
  posterThumb: Blob;  // 16:9 for detail page (1280x720)
  frameTime: number;
  sourceWidth: number;
  sourceHeight: number;
}

/**
 * Check if a URL points to a real video file (not placeholder)
 */
export function isRealVideoUrl(url?: string): boolean {
  if (!url) return false;
  if (url.includes('placehold.co') || url.includes('placeholder')) return false;
  
  const hasVideoExtension = 
    url.endsWith('.mp4') ||
    url.endsWith('.webm') ||
    url.endsWith('.mov');
  
  return hasVideoExtension;
}

/**
 * Extract a single frame from a video at a specified time
 */
export async function extractFrameFromVideo(
  videoUrl: string,
  frameTime: number = 1.0
): Promise<ExtractedFrame> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'metadata';

    const cleanup = () => {
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
      video.src = '';
      video.load();
    };

    const onError = () => {
      cleanup();
      reject(new Error(`Failed to load video: ${videoUrl}`));
    };

    const onMetadata = () => {
      // Adjust frame time if video is shorter
      const duration = video.duration;
      let targetTime = frameTime;
      
      if (duration < frameTime) {
        targetTime = duration > 0.5 ? 0.5 : 0;
      }
      
      video.currentTime = targetTime;
    };

    const onSeeked = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          cleanup();
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(
          (blob) => {
            cleanup();
            if (blob) {
              resolve({
                blob,
                width: video.videoWidth,
                height: video.videoHeight,
                frameTime: video.currentTime
              });
            } else {
              reject(new Error('Failed to create blob from canvas'));
            }
          },
          'image/jpeg',
          0.9
        );
      } catch (err) {
        cleanup();
        reject(err);
      }
    };

    video.addEventListener('loadedmetadata', onMetadata);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', onError);
    
    video.src = videoUrl;
    video.load();
  });
}

/**
 * Extract frame with fallback times (1.0s -> 0.5s -> 0.2s -> 0s)
 */
export async function extractFrameWithFallback(
  videoUrl: string
): Promise<ExtractedFrame> {
  const fallbackTimes = [1.0, 0.5, 0.2, 0];
  
  for (const time of fallbackTimes) {
    try {
      const frame = await extractFrameFromVideo(videoUrl, time);
      console.log(`[ThumbnailExtractor] Extracted frame at ${time}s from ${videoUrl}`);
      return frame;
    } catch (err) {
      console.warn(`[ThumbnailExtractor] Failed at ${time}s, trying next...`, err);
    }
  }
  
  throw new Error(`Failed to extract frame from video: ${videoUrl}`);
}

/**
 * Create cropped thumbnail from extracted frame
 */
function createCroppedThumbnail(
  sourceBlob: Blob,
  targetWidth: number,
  targetHeight: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      // Calculate crop to maintain aspect ratio and fill
      const sourceAspect = img.width / img.height;
      const targetAspect = targetWidth / targetHeight;
      
      let srcX = 0, srcY = 0, srcW = img.width, srcH = img.height;
      
      if (sourceAspect > targetAspect) {
        // Source is wider - crop sides
        srcW = img.height * targetAspect;
        srcX = (img.width - srcW) / 2;
      } else {
        // Source is taller - crop top/bottom
        srcH = img.width / targetAspect;
        srcY = (img.height - srcH) / 2;
      }
      
      ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, targetWidth, targetHeight);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create cropped thumbnail'));
          }
        },
        'image/jpeg',
        0.85
      );
    };
    
    img.onerror = () => reject(new Error('Failed to load image for cropping'));
    img.src = URL.createObjectURL(sourceBlob);
  });
}

/**
 * Generate complete thumbnail set from video
 */
export async function generateThumbnailSet(
  videoUrl: string
): Promise<ThumbnailSet> {
  console.log(`[ThumbnailExtractor] Generating thumbnails for: ${videoUrl}`);
  
  // Extract the raw frame
  const frame = await extractFrameWithFallback(videoUrl);
  
  // Create card thumbnail (600x600 square crop)
  const cardThumb = await createCroppedThumbnail(frame.blob, 600, 600);
  
  // Create poster thumbnail (1280x720 16:9)
  const posterThumb = await createCroppedThumbnail(frame.blob, 1280, 720);
  
  console.log(`[ThumbnailExtractor] Generated thumbnails:`, {
    cardSize: cardThumb.size,
    posterSize: posterThumb.size,
    frameTime: frame.frameTime,
    sourceWidth: frame.width,
    sourceHeight: frame.height
  });
  
  return {
    cardThumb,
    posterThumb,
    frameTime: frame.frameTime,
    sourceWidth: frame.width,
    sourceHeight: frame.height
  };
}
