import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { LiveBillCard } from "@/components/LiveBillCard";
import { SiteSearch } from "@/components/SiteSearch";
import { HeroPattern } from "@/components/HeroPattern";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Scale,
  Megaphone,
  AlertCircle,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";
import { useEducationBills } from "@/hooks/useLegislation";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";

const navigationCards = [
  {
    to: "/k12",
    icon: GraduationCap,
    title: "K-12 Education",
    description: "MNPS, charter schools, funding, curriculum & more",
    actionLabel: "Explore K-12 policies",
  },
  {
    to: "/higher-ed",
    icon: BookOpen,
    title: "Higher Education",
    description: "Universities, community colleges, workforce programs",
    actionLabel: "Explore higher ed policies",
  },
  {
    to: "/advocacy",
    icon: Scale,
    title: "Advocacy Hub",
    description: "Track bills, contact legislators, take action",
    actionLabel: "Track legislation now",
  },
  {
    to: "/action",
    icon: Megaphone,
    title: "Take Action",
    description: "Make your voice heard on education policy",
    actionLabel: "Get involved today",
  },
];

export default function Index() {
  const { data: bills, isLoading, error } = useEducationBills();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBills = useMemo(() => {
    if (!bills) return [];
    if (!searchQuery.trim()) return bills;
    const query = searchQuery.toLowerCase();
    return bills.filter(
      (bill) => bill.bill_number?.toLowerCase().includes(query) || bill.title?.toLowerCase().includes(query),
    );
  }, [bills, searchQuery]);

  return (
    <Layout>
      {/* Hero Section - Compact */}
      <section className="hero-gradient text-primary-foreground py-12 lg:py-16" aria-labelledby="hero-heading">
        <HeroPattern />
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-sm text-primary-foreground/90 mb-4 animate-fade-in">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Track Tennessee Education Legislation in Real-Time</span>
            </div>

            <h1
              id="hero-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in text-balance leading-tight"
            >
              Tennessee Education Bill Tracker
            </h1>
            <p
              className="text-lg text-primary-foreground/85 mb-6 leading-relaxed animate-fade-in max-w-2xl"
              style={{ animationDelay: "0.1s" }}
            >
              A nonpartisan source for tracking education legislation. Search bills, contact legislators, and make your
              voice heard.
            </p>
          </div>
        </div>
      </section>

      {/* Legislation Tracker - Centerpiece */}
      <section className="py-8 -mt-6 relative z-10" aria-labelledby="bills-heading" aria-busy={isLoading}>
        <div className="container">
          {/* Search and Filter Bar */}
          <div className="bg-card border border-border rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  type="search"
                  placeholder="Search bills by number, title, or sponsor..."
                  className="pl-10 h-12 text-base rounded-xl border-border/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search education bills"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Link to="/advocacy" className="flex-1 md:flex-initial">
                  <Button variant="default" className="w-full gap-2 rounded-xl h-12">
                    <Filter className="w-4 h-4" />
                    Advanced Filters
                  </Button>
                </Link>
                <Link to="/advocacy" className="flex-1 md:flex-initial">
                  <Button variant="outline" className="w-full gap-2 rounded-xl h-12">
                    <Scale className="w-4 h-4" />
                    Full Bill List
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border/50">
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Scale className="w-3.5 h-3.5 mr-1.5" />
                {bills?.length || 0} Active Bills
              </Badge>
              <Badge variant="outline" className="text-sm py-1.5 px-3">
                Showing {filteredBills.length} results
              </Badge>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 id="bills-heading" className="font-serif text-2xl md:text-3xl font-bold mb-1">
                Active Education Bills
              </h2>
              <p className="text-muted-foreground">Real-time legislation from the Tennessee General Assembly</p>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              aria-label="Loading bills..."
              role="status"
            >
              <span className="sr-only">Loading education bills, please wait...</span>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="p-6 bg-card border border-border/50 rounded-2xl">
                  <Skeleton className="h-5 w-20 mb-4 rounded-lg" />
                  <Skeleton className="h-5 w-full mb-2 rounded-lg" />
                  <Skeleton className="h-5 w-3/4 mb-4 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div
              className="p-8 bg-destructive/5 border border-destructive/20 rounded-2xl"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-destructive/10 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-destructive" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive text-lg mb-2">Unable to load live legislation</h3>
                  <p className="text-muted-foreground mb-4">
                    This could be due to a temporary connection issue. The Tennessee General Assembly data service may
                    be experiencing high traffic.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.reload()}
                      className="gap-2 rounded-xl"
                    >
                      Try again
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open("https://wapp.capitol.tn.gov/apps/BillInfo/Default.aspx?BillNumber=", "_blank")
                      }
                      className="rounded-xl"
                    >
                      Visit TN Legislature directly
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bills Grid - Expanded */}
          {!isLoading && !error && filteredBills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredBills.slice(0, 12).map((bill) => (
                <LiveBillCard key={bill.bill_id} bill={bill} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && !error && filteredBills.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No bills found</h3>
              <p className="text-muted-foreground mb-4">No bills match "{searchQuery}". Try a different search term.</p>
              <Button variant="outline" onClick={() => setSearchQuery("")} className="rounded-xl">
                Clear search
              </Button>
            </div>
          )}

          {/* View More CTA */}
          {!isLoading && !error && filteredBills.length > 12 && (
            <div className="text-center mt-8">
              <Link to="/advocacy">
                <Button size="lg" className="gap-2 rounded-xl">
                  View All {filteredBills.length} Bills
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 section-soft" aria-labelledby="explore-heading">
        <div className="container">
          <div className="text-center mb-8">
            <h2 id="explore-heading" className="font-serif text-2xl font-bold mb-2">
              Explore More
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Dive deeper into Tennessee education policy</p>
          </div>
          <nav aria-label="Policy topics">
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="list">
              {navigationCards.map((card) => (
                <li key={card.to}>
                  <Link
                    to={card.to}
                    className="group flex flex-col items-center text-center p-5 bg-card border border-border/50 rounded-xl hover:border-accent/50 hover:shadow-card transition-all duration-normal focus-visible:ring-2 focus-visible:ring-accent/50 h-full"
                    aria-label={card.actionLabel}
                  >
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 mb-3 group-hover:scale-105 transition-transform duration-normal"
                      aria-hidden="true"
                    >
                      <card.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-normal" />
                    </div>
                    <h3 className="font-serif font-semibold text-sm mb-1">{card.title}</h3>
                    <p className="text-xs text-muted-foreground hidden sm:block leading-relaxed">{card.description}</p>
                    <span className="mt-2 text-xs font-medium text-primary group-hover:text-accent transition-colors duration-normal inline-flex items-center gap-1">
                      Explore
                      <ArrowRight
                        className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 hero-gradient text-primary-foreground" aria-labelledby="newsletter-heading">
        <HeroPattern />
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 id="newsletter-heading" className="font-serif text-2xl font-bold mb-3">
              Stay Informed
            </h2>
            <p className="text-primary-foreground/85 mb-6 leading-relaxed">
              Get weekly updates on legislation and policy changes.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
