import { Link } from "react-router-dom";
import capitolImage from "@/assets/capitol-cupola.png";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-1 group">
      <img 
        src={capitolImage} 
        alt="Tennessee State Capitol" 
        className="h-12 w-auto object-contain"
      />
      <div className="flex flex-col items-start -ml-1">
        <span 
          className="text-3xl font-bold leading-none tracking-tight"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: '#c41e3a',
            textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
            transform: 'rotate(-2deg)',
            letterSpacing: '-0.02em'
          }}
        >
          C2C
        </span>
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
          Policy Compass
        </span>
      </div>
    </Link>
  );
}
