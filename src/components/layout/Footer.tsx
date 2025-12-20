import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { CivicSticker } from "@/components/CivicSticker";

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
    { name: "About Us", href: "/about" },
    { name: "Our Mission", href: "/about#mission" },
    { name: "Contact", href: "/about#contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto relative overflow-hidden">
      {/* Decorative stickers */}
      <div className="absolute top-8 right-8 opacity-20 hidden lg:block">
        <CivicSticker variant="vote" color="white" size="lg" animated={false} />
      </div>
      <div className="absolute bottom-12 left-12 opacity-15 hidden lg:block">
        <CivicSticker variant="check" color="white" size="md" animated={false} />
      </div>

      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo variant="light" />
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed font-sans">
              This program serves a purpose to view education policy in Tennessee
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-display text-xl tracking-wider uppercase mb-5">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors duration-normal font-sans"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Links */}
          <div>
            <h3 className="font-display text-xl tracking-wider uppercase mb-5">Take Action</h3>
            <ul className="space-y-3">
              {footerLinks.action.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors duration-normal font-sans"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-display text-xl tracking-wider uppercase mb-5">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors duration-normal font-sans"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-primary-foreground/20">
              <a
                href="mailto:contact@nashvillepolicycompass.com"
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-accent transition-colors duration-normal font-sans"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60 font-sans">
              © {new Date().getFullYear()} Capitol to Classroom. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/60 flex items-center gap-1.5 font-sans">
              Made for Tennesseans
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
