import { useState } from "react";
import { Bell, Loader2, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBillSubscription } from "@/hooks/useBillSubscription";

interface BillSubscriptionProps {
  billId: number;
  billNumber: string;
  billTitle?: string;
  variant?: "card" | "inline";
}

export function BillSubscription({
  billId,
  billNumber,
  billTitle,
  variant = "card",
}: BillSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { mutate: subscribe, isPending } = useBillSubscription();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;

    subscribe(
      {
        email: email.trim(),
        bill_id: billId,
        bill_number: billNumber,
        bill_title: billTitle,
      },
      {
        onSuccess: () => {
          setIsSubscribed(true);
          setEmail("");
        },
      }
    );
  };

  if (isSubscribed) {
    return (
      <div className={variant === "card" ? "p-4 bg-success/10 rounded-lg border border-success/20" : "flex items-center gap-2 text-success"}>
        <Check className="w-5 h-5 text-success" />
        <span className="text-sm font-medium">Subscribed to {billNumber} updates</span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 h-9"
          required
        />
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Bell className="w-4 h-4 mr-1" />
              Alert me
            </>
          )}
        </Button>
      </form>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bell className="w-4 h-4 text-accent" />
          Get Bill Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-3">
          Receive email notifications when {billNumber} changes status.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Bell className="w-4 h-4 mr-2" />
            )}
            Subscribe to Updates
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground mt-3 text-center">
          We'll only email you about this bill. Unsubscribe anytime.
        </p>
      </CardContent>
    </Card>
  );
}
