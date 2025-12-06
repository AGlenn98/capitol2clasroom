import { ExternalLink, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTennesseeNews } from "@/hooks/useTennesseeNews";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsCommentary() {
  const { data, isLoading, error } = useTennesseeNews();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-accent" />
            News & Commentary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-accent" />
            News & Commentary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Unable to load news at this time.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-serif">
          <Newspaper className="w-5 h-5 text-accent" />
          News & Commentary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* News Items */}
        <div className="space-y-4">
          {data?.news.map((item) => (
            <article key={item.id} className="pb-4 border-b border-border last:border-0">
              <div className="flex items-start gap-2 mb-2">
                <Badge variant="secondary" className="text-xs shrink-0">
                  {item.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <h4 className="font-medium mb-1 line-clamp-2">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {item.description}
              </p>
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto text-primary"
                onClick={() => window.open(item.url, '_blank')}
              >
                Read more
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </article>
          ))}
        </div>

        {/* News Sources */}
        <div className="pt-4 border-t border-border">
          <h5 className="text-sm font-medium mb-3">Tennessee Education News Sources</h5>
          <div className="grid grid-cols-2 gap-2">
            {data?.sources.map((source) => (
              <Button
                key={source.name}
                variant="outline"
                size="sm"
                className="justify-start text-xs h-auto py-2"
                onClick={() => window.open(source.url, '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-1 shrink-0" />
                <span className="truncate">{source.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
