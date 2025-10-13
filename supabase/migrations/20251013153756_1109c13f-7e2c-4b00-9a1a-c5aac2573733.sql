-- Add video configuration columns to user_cart table
ALTER TABLE public.user_cart
ADD COLUMN selected_size TEXT DEFAULT '1080p',
ADD COLUMN selected_ratio TEXT DEFAULT '16:9',
ADD COLUMN selected_format TEXT DEFAULT 'MP4',
ADD COLUMN selected_platform TEXT DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.user_cart.selected_size IS 'Video resolution (e.g., 720p, 1080p, 4K)';
COMMENT ON COLUMN public.user_cart.selected_ratio IS 'Aspect ratio (e.g., 16:9, 9:16, 1:1, 4:5)';
COMMENT ON COLUMN public.user_cart.selected_format IS 'File format (e.g., MP4, MOV, GIF)';
COMMENT ON COLUMN public.user_cart.selected_platform IS 'Target platform preset (e.g., facebook, instagram, tiktok, linkedin, twitter)';