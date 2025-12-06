import { useQuery } from "@tanstack/react-query";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export interface LegislatorProfile {
  people_id: number;
  name: string;
  first_name: string;
  last_name: string;
  party: string;
  role: string;
  district: string;
  chamber: string;
  email?: string;
  capitol_phone?: string;
  capitol_address?: string;
  ballotpedia?: string;
  votesmart_id?: number;
}

export interface SponsoredBill {
  bill_id: number;
  bill_number: string;
  title: string;
  last_action: string;
  last_action_date: string;
}

export function useLegislatorProfile(peopleId: number | null) {
  return useQuery({
    queryKey: ["legislator-profile", peopleId],
    queryFn: async () => {
      if (!peopleId) return null;
      
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/legislation?action=getPerson&person_id=${peopleId}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch legislator profile");
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const person = data.person;
      
      if (!person) {
        throw new Error("Legislator not found");
      }
      
      return {
        people_id: person.people_id,
        name: `${person.first_name} ${person.last_name}`,
        first_name: person.first_name,
        last_name: person.last_name,
        party: person.party_id === '1' ? 'D' : person.party_id === '2' ? 'R' : person.party,
        role: person.role || 'Legislator',
        district: person.district,
        chamber: person.chamber,
        email: person.email,
        capitol_phone: person.phone,
        capitol_address: person.address,
        ballotpedia: person.ballotpedia,
        votesmart_id: person.votesmart_id,
      } as LegislatorProfile;
    },
    enabled: !!peopleId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useSponsoredBills(peopleId: number | null) {
  return useQuery({
    queryKey: ["sponsored-bills", peopleId],
    queryFn: async () => {
      if (!peopleId) return [];
      
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/legislation?action=getSponsoredList&people_id=${peopleId}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch sponsored bills");
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const sponsoredList = data.sponsoredbills || {};
      const bills: SponsoredBill[] = [];
      
      Object.entries(sponsoredList).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          const bill = value as Record<string, unknown>;
          // Filter for education-related bills
          const title = (bill.title as string || '').toLowerCase();
          if (
            title.includes('education') ||
            title.includes('school') ||
            title.includes('teacher') ||
            title.includes('student') ||
            title.includes('college') ||
            title.includes('university')
          ) {
            bills.push({
              bill_id: bill.bill_id as number,
              bill_number: bill.number as string,
              title: bill.title as string,
              last_action: bill.last_action as string,
              last_action_date: bill.last_action_date as string,
            });
          }
        }
      });
      
      return bills;
    },
    enabled: !!peopleId,
    staleTime: 10 * 60 * 1000,
  });
}
