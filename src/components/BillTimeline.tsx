import { cn } from "@/lib/utils";
import { Check, Circle, X } from "lucide-react";

export type TimelineStage = 
  | "introduced"
  | "first_reading"
  | "committee"
  | "floor_vote"
  | "second_chamber"
  | "governor"
  | "enacted"
  | "failed";

export interface TimelineStep {
  stage: TimelineStage;
  label: string;
  date?: string;
  completed: boolean;
  current?: boolean;
  failed?: boolean;
}

interface BillTimelineProps {
  steps: TimelineStep[];
  compact?: boolean;
  className?: string;
}

const stageOrder: TimelineStage[] = [
  "introduced",
  "first_reading", 
  "committee",
  "floor_vote",
  "second_chamber",
  "governor",
  "enacted"
];

export function BillTimeline({ steps, compact = false, className }: BillTimelineProps) {
  const hasFailed = steps.some(s => s.failed);

  return (
    <div className={cn("relative", className)}>
      {/* Timeline track */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          
          return (
            <div 
              key={step.stage} 
              className={cn(
                "flex flex-col items-center relative",
                !isLast && "flex-1"
              )}
            >
              {/* Connector line */}
              {!isLast && (
                <div 
                  className={cn(
                    "absolute top-3 left-1/2 h-0.5 w-full",
                    step.completed && !step.failed ? "bg-success" : "bg-border"
                  )}
                />
              )}
              
              {/* Step node */}
              <div 
                className={cn(
                  "relative z-10 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all",
                  step.failed && "bg-destructive border-destructive",
                  step.completed && !step.failed && "bg-success border-success",
                  step.current && !step.failed && "bg-accent border-accent ring-4 ring-accent/20",
                  !step.completed && !step.current && !step.failed && "bg-muted border-border"
                )}
              >
                {step.failed ? (
                  <X className="w-3 h-3 text-destructive-foreground" />
                ) : step.completed ? (
                  <Check className="w-3 h-3 text-success-foreground" />
                ) : step.current ? (
                  <Circle className="w-2 h-2 fill-accent-foreground text-accent-foreground" />
                ) : (
                  <Circle className="w-2 h-2 text-muted-foreground" />
                )}
              </div>

              {/* Label */}
              {!compact && (
                <div className="mt-2 text-center">
                  <p className={cn(
                    "text-xs font-medium leading-tight",
                    step.current ? "text-accent-foreground" : 
                    step.completed ? "text-foreground" : 
                    step.failed ? "text-destructive" :
                    "text-muted-foreground"
                  )}>
                    {step.label}
                  </p>
                  {step.date && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">{step.date}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Compact labels tooltip hint */}
      {compact && (
        <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
          <span>{steps[0]?.label}</span>
          <span>{steps[steps.length - 1]?.label}</span>
        </div>
      )}
    </div>
  );
}

// Helper function to generate timeline steps from a bill status
export function generateTimelineSteps(
  currentStage: TimelineStage,
  billStatus: "proposed" | "committee" | "passed" | "failed",
  dates?: Record<TimelineStage, string>
): TimelineStep[] {
  const stageLabels: Record<TimelineStage, string> = {
    introduced: "Introduced",
    first_reading: "1st Reading",
    committee: "Committee",
    floor_vote: "Floor Vote",
    second_chamber: "2nd Chamber",
    governor: "Governor",
    enacted: "Enacted",
    failed: "Failed"
  };

  // Determine where the bill failed
  const failedStage = billStatus === "failed" ? currentStage : null;
  
  // Get the current stage index
  const currentIndex = stageOrder.indexOf(currentStage);
  
  return stageOrder.map((stage, index) => {
    const isFailed = failedStage === stage;
    const isCompleted = index < currentIndex || (billStatus === "passed" && index <= currentIndex);
    const isCurrent = index === currentIndex && billStatus !== "passed" && billStatus !== "failed";

    return {
      stage,
      label: stageLabels[stage],
      date: dates?.[stage],
      completed: isCompleted,
      current: isCurrent,
      failed: isFailed
    };
  });
}
