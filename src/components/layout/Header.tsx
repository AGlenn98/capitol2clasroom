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
  DropdownMenuSeparator,
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
      "sticky top-0 z-sticky bg-white border-b border-border transition-shadow duration-normal",
      scrolled && "shadow-md"
    )}>
      <nav className="container flex items-center justify-between py-4" aria-label="Main navigation">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          <Link 
            to="/" 
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-colors",
              location.pathname === "/" 
                ? "text-primary bg-secondary" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            Home
          </Link>

          {/* Policy Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-1",
                isActivePolicy 
                  ? "text-primary bg-secondary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}>
                Policy
                <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 bg-popover z-dropdown">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Education Policy</DropdownMenuLabel>
              {policyItems.map(item => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link to={item.href} className="flex items-start gap-3 py-2">
                    <item.icon className="w-4 h-4 mt-0.5 text-primary" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
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
                "px-3 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-1",
                isActiveAdvocacy 
                  ? "text-primary bg-secondary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}>
                Advocacy
                <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 bg-popover z-dropdown">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Get Involved</DropdownMenuLabel>
              {advocacyItems.map(item => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link to={item.href} className="flex items-start gap-3 py-2">
                    <item.icon className="w-4 h-4 mt-0.5 text-accent" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link 
            to="/about" 
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-colors",
              location.pathname === "/about" 
                ? "text-primary bg-secondary" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            About
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link to="/newsletter">
            <Button variant="default" size="sm">
              Subscribe
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          aria-expanded={mobileMenuOpen} 
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container py-4 space-y-1">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)} 
              className={cn(
                "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                location.pathname === "/" 
                  ? "text-primary bg-secondary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              Home
            </Link>
            
            {/* Policy Section */}
            <div className="pt-2">
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Policy</p>
              {policyItems.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-base font-medium rounded-md transition-colors",
                    location.pathname.startsWith(item.href)
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Advocacy Section */}
            <div className="pt-2">
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Advocacy</p>
              {advocacyItems.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-base font-medium rounded-md transition-colors",
                    location.pathname === item.href
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>

            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)} 
              className={cn(
                "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                location.pathname === "/about" 
                  ? "text-primary bg-secondary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              About
            </Link>

            <div className="pt-4 border-t border-border mt-4">
              <Link to="/newsletter" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full">
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