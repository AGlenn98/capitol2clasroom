-- Add SELECT policy to prevent public reading of subscriber emails
CREATE POLICY "Only service role can read subscriptions" 
ON bill_subscriptions 
FOR SELECT 
USING (auth.role() = 'service_role');