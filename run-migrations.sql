-- Combined Supabase Migrations
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/ucnmotytdxqeqsfqhmnc/sql/new

-- Migration 1: Create news_cache table
CREATE TABLE IF NOT EXISTS public.news_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  articles JSONB NOT NULL,
  sources JSONB NOT NULL,
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '1 hour')
);

CREATE INDEX IF NOT EXISTS idx_news_cache_expires_at ON public.news_cache(expires_at);

ALTER TABLE public.news_cache ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "News cache is publicly readable" ON public.news_cache;
CREATE POLICY "News cache is publicly readable"
ON public.news_cache
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Service role can manage news cache" ON public.news_cache;
CREATE POLICY "Service role can manage news cache"
ON public.news_cache
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Migration 2: Create bill_subscriptions table
CREATE TABLE IF NOT EXISTS public.bill_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  bill_id INTEGER NOT NULL,
  bill_number TEXT NOT NULL,
  bill_title TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE (email, bill_id)
);

ALTER TABLE public.bill_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can subscribe to bill notifications" ON public.bill_subscriptions;
CREATE POLICY "Anyone can subscribe to bill notifications"
ON public.bill_subscriptions
FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can manage subscriptions" ON public.bill_subscriptions;
CREATE POLICY "Service role can manage subscriptions"
ON public.bill_subscriptions
FOR ALL
USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Only service role can read subscriptions" ON public.bill_subscriptions;
CREATE POLICY "Only service role can read subscriptions"
ON public.bill_subscriptions
FOR SELECT
USING (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS idx_bill_subscriptions_bill_id ON public.bill_subscriptions (bill_id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_bill_subscriptions_email ON public.bill_subscriptions (email) WHERE is_active = true;

-- Verify tables were created
SELECT 'news_cache' as table_name, COUNT(*) as row_count FROM public.news_cache
UNION ALL
SELECT 'bill_subscriptions' as table_name, COUNT(*) as row_count FROM public.bill_subscriptions;
