import { cn } from "@/lib/utils";
import { Vote, Check, Pencil, FileText, Scale, Users, AlertTriangle, ThumbsUp } from "lucide-react";
import { useState } from "react";

type StickerVariant = "vote" | "check" | "pencil" | "bill" | "scale" | "users" | "alert" | "thumbsUp";
type StickerColor = "red" | "blue" | "white";
type StickerSize = "sm" | "md" | "lg" | "xl";

interface CivicStickerProps {
  variant: StickerVariant;
  color?: StickerColor;
  size?: StickerSize;
  className?: string;
  animated?: boolean;
  onClick?: () => void;
}

const iconMap = {
  vote: Vote,
  check: Check,
  pencil: Pencil,
  bill: FileText,
  scale: Scale,
  users: Users,
  alert: AlertTriangle,
  thumbsUp: ThumbsUp,
};

const sizeMap = {
  sm: { container: "w-10 h-10", icon: "w-5 h-5" },
  md: { container: "w-14 h-14", icon: "w-7 h-7" },
  lg: { container: "w-20 h-20", icon: "w-10 h-10" },
  xl: { container: "w-28 h-28", icon: "w-14 h-14" },
};

const colorMap = {
  red: "bg-accent text-accent-foreground",
  blue: "bg-primary text-primary-foreground",
  white: "bg-card text-foreground border-2 border-border",
};

export function CivicSticker({ 
  variant, 
  color = "red", 
  size = "md", 
  className,
  animated = true,
  onClick 
}: CivicStickerProps) {
  const [isClicked, setIsClicked] = useState(false);
  const Icon = iconMap[variant];
  const sizeClasses = sizeMap[size];
  const colorClasses = colorMap[color];

  const handleClick = () => {
    if (onClick) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500);
      onClick();
    }
  };

  return (
    <div
      className={cn(
        "sticker",
        sizeClasses.container,
        colorClasses,
        animated && "animate-float-rotate",
        isClicked && "animate-wobble",
        onClick && "cursor-pointer",
        className
      )}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <Icon className={sizeClasses.icon} />
    </div>
  );
}

// Wavy seal sticker - like the voting badge in the reference
interface WavyStickerProps {
  children: React.ReactNode;
  color?: StickerColor;
  size?: StickerSize;
  className?: string;
  animated?: boolean;
  onClick?: () => void;
}

export function WavySticker({ 
  children, 
  color = "red", 
  size = "lg",
  className,
  animated = true,
  onClick 
}: WavyStickerProps) {
  const [isClicked, setIsClicked] = useState(false);
  const sizeClasses = sizeMap[size];
  
  const handleClick = () => {
    if (onClick) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500);
      onClick();
    }
  };

  // Generate wavy border points
  const generateWavyPath = () => {
    const points = 12;
    const outerRadius = 50;
    const innerRadius = 42;
    let path = "";
    
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      path += (i === 0 ? "M" : "L") + `${x},${y}`;
    }
    path += "Z";
    return path;
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        sizeClasses.container,
        animated && "animate-float-rotate",
        isClicked && "animate-wobble",
        onClick && "cursor-pointer",
        className
      )}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{ animationDelay: `${Math.random() * 2}s` }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className={cn(
          "absolute inset-0 w-full h-full drop-shadow-lg",
          color === "red" && "fill-accent",
          color === "blue" && "fill-primary",
          color === "white" && "fill-card stroke-border stroke-2"
        )}
      >
        <path d={generateWavyPath()} />
      </svg>
      <div className={cn(
        "relative z-10 flex items-center justify-center",
        color === "red" && "text-accent-foreground",
        color === "blue" && "text-primary-foreground",
        color === "white" && "text-foreground"
      )}>
        {children}
      </div>
    </div>
  );
}

// Pill badge like "SHARE" text in the reference
interface PillBadgeProps {
  children: React.ReactNode;
  color?: "navy" | "red";
  className?: string;
  onClick?: () => void;
}

export function PillBadge({ 
  children, 
  color = "navy",
  className,
  onClick 
}: PillBadgeProps) {
  return (
    <div
      className={cn(
        "pill-badge",
        color === "navy" ? "pill-badge-navy" : "pill-badge-red",
        onClick && "cursor-pointer hover:scale-105 transition-transform",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

// Floating stickers container for hero sections
interface FloatingStickersProps {
  className?: string;
}

export function FloatingStickers({ className }: FloatingStickersProps) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {/* Top right - Vote sticker */}
      <div className="absolute top-[10%] right-[5%] opacity-90">
        <WavySticker color="red" size="lg" animated>
          <Vote className="w-8 h-8" />
        </WavySticker>
      </div>
      
      {/* Top left - Pencil sticker */}
      <div className="absolute top-[15%] left-[8%] opacity-85" style={{ animationDelay: "1s" }}>
        <CivicSticker variant="pencil" color="red" size="lg" />
      </div>
      
      {/* Bottom right - Check sticker */}
      <div className="absolute bottom-[20%] right-[12%] opacity-80" style={{ animationDelay: "2s" }}>
        <CivicSticker variant="check" color="red" size="md" />
      </div>
      
      {/* Bottom left - Bill sticker */}
      <div className="absolute bottom-[15%] left-[15%] opacity-75" style={{ animationDelay: "0.5s" }}>
        <CivicSticker variant="bill" color="blue" size="md" />
      </div>
    </div>
  );
}
