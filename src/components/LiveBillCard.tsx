import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LegiScanSearchResult } from "@/types/legislation";

interface LiveBillCardProps {
  bill: LegiScanSearchResult;
  className?: string;
}

export function LiveBillCard({ bill, className }: LiveBillCardProps) {
  return (
    <Link
      to={`/advocacy/bill/${bill.bill_id}`}
      className={cn(
        "group block bg-card border-2 border-border rounded-lg p-5 transition-all hover:border-accent hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="font-display text-lg tracking-wide text-primary uppercase">
          {bill.bill_number}
        </span>
        <Badge variant="secondary" className="text-xs font-display tracking-wider">TN</Badge>
      </div>
      
      <h3 className="font-display text-base uppercase tracking-wide mb-2 group-hover:text-accent transition-colors line-clamp-2">
        {bill.title}
      </h3>
      
      <p className="text-xs text-muted-foreground mb-3 font-sans">
        {bill.last_action_date} • {bill.last_action}
      </p>
      
      <span className="inline-flex items-center gap-1 font-display text-sm tracking-wider uppercase text-accent group-hover:gap-2 transition-all">
        Take Action <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  );
}
