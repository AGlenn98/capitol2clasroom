import { useTennesseeNews } from "@/hooks/useTennesseeNews";
import { NewsCard } from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ExternalLink, Newspaper, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo } from "react";

export function EducationNewsSection() {
  const { data, isLoading, error, refetch } = useTennesseeNews();

  const categories = useMemo(() => {
    if (!data?.news) return [];
    const cats = [...new Set(data.news.map(n => n.category))];
    return ["All", ...cats];
  }, [data?.news]);

  if (isLoading) {
    return (
      <section className="py-12 bg-muted/30" aria-labelledby="news-heading">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <Newspaper className="w-6 h-6 text-accent" />
            <h2 id="news-heading" className="font-serif text-2xl font-bold">
              Education News
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
                <Skeleton className="h-32 w-full" />
                <div className="p-4">
                  <Skeleton className="h-3 w-24 mb-2" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-muted/30" aria-labelledby="news-heading">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <Newspaper className="w-6 h-6 text-accent" />
            <h2 id="news-heading" className="font-serif text-2xl font-bold">
              Education News
            </h2>
          </div>
          <div 
            className="p-6 bg-destructive/5 border border-destructive/20 rounded-lg flex items-start gap-3"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">Unable to load news</p>
              <p className="text-sm text-muted-foreground mt-1">
                Check back later for the latest education news.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3 gap-2"
                onClick={() => refetch()}
              >
                <RefreshCw className="w-3 h-3" />
                Try again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const news = data?.news || [];
  const sources = data?.sources || [];

  return (
    <section className="py-12 bg-muted/30" aria-labelledby="news-heading">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20">
              <Newspaper className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 id="news-heading" className="font-serif text-2xl font-bold">
                Education News
              </h2>
              <p className="text-xs text-muted-foreground">
                Latest updates from Tennessee
              </p>
            </div>
          </div>
          <Badge variant="outline" className="hidden sm:inline-flex gap-1">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Live Updates
          </Badge>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <TabsList className="mb-4 flex-wrap h-auto gap-1">
            {categories.map(cat => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="text-xs"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat} value={cat} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(cat === "All" ? news : news.filter(n => n.category === cat))
                  .slice(0, 6)
                  .map((item, index) => (
                    <NewsCard 
                      key={item.id} 
                      news={item} 
                      variant={index === 0 && cat === "All" ? "featured" : "default"}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* News Sources */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">
            More from trusted sources:
          </p>
          <div className="flex flex-wrap gap-2">
            {sources.map(source => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-medium hover:border-accent hover:text-primary transition-colors"
              >
                {source.name}
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}