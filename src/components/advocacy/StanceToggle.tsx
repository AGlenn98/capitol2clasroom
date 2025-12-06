import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserStance } from "@/types/legislation";

interface StanceToggleProps {
  stance: UserStance;
  onStanceChange: (stance: UserStance) => void;
  className?: string;
}

export function StanceToggle({ stance, onStanceChange, className }: StanceToggleProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-sm font-medium text-muted-foreground">Your Stance</p>
      <div className="flex gap-2">
        <Button
          variant={stance === 'support' ? 'default' : 'outline'}
          size="lg"
          className={cn(
            "flex-1 gap-2 transition-all",
            stance === 'support' && "bg-success hover:bg-success/90 text-success-foreground"
          )}
          onClick={() => onStanceChange(stance === 'support' ? null : 'support')}
        >
          <ThumbsUp className="w-4 h-4" />
          Support
        </Button>
        <Button
          variant={stance === 'oppose' ? 'default' : 'outline'}
          size="lg"
          className={cn(
            "flex-1 gap-2 transition-all",
            stance === 'oppose' && "bg-destructive hover:bg-destructive/90"
          )}
          onClick={() => onStanceChange(stance === 'oppose' ? null : 'oppose')}
        >
          <ThumbsDown className="w-4 h-4" />
          Oppose
        </Button>
      </div>
      {stance && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-muted-foreground"
          onClick={() => onStanceChange(null)}
        >
          <Minus className="w-3 h-3 mr-1" />
          Clear stance
        </Button>
      )}
    </div>
  );
}
