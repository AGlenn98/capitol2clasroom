import { Link } from "react-router-dom";
import { Compass, Mail } from "lucide-react";
const footerLinks = {
  explore: [{
    name: "K-12 Policy",
    href: "/k12"
  }, {
    name: "Higher Education",
    href: "/higher-ed"
  }, {
    name: "Legislation Tracker",
    href: "/legislation"
  }, {
    name: "Resource Library",
    href: "/resources"
  }],
  action: [{
    name: "Take Action",
    href: "/action"
  }, {
    name: "Contact Legislators",
    href: "/action#contact"
  }, {
    name: "Upcoming Hearings",
    href: "/action#hearings"
  }],
  about: [{
    name: "About Us",
    href: "/about"
  }, {
    name: "Our Mission",
    href: "/about#mission"
  }, {
    name: "Contact",
    href: "/about#contact"
  }]
};
export function Footer() {
  return <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          

          {/* Explore Links */}
          <div>
            <h3 className="font-serif font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Action Links */}
          <div>
            <h3 className="font-serif font-semibold mb-4">Take Action</h3>
            <ul className="space-y-2">
              {footerLinks.action.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-serif font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
            <div className="mt-4 pt-4 border-t border-primary-foreground/20">
              <a href="mailto:contact@nashvillepolicycompass.com" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Nashville Policy Compass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
}