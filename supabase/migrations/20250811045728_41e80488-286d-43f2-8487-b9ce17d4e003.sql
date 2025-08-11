-- Fix function search path security issue
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';

-- The OTP expiry warning is related to Supabase auth configuration, not our database
-- This needs to be fixed in the Supabase dashboard settings, not through SQL migration