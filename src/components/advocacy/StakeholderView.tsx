import { ThumbsUp, ThumbsDown, Loader2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStakeholderAnalysis } from "@/hooks/useBillAnalysis";
import { cn } from "@/lib/utils";

interface StakeholderViewProps {
  billNumber: string;
  billTitle: string;
  billDescription?: string;
}

export function StakeholderView({ billNumber, billTitle, billDescription }: StakeholderViewProps) {
  const { data: analysis, isLoading, error } = useStakeholderAnalysis({
    billNumber,
    billTitle,
    billDescription,
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing stakeholder positions...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !analysis) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Users className="w-4 h-4 text-accent" />
          Stakeholder Perspectives
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Support */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ThumbsUp className="w-4 h-4 text-success" />
            <span className="text-xs font-semibold text-success">In Support</span>
          </div>
          <div className="space-y-2">
            {analysis.support?.map((position, i) => (
              <div
                key={i}
                className="p-3 bg-success/5 border border-success/20 rounded-lg"
              >
                <p className="text-xs font-semibold text-foreground mb-1">
                  {position.group}
                </p>
                <p className="text-xs text-muted-foreground">
                  "{position.argument}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Oppose */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ThumbsDown className="w-4 h-4 text-destructive" />
            <span className="text-xs font-semibold text-destructive">In Opposition</span>
          </div>
          <div className="space-y-2">
            {analysis.oppose?.map((position, i) => (
              <div
                key={i}
                className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg"
              >
                <p className="text-xs font-semibold text-foreground mb-1">
                  {position.group}
                </p>
                <p className="text-xs text-muted-foreground">
                  "{position.argument}"
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground text-center pt-2">
          AI-generated analysis • Perspectives may not represent official positions
        </p>
      </CardContent>
    </Card>
  );
}
