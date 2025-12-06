import { useQuery } from "@tanstack/react-query";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export interface TNLegislator {
  people_id: number;
  name: string;
  first_name: string;
  last_name: string;
  party: string;
  party_id: string;
  role: string;
  district: string;
  photo_url?: string;
  email?: string;
  capitol_phone?: string;
  ballotpedia_url?: string;
  votesmart_url?: string;
}

export function useTNLegislators() {
  return useQuery({
    queryKey: ["tn-legislators"],
    queryFn: async (): Promise<TNLegislator[]> => {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/legislation?action=getTNLegislators`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch Tennessee legislators");
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      return data.legislators || [];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes cache
  });
}
