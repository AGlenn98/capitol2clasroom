import { TrendingUp, TrendingDown, Minus, DollarSign, GraduationCap, Users, BookOpen, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { BillImpact, ImpactDirection } from "@/lib/billCategories";
import { useBillImpact } from "@/hooks/useBillAnalysis";

interface ImpactDashboardProps {
  billNumber: string;
  billTitle: string;
  billDescription?: string;
}

const impactConfig = {
  funding: { label: 'Funding', icon: DollarSign },
  teachers: { label: 'Teachers', icon: GraduationCap },
  parents: { label: 'Parents', icon: Users },
  students: { label: 'Students', icon: BookOpen },
};

function DirectionIcon({ direction }: { direction: ImpactDirection }) {
  switch (direction) {
    case 'up':
      return <TrendingUp className="w-4 h-4 text-success" />;
    case 'down':
      return <TrendingDown className="w-4 h-4 text-destructive" />;
    default:
      return <Minus className="w-4 h-4 text-muted-foreground" />;
  }
}

function ImpactMeter({ score, direction }: { score: number; direction: ImpactDirection }) {
  const bars = Array.from({ length: 5 }, (_, i) => i < score);
  
  return (
    <div className="flex gap-0.5">
      {bars.map((filled, i) => (
        <div
          key={i}
          className={cn(
            "w-2 h-4 rounded-sm",
            filled
              ? direction === 'up' 
                ? 'bg-success' 
                : direction === 'down' 
                  ? 'bg-destructive' 
                  : 'bg-muted-foreground'
              : 'bg-muted'
          )}
        />
      ))}
    </div>
  );
}

export function ImpactDashboard({ billNumber, billTitle, billDescription }: ImpactDashboardProps) {
  const { data: impact, isLoading, error } = useBillImpact({
    billNumber,
    billTitle,
    billDescription,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing Impact...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !impact) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Policy Impact Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(impactConfig).map(([key, config]) => {
            const impactData = impact[key as keyof BillImpact];
            if (!impactData) return null;
            
            return (
              <div
                key={key}
                className={cn(
                  "p-3 rounded-lg border",
                  impactData.direction === 'up' && 'bg-success/5 border-success/20',
                  impactData.direction === 'down' && 'bg-destructive/5 border-destructive/20',
                  impactData.direction === 'neutral' && 'bg-muted/50 border-border'
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <config.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium">{config.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <ImpactMeter score={impactData.score} direction={impactData.direction} />
                  <DirectionIcon direction={impactData.direction} />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground mt-3 text-center">
          AI-generated assessment • For informational purposes only
        </p>
      </CardContent>
    </Card>
  );
}

// Compact inline version for bill cards
export function ImpactIndicators({ impact }: { impact: BillImpact }) {
  return (
    <div className="flex gap-2">
      {Object.entries(impactConfig).map(([key, config]) => {
        const data = impact[key as keyof BillImpact];
        if (!data || data.direction === 'neutral') return null;
        
        return (
          <div
            key={key}
            className={cn(
              "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px]",
              data.direction === 'up' && 'bg-success/10 text-success',
              data.direction === 'down' && 'bg-destructive/10 text-destructive'
            )}
          >
            <config.icon className="w-3 h-3" />
            {data.direction === 'up' ? '↑' : '↓'}
          </div>
        );
      })}
    </div>
  );
}
