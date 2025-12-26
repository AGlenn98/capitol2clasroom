import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { LiveBillCard } from "@/components/LiveBillCard";
import { CivicHeroBanner } from "@/components/CivicHeroBanner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Scale,
  Megaphone,
  AlertCircle,
  Search,
} from "lucide-react";
import { useEducationBills } from "@/hooks/useLegislation";
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
      {/* Civic Engagement Hero Banner */}
      <CivicHeroBanner 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />

      {/* Legislation Tracker - Centerpiece */}
      <section className="py-12 relative z-10" aria-labelledby="bills-heading" aria-busy={isLoading}>
        <div className="container">
          {/* Quick Stats Bar */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <Badge variant="secondary" className="text-sm py-2 px-4 bg-card shadow-sm">
              <Scale className="w-4 h-4 mr-2" />
              {bills?.length || 0} Active Bills
            </Badge>
            {searchQuery && (
              <Badge variant="outline" className="text-sm py-2 px-4 bg-card shadow-sm">
                Showing {filteredBills.length} results for "{searchQuery}"
              </Badge>
            )}
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 id="bills-heading" className="font-display text-2xl md:text-3xl mb-1 text-foreground">
                ACTIVE EDUCATION BILLS
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
            <h2 id="explore-heading" className="font-display text-2xl mb-2 text-foreground">
              EXPLORE MORE
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
                    <h3 className="font-display text-sm mb-1 tracking-wide">{card.title.toUpperCase()}</h3>
                    <p className="text-xs text-muted-foreground hidden sm:block leading-relaxed font-sans">{card.description}</p>
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
      <section className="py-16 bg-gradient-to-br from-card via-secondary/50 to-card" aria-labelledby="newsletter-heading">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 id="newsletter-heading" className="font-display text-2xl mb-3 text-foreground">
              STAY INFORMED
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
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
