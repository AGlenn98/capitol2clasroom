import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const NEWS_SOURCES = [
  { name: "Chalkbeat Tennessee", url: "https://www.chalkbeat.org/tennessee" },
  { name: "The Tennessean - Education", url: "https://www.tennessean.com/news/education/" },
  { name: "WKRN - Education", url: "https://www.wkrn.com/news/local-news/education/" },
  { name: "TN Dept. of Education", url: "https://www.tn.gov/education.html" },
];

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  source: string;
  date: string;
  url: string;
  category: string;
  imageUrl: string;
}

interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface GNewsResponse {
  totalArticles: number;
  articles: GNewsArticle[];
}

// Category mapping based on keywords in title/description
function categorizeArticle(title: string, description: string): string {
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('bill') || text.includes('legislation') || text.includes('law') || text.includes('vote')) {
    return 'Legislation';
  }
  if (text.includes('funding') || text.includes('budget') || text.includes('grant') || text.includes('money')) {
    return 'Funding';
  }
  if (text.includes('teacher') || text.includes('educator') || text.includes('staff')) {
    return 'Teachers';
  }
  if (text.includes('college') || text.includes('university') || text.includes('higher ed')) {
    return 'Higher Ed';
  }
  if (text.includes('nashville') || text.includes('memphis') || text.includes('knoxville') || text.includes('county')) {
    return 'Local News';
  }
  if (text.includes('policy') || text.includes('department of education') || text.includes('tisa')) {
    return 'Policy';
  }
  
  return 'Education News';
}

async function fetchGNews(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];
  const apiKey = Deno.env.get('GNEWS_API_KEY');
  
  if (!apiKey) {
    console.error('GNEWS_API_KEY not configured');
    return articles;
  }
  
  try {
    console.log('Fetching from GNews API...');
    
    const searchQuery = 'Tennessee education OR Tennessee schools OR Nashville schools';
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=en&country=us&max=10&apikey=${apiKey}`;
    
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GNews API error:', response.status, errorText);
      return articles;
    }
    
    const data: GNewsResponse = await response.json();
    console.log(`GNews returned ${data.totalArticles} articles`);
    
    data.articles.forEach((article, index) => {
      const category = categorizeArticle(article.title, article.description || '');
      
      articles.push({
        id: index + 1,
        title: article.title.slice(0, 120),
        description: (article.description || 'Read the full article for details.').slice(0, 200),
        source: article.source.name,
        date: article.publishedAt.split('T')[0],
        url: article.url,
        category,
        imageUrl: article.image || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop'
      });
    });
    
    console.log(`Processed ${articles.length} articles from GNews`);
  } catch (error) {
    console.error('Error fetching GNews:', error);
  }
  
  return articles;
}

const FALLBACK_NEWS: NewsArticle[] = [
  {
    id: 1,
    title: "Tennessee Education Updates",
    description: "Stay informed with the latest education policy news from Tennessee. Check our curated sources for real-time updates.",
    source: "C2C Policy Compass",
    date: new Date().toISOString().split('T')[0],
    url: "https://www.tn.gov/education.html",
    category: "Policy",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "General Assembly Education Bills Tracker",
    description: "The Tennessee General Assembly is considering multiple education-related bills this session.",
    source: "TN General Assembly",
    date: new Date().toISOString().split('T')[0],
    url: "https://wapp.capitol.tn.gov/apps/BillInfo/default.aspx",
    category: "Legislation",
    imageUrl: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&h=250&fit=crop"
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log('Checking news cache...');
    
    // Check for valid cached data (not expired)
    const { data: cachedData, error: cacheError } = await supabase
      .from('news_cache')
      .select('*')
      .gt('expires_at', new Date().toISOString())
      .order('fetched_at', { ascending: false })
      .limit(1)
      .single();
    
    if (cachedData && !cacheError) {
      console.log('Returning cached news from', cachedData.fetched_at);
      return new Response(JSON.stringify({
        news: cachedData.articles,
        sources: cachedData.sources,
        lastUpdated: cachedData.fetched_at,
        cached: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log('Cache miss or expired, fetching fresh news...');
    
    // Fetch fresh news from GNews
    const gnewsArticles = await fetchGNews();
    const finalNews = gnewsArticles.length > 0 ? gnewsArticles.slice(0, 6) : FALLBACK_NEWS;
    const now = new Date().toISOString();
    
    // Cache the results (expires in 1 hour)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    
    // Delete old cache entries first
    await supabase.from('news_cache').delete().lt('expires_at', now);
    
    // Insert new cache entry
    const { error: insertError } = await supabase.from('news_cache').insert({
      articles: finalNews,
      sources: NEWS_SOURCES,
      fetched_at: now,
      expires_at: expiresAt
    });
    
    if (insertError) {
      console.error('Failed to cache news:', insertError);
    } else {
      console.log('News cached until', expiresAt);
    }
    
    return new Response(JSON.stringify({
      news: finalNews,
      sources: NEWS_SOURCES,
      lastUpdated: now,
      cached: false
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in tn-news function:', errorMessage);
    
    return new Response(JSON.stringify({
      news: FALLBACK_NEWS,
      sources: NEWS_SOURCES,
      lastUpdated: new Date().toISOString(),
      cached: false
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});