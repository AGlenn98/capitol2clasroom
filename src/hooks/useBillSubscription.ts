import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const subscriptionSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255),
  bill_id: z.number().int().positive(),
  bill_number: z.string().max(50),
  bill_title: z.string().max(500).optional(),
});

type SubscriptionInput = z.infer<typeof subscriptionSchema>;

export function useBillSubscription() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SubscriptionInput) => {
      // Validate input
      const validated = subscriptionSchema.parse(input);

      const { data, error } = await supabase
        .from("bill_subscriptions")
        .insert({
          email: validated.email,
          bill_id: validated.bill_id,
          bill_number: validated.bill_number,
          bill_title: validated.bill_title || null,
        })
        .select()
        .single();

      if (error) {
        // Check for duplicate subscription
        if (error.code === "23505") {
          throw new Error("You're already subscribed to updates for this bill.");
        }
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You'll receive email updates when this bill's status changes.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Subscription failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
