import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PolicyCard } from "@/components/PolicyCard";
import { LiveBillCard } from "@/components/LiveBillCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, GraduationCap, Scale, Megaphone, TrendingUp, Users, AlertCircle, Info } from "lucide-react";
import { useEducationBills } from "@/hooks/useLegislation";

const featuredContent = [{
  title: "Understanding Tennessee's School Voucher Program",
  description: "A comprehensive look at the Education Savings Account program and what it means for Nashville families.",
  href: "/k12/vouchers",
  category: "k12" as const,
  date: "Dec 2024"
}, {
  title: "MNPS Budget Breakdown: Where Does the Money Go?",
  description: "An analysis of Metro Nashville Public Schools' funding allocation and spending priorities.",
  href: "/k12/budget",
  category: "k12" as const,
  date: "Nov 2024"
}, {
  title: "Tennessee Promise: Impact on Nashville Students",
  description: "How the state's tuition-free community college program is affecting local enrollment and outcomes.",
  href: "/higher-ed/promise",
  category: "higher-ed" as const,
  date: "Nov 2024"
}];

const stats = [{
  label: "Students Served by MNPS",
  value: "80,000+",
  icon: Users,
  description: "Total enrollment in Metro Nashville Public Schools"
}, {
  label: "Active Education Bills",
  value: "42",
  icon: Scale,
  description: "Bills currently in the Tennessee General Assembly"
}, {
  label: "Year-over-Year Funding Change",
  value: "+3.2%",
  icon: TrendingUp,
  description: "Increase in education budget from last year"
}];

const navigationCards = [{
  to: "/k12",
  icon: GraduationCap,
  title: "K-12 Education",
  description: "MNPS, charter schools, funding, curriculum & more",
  actionLabel: "Explore K-12 policies"
}, {
  to: "/higher-ed",
  icon: BookOpen,
  title: "Higher Education",
  description: "Universities, community colleges, workforce programs",
  actionLabel: "Explore higher ed policies"
}, {
  to: "/advocacy",
  icon: Scale,
  title: "Advocacy Hub",
  description: "Track bills, contact legislators, take action",
  actionLabel: "Track legislation now"
}, {
  to: "/action",
  icon: Megaphone,
  title: "Take Action",
  description: "Make your voice heard on education policy",
  actionLabel: "Get involved today"
}];

export default function Index() {
  const {
    data: bills,
    isLoading,
    error
  } = useEducationBills();
  const featuredBills = bills?.slice(0, 4) || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative bg-primary text-primary-foreground py-16 lg:py-24 border-0"
        aria-labelledby="hero-heading"
      >
        <div className="container">
          <div className="max-w-3xl">
            {/* New visitor hint */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-foreground/10 rounded-full text-sm text-primary-foreground/90 mb-4 animate-fade-in">
              <Info className="w-4 h-4" aria-hidden="true" />
              <span>New here? Start by exploring the topics below</span>
            </div>
            
            <h1 
              id="hero-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-5 animate-fade-in text-balance"
            >
              Navigate Nashville's Education Policy Landscape
            </h1>
            <p 
              className="text-lg text-primary-foreground/80 mb-6 leading-relaxed animate-fade-in" 
              style={{ animationDelay: "0.1s" }}
            >
              Your trusted, nonpartisan guide to understanding education policy in Nashville. 
              Track real legislation, contact your legislators, and make your voice heard.
            </p>
            <div 
              className="flex flex-wrap gap-3 animate-fade-in" 
              style={{ animationDelay: "0.2s" }}
              role="group"
              aria-label="Primary actions"
            >
              <Link to="/advocacy">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Scale className="w-5 h-5" aria-hidden="true" />
                  <span>Track Live Bills</span>
                </Button>
              </Link>
              <Link to="/k12">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <GraduationCap className="w-5 h-5" aria-hidden="true" />
                  <span>Learn About K-12</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation - Moved to top for better Information Architecture */}
      <section 
        className="py-10 bg-muted/30 border-b border-border"
        aria-labelledby="explore-heading"
      >
        <div className="container">
          <div className="text-center mb-6">
            <h2 id="explore-heading" className="font-serif text-2xl font-bold mb-2">
              Explore Education Policy
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Choose a topic to get started. Each section provides in-depth explainers, data, and ways to take action.
            </p>
          </div>
          <nav aria-label="Policy topics">
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="list">
              {navigationCards.map(card => (
                <li key={card.to}>
                  <Link 
                    to={card.to} 
                    className="group flex flex-col items-center text-center p-5 bg-card border border-border rounded-lg hover:border-accent hover:shadow-md transition-all focus-visible:ring-2 focus-visible:ring-accent h-full"
                    aria-label={card.actionLabel}
                  >
                    <div 
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3 group-hover:bg-accent/20 transition-colors"
                      aria-hidden="true"
                    >
                      <card.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="font-serif font-semibold text-sm mb-1">{card.title}</h3>
                    <p className="text-xs text-muted-foreground hidden sm:block">{card.description}</p>
                    <span className="mt-2 text-xs font-medium text-primary group-hover:text-accent transition-colors inline-flex items-center gap-1">
                      Explore
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="py-8 border-b border-border"
        aria-labelledby="stats-heading"
      >
        <div className="container">
          <h2 id="stats-heading" className="sr-only">Key Statistics</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4" role="list">
            {stats.map(stat => (
              <li 
                key={stat.label} 
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
                aria-label={`${stat.label}: ${stat.value}`}
              >
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20"
                  aria-hidden="true"
                >
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-serif text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Live Bills Section */}
      <section 
        className="py-12"
        aria-labelledby="bills-heading"
        aria-busy={isLoading}
      >
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 id="bills-heading" className="font-serif text-2xl font-bold mb-1">
                Active Education Bills
              </h2>
              <p className="text-sm text-muted-foreground">
                Real-time legislation from the Tennessee General Assembly
              </p>
            </div>
            <Link 
              to="/advocacy" 
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all focus-visible:underline"
              aria-label="View all education bills in the Advocacy Hub"
            >
              Browse all bills <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {isLoading && (
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              aria-label="Loading bills..."
              role="status"
            >
              <span className="sr-only">Loading education bills, please wait...</span>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-5 bg-card border border-border rounded-lg">
                  <Skeleton className="h-4 w-20 mb-3" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-5 w-3/4 mb-3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div 
              className="p-6 bg-destructive/5 border border-destructive/20 rounded-lg flex items-start gap-3"
              role="alert"
              aria-live="polite"
            >
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-medium text-destructive">Unable to load live legislation</p>
                <p className="text-sm text-muted-foreground mt-1">
                  We're having trouble connecting to the data source. You can try refreshing the page or visit the TN General Assembly website directly.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => window.location.reload()}
                >
                  Try again
                </Button>
              </div>
            </div>
          )}

          {!isLoading && !error && featuredBills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredBills.map(bill => (
                <LiveBillCard key={bill.bill_id} bill={bill} />
              ))}
            </div>
          )}

          <Link 
            to="/advocacy" 
            className="sm:hidden inline-flex items-center gap-1 text-sm font-medium text-primary mt-4 hover:gap-2 transition-all"
            aria-label="View all education bills in the Advocacy Hub"
          >
            Browse all bills <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Featured Content */}
      <section 
        className="py-12 bg-muted/30"
        aria-labelledby="explainers-heading"
      >
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 id="explainers-heading" className="font-serif text-2xl font-bold">
                Policy Explainers
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                In-depth guides to understand complex education topics
              </p>
            </div>
            <Link 
              to="/k12" 
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
              aria-label="View all K-12 policy explainers"
            >
              See all explainers <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredContent.map(item => (
              <PolicyCard key={item.href} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section 
        className="py-12 bg-primary text-primary-foreground"
        aria-labelledby="newsletter-heading"
      >
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 id="newsletter-heading" className="font-serif text-2xl font-bold mb-3">
              Stay Informed
            </h2>
            <p className="text-primary-foreground/80 mb-6 text-sm">
              Get weekly updates on legislation, policy changes, and opportunities to make your voice heard. 
              Join thousands of engaged Nashvillians.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterSignup variant="inline" />
            </div>
            <p className="text-xs text-primary-foreground/60 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}