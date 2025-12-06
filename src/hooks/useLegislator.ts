import { useQuery } from "@tanstack/react-query";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export interface LegislatorProfile {
  people_id: number;
  name: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  suffix?: string;
  nickname?: string;
  party: string;
  party_id: string;
  role: string;
  role_id: number;
  district: string;
  chamber: string;
  chamber_id: number;
  state: string;
  state_id: number;
  email?: string;
  capitol_phone?: string;
  capitol_address?: string;
  ballotpedia?: string;
  followthemoney_eid?: string;
  votesmart_id?: number;
  opensecrets_id?: string;
  knowwho_pid?: number;
  committee?: CommitteeMembership[];
}

export interface CommitteeMembership {
  committee_id: number;
  name: string;
  position?: string;
}

export interface SponsoredBill {
  bill_id: number;
  bill_number: string;
  title: string;
  last_action: string;
  last_action_date: string;
  session_id?: number;
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

      // Parse committee data if available
      const committees: CommitteeMembership[] = [];
      if (person.committee) {
        Object.values(person.committee).forEach((c: unknown) => {
          const comm = c as Record<string, unknown>;
          committees.push({
            committee_id: comm.committee_id as number,
            name: comm.name as string,
            position: comm.position as string | undefined,
          });
        });
      }
      
      return {
        people_id: person.people_id,
        name: `${person.first_name} ${person.last_name}`,
        first_name: person.first_name,
        last_name: person.last_name,
        middle_name: person.middle_name,
        suffix: person.suffix,
        nickname: person.nickname,
        party: person.party_id === '1' ? 'D' : person.party_id === '2' ? 'R' : person.party,
        party_id: person.party_id,
        role: person.role || 'Legislator',
        role_id: person.role_id,
        district: person.district,
        chamber: person.chamber,
        chamber_id: person.chamber_id,
        state: person.state,
        state_id: person.state_id,
        email: person.email,
        capitol_phone: person.phone,
        capitol_address: person.address,
        ballotpedia: person.ballotpedia,
        followthemoney_eid: person.followthemoney_eid,
        votesmart_id: person.votesmart_id,
        opensecrets_id: person.opensecrets_id,
        knowwho_pid: person.knowwho_pid,
        committee: committees,
      } as LegislatorProfile;
    },
    enabled: !!peopleId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useSponsoredBills(peopleId: number | null, filterEducation: boolean = false) {
  return useQuery({
    queryKey: ["sponsored-bills", peopleId, filterEducation],
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
          const title = (bill.title as string || '').toLowerCase();
          
          // Only filter if filterEducation is true
          const isEducationRelated = 
            title.includes('education') ||
            title.includes('school') ||
            title.includes('teacher') ||
            title.includes('student') ||
            title.includes('college') ||
            title.includes('university') ||
            title.includes('tuition') ||
            title.includes('curriculum') ||
            title.includes('literacy');
          
          if (!filterEducation || isEducationRelated) {
            bills.push({
              bill_id: bill.bill_id as number,
              bill_number: bill.number as string,
              title: bill.title as string,
              last_action: bill.last_action as string,
              last_action_date: bill.last_action_date as string,
              session_id: bill.session_id as number | undefined,
            });
          }
        }
      });
      
      // Sort by last action date (most recent first)
      bills.sort((a, b) => {
        const dateA = new Date(a.last_action_date || 0);
        const dateB = new Date(b.last_action_date || 0);
        return dateB.getTime() - dateA.getTime();
      });
      
      return bills;
    },
    enabled: !!peopleId,
    staleTime: 10 * 60 * 1000,
  });
}
