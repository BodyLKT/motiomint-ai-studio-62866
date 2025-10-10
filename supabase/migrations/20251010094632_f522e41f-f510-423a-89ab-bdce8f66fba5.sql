-- Create animations table
CREATE TABLE public.animations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.animations ENABLE ROW LEVEL SECURITY;

-- Public read access for animations
CREATE POLICY "Anyone can view animations"
ON public.animations
FOR SELECT
USING (true);

-- Create user_favorites table
CREATE TABLE public.user_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  animation_id UUID NOT NULL REFERENCES public.animations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, animation_id)
);

-- Enable RLS
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Users can view their own favorites
CREATE POLICY "Users can view their own favorites"
ON public.user_favorites
FOR SELECT
USING (auth.uid() = user_id);

-- Users can add their own favorites
CREATE POLICY "Users can add their own favorites"
ON public.user_favorites
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can remove their own favorites
CREATE POLICY "Users can remove their own favorites"
ON public.user_favorites
FOR DELETE
USING (auth.uid() = user_id);

-- Create user_downloads table
CREATE TABLE public.user_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  animation_id UUID NOT NULL REFERENCES public.animations(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_downloads ENABLE ROW LEVEL SECURITY;

-- Users can view their own downloads
CREATE POLICY "Users can view their own downloads"
ON public.user_downloads
FOR SELECT
USING (auth.uid() = user_id);

-- Users can add their own downloads
CREATE POLICY "Users can add their own downloads"
ON public.user_downloads
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add trigger for animations updated_at
CREATE TRIGGER update_animations_updated_at
BEFORE UPDATE ON public.animations
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample animations
INSERT INTO public.animations (title, description, category, file_url, thumbnail_url, tags) VALUES
('Smooth Fade In', 'Elegant fade-in animation for hero sections', 'Hero', '/animations/fade-in.json', '/thumbnails/fade-in.jpg', ARRAY['fade', 'hero', 'smooth']),
('Bounce Button', 'Playful bounce effect for CTAs', 'UI Elements', '/animations/bounce-button.json', '/thumbnails/bounce-button.jpg', ARRAY['button', 'bounce', 'cta']),
('Slide Navigation', 'Sleek slide-in navigation menu', 'Navigation', '/animations/slide-nav.json', '/thumbnails/slide-nav.jpg', ARRAY['navigation', 'slide', 'menu']),
('Loading Spinner', 'Modern loading animation', 'Loaders', '/animations/loading-spinner.json', '/thumbnails/loading-spinner.jpg', ARRAY['loading', 'spinner']),
('Card Flip', '3D card flip animation', 'Cards', '/animations/card-flip.json', '/thumbnails/card-flip.jpg', ARRAY['card', 'flip', '3d']),
('Text Typewriter', 'Typewriter text effect', 'Text', '/animations/typewriter.json', '/thumbnails/typewriter.jpg', ARRAY['text', 'typewriter']);