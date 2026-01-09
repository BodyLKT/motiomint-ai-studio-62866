-- Add canonical_category column to animations table
ALTER TABLE public.animations
ADD COLUMN canonical_category text;

-- Create category mapping function
CREATE OR REPLACE FUNCTION public.get_canonical_category(old_category text)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE old_category
    WHEN 'Tech & Futuristic' THEN 'Tech & Digital'
    WHEN 'Business & Finance' THEN 'Tech & Digital'
    WHEN 'Abstract Backgrounds' THEN 'Abstract & Motion Backgrounds'
    WHEN 'Fitness & Lifestyle' THEN 'Lifestyle & Real World'
    WHEN 'Travel & Nature' THEN 'Lifestyle & Real World'
    WHEN 'Social Media Hooks' THEN 'Social & UI Hooks'
    ELSE old_category
  END;
$$;

-- Populate canonical_category for existing animations
UPDATE public.animations
SET canonical_category = public.get_canonical_category(category);

-- Create tags table
CREATE TABLE public.tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on tags
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

-- Anyone can view tags
CREATE POLICY "Anyone can view tags"
ON public.tags FOR SELECT
USING (true);

-- Insert the 30 predefined tags
INSERT INTO public.tags (name) VALUES
  ('ai'), ('data'), ('fintech'), ('saas'), ('dashboard'), ('charts'), ('cyber'), ('hologram'),
  ('abstract'), ('particles'), ('gradient'), ('mesh'), ('flow'), ('loop'), ('glow'), ('background'),
  ('fitness'), ('health'), ('energy'), ('travel'), ('nature'), ('routes'),
  ('social'), ('hook'), ('intro'), ('transition'), ('ui'), ('loader'), ('text'), ('reel');

-- Create animation_tags junction table
CREATE TABLE public.animation_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  animation_id uuid NOT NULL REFERENCES public.animations(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(animation_id, tag_id)
);

-- Enable RLS on animation_tags
ALTER TABLE public.animation_tags ENABLE ROW LEVEL SECURITY;

-- Anyone can view animation_tags
CREATE POLICY "Anyone can view animation_tags"
ON public.animation_tags FOR SELECT
USING (true);

-- Create tag_bundles table
CREATE TABLE public.tag_bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  tag_names text[] NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on tag_bundles
ALTER TABLE public.tag_bundles ENABLE ROW LEVEL SECURITY;

-- Anyone can view tag_bundles
CREATE POLICY "Anyone can view tag_bundles"
ON public.tag_bundles FOR SELECT
USING (true);

-- Insert predefined tag bundles
INSERT INTO public.tag_bundles (name, description, tag_names) VALUES
  ('AI Pack', 'AI and intelligent systems animations', ARRAY['ai', 'data', 'saas', 'dashboard', 'hologram', 'glow', 'loop']),
  ('Fintech Pack', 'Financial technology animations', ARRAY['fintech', 'data', 'charts', 'dashboard', 'saas', 'cyber', 'loop']),
  ('Cyber Pack', 'Cybersecurity and digital themes', ARRAY['cyber', 'ai', 'data', 'glow', 'hologram', 'background', 'loop']),
  ('Analytics Pack', 'Data visualization animations', ARRAY['charts', 'dashboard', 'data', 'saas', 'gradient', 'background', 'loop']),
  ('UI Kit Pack', 'UI elements and transitions', ARRAY['ui', 'loader', 'transition', 'intro', 'text', 'hook', 'loop']),
  ('Social Hooks Pack', 'Social media hook animations', ARRAY['social', 'hook', 'intro', 'transition', 'reel', 'text', 'loop']),
  ('Abstract Flow Pack', 'Abstract flowing backgrounds', ARRAY['abstract', 'flow', 'particles', 'gradient', 'mesh', 'background', 'loop']),
  ('Particles Pack', 'Particle effect animations', ARRAY['particles', 'glow', 'gradient', 'abstract', 'background', 'loop']),
  ('Gradient Pack', 'Gradient and mesh animations', ARRAY['gradient', 'mesh', 'flow', 'abstract', 'background', 'loop']),
  ('Fitness Pack', 'Fitness and workout themes', ARRAY['fitness', 'health', 'energy', 'glow', 'flow', 'loop']),
  ('Wellness Pack', 'Health and wellness themes', ARRAY['health', 'energy', 'flow', 'particles', 'loop']),
  ('Travel Pack', 'Travel and route animations', ARRAY['travel', 'routes', 'nature', 'background', 'loop']),
  ('Nature Pack', 'Nature and outdoor themes', ARRAY['nature', 'travel', 'background', 'flow', 'particles', 'loop']);