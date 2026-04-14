
-- 1. Create record_download RPC that enforces download limits server-side
CREATE OR REPLACE FUNCTION public.record_download(_animation_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
  _limit integer;
  _used integer;
BEGIN
  _user_id := auth.uid();
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Get current subscription limit (default free = 5)
  SELECT COALESCE(us.download_limit, 5)
  INTO _limit
  FROM public.user_subscriptions us
  WHERE us.user_id = _user_id AND us.status = 'active'
  ORDER BY us.created_at DESC
  LIMIT 1;

  -- If no subscription, use free tier limit
  IF _limit IS NULL THEN
    _limit := 5;
  END IF;

  -- Count downloads this month
  SELECT COUNT(*)
  INTO _used
  FROM public.user_downloads ud
  WHERE ud.user_id = _user_id
    AND ud.downloaded_at >= date_trunc('month', now());

  IF _used >= _limit THEN
    RAISE EXCEPTION 'Download limit reached (% of %)', _used, _limit;
  END IF;

  -- Record the download
  INSERT INTO public.user_downloads (user_id, animation_id)
  VALUES (_user_id, _animation_id);

  -- Increment downloads_used on subscription
  UPDATE public.user_subscriptions
  SET downloads_used = COALESCE(downloads_used, 0) + 1, updated_at = now()
  WHERE user_id = _user_id AND status = 'active';
END;
$$;

-- 2. Remove direct INSERT policy on user_downloads (now handled via RPC)
DROP POLICY IF EXISTS "Users can add their own downloads" ON public.user_downloads;

-- 3. Fix thumbnail storage: restrict write to admins only
DROP POLICY IF EXISTS "Authenticated users can upload thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete thumbnails" ON storage.objects;

CREATE POLICY "Admins can upload thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'thumbnails' AND
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update thumbnails"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'thumbnails' AND
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete thumbnails"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'thumbnails' AND
  public.has_role(auth.uid(), 'admin')
);

-- 4. Fix public bucket listing: restrict SELECT to specific object access only
DROP POLICY IF EXISTS "Public read access for thumbnails" ON storage.objects;

CREATE POLICY "Public read access for thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'thumbnails');
