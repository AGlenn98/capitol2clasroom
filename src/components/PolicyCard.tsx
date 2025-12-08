import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap, Scale, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface PolicyCardProps {
  title: string;
  description: string;
  href: string;
  category: "k12" | "higher-ed" | "legislation" | "resource";
  date?: string;
  className?: string;
  isExternal?: boolean;
}

const categoryIcons = {
  k12: GraduationCap,
  "higher-ed": BookOpen,
  legislation: Scale,
  resource: FileText,
};

const categoryLabels = {
  k12: "K-12 Education",
  "higher-ed": "Higher Education",
  legislation: "Legislation",
  resource: "Resource",
};

export function PolicyCard({
  title,
  description,
  href,
  category,
  date,
  className = "",
  isExternal = false,
}: PolicyCardProps) {
  const Icon = categoryIcons[category];

  const cardContent = (
    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-accent uppercase tracking-wide">
            {categoryLabels[category]}
          </span>
          {date && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{date}</span>
            </>
          )}
          {isExternal && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Official Source
              </span>
            </>
          )}
        </div>
        <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          {isExternal ? "Visit official source" : "Read more"} 
          {isExternal ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </span>
      </div>
    </div>
  );

  const cardClasses = cn(
    "group block bg-card border border-border rounded-lg p-6 transition-all hover:border-accent hover:shadow-lg",
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link to={href} className={cardClasses}>
      {cardContent}
    </Link>
  );
}
