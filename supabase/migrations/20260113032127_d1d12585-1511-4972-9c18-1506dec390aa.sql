-- Create emergency_profiles table for storing emergency health info
CREATE TABLE public.emergency_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  blood_type TEXT,
  allergies TEXT[],
  medications TEXT[],
  medical_conditions TEXT[],
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shared_access_links table for temporary QR code access
CREATE TABLE public.shared_access_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.emergency_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_access_links ENABLE ROW LEVEL SECURITY;

-- RLS policies for emergency_profiles
CREATE POLICY "Users can view their own emergency profile"
ON public.emergency_profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own emergency profile"
ON public.emergency_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own emergency profile"
ON public.emergency_profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own emergency profile"
ON public.emergency_profiles FOR DELETE
USING (auth.uid() = user_id);

-- RLS policies for shared_access_links
CREATE POLICY "Users can view their own shared links"
ON public.shared_access_links FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own shared links"
ON public.shared_access_links FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own shared links"
ON public.shared_access_links FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own shared links"
ON public.shared_access_links FOR DELETE
USING (auth.uid() = user_id);

-- Function to get emergency profile by access token (public access for doctors)
CREATE OR REPLACE FUNCTION public.get_emergency_profile_by_token(token TEXT)
RETURNS TABLE (
  full_name TEXT,
  date_of_birth DATE,
  blood_type TEXT,
  allergies TEXT[],
  medications TEXT[],
  medical_conditions TEXT[],
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  additional_notes TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ep.full_name,
    ep.date_of_birth,
    ep.blood_type,
    ep.allergies,
    ep.medications,
    ep.medical_conditions,
    ep.emergency_contact_name,
    ep.emergency_contact_phone,
    ep.additional_notes
  FROM shared_access_links sal
  JOIN emergency_profiles ep ON ep.user_id = sal.user_id
  WHERE sal.access_token = token
    AND sal.is_active = true
    AND sal.expires_at > now();
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_emergency_profiles_updated_at
BEFORE UPDATE ON public.emergency_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();