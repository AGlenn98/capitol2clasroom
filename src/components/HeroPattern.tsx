import { Star } from "lucide-react";

export function HeroPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Stars decoration */}
      <div className="absolute top-8 right-[10%]">
        <Star className="w-8 h-8 text-accent fill-accent opacity-80" />
      </div>
      <div className="absolute top-16 right-[18%]">
        <Star className="w-5 h-5 text-accent fill-accent opacity-60" />
      </div>
      <div className="absolute top-12 right-[25%]">
        <Star className="w-6 h-6 text-accent fill-accent opacity-70" />
      </div>
      <div className="absolute bottom-20 left-[5%]">
        <Star className="w-6 h-6 text-primary-foreground/30 fill-primary-foreground/30" />
      </div>
      <div className="absolute bottom-32 left-[12%]">
        <Star className="w-4 h-4 text-primary-foreground/20 fill-primary-foreground/20" />
      </div>
      
      {/* Diagonal stripes - subtle */}
      <div 
        className="absolute -right-20 top-0 w-96 h-full opacity-[0.04]" 
        style={{
          background: `repeating-linear-gradient(
            -45deg,
            hsl(0 0% 100%),
            hsl(0 0% 100%) 4px,
            transparent 4px,
            transparent 20px
          )`
        }}
      />
      
      {/* Red accent glow */}
      <div className="absolute -top-20 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent" />
    </div>
  );
}
