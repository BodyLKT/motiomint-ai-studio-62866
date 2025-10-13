-- Create cart table for user shopping cart
CREATE TABLE IF NOT EXISTS public.user_cart (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  animation_id UUID NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, animation_id)
);

-- Enable RLS
ALTER TABLE public.user_cart ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own cart"
ON public.user_cart
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their cart"
ON public.user_cart
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their cart"
ON public.user_cart
FOR DELETE
USING (auth.uid() = user_id);

-- Add format and resolution columns to animations table
ALTER TABLE public.animations
ADD COLUMN IF NOT EXISTS format TEXT DEFAULT 'MP4',
ADD COLUMN IF NOT EXISTS resolution TEXT DEFAULT '1920x1080';