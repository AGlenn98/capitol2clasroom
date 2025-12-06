import { useQuery } from "@tanstack/react-query";
import { BillImpact, StakeholderAnalysis } from "@/lib/billCategories";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface AnalysisParams {
  billNumber: string;
  billTitle: string;
  billDescription?: string;
}

async function fetchAnalysis(params: AnalysisParams, action: string) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/bill-analysis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...params,
      action,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Analysis failed');
  }

  const data = await response.json();
  return data.result;
}

export function useBillSummary(params: AnalysisParams | null) {
  return useQuery<string>({
    queryKey: ['bill-summary', params?.billNumber],
    queryFn: () => fetchAnalysis(params!, 'summary'),
    enabled: !!params,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - summaries don't change
    retry: 1,
  });
}

export function useBillImpact(params: AnalysisParams | null) {
  return useQuery<BillImpact>({
    queryKey: ['bill-impact', params?.billNumber],
    queryFn: () => fetchAnalysis(params!, 'impact'),
    enabled: !!params,
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });
}

export function useStakeholderAnalysis(params: AnalysisParams | null) {
  return useQuery<StakeholderAnalysis>({
    queryKey: ['bill-stakeholders', params?.billNumber],
    queryFn: () => fetchAnalysis(params!, 'stakeholders'),
    enabled: !!params,
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });
}
