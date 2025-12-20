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
          "h-8 w-8 group-hover:rotate-6 transition-all duration-normal",
          isLight ? "text-primary-foreground" : "text-primary group-hover:text-accent"
        )} 
      />
      <span 
        className={cn(
          "font-display text-2xl tracking-wider uppercase",
          isLight ? "text-primary-foreground" : "text-foreground"
        )}
      >
        Capitol to Classroom
      </span>
    </Link>
  );
}
