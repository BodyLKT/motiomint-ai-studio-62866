-- Add foreign key relationship between user_cart and animations
ALTER TABLE public.user_cart 
ADD CONSTRAINT fk_user_cart_animation 
FOREIGN KEY (animation_id) 
REFERENCES public.animations(id) 
ON DELETE CASCADE;

-- Add foreign key relationship between user_favorites and animations
ALTER TABLE public.user_favorites 
ADD CONSTRAINT fk_user_favorites_animation 
FOREIGN KEY (animation_id) 
REFERENCES public.animations(id) 
ON DELETE CASCADE;

-- Add foreign key relationship between user_downloads and animations
ALTER TABLE public.user_downloads 
ADD CONSTRAINT fk_user_downloads_animation 
FOREIGN KEY (animation_id) 
REFERENCES public.animations(id) 
ON DELETE CASCADE;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_user_cart_user_id ON public.user_cart(user_id);
CREATE INDEX IF NOT EXISTS idx_user_cart_animation_id ON public.user_cart(animation_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_animation_id ON public.user_favorites(animation_id);
CREATE INDEX IF NOT EXISTS idx_user_downloads_user_id ON public.user_downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_user_downloads_animation_id ON public.user_downloads(animation_id);