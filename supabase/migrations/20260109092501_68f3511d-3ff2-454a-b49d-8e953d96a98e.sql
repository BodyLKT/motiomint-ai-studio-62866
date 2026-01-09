-- Fix search_path for get_canonical_category function
CREATE OR REPLACE FUNCTION public.get_canonical_category(old_category text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SECURITY INVOKER
SET search_path = public
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