import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { LiveBillCard } from "@/components/LiveBillCard";
import { HeroPattern } from "@/components/HeroPattern";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Scale,
  Megaphone,
  AlertCircle,
  Star,
  Search,
  Filter,
  CheckSquare,
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
    color: "primary" as const,
  },
  {
    to: "/higher-ed",
    icon: BookOpen,
    title: "Higher Education",
    description: "Universities, community colleges, workforce programs",
    actionLabel: "Explore higher ed policies",
    color: "primary" as const,
  },
  {
    to: "/advocacy",
    icon: Scale,
    title: "Advocacy Hub",
    description: "Track bills, contact legislators, take action",
    actionLabel: "Track legislation now",
    color: "accent" as const,
  },
  {
    to: "/action",
    icon: Megaphone,
    title: "Take Action",
    description: "Make your voice heard on education policy",
    actionLabel: "Get involved today",
    color: "accent" as const,
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
      {/* Hero Section - Bold Patriotic Blue */}
      <section className="hero-gradient py-20 lg:py-28 text-primary-foreground" aria-labelledby="hero-heading">
        <HeroPattern />
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-sm mb-6 animate-fade-in border border-primary-foreground/20">
              <Star className="w-4 h-4 fill-accent text-accent" aria-hidden="true" />
              <span className="font-medium tracking-wide">Track Tennessee Education Legislation in Real-Time</span>
            </div>

            <h1
              id="hero-heading"
              className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 animate-fade-in text-balance leading-none tracking-wider"
            >
              TENNESSEE EDUCATION
              <br />
              <span className="text-accent">BILL TRACKER</span>
            </h1>
            <p
              className="text-lg md:text-xl text-primary-foreground/85 mb-8 leading-relaxed animate-fade-in max-w-2xl"
              style={{ animationDelay: "0.1s" }}
            >
              Your nonpartisan source for tracking education legislation. Search bills, contact legislators, and make
              your voice heard.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Link to="/advocacy">
                <button className="btn-vote">
                  <CheckSquare className="w-5 h-5" />
                  Track Bills Now
                </button>
              </Link>
              <Link to="/legislators">
                <button className="btn-vote-blue">
                  Find Your Legislators
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Patriotic stripe divider */}
      <div className="patriotic-stripe" />

      {/* Legislation Tracker - Centerpiece */}
      <section className="py-12 bg-background relative z-10" aria-labelledby="bills-heading" aria-busy={isLoading}>
        <div className="container">
          {/* Search and Filter Bar */}
          <div className="bg-card border-2 border-border rounded-lg shadow-card p-6 mb-10">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  type="search"
                  placeholder="Search bills by number, title, or sponsor..."
                  className="pl-12 h-12 text-base rounded-lg border-2 border-border focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search education bills"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Link to="/advocacy" className="flex-1 md:flex-initial">
                  <Button variant="default" className="w-full gap-2 rounded-lg h-12 font-display tracking-wide">
                    <Filter className="w-4 h-4" />
                    FILTERS
                  </Button>
                </Link>
                <Link to="/advocacy" className="flex-1 md:flex-initial">
                  <Button variant="outline" className="w-full gap-2 rounded-lg h-12 font-display tracking-wide border-2">
                    <Scale className="w-4 h-4" />
                    ALL BILLS
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mt-5 pt-5 border-t-2 border-border">
              <Badge className="text-sm py-2 px-4 bg-primary text-primary-foreground font-display tracking-wide">
                <Scale className="w-4 h-4 mr-2" />
                {bills?.length || 0} ACTIVE BILLS
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4 border-2 font-display tracking-wide">
                SHOWING {filteredBills.length} RESULTS
              </Badge>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-12 bg-accent rounded-full" />
              <div>
                <h2 id="bills-heading" className="font-display text-3xl md:text-4xl text-foreground tracking-wide">
                  ACTIVE EDUCATION BILLS
                </h2>
                <p className="text-muted-foreground mt-1">Real-time legislation from the Tennessee General Assembly</p>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              aria-label="Loading bills..."
              role="status"
            >
              <span className="sr-only">Loading education bills, please wait...</span>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="p-6 bg-card border-2 border-border rounded-lg">
                  <Skeleton className="h-5 w-24 mb-4 rounded" />
                  <Skeleton className="h-5 w-full mb-2 rounded" />
                  <Skeleton className="h-5 w-3/4 mb-4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div
              className="p-8 bg-destructive/5 border-2 border-destructive/30 rounded-lg"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-destructive" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-destructive mb-2 tracking-wide">
                    UNABLE TO LOAD LIVE LEGISLATION
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    This could be due to a temporary connection issue. The Tennessee General Assembly data service may
                    be experiencing high traffic.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.reload()}
                      className="gap-2 rounded-lg border-2 font-display tracking-wide"
                    >
                      TRY AGAIN
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open("https://wapp.capitol.tn.gov/apps/BillInfo/Default.aspx?BillNumber=", "_blank")
                      }
                      className="rounded-lg font-display tracking-wide"
                    >
                      VISIT TN LEGISLATURE
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bills Grid */}
          {!isLoading && !error && filteredBills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBills.slice(0, 12).map((bill) => (
                <LiveBillCard key={bill.bill_id} bill={bill} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && !error && filteredBills.length === 0 && searchQuery && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-2xl mb-2 tracking-wide">NO BILLS FOUND</h3>
              <p className="text-muted-foreground mb-6">No bills match "{searchQuery}". Try a different search term.</p>
              <Button variant="outline" onClick={() => setSearchQuery("")} className="rounded-lg border-2 font-display tracking-wide">
                CLEAR SEARCH
              </Button>
            </div>
          )}

          {/* View More CTA */}
          {!isLoading && !error && filteredBills.length > 12 && (
            <div className="text-center mt-10">
              <Link to="/advocacy">
                <button className="btn-vote">
                  VIEW ALL {filteredBills.length} BILLS
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 bg-secondary" aria-labelledby="explore-heading">
        <div className="container">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <Star className="w-6 h-6 text-accent fill-accent" />
              <Star className="w-5 h-5 text-accent fill-accent" />
            </div>
            <h2 id="explore-heading" className="font-display text-3xl md:text-4xl mb-3 text-foreground tracking-wide">
              EXPLORE MORE
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Dive deeper into Tennessee education policy</p>
          </div>
          <nav aria-label="Policy topics">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
              {navigationCards.map((card) => (
                <li key={card.to}>
                  <Link
                    to={card.to}
                    className={`group flex flex-col items-center text-center p-6 bg-card border-2 border-border rounded-lg hover:shadow-lg transition-all duration-normal focus-visible:ring-2 focus-visible:ring-accent h-full relative overflow-hidden ${
                      card.color === "accent" ? "hover:border-accent" : "hover:border-primary"
                    }`}
                    aria-label={card.actionLabel}
                  >
                    {/* Top accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${
                      card.color === "accent" ? "bg-accent" : "bg-primary"
                    }`} />
                    
                    <div
                      className={`flex items-center justify-center w-14 h-14 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-normal ${
                        card.color === "accent" ? "bg-accent/15" : "bg-primary/15"
                      }`}
                      aria-hidden="true"
                    >
                      <card.icon className={`w-7 h-7 ${
                        card.color === "accent" ? "text-accent" : "text-primary"
                      }`} />
                    </div>
                    <h3 className="font-display text-lg mb-2 tracking-wide">{card.title.toUpperCase()}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{card.description}</p>
                    <span className={`mt-auto font-display text-sm tracking-wider inline-flex items-center gap-2 ${
                      card.color === "accent" ? "text-accent" : "text-primary"
                    } group-hover:gap-3 transition-all`}>
                      EXPLORE
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary text-primary-foreground" aria-labelledby="newsletter-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <Star className="w-6 h-6 fill-accent text-accent" />
              <Star className="w-5 h-5 fill-accent text-accent" />
            </div>
            <h2 id="newsletter-heading" className="font-display text-3xl md:text-4xl mb-4 tracking-wide">
              STAY INFORMED
            </h2>
            <p className="text-primary-foreground/85 mb-8 leading-relaxed text-lg">
              Get weekly updates on legislation and policy changes delivered to your inbox.
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
