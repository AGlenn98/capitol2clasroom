import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, FileText, Scale, GraduationCap, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: "k12" | "higher-ed" | "legislation" | "action";
  icon: typeof FileText;
}

const searchableContent: SearchResult[] = [
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
    title: "Legislation Tracker",
    description: "Follow education bills through the TN General Assembly",
    href: "/legislation",
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
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = query.length >= 2
    ? searchableContent.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelect = (result: SearchResult) => {
    navigate(result.href);
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) {
      if (e.key === "Enter" && query.length >= 2) {
        // Navigate to search results page or first result
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
        <Search 
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
            isHero ? "text-primary-foreground/60" : "text-muted-foreground"
          )} 
          aria-hidden="true" 
        />
        <Input
          ref={inputRef}
          id="site-search"
          type="search"
          placeholder="Search policies, bills, topics..."
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
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <li
                key={result.href}
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
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {result.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {result.description}
                  </p>
                </div>
                <ArrowRight 
                  className="w-4 h-4 text-muted-foreground shrink-0 mt-1" 
                  aria-hidden="true" 
                />
              </li>
            );
          })}
          <li className="px-4 py-2 bg-muted/30 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↑</kbd>
              {" "}<kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↓</kbd>
              {" "}to navigate, {" "}
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Enter</kbd>
              {" "}to select, {" "}
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Esc</kbd>
              {" "}to close
            </p>
          </li>
        </ul>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div
          role="status"
          aria-live="polite"
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 p-4 text-center"
        >
          <p className="text-sm text-muted-foreground">
            No results found for "{query}"
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Try searching for "voucher", "budget", or "promise"
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