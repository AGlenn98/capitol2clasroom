import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { LiveBillCard } from "@/components/LiveBillCard";
import { FloatingStickers } from "@/components/CivicSticker";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Scale,
  Megaphone,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import { useEducationBills } from "@/hooks/useLegislation";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";

const navigationCards = [
  { to: "/k12", icon: GraduationCap, title: "K-12 Education", description: "MNPS, charter schools, funding", actionLabel: "Explore K-12" },
  { to: "/higher-ed", icon: BookOpen, title: "Higher Education", description: "Universities, workforce programs", actionLabel: "Explore Higher Ed" },
  { to: "/advocacy", icon: Scale, title: "Bill Track List", description: "Track bills, take action", actionLabel: "Track Bills" },
  { to: "/action", icon: Megaphone, title: "Take Action", description: "Make your voice heard", actionLabel: "Get Involved" },
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
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-16 lg:py-20 relative" aria-labelledby="hero-heading">
        <FloatingStickers />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 id="hero-heading" className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide mb-4 animate-fade-in">
              Tennessee Education Bill Tracker
            </h1>
            <p className="text-lg text-primary-foreground/85 mb-6 leading-relaxed animate-fade-in font-sans max-w-2xl" style={{ animationDelay: "0.1s" }}>
              Your nonpartisan source for tracking education legislation. Search bills, contact legislators, and make your voice heard.
            </p>
          </div>
        </div>
      </section>

      {/* Legislation Tracker */}
      <section className="py-8 -mt-6 relative z-10" aria-labelledby="bills-heading">
        <div className="container">
          {/* Search Bar */}
          <div className="bg-card border-2 border-border rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input type="search" placeholder="Search bills..." className="pl-10 h-12 text-base rounded-lg border-2 border-border" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Link to="/advocacy" className="flex-1 md:flex-initial">
                  <Button variant="default" className="w-full gap-2 rounded-lg h-12 font-display tracking-wider uppercase bg-accent hover:bg-accent/90">
                    <Filter className="w-4 h-4" /> Filters
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t-2 border-border">
              <Badge variant="secondary" className="text-sm py-1.5 px-3 font-display tracking-wide uppercase">
                <Scale className="w-3.5 h-3.5 mr-1.5" /> {bills?.length || 0} Active Bills
              </Badge>
              <Badge variant="outline" className="text-sm py-1.5 px-3">Showing {filteredBills.length} results</Badge>
            </div>
          </div>

          <h2 id="bills-heading" className="font-display text-3xl md:text-4xl tracking-wide mb-6">Active Education Bills</h2>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="p-6 bg-card border-2 border-border rounded-lg">
                  <Skeleton className="h-5 w-20 mb-4" /><Skeleton className="h-5 w-full mb-2" /><Skeleton className="h-5 w-3/4 mb-4" /><Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="p-8 bg-destructive/5 border-2 border-destructive/20 rounded-lg" role="alert">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-destructive/10 rounded-lg"><AlertCircle className="w-6 h-6 text-destructive" /></div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-destructive mb-2">Unable to Load Legislation</h3>
                  <p className="text-muted-foreground mb-4 font-sans">Connection issue. Please try again.</p>
                  <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="rounded-lg">Try again</Button>
                </div>
              </div>
            </div>
          )}

          {!isLoading && !error && filteredBills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredBills.slice(0, 12).map((bill) => (<LiveBillCard key={bill.bill_id} bill={bill} />))}
            </div>
          )}

          {!isLoading && !error && filteredBills.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">No Bills Found</h3>
              <Button variant="outline" onClick={() => setSearchQuery("")} className="rounded-lg">Clear search</Button>
            </div>
          )}

          {!isLoading && !error && filteredBills.length > 12 && (
            <div className="text-center mt-8">
              <Link to="/advocacy">
                <Button size="lg" className="gap-2 rounded-lg font-display tracking-wider uppercase bg-accent hover:bg-accent/90">
                  View All {filteredBills.length} Bills <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 section-soft">
        <div className="container">
          <h2 className="font-display text-3xl text-center mb-8">Explore More</h2>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {navigationCards.map((card) => (
              <li key={card.to}>
                <Link to={card.to} className="group flex flex-col items-center text-center p-5 bg-card border-2 border-border rounded-lg hover:border-accent hover:shadow-card transition-all h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-3 group-hover:scale-105 transition-transform">
                    <card.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-display text-sm tracking-wide uppercase mb-1">{card.title}</h3>
                  <p className="text-xs text-muted-foreground hidden sm:block font-sans">{card.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 hero-gradient text-primary-foreground relative">
        <FloatingStickers />
        <div className="container relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-4xl tracking-wide mb-3">Stay Informed</h2>
            <p className="text-primary-foreground/85 mb-6 font-sans">Get weekly updates on legislation and policy changes.</p>
            <div className="max-w-md mx-auto"><NewsletterSignup variant="inline" /></div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
