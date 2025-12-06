import { Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { UserStance } from "@/types/legislation";

interface ContactLegislatorProps {
  billNumber: string;
  billTitle: string;
  stance: UserStance;
  sponsors?: Array<{
    name: string;
    email?: string;
    party: string;
    district: string;
  }>;
}

const generateEmailContent = (
  billNumber: string,
  billTitle: string,
  stance: UserStance
) => {
  const stanceText = stance === 'support' ? 'support' : stance === 'oppose' ? 'oppose' : 'share my thoughts on';
  const actionVerb = stance === 'support' ? 'vote in favor of' : stance === 'oppose' ? 'vote against' : 'carefully consider';
  
  return `Dear [Legislator Name],

I am writing as a constituent to ${stanceText} ${billNumber}: ${billTitle}.

${stance === 'support' 
  ? 'This legislation is important for our community because it addresses critical education needs. I believe it will have a positive impact on students, teachers, and families across Tennessee.'
  : stance === 'oppose'
  ? 'I have concerns about this legislation and its potential impact on our education system. I believe we should carefully consider alternative approaches that better serve our students and educators.'
  : 'I would like to share my perspective on this important education legislation and encourage thoughtful deliberation.'}

I respectfully urge you to ${actionVerb} this bill.

Thank you for your service and for considering my input.

Sincerely,
[Your Name]
[Your Address]
[Your City, TN ZIP]`;
};

export function ContactLegislator({
  billNumber,
  billTitle,
  stance,
  sponsors = [],
}: ContactLegislatorProps) {
  const [message, setMessage] = useState(() => 
    generateEmailContent(billNumber, billTitle, stance)
  );
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setMessage(generateEmailContent(billNumber, billTitle, stance));
    }
    setOpen(isOpen);
  };

  const handleSendEmail = (email?: string) => {
    const subject = encodeURIComponent(
      `${stance === 'support' ? 'Support for' : stance === 'oppose' ? 'Opposition to' : 'Regarding'} ${billNumber}: ${billTitle}`
    );
    const body = encodeURIComponent(message);
    const mailto = `mailto:${email || ''}?subject=${subject}&body=${body}`;
    window.open(mailto, '_blank');
  };

  // Tennessee General Assembly contact page
  const legislatorDirectoryUrl = "https://www.capitol.tn.gov/legislators/";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full gap-2 bg-primary hover:bg-primary/90">
          <Mail className="w-5 h-5" />
          Contact Legislator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif">Contact Your Legislator</DialogTitle>
          <DialogDescription>
            Send a pre-drafted email about {billNumber}. Customize the message below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Bill Sponsors */}
          {sponsors.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Bill Sponsors</h4>
              <div className="grid gap-2">
                {sponsors.map((sponsor, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{sponsor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {sponsor.party} • District {sponsor.district}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendEmail(sponsor.email)}
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Find Your Legislator */}
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
            <h4 className="text-sm font-medium mb-2">Find Your Legislator</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Look up your state representative and senator by district.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open(legislatorDirectoryUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              TN Legislature Directory
            </Button>
          </div>

          {/* Email Message */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Your Message
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[250px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Personalize this message before sending. Replace bracketed placeholders with your information.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              className="flex-1 gap-2"
              onClick={() => handleSendEmail()}
            >
              <Mail className="w-4 h-4" />
              Open in Email Client
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(message);
              }}
            >
              Copy Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
