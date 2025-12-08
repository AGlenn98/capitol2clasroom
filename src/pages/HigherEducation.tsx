import { Layout } from "@/components/layout/Layout";
import { PolicyCard } from "@/components/PolicyCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
import { HeroPattern } from "@/components/HeroPattern";
import { BookOpen, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const categories = ["All", "Community College", "Universities", "Workforce", "Financial Aid"];

const articles = [
  {
    title: "Tennessee Promise: Impact on Nashville Students",
    description: "How the state's tuition-free community college program is affecting local enrollment, completion rates, and workforce outcomes.",
    href: "/higher-ed/promise",
    category: "higher-ed" as const,
    date: "Nov 2024",
    tags: ["Community College", "Financial Aid"],
  },
  {
    title: "Tennessee Reconnect: Returning to School as an Adult",
    description: "A guide to the state program that helps adults complete their education, including eligibility and how to apply.",
    href: "/resources",
    category: "higher-ed" as const,
    date: "Oct 2024",
    tags: ["Community College", "Workforce"],
  },
  {
    title: "Nashville State Community College: Programs & Outcomes",
    description: "An overview of program offerings, graduation rates, and job placement data for Nashville State students.",
    href: "/resources",
    category: "higher-ed" as const,
    date: "Oct 2024",
    tags: ["Community College"],
  },
  {
    title: "TSU & Vanderbilt: Comparing Nashville's Universities",
    description: "Understanding the different missions, programs, and policy implications of Nashville's major universities.",
    href: "/resources",
    category: "higher-ed" as const,
    date: "Sep 2024",
    tags: ["Universities"],
  },
  {
    title: "Workforce Development in Middle Tennessee",
    description: "How higher education institutions are partnering with employers to address skills gaps in the region.",
    href: "/resources",
    category: "higher-ed" as const,
    date: "Sep 2024",
    tags: ["Workforce"],
  },
];

export default function HigherEducation() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredArticles = activeFilter === "All" 
    ? articles 
    : articles.filter(article => article.tags.includes(activeFilter));

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-3 border-b border-border bg-muted/30">
        <div className="container">
          <PolicyBreadcrumb items={[{ label: "Higher Education" }]} />
        </div>
      </section>
      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-16">
        <HeroPattern />
        <div className="container relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground">
              <BookOpen className="w-6 h-6" />
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
              Policy Explainers
            </Badge>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Higher Education Policy
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Explore policies affecting Nashville's colleges, universities, and workforce development programs. 
            From Tennessee Promise to university funding—understand the landscape.
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
                  <h3 className="font-serif font-semibold mb-3">Key Programs</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="pb-2 border-b border-border">
                      <span className="font-medium block">Tennessee Promise</span>
                      <span className="text-muted-foreground">Free community college for recent HS grads</span>
                    </li>
                    <li className="pb-2 border-b border-border">
                      <span className="font-medium block">Tennessee Reconnect</span>
                      <span className="text-muted-foreground">Free tuition for adults without degrees</span>
                    </li>
                    <li>
                      <span className="font-medium block">HOPE Scholarship</span>
                      <span className="text-muted-foreground">Merit-based aid for TN universities</span>
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