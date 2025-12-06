import { Share2, Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { UserStance } from "@/types/legislation";

interface SocialShareProps {
  billNumber: string;
  billTitle: string;
  billUrl: string;
  stance: UserStance;
}

export function SocialShare({ billNumber, billTitle, billUrl, stance }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const stanceEmoji = stance === 'support' ? '✅' : stance === 'oppose' ? '❌' : '📋';
  const stanceText = stance === 'support' ? 'I support' : stance === 'oppose' ? 'I oppose' : "Check out";
  
  const shareText = `${stanceEmoji} ${stanceText} ${billNumber}: ${billTitle}. Learn more about Tennessee education policy:`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(billUrl);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${billUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="w-full gap-2">
          <Share2 className="w-5 h-5" />
          Share on Social
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => window.open(shareLinks.twitter, '_blank')}>
          <Twitter className="w-4 h-4 mr-2" />
          Share on X
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(shareLinks.facebook, '_blank')}>
          <Facebook className="w-4 h-4 mr-2" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(shareLinks.linkedin, '_blank')}>
          <Linkedin className="w-4 h-4 mr-2" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard}>
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-success" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
