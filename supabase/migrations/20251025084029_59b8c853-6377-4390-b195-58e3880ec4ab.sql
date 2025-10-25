-- Remove duplicate foreign key constraint
-- Keep the standard Supabase naming convention and remove the custom one
ALTER TABLE public.user_downloads 
DROP CONSTRAINT IF EXISTS fk_user_downloads_animation;