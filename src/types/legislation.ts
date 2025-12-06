// LegiScan API Types
export interface LegiScanBill {
  bill_id: number;
  number: string;
  change_hash: string;
  url: string;
  status_date: string;
  status: number;
  last_action_date: string;
  last_action: string;
  title: string;
  description: string;
}

export interface LegiScanBillDetail {
  bill_id: number;
  bill_number: string;
  bill_type: string;
  body: string;
  body_id: number;
  current_body: string;
  current_body_id: number;
  title: string;
  description: string;
  committee: {
    committee_id: number;
    chamber: string;
    chamber_id: number;
    name: string;
  };
  pending_committee_id: number;
  history: Array<{
    date: string;
    action: string;
    chamber: string;
    chamber_id: number;
    importance: number;
  }>;
  sponsors: Array<{
    people_id: number;
    person_hash: string;
    party_id: string;
    party: string;
    role_id: number;
    role: string;
    name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    nickname: string;
    district: string;
    ftm_eid: number;
    votesmart_id: number;
    opensecrets_id: string;
    ballotpedia: string;
    sponsor_type_id: number;
    sponsor_order: number;
    committee_sponsor: number;
    committee_id: number;
  }>;
  sasts: Array<{
    type_id: number;
    type: string;
    sast_bill_number: string;
    sast_bill_id: number;
  }>;
  subjects: Array<{
    subject_id: number;
    subject_name: string;
  }>;
  texts: Array<{
    doc_id: number;
    date: string;
    type: string;
    type_id: number;
    mime: string;
    mime_id: number;
    url: string;
    state_link: string;
    text_size: number;
  }>;
  votes: Array<{
    roll_call_id: number;
    date: string;
    desc: string;
    yea: number;
    nay: number;
    nv: number;
    absent: number;
    total: number;
    passed: number;
    chamber: string;
    chamber_id: number;
    url: string;
    state_link: string;
  }>;
  amendments: Array<{
    amendment_id: number;
    adopted: number;
    chamber: string;
    chamber_id: number;
    date: string;
    title: string;
    description: string;
    mime: string;
    mime_id: number;
    url: string;
    state_link: string;
  }>;
  supplements: Array<{
    supplement_id: number;
    date: string;
    type_id: number;
    type: string;
    title: string;
    description: string;
    mime: string;
    mime_id: number;
    url: string;
    state_link: string;
  }>;
  calendar: Array<{
    type_id: number;
    type: string;
    date: string;
    time: string;
    location: string;
    description: string;
  }>;
  state: string;
  state_id: number;
  state_link: string;
  completed: number;
  status: number;
  status_date: string;
  progress: Array<{
    date: string;
    event: number;
  }>;
  url: string;
  change_hash: string;
  session: {
    session_id: number;
    session_name: string;
    session_title: string;
    year_start: number;
    year_end: number;
    special: number;
  };
}

export interface LegiScanSearchResult {
  relevance: number;
  state: string;
  bill_number: string;
  bill_id: number;
  change_hash: string;
  url: string;
  text_url: string;
  research_url: string;
  last_action_date: string;
  last_action: string;
  title: string;
}

export interface TennesseeLegislator {
  people_id: number;
  name: string;
  first_name: string;
  last_name: string;
  party: string;
  district: string;
  chamber: 'House' | 'Senate';
  email?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  source: string;
  date: string;
  url: string;
  category: string;
  imageUrl?: string;
}

export interface NewsSource {
  name: string;
  url: string;
}

export interface TennesseeLegislatorContact {
  name: string;
  title: string;
  party: "R" | "D";
  chamber: "House" | "Senate";
  district: string;
  counties: string[];
  phone: string;
  email: string;
  role?: string;
  imageUrl?: string;
}

export type UserStance = 'support' | 'oppose' | null;
