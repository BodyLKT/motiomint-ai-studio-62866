
-- Drop the permissive INSERT and UPDATE policies
DROP POLICY IF EXISTS "Users can insert their own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can update their own subscription" ON public.user_subscriptions;

-- Create a SECURITY DEFINER function for managing subscriptions (admin or service_role only)
CREATE OR REPLACE FUNCTION public.manage_subscription(
  _user_id uuid,
  _plan_name text,
  _download_limit integer DEFAULT 20,
  _status text DEFAULT 'active',
  _end_date timestamptz DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _sub_id uuid;
BEGIN
  -- Only allow admins to call this function
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can manage subscriptions';
  END IF;

  -- Upsert: update if exists, insert if not
  INSERT INTO public.user_subscriptions (user_id, plan_name, download_limit, status, end_date)
  VALUES (_user_id, _plan_name, _download_limit, _status, _end_date)
  ON CONFLICT (user_id) DO UPDATE SET
    plan_name = EXCLUDED.plan_name,
    download_limit = EXCLUDED.download_limit,
    status = EXCLUDED.status,
    end_date = EXCLUDED.end_date,
    updated_at = now()
  RETURNING id INTO _sub_id;

  RETURN _sub_id;
END;
$$;

-- Add unique constraint on user_id if not exists (needed for ON CONFLICT)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_subscriptions_user_id_key'
  ) THEN
    ALTER TABLE public.user_subscriptions ADD CONSTRAINT user_subscriptions_user_id_key UNIQUE (user_id);
  END IF;
END $$;
