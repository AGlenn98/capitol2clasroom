import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "light";
}

export function Logo({ variant = "default" }: LogoProps) {
  const isLight = variant === "light";
  
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-lg shadow-md group-hover:shadow-lg transition-shadow",
        isLight ? "bg-primary-foreground/20" : "bg-primary"
      )}>
        <Star className={cn(
          "w-5 h-5",
          isLight ? "text-primary-foreground fill-primary-foreground" : "text-primary-foreground fill-primary-foreground"
        )} />
        <div className={cn(
          "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2",
          isLight ? "bg-accent border-primary" : "bg-accent border-background"
        )} />
      </div>
      <div className="hidden sm:flex items-baseline gap-1.5">
        <span className={cn(
          "font-display text-xl tracking-wide",
          isLight ? "text-primary-foreground" : "text-foreground group-hover:text-primary transition-colors"
        )}>
          CAPITOL TO
        </span>
        <span className="font-display text-xl tracking-wide text-accent">
          CLASSROOM
        </span>
      </div>
    </Link>
  );
}
