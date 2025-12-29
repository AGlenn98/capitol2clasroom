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
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="civic-hero relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Poster Section - Red block with OUR text */}
      <div className="relative w-full">
        <div 
          className={`red-block flex items-center justify-center transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          {/* The large OUR text - BLUE on RED background */}
          <h1 
            id="hero-heading"
            className="our-text flex justify-center items-center"
          >
            <span className="text-[clamp(200px,32vw,380px)] leading-[0.85] tracking-[-8px]">
              O
            </span>
            <span className="text-[clamp(200px,32vw,380px)] leading-[0.85] tracking-[-8px]">
              U
            </span>
            <span className="text-[clamp(200px,32vw,380px)] leading-[0.85] tracking-[-8px]">
              R
            </span>
          </h1>
          <span className="sr-only">Our Vote, Our Voice - Education Matters</span>
        </div>
      </div>

      {/* Vote/Voice Section - On Blue */}
      <div 
        className={`bg-civic-blue px-6 md:px-12 py-16 md:py-20 flex flex-col md:flex-row justify-center gap-10 md:gap-20 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ animationDelay: '0.4s' }}
      >
        {/* Vote Checkbox */}
        <button
          className="group flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-civic-blue rounded-sm"
          aria-label="Your vote matters - Take action"
          onClick={() => window.location.href = '/action'}
        >
          <div className="w-14 h-14 md:w-[72px] md:h-[72px] bg-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <Check className="w-10 h-10 md:w-12 md:h-12 text-foreground stroke-[3]" aria-hidden="true" />
          </div>
          <span className="font-heading text-4xl md:text-5xl lg:text-6xl text-vote-brown tracking-[3px] uppercase font-bold">
            VOTE
          </span>
        </button>

        {/* Voice Checkbox */}
        <button
          className="group flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-civic-blue rounded-sm"
          aria-label="Your voice matters - Contact legislators"
          onClick={() => window.location.href = '/legislators'}
        >
          <div className="w-14 h-14 md:w-[72px] md:h-[72px] bg-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <Check className="w-10 h-10 md:w-12 md:h-12 text-foreground stroke-[3]" aria-hidden="true" />
          </div>
          <span className="font-heading text-4xl md:text-5xl lg:text-6xl text-vote-brown tracking-[3px] uppercase font-bold">
            VOICE
          </span>
        </button>
      </div>

      {/* Search Section */}
      <div 
        className={`bg-civic-blue px-6 md:px-12 pb-24 md:pb-28 lg:pb-32 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ animationDelay: '0.6s' }}
      >
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-white rounded-2xl p-4 md:p-5 shadow-lg flex flex-col md:flex-row gap-4 md:gap-5 items-stretch">
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-4 bg-muted/50 rounded-xl px-5">
              <Search 
                className="w-6 h-6 text-muted-foreground flex-shrink-0" 
                aria-hidden="true" 
              />
              <Input
                type="search"
                placeholder="Search education bills and legislation..."
                className="flex-1 border-0 bg-transparent py-5 text-base md:text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search education bills"
              />
            </div>
            
            {/* View All Button */}
            <Link to="/advocacy" className="flex-shrink-0">
              <Button 
                size="lg"
                className="w-full md:w-auto h-14 md:h-16 px-8 md:px-9 bg-democracy-red hover:bg-democracy-red-dark text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:translate-x-1 gap-2 md:gap-3 text-base md:text-lg"
              >
                View All Legislation
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
