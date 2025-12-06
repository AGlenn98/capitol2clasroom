import { Calendar, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface CriticalDate {
  date: string;
  label: string;
  description?: string;
  isPast: boolean;
  isCurrent?: boolean;
}

interface CriticalDatesTimelineProps {
  dates: CriticalDate[];
  className?: string;
}

export function CriticalDatesTimeline({ dates, className }: CriticalDatesTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <h3 className="font-serif font-semibold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-accent" />
        Critical Dates
      </h3>
      
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border" />
        
        <div className="space-y-4">
          {dates.map((date, index) => (
            <div key={index} className="relative">
              {/* Node */}
              <div 
                className={cn(
                  "absolute -left-4 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center",
                  date.isPast && "bg-success border-success",
                  date.isCurrent && "bg-accent border-accent ring-4 ring-accent/20",
                  !date.isPast && !date.isCurrent && "bg-muted border-border"
                )}
              >
                {date.isCurrent && (
                  <Flag className="w-2 h-2 text-accent-foreground" />
                )}
              </div>
              
              {/* Content */}
              <div className={cn(
                "ml-2",
                date.isPast && "opacity-60"
              )}>
                <p className={cn(
                  "text-sm font-medium",
                  date.isCurrent && "text-accent-foreground"
                )}>
                  {date.date}
                </p>
                <p className={cn(
                  "font-semibold",
                  date.isCurrent ? "text-foreground" : "text-foreground/80"
                )}>
                  {date.label}
                </p>
                {date.description && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {date.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
