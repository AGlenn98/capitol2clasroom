import { Link } from "react-router-dom";
import { useState, useRef } from "react";

export function Logo() {
  const [gradientPosition, setGradientPosition] = useState(50);
  const logoRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setGradientPosition(percentage);
    }
  };

  const handleMouseLeave = () => {
    setGradientPosition(50);
  };

  return (
    <Link 
      to="/" 
      className="flex items-center gap-0.5 group hover:scale-105 transition-transform duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span 
        ref={logoRef}
        className="font-mono text-2xl font-bold tracking-tight transition-all duration-500 ease-out"
        style={{
          background: `linear-gradient(90deg, #c41e3a ${gradientPosition - 50}%, #ffffff ${gradientPosition}%, #1e3a8a ${gradientPosition + 50}%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Capitol2Classroom
      </span>
    </Link>
  );
}