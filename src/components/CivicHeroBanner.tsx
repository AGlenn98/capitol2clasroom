import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CivicHeroBannerProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function CivicHeroBanner({ searchQuery, onSearchChange }: CivicHeroBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header 
      className="civic-hero relative min-h-[85vh] flex flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background - Sky Blue */}
      <div 
        className={`absolute inset-0 bg-civic-blue transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Main Content Container */}
      <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-16 lg:py-0">
        
        {/* Left Side - Typography */}
        <div 
          className={`flex-1 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          style={{ transitionDelay: '100ms' }}
        >
          {/* Knockout Text Effect Container */}
          <div className="relative">
            {/* Red Background Block */}
            <div className="bg-civic-red inline-block p-4 sm:p-6 lg:p-8 -ml-4 sm:-ml-6 lg:-ml-8">
              <h1 
                id="hero-heading"
                className="font-display text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] leading-[0.85] tracking-tight"
              >
                {/* Using mix-blend-mode for knockout effect */}
                <span className="block text-civic-blue" style={{ mixBlendMode: 'screen' }}>
                  EDUCATION
                </span>
                <span className="block text-civic-blue" style={{ mixBlendMode: 'screen' }}>
                  MATTERS
                </span>
              </h1>
            </div>
          </div>
          
          {/* Subheading - visible on mobile, hidden on larger screens where checkboxes show */}
          <p className="mt-6 text-lg text-civic-red font-medium max-w-md lg:hidden">
            Track Tennessee education legislation. Make your voice heard.
          </p>
        </div>

        {/* Right Side - Checkboxes */}
        <div 
          className={`flex flex-col gap-4 sm:gap-6 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Vote Checkbox */}
          <button
            className="civic-checkbox group flex items-center gap-4 sm:gap-5 hover:scale-105 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-red focus-visible:ring-offset-2 focus-visible:ring-offset-civic-blue rounded-sm"
            aria-label="Your vote matters"
            onClick={() => window.location.href = '/action'}
          >
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Check className="w-6 h-6 sm:w-8 sm:h-8 text-foreground stroke-[3]" aria-hidden="true" />
            </div>
            <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-civic-red tracking-wide">
              VOTE
            </span>
          </button>

          {/* Voice Checkbox */}
          <button
            className="civic-checkbox group flex items-center gap-4 sm:gap-5 hover:scale-105 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-red focus-visible:ring-offset-2 focus-visible:ring-offset-civic-blue rounded-sm"
            aria-label="Your voice matters"
            onClick={() => window.location.href = '/legislators'}
          >
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Check className="w-6 h-6 sm:w-8 sm:h-8 text-foreground stroke-[3]" aria-hidden="true" />
            </div>
            <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-civic-red tracking-wide">
              VOICE
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Search Section */}
      <div 
        className={`absolute bottom-0 left-0 right-0 pb-10 sm:pb-12 lg:pb-16 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '500ms' }}
      >
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" 
                  aria-hidden="true" 
                />
                <Input
                  type="search"
                  placeholder="Search education bills and legislation..."
                  className="pl-12 h-14 text-base bg-white border-0 shadow-lg rounded-xl focus-visible:ring-2 focus-visible:ring-civic-red focus-visible:ring-offset-0"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  aria-label="Search education bills"
                />
              </div>
              
              {/* View All Button */}
              <Link to="/advocacy" className="sm:flex-shrink-0">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto h-14 px-6 bg-civic-red hover:bg-civic-red-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 gap-2"
                >
                  View All Legislation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
