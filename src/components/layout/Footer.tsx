import { Link } from "react-router-dom";
import { Landmark } from "lucide-react";

const footerLinks = {
  explore: [
    { name: "K-12 Policy", href: "/k12" },
    { name: "Higher Education", href: "/higher-ed" },
    { name: "Legislation Tracker", href: "/legislation" },
    { name: "Resource Library", href: "/resources" },
  ],
  action: [
    { name: "Take Action", href: "/action" },
    { name: "Contact Legislators", href: "/action#contact" },
    { name: "Upcoming Hearings", href: "/action#hearings" },
  ],
  about: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Contact", href: "/about#contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container py-12">
        <div className="flex flex-wrap justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <Landmark className="w-8 h-8 text-primary" />
            <span className="font-heading text-lg tracking-[2px] uppercase font-semibold text-foreground">
              Capitol to Classroom
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Capitol to Classroom. Empowering civic engagement in education.
          </p>

          {/* Links */}
          <nav className="flex gap-8" aria-label="Footer navigation">
            {footerLinks.about.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-normal"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
