import { StanceToggle } from "./StanceToggle";
import { ContactLegislator } from "./ContactLegislator";
import { SocialShare } from "./SocialShare";
import { UserStance } from "@/types/legislation";
import { cn } from "@/lib/utils";

interface AdvocacyBarProps {
  billId: number;
  billNumber: string;
  billTitle: string;
  stance: UserStance;
  onStanceChange: (stance: UserStance) => void;
  sponsors?: Array<{
    name: string;
    email?: string;
    party: string;
    district: string;
  }>;
  className?: string;
}

export function AdvocacyBar({
  billId,
  billNumber,
  billTitle,
  stance,
  onStanceChange,
  sponsors,
  className,
}: AdvocacyBarProps) {
  const billUrl = `${window.location.origin}/advocacy/bill/${billId}`;

  return (
    <div className={cn(
      "bg-card border border-border rounded-lg p-6 space-y-6 sticky top-24",
      className
    )}>
      <div className="text-center">
        <h3 className="font-serif text-lg font-semibold mb-1">Take Action</h3>
        <p className="text-sm text-muted-foreground">
          Make your voice heard on {billNumber}
        </p>
      </div>

      {/* Stance Toggle */}
      <StanceToggle
        stance={stance}
        onStanceChange={onStanceChange}
      />

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Action Buttons */}
      <div className="space-y-3">
        <ContactLegislator
          billNumber={billNumber}
          billTitle={billTitle}
          stance={stance}
          sponsors={sponsors}
        />
        
        <SocialShare
          billNumber={billNumber}
          billTitle={billTitle}
          billUrl={billUrl}
          stance={stance}
        />
      </div>

      {/* Pro tip */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          💡 Setting your stance customizes your outreach messages
        </p>
      </div>
    </div>
  );
}
