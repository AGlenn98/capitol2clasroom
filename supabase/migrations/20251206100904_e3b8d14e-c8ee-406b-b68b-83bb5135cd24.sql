-- Create table to cache news articles
CREATE TABLE public.news_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  articles JSONB NOT NULL,
  sources JSONB NOT NULL,
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '1 hour')
);

-- Create index for expiry lookups
CREATE INDEX idx_news_cache_expires_at ON public.news_cache(expires_at);

-- Enable RLS but allow public read access (news is public data)
ALTER TABLE public.news_cache ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read cached news
CREATE POLICY "News cache is publicly readable" 
ON public.news_cache 
FOR SELECT 
USING (true);

-- Only service role can insert/update/delete (edge functions use service role)
CREATE POLICY "Service role can manage news cache" 
ON public.news_cache 
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');