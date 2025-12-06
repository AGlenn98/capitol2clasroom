import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PolicyCard } from "@/components/PolicyCard";
import { LegislationCard } from "@/components/LegislationCard";
import { ArrowRight, BookOpen, GraduationCap, Scale, Megaphone, TrendingUp, Users } from "lucide-react";
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
const featuredLegislation = [{
  billNumber: "HB 1234",
  title: "Teacher Compensation Enhancement Act",
  summary: "Proposes a 10% increase in base teacher salaries across all Tennessee public schools.",
  status: "committee" as const,
  category: "K-12 Funding",
  sponsor: "Rep. Jane Smith",
  lastAction: "Referred to Education Committee",
  lastActionDate: "Nov 15, 2024",
  href: "/legislation/hb-1234"
}, {
  billNumber: "SB 567",
  title: "Charter School Accountability Standards",
  summary: "Establishes new performance benchmarks and reporting requirements for charter schools.",
  status: "proposed" as const,
  category: "K-12 Oversight",
  sponsor: "Sen. John Davis",
  lastAction: "First reading",
  lastActionDate: "Dec 1, 2024",
  href: "/legislation/sb-567"
}];
const stats = [{
  label: "Students Served by MNPS",
  value: "80,000+",
  icon: Users
}, {
  label: "Active Education Bills",
  value: "42",
  icon: Scale
}, {
  label: "Year-over-Year Funding Change",
  value: "+3.2%",
  icon: TrendingUp
}];
export default function Index() {
  return <Layout>
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-20 lg:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Navigate Nashville's Education Policy Landscape
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed animate-fade-in" style={{
            animationDelay: "0.1s"
          }}>
              Your trusted, nonpartisan guide to understanding education policy in Nashville. 
              We break down complex legislation, explain policy impacts, and help you take informed action.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{
            animationDelay: "0.2s"
          }}>
              <Link to="/k12">
                <Button size="lg" variant="secondary" className="gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Explore K-12 Policy
                </Button>
              </Link>
              <Link to="/legislation">
                <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 hover:bg-primary-foreground/10 text-black">
                  <Scale className="w-5 h-5" />
                  Track Legislation
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 gradient-overlay" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(stat => <div key={stat.label} className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/20">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-center">
            What Would You Like to Explore?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/k12" className="group flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4 group-hover:bg-accent/20 transition-colors">
                <GraduationCap className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-serif font-semibold mb-2">K-12 Education</h3>
              <p className="text-sm text-muted-foreground">MNPS, charter schools, funding, curriculum & more</p>
            </Link>
            <Link to="/higher-ed" className="group flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4 group-hover:bg-accent/20 transition-colors">
                <BookOpen className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-serif font-semibold mb-2">Higher Education</h3>
              <p className="text-sm text-muted-foreground">Universities, community colleges, workforce programs</p>
            </Link>
            <Link to="/legislation" className="group flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4 group-hover:bg-accent/20 transition-colors">
                <Scale className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-serif font-semibold mb-2">Legislation Tracker</h3>
              <p className="text-sm text-muted-foreground">Current bills, voting records, session updates</p>
            </Link>
            <Link to="/action" className="group flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4 group-hover:bg-accent/20 transition-colors">
                <Megaphone className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-serif font-semibold mb-2">Take Action</h3>
              <p className="text-sm text-muted-foreground">Contact legislators, attend hearings, get involved</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Featured Policy Explainers</h2>
            <Link to="/k12" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredContent.map(item => <PolicyCard key={item.href} {...item} />)}
          </div>
          <Link to="/k12" className="sm:hidden inline-flex items-center gap-1 text-sm font-medium text-primary mt-6 hover:gap-2 transition-all">
            View all explainers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Legislation Spotlight */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Legislation to Watch</h2>
            <Link to="/legislation" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
              View tracker <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredLegislation.map(bill => <LegislationCard key={bill.billNumber} {...bill} />)}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Stay Informed on Nashville Education Policy
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Get weekly updates on legislation, policy changes, and opportunities to make your voice heard. 
              No spam, just the information you need.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </div>
      </section>
    </Layout>;
}