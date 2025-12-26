import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface CivicHeroBannerProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}
export function CivicHeroBanner({
  searchQuery,
  onSearchChange
}: CivicHeroBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  return <header className="civic-hero relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden" aria-labelledby="hero-heading">
      {/* Background - Sky Blue */}
      <div className={`absolute inset-0 bg-civic-blue transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />

      {/* Main Content Container - Centered */}
      <div className="container relative z-10 flex flex-col items-center justify-center text-center py-16">
        
        {/* Typography - Centerpiece */}
        <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`} style={{
        transitionDelay: '100ms'
      }}>
          {/* Knockout Text Effect Container */}
          <div className="relative inline-block">
            {/* Red Background Block */}
            
          </div>
        </div>

        {/* Search Section - Below Typography */}
        <div className={`mt-12 sm:mt-16 w-full max-w-2xl transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{
        transitionDelay: '400ms'
      }}>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <Input type="search" placeholder="Search education bills and legislation..." className="pl-12 h-14 text-base bg-white border-0 shadow-lg rounded-xl focus-visible:ring-2 focus-visible:ring-civic-red focus-visible:ring-offset-0" value={searchQuery} onChange={e => onSearchChange(e.target.value)} aria-label="Search education bills" />
            </div>
            
            {/* View All Button */}
            <Link to="/advocacy" className="sm:flex-shrink-0">
              <Button size="lg" className="w-full sm:w-auto h-14 px-6 bg-civic-red hover:bg-civic-red-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 gap-2">
                View All Legislation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>;
}