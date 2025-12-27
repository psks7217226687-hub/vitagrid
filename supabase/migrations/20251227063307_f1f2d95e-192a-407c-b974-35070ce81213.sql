-- Create health_records table
CREATE TABLE public.health_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  record_type TEXT NOT NULL,
  provider TEXT,
  record_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;

-- RLS policies - users can only access their own records
CREATE POLICY "Users can view their own health records"
ON public.health_records
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own health records"
ON public.health_records
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health records"
ON public.health_records
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health records"
ON public.health_records
FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_health_records_updated_at
BEFORE UPDATE ON public.health_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();