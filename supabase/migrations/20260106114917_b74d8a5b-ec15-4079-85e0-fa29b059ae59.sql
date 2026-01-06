-- Add thumbnail tracking columns to animations table
ALTER TABLE public.animations 
ADD COLUMN IF NOT EXISTS thumb_frame_url TEXT,
ADD COLUMN IF NOT EXISTS thumb_card_url TEXT,
ADD COLUMN IF NOT EXISTS thumb_poster_url TEXT,
ADD COLUMN IF NOT EXISTS thumb_source TEXT DEFAULT 'pending' CHECK (thumb_source IN ('pending', 'extracted_frame', 'fallback')),
ADD COLUMN IF NOT EXISTS thumb_status TEXT DEFAULT 'pending' CHECK (thumb_status IN ('pending', 'processing', 'ready', 'failed')),
ADD COLUMN IF NOT EXISTS thumb_error TEXT,
ADD COLUMN IF NOT EXISTS thumb_frame_time DECIMAL(5,2) DEFAULT 1.0,
ADD COLUMN IF NOT EXISTS thumb_extracted_at TIMESTAMP WITH TIME ZONE;

-- Create index for backfill queries
CREATE INDEX IF NOT EXISTS idx_animations_thumb_status ON public.animations(thumb_status);

-- Create storage bucket for extracted thumbnails
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('thumbnails', 'thumbnails', true, 5242880, ARRAY['image/jpeg', 'image/webp', 'image/png'])
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to thumbnails
CREATE POLICY "Public read access for thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'thumbnails');

-- Allow authenticated users to upload thumbnails (for admin backfill)
CREATE POLICY "Authenticated users can upload thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'thumbnails');

-- Allow authenticated users to update thumbnails
CREATE POLICY "Authenticated users can update thumbnails"
ON storage.objects FOR UPDATE
USING (bucket_id = 'thumbnails');

-- Allow authenticated users to delete thumbnails
CREATE POLICY "Authenticated users can delete thumbnails"
ON storage.objects FOR DELETE
USING (bucket_id = 'thumbnails');