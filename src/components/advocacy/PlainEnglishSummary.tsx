import { Loader2, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBillSummary } from "@/hooks/useBillAnalysis";

interface PlainEnglishSummaryProps {
  billNumber: string;
  billTitle: string;
  billDescription?: string;
}

export function PlainEnglishSummary({ billNumber, billTitle, billDescription }: PlainEnglishSummaryProps) {
  const { data: summary, isLoading, error } = useBillSummary({
    billNumber,
    billTitle,
    billDescription,
  });

  if (isLoading) {
    return (
      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating plain English summary...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !summary) {
    return null;
  }

  return (
    <Card className="bg-accent/5 border-accent/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-accent" />
          Plain English Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm leading-relaxed">{summary}</p>
        <p className="text-[10px] text-muted-foreground mt-3">
          AI-generated summary • Read the full bill text for complete details
        </p>
      </CardContent>
    </Card>
  );
}
