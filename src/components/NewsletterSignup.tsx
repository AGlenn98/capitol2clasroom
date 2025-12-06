import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSignupProps {
  variant?: "inline" | "card";
  className?: string;
}

export function NewsletterSignup({ variant = "card", className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call - replace with actual newsletter signup
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive our latest policy updates in your inbox.",
    });
  };

  if (isSubmitted) {
    return (
      <div className={`flex items-center gap-3 p-4 bg-success/10 rounded-lg ${className}`}>
        <CheckCircle className="w-5 h-5 text-success" />
        <p className="text-sm font-medium">Thank you for subscribing!</p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "..." : "Subscribe"}
        </Button>
      </form>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20">
          <Mail className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-serif font-semibold">Stay Informed</h3>
          <p className="text-sm text-muted-foreground">Get policy updates in your inbox</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}