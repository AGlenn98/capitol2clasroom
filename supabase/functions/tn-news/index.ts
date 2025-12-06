import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DOMParser, Element } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

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

async function fetchChalkbeatNews(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];
  
  try {
    console.log('Fetching Chalkbeat Tennessee...');
    const response = await fetch('https://www.chalkbeat.org/tennessee/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      console.log('Chalkbeat fetch failed:', response.status);
      return articles;
    }
    
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    
    if (!doc) return articles;
    
    const articleElements = doc.querySelectorAll('article');
    let id = 1;
    
    for (const node of articleElements) {
      if (articles.length >= 4) break;
      
      const article = node as Element;
      const titleEl = article.querySelector('h2 a, h3 a, .headline a');
      const descEl = article.querySelector('p, .excerpt, .description');
      const imgEl = article.querySelector('img');
      const linkEl = article.querySelector('a[href*="/tennessee/"]');
      
      if (titleEl) {
        const title = titleEl.textContent?.trim() || '';
        const description = descEl?.textContent?.trim() || 'Read the full article for details.';
        let url = linkEl?.getAttribute('href') || titleEl.getAttribute('href') || '';
        
        if (url && !url.startsWith('http')) {
          url = 'https://www.chalkbeat.org' + url;
        }
        
        const imageUrl = imgEl?.getAttribute('src') || 
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop';
        
        if (title && title.length > 10) {
          articles.push({
            id: id++,
            title: title.slice(0, 120),
            description: description.slice(0, 200),
            source: 'Chalkbeat Tennessee',
            date: new Date().toISOString().split('T')[0],
            url: url || 'https://www.chalkbeat.org/tennessee/',
            category: 'Education News',
            imageUrl
          });
        }
      }
    }
    
    console.log(`Found ${articles.length} Chalkbeat articles`);
  } catch (error) {
    console.error('Error fetching Chalkbeat:', error);
  }
  
  return articles;
}

async function fetchGoogleNewsRSS(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];
  
  try {
    console.log('Fetching Google News RSS for Tennessee education...');
    const rssUrl = 'https://news.google.com/rss/search?q=Tennessee+education+policy+OR+Tennessee+schools&hl=en-US&gl=US&ceid=US:en';
    
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      console.log('Google News RSS fetch failed:', response.status);
      return articles;
    }
    
    const xml = await response.text();
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    
    if (!doc) return articles;
    
    const items = doc.querySelectorAll('item');
    let id = 100;
    
    for (const node of items) {
      if (articles.length >= 4) break;
      
      const item = node as Element;
      const title = item.querySelector('title')?.textContent?.trim() || '';
      const link = item.querySelector('link')?.textContent?.trim() || '';
      const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
      const source = item.querySelector('source')?.textContent?.trim() || 'News';
      
      const isTennesseeRelated = 
        title.toLowerCase().includes('tennessee') ||
        title.toLowerCase().includes('nashville') ||
        title.toLowerCase().includes('memphis') ||
        title.toLowerCase().includes('knoxville');
      
      if (title && isTennesseeRelated) {
        const date = pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        
        articles.push({
          id: id++,
          title: title.slice(0, 120),
          description: `Latest education news from ${source}. Click to read the full story.`,
          source: source,
          date,
          url: link,
          category: 'Education News',
          imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=250&fit=crop'
        });
      }
    }
    
    console.log(`Found ${articles.length} Google News articles`);
  } catch (error) {
    console.error('Error fetching Google News RSS:', error);
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

  try {
    console.log('Fetching TN education news from multiple sources...');
    
    const [chalkbeatNews, googleNews] = await Promise.all([
      fetchChalkbeatNews(),
      fetchGoogleNewsRSS()
    ]);
    
    let allNews = [...chalkbeatNews, ...googleNews];
    
    if (allNews.length === 0) {
      console.log('No news scraped, using fallback');
      allNews = FALLBACK_NEWS;
    }
    
    const finalNews = allNews.slice(0, 6).map((article, index) => ({
      ...article,
      id: index + 1
    }));
    
    console.log(`Returning ${finalNews.length} news articles`);
    
    return new Response(JSON.stringify({
      news: finalNews,
      sources: NEWS_SOURCES,
      lastUpdated: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in tn-news function:', errorMessage);
    
    return new Response(JSON.stringify({
      news: FALLBACK_NEWS,
      sources: NEWS_SOURCES,
      lastUpdated: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});