import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckSquare, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { LegiScanSearchResult } from "@/types/legislation";
import { useState } from "react";

interface LiveBillCardProps {
  bill: LegiScanSearchResult;
  className?: string;
}

export function LiveBillCard({ bill, className }: LiveBillCardProps) {
  const [isTracking, setIsTracking] = useState(false);

  const handleTrackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTracking(!isTracking);
  };

  return (
    <Link
      to={`/advocacy/bill/${bill.bill_id}`}
      className={cn(
        "group block bg-card border-2 border-border rounded-lg p-5 transition-all hover:border-primary hover:shadow-lg relative overflow-hidden",
        className
      )}
    >
      {/* Left accent stripe */}
      <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:bg-accent transition-colors" />
      
      <div className="pl-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold text-primary tracking-wide">
              {bill.bill_number}
            </span>
            <Badge variant="outline" className="text-xs font-semibold border-2 border-primary/30 text-primary">
              TN
            </Badge>
          </div>
          
          {/* Vote-style track button */}
          <button
            onClick={handleTrackClick}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-accent transition-colors"
            aria-label={isTracking ? "Stop tracking this bill" : "Track this bill"}
          >
            {isTracking ? (
              <CheckSquare className="w-5 h-5 text-accent" />
            ) : (
              <Square className="w-5 h-5" />
            )}
          </button>
        </div>
        
        <h3 className="font-display text-base tracking-wide mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {bill.title?.toUpperCase()}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 font-sans">
          <span className="font-medium">{bill.last_action_date}</span>
          <span className="mx-2">•</span>
          <span className="line-clamp-1">{bill.last_action}</span>
        </p>
        
        <span className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-accent group-hover:gap-3 transition-all">
          Take Action 
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
