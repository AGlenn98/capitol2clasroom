import { Link } from "react-router-dom";
import { Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "light";
}

export function Logo({ variant = "default" }: LogoProps) {
  const isLight = variant === "light";
  
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <Landmark 
        className={cn(
          "h-8 w-8 md:h-10 md:w-10 transition-all duration-normal",
          isLight ? "text-primary-foreground" : "text-primary group-hover:text-primary/80"
        )} 
      />
      <span 
        className={cn(
          "font-heading text-lg md:text-xl tracking-[3px] uppercase font-semibold",
          isLight ? "text-primary-foreground" : "text-foreground group-hover:text-primary transition-colors"
        )}
      >
        CAPITOL TO CLASSROOM
      </span>
    </Link>
  );
}
