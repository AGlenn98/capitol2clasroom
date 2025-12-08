import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PolicyCard } from "@/components/PolicyCard";
import { LiveBillCard } from "@/components/LiveBillCard";
import { SiteSearch } from "@/components/SiteSearch";
import { EducationNewsSection } from "@/components/EducationNewsSection";
import { HeroPattern } from "@/components/HeroPattern";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, GraduationCap, Scale, Megaphone, TrendingUp, Users, AlertCircle, Sparkles } from "lucide-react";
import { useEducationBills } from "@/hooks/useLegislation";

const featuredContent = [{
  title: "Understanding Tennessee's School Voucher Program",
  description: "A comprehensive look at the Education Savings Account program and what it means for Nashville families.",
  href: "/k12",
  category: "k12" as const,
  date: "Dec 2024"
}, {
  title: "MNPS Budget Breakdown: Where Does the Money Go?",
  description: "An analysis of Metro Nashville Public Schools' funding allocation and spending priorities.",
  href: "/k12",
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
        className="hero-gradient text-primary-foreground py-20 lg:py-28"
        aria-labelledby="hero-heading"
      >
        <HeroPattern />
        <div className="container">
          <div className="max-w-3xl">
            {/* New visitor hint */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-sm text-primary-foreground/90 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>New here? Start by exploring the topics below</span>
            </div>
            
            <h1 
              id="hero-heading"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in text-balance leading-tight"
            >
              Navigate Nashville's Education Policy Landscape
            </h1>
            <p 
              className="text-lg md:text-xl text-primary-foreground/85 mb-8 leading-relaxed animate-fade-in max-w-2xl" 
              style={{ animationDelay: "0.1s" }}
            >
              Your trusted, nonpartisan guide to understanding education policy in Nashville. 
              Track real legislation, contact your legislators, and make your voice heard.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-4 animate-fade-in" 
              style={{ animationDelay: "0.2s" }}
            >
              <Link to="/advocacy">
                <Button size="lg" variant="secondary" className="gap-2.5 w-full sm:w-auto rounded-xl px-6 shadow-md hover:shadow-lg transition-shadow">
                  <Scale className="w-5 h-5" aria-hidden="true" />
                  <span>Track Live Bills</span>
                </Button>
              </Link>
              <SiteSearch variant="hero" className="flex-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section 
        className="py-14 section-soft"
        aria-labelledby="explore-heading"
      >
        <div className="container">
          <div className="text-center mb-10">
            <h2 id="explore-heading" className="font-serif text-3xl font-bold mb-3">
              Explore Education Policy
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choose a topic to get started. Each section provides in-depth explainers, data, and ways to take action.
            </p>
          </div>
          <nav aria-label="Policy topics">
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-5" role="list">
              {navigationCards.map(card => (
                <li key={card.to}>
                  <Link 
                    to={card.to} 
                    className="group flex flex-col items-center text-center p-6 bg-card border border-border/50 rounded-2xl hover:border-accent/50 hover:shadow-card transition-all duration-normal focus-visible:ring-2 focus-visible:ring-accent/50 h-full"
                    aria-label={card.actionLabel}
                  >
                    <div 
                      className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4 group-hover:scale-105 transition-transform duration-normal"
                      aria-hidden="true"
                    >
                      <card.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors duration-normal" />
                    </div>
                    <h3 className="font-serif font-semibold text-base mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground hidden sm:block leading-relaxed">{card.description}</p>
                    <span className="mt-3 text-sm font-medium text-primary group-hover:text-accent transition-colors duration-normal inline-flex items-center gap-1.5">
                      Explore
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
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
        className="py-10 border-y border-border/50"
        aria-labelledby="stats-heading"
      >
        <div className="container">
          <h2 id="stats-heading" className="sr-only">Key Statistics</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5" role="list">
            {stats.map(stat => (
              <li 
                key={stat.label} 
                className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border/50 shadow-sm"
                aria-label={`${stat.label}: ${stat.value}`}
              >
                <div 
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/15"
                  aria-hidden="true"
                >
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Live Bills Section */}
      <section 
        className="py-16"
        aria-labelledby="bills-heading"
        aria-busy={isLoading}
      >
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 id="bills-heading" className="font-serif text-2xl md:text-3xl font-bold mb-2">
                Active Education Bills
              </h2>
              <p className="text-muted-foreground">
                Real-time legislation from the Tennessee General Assembly
              </p>
            </div>
            <Link 
              to="/advocacy" 
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent hover:gap-2 transition-all duration-normal focus-visible:underline"
              aria-label="View all education bills in the Advocacy Hub"
            >
              Browse all bills <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {isLoading && (
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
              aria-label="Loading bills..."
              role="status"
            >
              <span className="sr-only">Loading education bills, please wait...</span>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-6 bg-card border border-border/50 rounded-2xl">
                  <Skeleton className="h-5 w-20 mb-4 rounded-lg" />
                  <Skeleton className="h-5 w-full mb-2 rounded-lg" />
                  <Skeleton className="h-5 w-3/4 mb-4 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
              ))}
            </div>
          )}

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
                    This could be due to a temporary connection issue. The Tennessee General Assembly data service may be experiencing high traffic.
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
                      onClick={() => window.open('https://wapp.capitol.tn.gov/apps/BillInfo/Default.aspx?BillNumber=', '_blank')}
                      className="rounded-xl"
                    >
                      Visit TN Legislature directly
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isLoading && !error && featuredBills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredBills.map(bill => (
                <LiveBillCard key={bill.bill_id} bill={bill} />
              ))}
            </div>
          )}

          <Link 
            to="/advocacy" 
            className="sm:hidden inline-flex items-center gap-1.5 text-sm font-medium text-primary mt-6 hover:text-accent hover:gap-2 transition-all duration-normal"
            aria-label="View all education bills in the Advocacy Hub"
          >
            Browse all bills <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Education News Section */}
      <EducationNewsSection />

      {/* Featured Content */}
      <section 
        className="py-16 section-warm"
        aria-labelledby="explainers-heading"
      >
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 id="explainers-heading" className="font-serif text-2xl md:text-3xl font-bold">
                Policy Explainers
              </h2>
              <p className="text-muted-foreground mt-2">
                In-depth guides to understand complex education topics
              </p>
            </div>
            <Link 
              to="/k12" 
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent hover:gap-2 transition-all duration-normal"
              aria-label="View all K-12 policy explainers"
            >
              See all explainers <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredContent.map(item => (
              <PolicyCard key={item.href} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section 
        className="py-20 hero-gradient text-primary-foreground"
        aria-labelledby="newsletter-heading"
      >
        <HeroPattern />
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 id="newsletter-heading" className="font-serif text-3xl font-bold mb-4">
              Stay Informed
            </h2>
            <p className="text-primary-foreground/85 mb-8 text-lg leading-relaxed">
              Get weekly updates on legislation, policy changes, and opportunities to make your voice heard. 
              Join thousands of engaged Nashvillians.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterSignup variant="inline" />
            </div>
            <p className="text-sm text-primary-foreground/60 mt-6">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
