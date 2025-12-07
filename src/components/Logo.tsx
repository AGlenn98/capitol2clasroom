import { Link } from "react-router-dom";
import { Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "light";
}

export function Logo({ variant = "default" }: LogoProps) {
  const isLight = variant === "light";
  
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <Landmark 
        className={cn(
          "h-7 w-7 group-hover:rotate-6 transition-all duration-normal",
          isLight ? "text-primary-foreground" : "text-foreground group-hover:text-primary"
        )} 
      />
      <span 
        style={{ fontFamily: 'Inter, Helvetica, Arial, sans-serif' }} 
        className={cn(
          "text-2xl",
          isLight ? "text-primary-foreground" : "text-foreground"
        )}
      >
        <span className="font-light">Capitol</span>
        <span className="font-bold"> to Classroom</span>
      </span>
    </Link>
  );
}
