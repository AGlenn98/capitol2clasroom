import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LEGISCAN_API_KEY = Deno.env.get('LEGISCAN_API_KEY');
const BASE_URL = 'https://api.legiscan.com';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!LEGISCAN_API_KEY) {
      throw new Error('LEGISCAN_API_KEY is not configured');
    }

    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'getSessionList';
    
    let apiUrl = '';
    
    switch (action) {
      case 'getSessionList':
        // Get Tennessee legislative sessions
        apiUrl = `${BASE_URL}/?key=${LEGISCAN_API_KEY}&op=getSessionList&state=TN`;
        break;
        
      case 'getMasterList':
        // Get all bills from Tennessee current session
        const sessionId = url.searchParams.get('session_id');
        if (sessionId) {
          apiUrl = `${BASE_URL}/?key=${LEGISCAN_API_KEY}&op=getMasterList&id=${sessionId}`;
        } else {
          apiUrl = `${BASE_URL}/?key=${LEGISCAN_API_KEY}&op=getMasterList&state=TN`;
        }
        break;
        
      case 'getBill':
        // Get specific bill details
        const billId = url.searchParams.get('bill_id');
        if (!billId) {
          throw new Error('bill_id is required');
        }
        apiUrl = `${BASE_URL}/?key=${LEGISCAN_API_KEY}&op=getBill&id=${billId}`;
        break;
        
      case 'search':
        // Search for education-related bills
        const query = url.searchParams.get('query') || 'education';
        const year = url.searchParams.get('year') || '2';
        apiUrl = `${BASE_URL}/?key=${LEGISCAN_API_KEY}&op=search&state=TN&query=${encodeURIComponent(query)}&year=${year}`;
        break;
        
      case 'getSponsoredList':
        // Get bills sponsored by a specific legislator
        const peopleId = url.searchParams.get('people_id');
        if (!peopleId) {
          throw new Error('people_id is required');
        }
        apiUrl = `${BASE_URL}/?key=${LEGISCAN_API_KEY}&op=getSponsoredList&id=${peopleId}`;
        break;
        
      case 'getPerson':
        // Get legislator details
        const personId = url.searchParams.get('person_id');
        if (!personId) {
          throw new Error('person_id is required');
        }
        apiUrl = `${BASE_URL}/?key=${LEGISCAN_API_KEY}&op=getPerson&id=${personId}`;
        break;

      case 'getTNLegislators':
        // Get Tennessee legislators by fetching education bills and extracting unique sponsors
        console.log('Fetching TN legislators from education bills');
        
        // First, search for education bills to get sponsors
        const searchUrl = `${BASE_URL}/?key=${LEGISCAN_API_KEY}&op=search&state=TN&query=education&year=2`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();
        
        if (searchData.status === 'ERROR') {
          throw new Error(searchData.alert?.message || 'Search failed');
        }

        const billIds = Object.values(searchData.searchresult || {})
          .filter((item: unknown) => typeof item === 'object' && item !== null && 'bill_id' in (item as Record<string, unknown>))
          .slice(0, 15) // Limit to 15 bills for performance
          .map((item: unknown) => (item as { bill_id: number }).bill_id);

        console.log(`Found ${billIds.length} bills, fetching sponsors`);

        // Fetch bill details to get sponsors
        const legislatorsMap = new Map<number, unknown>();
        
        for (const billId of billIds) {
          try {
            const billUrl = `${BASE_URL}/?key=${LEGISCAN_API_KEY}&op=getBill&id=${billId}`;
            const billResponse = await fetch(billUrl);
            const billData = await billResponse.json();
            
            if (billData.bill?.sponsors) {
              for (const sponsor of billData.bill.sponsors) {
                if (!legislatorsMap.has(sponsor.people_id)) {
                  legislatorsMap.set(sponsor.people_id, {
                    people_id: sponsor.people_id,
                    name: sponsor.name,
                    first_name: sponsor.first_name,
                    last_name: sponsor.last_name,
                    party: sponsor.party,
                    party_id: sponsor.party_id,
                    role: sponsor.role,
                    district: sponsor.district,
                    photo_url: sponsor.bio?.social?.image || '',
                    email: sponsor.bio?.social?.email || '',
                    capitol_phone: sponsor.bio?.social?.capitol_phone || '',
                    ballotpedia_url: sponsor.bio?.social?.ballotpedia || '',
                    votesmart_url: sponsor.bio?.social?.votesmart || '',
                  });
                }
              }
            }
          } catch (e) {
            console.error(`Failed to fetch bill ${billId}:`, e);
          }
        }

        const legislators = Array.from(legislatorsMap.values());
        console.log(`Found ${legislators.length} unique legislators`);

        return new Response(JSON.stringify({ 
          status: 'OK', 
          legislators,
          count: legislators.length 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
        
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    console.log(`Fetching: ${action}`);
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.status === 'ERROR') {
      console.error('LegiScan API Error:', data.alert?.message);
      throw new Error(data.alert?.message || 'LegiScan API error');
    }

    console.log(`Successfully fetched ${action}`);
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in legislation function:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
