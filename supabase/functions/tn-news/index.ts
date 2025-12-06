import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Curated list of Tennessee education news sources
const NEWS_SOURCES = [
  { name: "Chalkbeat Tennessee", url: "https://www.chalkbeat.org/tennessee" },
  { name: "The Tennessean - Education", url: "https://www.tennessean.com/news/education/" },
  { name: "WKRN - Education", url: "https://www.wkrn.com/news/local-news/education/" },
  { name: "TN Dept. of Education", url: "https://www.tn.gov/education.html" },
];

// Since we don't have a news API key, we'll return curated static news and sources
const CURATED_NEWS = [
  {
    id: 1,
    title: "Tennessee Education Updates",
    description: "Stay informed with the latest education policy news from Tennessee. Check our curated sources for real-time updates.",
    source: "C2C Policy Compass",
    date: new Date().toISOString().split('T')[0],
    url: "https://www.tn.gov/education.html",
    category: "Policy"
  },
  {
    id: 2,
    title: "General Assembly Education Bills Tracker",
    description: "The Tennessee General Assembly is considering multiple education-related bills this session.",
    source: "TN General Assembly",
    date: new Date().toISOString().split('T')[0],
    url: "https://wapp.capitol.tn.gov/apps/BillInfo/default.aspx",
    category: "Legislation"
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching TN education news sources');
    
    return new Response(JSON.stringify({
      news: CURATED_NEWS,
      sources: NEWS_SOURCES,
      lastUpdated: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in tn-news function:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
