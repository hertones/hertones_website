DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe with valid data" ON public.newsletter_subscribers
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(email) <= 255
  AND email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
  AND (preference IS NULL OR length(preference) <= 64)
  AND length(source) <= 64
);

DROP POLICY IF EXISTS "Anyone can sign up for texts" ON public.sms_subscribers;
CREATE POLICY "Anyone can sign up for texts with valid data" ON public.sms_subscribers
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(email) <= 255
  AND email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
  AND phone ~ '^[0-9]{10,15}$'
  AND length(source) <= 64
);