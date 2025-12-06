import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

type BillStatus = "proposed" | "committee" | "passed" | "failed";

interface LegislationCardProps {
  billNumber: string;
  title: string;
  summary: string;
  status: BillStatus;
  category: string;
  sponsor: string;
  lastAction: string;
  lastActionDate: string;
  href: string;
  className?: string;
}

const statusConfig: Record<BillStatus, { label: string; className: string }> = {
  proposed: { label: "Proposed", className: "bg-secondary text-secondary-foreground" },
  committee: { label: "In Committee", className: "bg-accent/20 text-accent-foreground border-accent/50" },
  passed: { label: "Passed", className: "bg-success/20 text-success border-success/50" },
  failed: { label: "Failed", className: "bg-destructive/20 text-destructive border-destructive/50" },
};

export function LegislationCard({
  billNumber,
  title,
  summary,
  status,
  category,
  sponsor,
  lastAction,
  lastActionDate,
  href,
  className = "",
}: LegislationCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Link
      to={href}
      className={cn(
        "group block bg-card border border-border rounded-lg p-6 transition-all hover:border-accent hover:shadow-lg",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="font-mono text-sm font-semibold text-primary">{billNumber}</span>
        <Badge variant="outline" className={statusInfo.className}>
          {statusInfo.label}
        </Badge>
        <Badge variant="secondary">{category}</Badge>
      </div>

      <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{summary}</p>

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <User className="w-3 h-3" />
          {sponsor}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {lastActionDate}
        </span>
      </div>

      <div className="pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground mb-2">
          <span className="font-medium">Last Action:</span> {lastAction}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          View details <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}