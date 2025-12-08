import { Layout } from "@/components/layout/Layout";
import { LegislationCard } from "@/components/LegislationCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
import { HeroPattern } from "@/components/HeroPattern";
import { Scale, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const statusFilters = ["All", "Proposed", "In Committee", "Passed", "Failed"];
const categoryFilters = ["All Categories", "K-12 Funding", "K-12 Oversight", "Higher Ed", "Teachers"];

import { TimelineStage } from "@/components/BillTimeline";

const legislation: Array<{
  billNumber: string;
  title: string;
  summary: string;
  status: "proposed" | "committee" | "passed" | "failed";
  category: string;
  sponsor: string;
  lastAction: string;
  lastActionDate: string;
  href: string;
  timelineStage: TimelineStage;
}> = [
  {
    billNumber: "HB 1234",
    title: "Teacher Compensation Enhancement Act",
    summary: "Proposes a 10% increase in base teacher salaries across all Tennessee public schools, with additional incentives for high-need subject areas.",
    status: "committee" as const,
    category: "K-12 Funding",
    sponsor: "Rep. Jane Smith",
    lastAction: "Referred to Education Committee",
    lastActionDate: "Nov 15, 2024",
    href: "/advocacy",
    timelineStage: "committee",
  },
  {
    billNumber: "SB 567",
    title: "Charter School Accountability Standards",
    summary: "Establishes new performance benchmarks and reporting requirements for charter schools, including financial transparency measures.",
    status: "proposed" as const,
    category: "K-12 Oversight",
    sponsor: "Sen. John Davis",
    lastAction: "First reading",
    lastActionDate: "Dec 1, 2024",
    href: "/advocacy",
    timelineStage: "first_reading",
  },
  {
    billNumber: "HB 890",
    title: "Tennessee Promise Expansion Act",
    summary: "Expands eligibility for Tennessee Promise to include part-time students and removes the recent high school graduate requirement.",
    status: "committee" as const,
    category: "Higher Ed",
    sponsor: "Rep. Maria Garcia",
    lastAction: "Hearing scheduled for Jan 15",
    lastActionDate: "Nov 20, 2024",
    href: "/advocacy",
    timelineStage: "floor_vote",
  },
  {
    billNumber: "SB 345",
    title: "School Safety Enhancement Act",
    summary: "Allocates $50 million for school security improvements including resource officers, mental health counselors, and facility upgrades.",
    status: "passed" as const,
    category: "K-12 Funding",
    sponsor: "Sen. Robert Wilson",
    lastAction: "Signed by Governor",
    lastActionDate: "Oct 30, 2024",
    href: "/advocacy",
    timelineStage: "enacted",
  },
  {
    billNumber: "HB 456",
    title: "Education Savings Account Modification",
    summary: "Proposed changes to the ESA voucher program including expanded eligibility and increased account values.",
    status: "failed" as const,
    category: "K-12 Funding",
    sponsor: "Rep. Thomas Brown",
    lastAction: "Failed in committee vote",
    lastActionDate: "Sep 15, 2024",
    href: "/advocacy",
    timelineStage: "committee",
  },
  {
    billNumber: "SB 789",
    title: "Teacher Certification Pathway Reform",
    summary: "Creates alternative certification pathways for career changers and expands recognition of out-of-state credentials.",
    status: "committee" as const,
    category: "Teachers",
    sponsor: "Sen. Lisa Chen",
    lastAction: "Amended in subcommittee",
    lastActionDate: "Nov 28, 2024",
    href: "/advocacy",
    timelineStage: "second_chamber",
  },
];

export default function Legislation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const filteredLegislation = legislation.filter((bill) => {
    const matchesSearch = searchQuery === "" || 
      bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || 
      (statusFilter === "Proposed" && bill.status === "proposed") ||
      (statusFilter === "In Committee" && bill.status === "committee") ||
      (statusFilter === "Passed" && bill.status === "passed") ||
      (statusFilter === "Failed" && bill.status === "failed");
    
    const matchesCategory = categoryFilter === "All Categories" || bill.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-4 border-b border-border/50 bg-muted/30">
        <div className="container">
          <PolicyBreadcrumb items={[{ label: "Legislation Tracker" }]} />
        </div>
      </section>

      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-20">
        <HeroPattern />
        <div className="container">
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent text-accent-foreground shadow-lg">
              <Scale className="w-7 h-7" />
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/15 text-primary-foreground border-none rounded-full px-4 py-1">
              Bill Tracker
            </Badge>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-5">
            Legislation Tracker
          </h1>
          <p className="text-xl text-primary-foreground/85 max-w-2xl leading-relaxed">
            Follow education-related bills through the Tennessee General Assembly. 
            Track status, read our analysis, and understand the potential impacts.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border/50 sticky top-16 bg-card/95 backdrop-blur-md z-10">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search bills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 rounded-xl border-border/50 bg-background"
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              {statusFilters.map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="shrink-0 rounded-xl"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 overflow-x-auto">
            <span className="text-sm text-muted-foreground shrink-0">Category:</span>
            {categoryFilters.map((cat) => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setCategoryFilter(cat)}
                className="shrink-0 rounded-xl"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Bills Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="mb-5">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredLegislation.length} of {legislation.length} bills
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {filteredLegislation.map((bill) => (
                  <LegislationCard key={bill.billNumber} {...bill} />
                ))}
              </div>
              {filteredLegislation.length === 0 && (
                <div className="text-center py-16 bg-card border border-border/50 rounded-2xl">
                  <p className="text-muted-foreground mb-3">No bills found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    onClick={() => { setSearchQuery(""); setStatusFilter("All"); setCategoryFilter("All Categories"); }}
                    className="text-primary"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
            <aside className="lg:col-span-1">
              <div className="sticky top-48 space-y-6">
                <NewsletterSignup />
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-serif font-semibold text-lg mb-4">Legislative Calendar</h3>
                  <ul className="space-y-4 text-sm">
                    <li className="pb-4 border-b border-border/50">
                      <span className="font-medium block text-foreground">Jan 14, 2025</span>
                      <span className="text-muted-foreground">114th General Assembly Convenes</span>
                    </li>
                    <li className="pb-4 border-b border-border/50">
                      <span className="font-medium block text-foreground">Feb 1, 2025</span>
                      <span className="text-muted-foreground">Bill filing deadline</span>
                    </li>
                    <li>
                      <span className="font-medium block text-foreground">May 2025</span>
                      <span className="text-muted-foreground">Expected adjournment</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-serif font-semibold text-lg mb-4">Legend</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-secondary text-secondary-foreground rounded-lg">Proposed</Badge>
                      <span className="text-muted-foreground">Filed, awaiting action</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-accent/15 text-accent-foreground border-accent/30 rounded-lg">In Committee</Badge>
                      <span className="text-muted-foreground">Under review</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-success/15 text-success border-success/30 rounded-lg">Passed</Badge>
                      <span className="text-muted-foreground">Signed into law</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-destructive/15 text-destructive border-destructive/30 rounded-lg">Failed</Badge>
                      <span className="text-muted-foreground">Did not pass</span>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
