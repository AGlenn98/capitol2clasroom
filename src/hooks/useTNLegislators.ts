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

// Generate TN General Assembly photo URL
// Senate: https://www.capitol.tn.gov/senate/members/images/s[district].jpg
// House: https://www.capitol.tn.gov/house/members/images/h[district].jpg
function generatePhotoUrl(role: string, district: string): string {
  // Extract district number from district string (e.g., "SD-01" -> "01", "HD-99" -> "99")
  const districtMatch = district.match(/(\d+)/);
  if (!districtMatch) return "";
  
  const districtNum = districtMatch[1];
  const isSenate = role === "Sen" || district.startsWith("SD");
  
  if (isSenate) {
    return `https://www.capitol.tn.gov/senate/members/images/s${districtNum}.jpg`;
  } else {
    return `https://www.capitol.tn.gov/house/members/images/h${districtNum}.jpg`;
  }
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
      
      // Add photo URLs to legislators
      const legislators = (data.legislators || []).map((leg: TNLegislator) => ({
        ...leg,
        photo_url: generatePhotoUrl(leg.role, leg.district)
      }));
      
      return legislators;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes cache
  });
}
