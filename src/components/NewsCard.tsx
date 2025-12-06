import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NewsItem } from "@/types/legislation";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  news: NewsItem;
  variant?: "default" | "featured";
  className?: string;
}

export function NewsCard({ news, variant = "default", className }: NewsCardProps) {
  const isFeatured = variant === "featured";

  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block bg-card border border-border rounded-lg overflow-hidden transition-all hover:border-accent hover:shadow-lg",
        isFeatured && "md:col-span-2 md:row-span-2",
        className
      )}
      aria-label={`Read more: ${news.title} from ${news.source}`}
    >
      {news.imageUrl && (
        <div className={cn(
          "relative overflow-hidden bg-muted",
          isFeatured ? "h-48 md:h-64" : "h-32"
        )}>
          <img
            src={news.imageUrl}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Badge 
            variant="secondary" 
            className="absolute bottom-2 left-2 bg-background/90 text-foreground text-xs"
          >
            {news.category}
          </Badge>
        </div>
      )}
      
      <div className={cn("p-4", isFeatured && "md:p-5")}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground">{news.source}</span>
          <span className="text-muted-foreground">•</span>
          <time className="text-xs text-muted-foreground" dateTime={news.date}>
            {new Date(news.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </time>
        </div>
        
        <h3 className={cn(
          "font-serif font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2",
          isFeatured ? "text-lg md:text-xl" : "text-sm"
        )}>
          {news.title}
        </h3>
        
        <p className={cn(
          "text-muted-foreground mb-3",
          isFeatured ? "text-sm line-clamp-3" : "text-xs line-clamp-2"
        )}>
          {news.description}
        </p>
        
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-1.5 transition-all">
          Read more
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}