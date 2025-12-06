import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
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
      <Layout>
        <section className="py-20">
          <div className="container max-w-xl text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-4">You're Subscribed!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for subscribing to the Nashville Policy Compass newsletter. 
              You'll receive our latest education policy updates, legislation tracking, and advocacy 
              opportunities directly in your inbox.
            </p>
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="container max-w-xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mx-auto mb-6">
              <Mail className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Stay Informed on Nashville Education Policy
            </h1>
            <p className="text-muted-foreground">
              Get weekly updates on legislation, policy changes, and opportunities to make your voice heard. 
              Join thousands of engaged Nashvillians who rely on our nonpartisan analysis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              We respect your privacy. Unsubscribe anytime. No spam, ever.
            </p>
          </form>

          <div className="mt-12">
            <h2 className="font-serif text-xl font-semibold mb-4 text-center">What You'll Receive</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h3 className="font-medium mb-1">Weekly Policy Digest</h3>
                <p className="text-sm text-muted-foreground">Summaries of the week's most important education policy developments.</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h3 className="font-medium mb-1">Legislation Alerts</h3>
                <p className="text-sm text-muted-foreground">Updates when key bills advance or face critical votes.</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h3 className="font-medium mb-1">Event Reminders</h3>
                <p className="text-sm text-muted-foreground">Notifications about public hearings and meetings.</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h3 className="font-medium mb-1">Action Opportunities</h3>
                <p className="text-sm text-muted-foreground">Ways to make your voice heard on issues that matter.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}