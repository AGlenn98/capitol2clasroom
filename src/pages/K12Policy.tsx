import { Layout } from "@/components/layout/Layout";
import { PolicyCard } from "@/components/PolicyCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { GraduationCap, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const categories = ["All", "Funding", "Curriculum", "Charter Schools", "Vouchers", "Teachers"];

const articles = [
  {
    title: "Understanding Tennessee's School Voucher Program",
    description: "A comprehensive look at the Education Savings Account program and what it means for Nashville families, including eligibility, funding mechanisms, and ongoing legal challenges.",
    href: "/k12/vouchers",
    category: "k12" as const,
    date: "Dec 2024",
    tags: ["Vouchers"],
  },
  {
    title: "MNPS Budget Breakdown: Where Does the Money Go?",
    description: "An analysis of Metro Nashville Public Schools' funding allocation and spending priorities for the current fiscal year.",
    href: "/k12/budget",
    category: "k12" as const,
    date: "Nov 2024",
    tags: ["Funding"],
  },
  {
    title: "Charter Schools in Nashville: A Complete Guide",
    description: "Everything you need to know about charter school options, authorization, and performance data in Davidson County.",
    href: "/k12/charters",
    category: "k12" as const,
    date: "Nov 2024",
    tags: ["Charter Schools"],
  },
  {
    title: "Tennessee's New Literacy Standards Explained",
    description: "Breaking down the Sound Literacy standards and how they're being implemented across Nashville schools.",
    href: "/k12/literacy",
    category: "k12" as const,
    date: "Oct 2024",
    tags: ["Curriculum"],
  },
  {
    title: "Teacher Shortage: Causes and Solutions",
    description: "Examining the factors contributing to Nashville's teacher vacancy crisis and what policymakers are proposing.",
    href: "/k12/teacher-shortage",
    category: "k12" as const,
    date: "Oct 2024",
    tags: ["Teachers"],
  },
  {
    title: "School Safety Funding in Tennessee",
    description: "How state and local funds are being allocated to improve security measures in Nashville schools.",
    href: "/k12/safety",
    category: "k12" as const,
    date: "Sep 2024",
    tags: ["Funding"],
  },
];

export default function K12Policy() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredArticles = activeFilter === "All" 
    ? articles 
    : articles.filter(article => article.tags.includes(activeFilter));

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground">
              <GraduationCap className="w-6 h-6" />
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
              Policy Explainers
            </Badge>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            K-12 Education Policy
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Understand the policies shaping Nashville's public schools. From MNPS funding to charter schools, 
            vouchers to curriculum standards—we break it all down.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-16 bg-background z-10">
        <div className="container">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeFilter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(cat)}
                className="shrink-0"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <PolicyCard key={article.href} {...article} />
                ))}
              </div>
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found for this category.</p>
                </div>
              )}
            </div>
            <aside className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <NewsletterSignup />
                <div className="bg-secondary/50 rounded-lg p-6">
                  <h3 className="font-serif font-semibold mb-3">Quick Facts</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">MNPS Students</span>
                      <span className="font-medium">~80,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Schools</span>
                      <span className="font-medium">160+</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Charter Schools</span>
                      <span className="font-medium">30+</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Per-Pupil Spending</span>
                      <span className="font-medium">$12,500</span>
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