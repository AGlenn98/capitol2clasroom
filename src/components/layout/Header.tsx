import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, BookOpen, GraduationCap, Scale, Users, Calendar, Megaphone } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const policyItems = [
  { name: "K-12 Education", href: "/k12", icon: GraduationCap, description: "MNPS, charter schools, curriculum" },
  { name: "Higher Education", href: "/higher-ed", icon: BookOpen, description: "Universities, TN Promise" },
];

const advocacyItems = [
  { name: "Advocacy Hub", href: "/advocacy", icon: Scale, description: "Track bills, take action" },
  { name: "Legislators", href: "/legislators", icon: Users, description: "Find your representatives" },
  { name: "Legislative Calendar", href: "/legislation/calendar", icon: Calendar, description: "Upcoming sessions" },
  { name: "Take Action", href: "/action", icon: Megaphone, description: "Make your voice heard" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActivePolicy = policyItems.some(item => location.pathname.startsWith(item.href));
  const isActiveAdvocacy = advocacyItems.some(item => location.pathname === item.href) || location.pathname === "/legislation";

  return (
    <header className={cn(
      "sticky top-0 z-sticky bg-card/95 backdrop-blur-md border-b border-border/50 transition-all duration-normal",
      scrolled && "shadow-card border-border"
    )}>
      <nav className="container flex items-center justify-between py-4" aria-label="Main navigation">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          <Link 
            to="/" 
            className={cn(
              "px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-normal",
              location.pathname === "/" 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            Home
          </Link>

          {/* Policy Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={cn(
                "px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-normal inline-flex items-center gap-1.5",
                isActivePolicy 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}>
                Policy
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 p-2 bg-card border-border/50 shadow-lg rounded-2xl z-dropdown">
              <DropdownMenuLabel className="text-xs text-muted-foreground px-2 pb-2">Education Policy</DropdownMenuLabel>
              {policyItems.map(item => (
                <DropdownMenuItem key={item.href} asChild className="rounded-xl p-0 focus:bg-muted/50">
                  <Link to={item.href} className="flex items-start gap-3 p-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Advocacy Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={cn(
                "px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-normal inline-flex items-center gap-1.5",
                isActiveAdvocacy 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}>
                Advocacy
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 p-2 bg-card border-border/50 shadow-lg rounded-2xl z-dropdown">
              <DropdownMenuLabel className="text-xs text-muted-foreground px-2 pb-2">Get Involved</DropdownMenuLabel>
              {advocacyItems.map(item => (
                <DropdownMenuItem key={item.href} asChild className="rounded-xl p-0 focus:bg-muted/50">
                  <Link to={item.href} className="flex items-start gap-3 p-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent/15 shrink-0">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link 
            to="/about" 
            className={cn(
              "px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-normal",
              location.pathname === "/about" 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            About
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link to="/newsletter">
            <Button size="sm" className="rounded-xl px-5 shadow-sm hover:shadow-md transition-shadow">
              Subscribe
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden rounded-xl" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          aria-expanded={mobileMenuOpen} 
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-card/98 backdrop-blur-md animate-fade-in">
          <div className="container py-6 space-y-2">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)} 
              className={cn(
                "block px-4 py-3 text-base font-medium rounded-xl transition-all duration-normal",
                location.pathname === "/" 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Home
            </Link>
            
            {/* Policy Section */}
            <div className="pt-3">
              <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Policy</p>
              {policyItems.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-normal",
                    location.pathname.startsWith(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Advocacy Section */}
            <div className="pt-3">
              <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Advocacy</p>
              {advocacyItems.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-normal",
                    location.pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/15">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  {item.name}
                </Link>
              ))}
            </div>

            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)} 
              className={cn(
                "block px-4 py-3 text-base font-medium rounded-xl transition-all duration-normal",
                location.pathname === "/about" 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              About
            </Link>

            <div className="pt-6 border-t border-border/50 mt-4">
              <Link to="/newsletter" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full rounded-xl py-3 shadow-sm">
                  Subscribe to Newsletter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
