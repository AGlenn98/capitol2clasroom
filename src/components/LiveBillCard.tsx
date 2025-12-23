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
        "group block bg-card border border-border/40 rounded-2xl p-5 transition-all hover:border-primary/30 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-sm font-semibold text-primary">
          {bill.bill_number}
        </span>
        <Badge variant="secondary" className="text-xs bg-secondary/60">TN</Badge>
      </div>
      
      <h3 className="font-display text-sm tracking-wide mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {bill.title?.toUpperCase()}
      </h3>
      
      <p className="text-xs text-muted-foreground mb-3 font-sans">
        {bill.last_action_date} • {bill.last_action}
      </p>
      
      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all font-sans">
        Take action <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  );
}
