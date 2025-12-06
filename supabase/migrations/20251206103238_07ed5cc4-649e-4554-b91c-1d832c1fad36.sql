-- Table to store email subscriptions for bill status notifications
CREATE TABLE public.bill_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  bill_id INTEGER NOT NULL,
  bill_number TEXT NOT NULL,
  bill_title TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  
  -- Prevent duplicate subscriptions
  UNIQUE (email, bill_id)
);

-- Enable Row Level Security
ALTER TABLE public.bill_subscriptions ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert their email)
CREATE POLICY "Anyone can subscribe to bill notifications"
ON public.bill_subscriptions
FOR INSERT
WITH CHECK (true);

-- Only service role can read subscriptions (for admin/sending notifications)
CREATE POLICY "Service role can manage subscriptions"
ON public.bill_subscriptions
FOR ALL
USING (auth.role() = 'service_role');

-- Allow users to unsubscribe using their email (via edge function)
-- This will be handled by service role in edge function

-- Add index for querying by bill_id and active status
CREATE INDEX idx_bill_subscriptions_bill_id ON public.bill_subscriptions (bill_id) WHERE is_active = true;
CREATE INDEX idx_bill_subscriptions_email ON public.bill_subscriptions (email) WHERE is_active = true;