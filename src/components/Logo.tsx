import { Link } from "react-router-dom";
import capitolImage from "@/assets/capitol-cupola.png";

export function Logo() {
  return (
    <Link to="/" className="flex items-center group relative">
      <img 
        src={capitolImage} 
        alt="Tennessee State Capitol" 
        className="h-16 w-auto object-contain relative z-10"
      />
      <div className="flex flex-col items-start -ml-6 relative z-20">
        <span 
          className="text-4xl font-bold leading-none select-none"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: '#c41e3a',
            textShadow: `
              2px 2px 0px rgba(196, 30, 58, 0.3),
              -1px -1px 0px rgba(255, 255, 255, 0.5),
              3px 1px 2px rgba(0,0,0,0.15)
            `,
            transform: 'rotate(-3deg)',
            letterSpacing: '-0.03em',
            filter: 'url(#crayon-texture)',
            WebkitTextStroke: '0.5px rgba(139, 0, 0, 0.4)',
          }}
        >
          C2C
        </span>
        <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-[0.2em] ml-1">
          Policy Compass
        </span>
      </div>
      
      {/* SVG filter for crayon texture effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="crayon-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
      </svg>
    </Link>
  );
}
