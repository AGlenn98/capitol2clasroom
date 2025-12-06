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
        "group block bg-card border border-border rounded-lg p-5 transition-all hover:border-accent hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-sm font-semibold text-primary">
          {bill.bill_number}
        </span>
        <Badge variant="secondary" className="text-xs">TN</Badge>
      </div>
      
      <h3 className="font-serif text-base font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {bill.title}
      </h3>
      
      <p className="text-xs text-muted-foreground mb-3">
        {bill.last_action_date} • {bill.last_action}
      </p>
      
      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
        Take action <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  );
}
