CREATE TABLE public.job_post_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL CHECK (char_length(contact_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (char_length(phone) <= 40),
  company text NOT NULL CHECK (char_length(company) BETWEEN 1 AND 160),
  job_title text NOT NULL CHECK (char_length(job_title) BETWEEN 1 AND 160),
  location text NOT NULL CHECK (char_length(location) BETWEEN 1 AND 160),
  job_type text NOT NULL DEFAULT 'Full-time' CHECK (char_length(job_type) <= 40),
  openings integer NOT NULL DEFAULT 1 CHECK (openings BETWEEN 1 AND 1000),
  salary text CHECK (char_length(salary) <= 120),
  description text NOT NULL CHECK (char_length(description) BETWEEN 1 AND 5000),
  requirements text CHECK (char_length(requirements) <= 5000),
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.job_post_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.job_post_requests TO authenticated;
GRANT ALL ON public.job_post_requests TO service_role;
ALTER TABLE public.job_post_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone submit job post" ON public.job_post_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY "admin read job posts" ON public.job_post_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin update job posts" ON public.job_post_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin delete job posts" ON public.job_post_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));