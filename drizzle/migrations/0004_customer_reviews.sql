CREATE TABLE public.customer_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL CHECK (char_length(quote) <= 2000),
  author_name text NOT NULL CHECK (char_length(author_name) <= 120),
  author_role text NOT NULL CHECK (char_length(author_role) <= 160),
  rating smallint NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_approved boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.customer_reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.customer_reviews TO authenticated;
GRANT ALL ON public.customer_reviews TO service_role;

ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read approved reviews"
  ON public.customer_reviews
  FOR SELECT
  TO anon, authenticated
  USING (is_approved OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin manage reviews"
  ON public.customer_reviews
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.customer_reviews (quote, author_name, author_role, rating, is_approved, sort_order) VALUES
(
  'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway.',
  'Monty Moni',
  'CEO, Keen IT Solution',
  5,
  true,
  1
),
(
  'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway.',
  'Mike Hotten',
  'CEO, Brick Consulting',
  5,
  true,
  2
),
(
  'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway.',
  'John Bhai',
  'CEO, Brick Consulting',
  5,
  true,
  3
),
(
  'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway.',
  'Jorina Bibi',
  'CEO, Brick Consulting',
  5,
  true,
  4
),
(
  'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway.',
  'Delu Beta',
  'CEO, Brick Consulting',
  5,
  true,
  5
);
