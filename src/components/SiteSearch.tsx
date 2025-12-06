import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, FileText, Scale, GraduationCap, BookOpen, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: "k12" | "higher-ed" | "legislation" | "action" | "bill";
  icon: typeof FileText;
  billNumber?: string;
}

// Static content for policy pages
const staticContent: SearchResult[] = [
  {
    title: "K-12 Education Policy",
    description: "MNPS, charter schools, funding, curriculum & more",
    href: "/k12",
    category: "k12",
    icon: GraduationCap,
  },
  {
    title: "School Voucher Program",
    description: "Education Savings Account program for Nashville families",
    href: "/k12/vouchers",
    category: "k12",
    icon: GraduationCap,
  },
  {
    title: "MNPS Budget",
    description: "Metro Nashville Public Schools funding and spending",
    href: "/k12/budget",
    category: "k12",
    icon: GraduationCap,
  },
  {
    title: "Charter Schools",
    description: "Charter school options and performance in Nashville",
    href: "/k12/charters",
    category: "k12",
    icon: GraduationCap,
  },
  {
    title: "Higher Education",
    description: "Universities, community colleges, workforce programs",
    href: "/higher-ed",
    category: "higher-ed",
    icon: BookOpen,
  },
  {
    title: "Tennessee Promise",
    description: "Free community college for recent high school graduates",
    href: "/higher-ed/promise",
    category: "higher-ed",
    icon: BookOpen,
  },
  {
    title: "Tennessee Reconnect",
    description: "Free tuition for adults returning to school",
    href: "/higher-ed/reconnect",
    category: "higher-ed",
    icon: BookOpen,
  },
  {
    title: "Advocacy Hub",
    description: "Track bills, contact legislators, take action",
    href: "/advocacy",
    category: "legislation",
    icon: Scale,
  },
  {
    title: "Take Action",
    description: "Make your voice heard on education policy",
    href: "/action",
    category: "action",
    icon: FileText,
  },
  {
    title: "Resources",
    description: "Reports, data, and official documents",
    href: "/resources",
    category: "action",
    icon: FileText,
  },
];

interface SiteSearchProps {
  variant?: "hero" | "default";
  className?: string;
}

export function SiteSearch({ variant = "default", className }: SiteSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [liveResults, setLiveResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const navigate = useNavigate();

  // Search live bills from API
  const searchBills = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setLiveResults([]);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsSearching(true);

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/legislation?action=search&query=${encodeURIComponent(searchQuery)}`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      const searchResults = data.searchresult || {};
      
      const bills: SearchResult[] = [];
      Object.entries(searchResults).forEach(([key, value]) => {
        if (key !== 'summary' && typeof value === 'object' && bills.length < 5) {
          const bill = value as { bill_id: number; bill_number: string; title: string; last_action?: string };
          bills.push({
            title: bill.title,
            description: bill.last_action || `Bill ${bill.bill_number}`,
            href: `/advocacy/bill/${bill.bill_id}`,
            category: "bill",
            icon: Scale,
            billNumber: bill.bill_number,
          });
        }
      });

      setLiveResults(bills);
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error("Bill search error:", error);
        setLiveResults([]);
      }
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchBills(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchBills]);

  // Filter static content
  const staticResults = query.length >= 2
    ? staticContent.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  // Combine results: live bills first, then static content
  const results = [...liveResults, ...staticResults].slice(0, 8);

  const handleSelect = (result: SearchResult) => {
    navigate(result.href);
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
    setLiveResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) {
      if (e.key === "Enter" && query.length >= 2) {
        if (results.length > 0) {
          handleSelect(results[0]);
        }
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        } else if (results.length > 0) {
          handleSelect(results[0]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const isHero = variant === "hero";

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full max-w-md", className)}
      role="combobox"
      aria-expanded={isOpen && results.length > 0}
      aria-haspopup="listbox"
      aria-owns="search-results"
    >
      <label htmlFor="site-search" className="sr-only">
        Search education policies, bills, and resources
      </label>
      <div className="relative">
        {isSearching ? (
          <Loader2 
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin",
              isHero ? "text-primary-foreground/60" : "text-muted-foreground"
            )} 
            aria-hidden="true" 
          />
        ) : (
          <Search 
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
              isHero ? "text-primary-foreground/60" : "text-muted-foreground"
            )} 
            aria-hidden="true" 
          />
        )}
        <Input
          ref={inputRef}
          id="site-search"
          type="search"
          placeholder="Search bills, policies, topics..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            "pl-10 pr-4",
            isHero && "bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-primary-foreground/20 focus:border-primary-foreground/50"
          )}
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
          autoComplete="off"
        />
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <ul
          ref={resultsRef}
          id="search-results"
          role="listbox"
          aria-label="Search results"
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {liveResults.length > 0 && (
            <li className="px-3 py-1.5 bg-muted/50 border-b border-border">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Live Bills from TN Legislature
              </p>
            </li>
          )}
          {results.map((result, index) => {
            const Icon = result.icon;
            const isLiveBill = result.category === "bill";
            const showStaticHeader = !isLiveBill && index === liveResults.length && staticResults.length > 0;
            
            return (
              <li key={result.href}>
                {showStaticHeader && (
                  <div className="px-3 py-1.5 bg-muted/50 border-b border-border">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                      Policy Topics
                    </p>
                  </div>
                )}
                <div
                  id={`search-result-${index}`}
                  role="option"
                  aria-selected={selectedIndex === index}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors",
                    selectedIndex === index 
                      ? "bg-accent/20" 
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div 
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-0.5",
                      isLiveBill ? "bg-accent/20" : "bg-primary/10"
                    )}
                    aria-hidden="true"
                  >
                    <Icon className={cn(
                      "w-4 h-4",
                      isLiveBill ? "text-accent" : "text-primary"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {result.billNumber && (
                        <span className="font-mono text-xs font-semibold text-accent">
                          {result.billNumber}
                        </span>
                      )}
                      <p className={cn(
                        "font-medium text-sm text-foreground",
                        result.billNumber ? "truncate" : ""
                      )}>
                        {result.billNumber ? "" : result.title}
                      </p>
                    </div>
                    {result.billNumber ? (
                      <p className="text-xs text-foreground line-clamp-1 mt-0.5">
                        {result.title}
                      </p>
                    ) : null}
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {result.description}
                    </p>
                  </div>
                  <ArrowRight 
                    className="w-4 h-4 text-muted-foreground shrink-0 mt-1" 
                    aria-hidden="true" 
                  />
                </div>
              </li>
            );
          })}
          <li className="px-4 py-2 bg-muted/30 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↑</kbd>
              {" "}<kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↓</kbd>
              {" "}to navigate, {" "}
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Enter</kbd>
              {" "}to select
            </p>
          </li>
        </ul>
      )}

      {/* Loading state */}
      {isOpen && query.length >= 2 && isSearching && results.length === 0 && (
        <div
          role="status"
          aria-live="polite"
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 p-4 text-center"
        >
          <Loader2 className="w-5 h-5 animate-spin mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Searching legislation...
          </p>
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && !isSearching && results.length === 0 && (
        <div
          role="status"
          aria-live="polite"
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 p-4 text-center"
        >
          <p className="text-sm text-muted-foreground">
            No results found for "{query}"
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Try searching for "teacher", "funding", or "charter"
          </p>
        </div>
      )}

      {/* Hint when focused but not enough characters */}
      {isOpen && query.length > 0 && query.length < 2 && (
        <div
          role="status"
          aria-live="polite"
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 p-3 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Type at least 2 characters to search
          </p>
        </div>
      )}
    </div>
  );
}