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

// Generate Ballotpedia photo URL
// Pattern: https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/[First_Last].jpg
function generatePhotoUrl(firstName: string, lastName: string): string {
  if (!firstName || !lastName) return "";
  
  // Clean and format names for Ballotpedia URL
  const cleanFirst = firstName.trim().replace(/\s+/g, '_');
  const cleanLast = lastName.trim().replace(/\s+/g, '_');
  
  return `https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/${cleanFirst}_${cleanLast}.jpg`;
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
      
      // Add photo URLs to legislators using Ballotpedia pattern
      const legislators = (data.legislators || []).map((leg: TNLegislator) => ({
        ...leg,
        photo_url: generatePhotoUrl(leg.first_name, leg.last_name)
      }));
      
      return legislators;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes cache
  });
}
