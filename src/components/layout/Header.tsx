import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
const navigation = [{
  name: "Home",
  href: "/"
}, {
  name: "K-12 Policy",
  href: "/k12"
}, {
  name: "Higher Ed",
  href: "/higher-ed"
}, {
  name: "Legislation",
  href: "/legislation"
}, {
  name: "Advocacy Hub",
  href: "/advocacy"
}, {
  name: "Resources",
  href: "/resources"
}, {
  name: "About",
  href: "/about"
}];
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  return <header className="sticky top-0 z-50 bg-white border-b border-border">
      <nav className="container flex items-center justify-between py-4" aria-label="Main navigation">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.map(item => <Link key={item.name} to={item.href} className={cn("px-3 py-2 text-sm font-medium rounded-md transition-colors", location.pathname === item.href ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")}>
              {item.name}
            </Link>)}
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link to="/newsletter">
            <Button variant="default" size="sm">
              Subscribe
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && <div className="lg:hidden border-t border-border bg-white">
          <div className="container py-4 space-y-1">
            {navigation.map(item => <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)} className={cn("block px-3 py-2 text-base font-medium rounded-md transition-colors", location.pathname === item.href ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")}>
                {item.name}
              </Link>)}
            <div className="pt-4 border-t border-border mt-4">
              <Link to="/newsletter" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full">
                  Subscribe to Newsletter
                </Button>
              </Link>
            </div>
          </div>
        </div>}
    </header>;
}