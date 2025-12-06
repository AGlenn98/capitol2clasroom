import { Layout } from "@/components/layout/Layout";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
import { FileText, ExternalLink, Download, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = ["All", "Reports", "Data", "Official Documents", "Research"];

const resources = [
  {
    title: "MNPS FY2024 Budget Document",
    description: "Complete Metro Nashville Public Schools operating budget for fiscal year 2024.",
    category: "Official Documents",
    type: "PDF",
    source: "MNPS",
    url: "#",
    date: "Jul 2024",
  },
  {
    title: "Tennessee State Report Card",
    description: "Official school and district performance data from the Tennessee Department of Education.",
    category: "Data",
    type: "Website",
    source: "TN DOE",
    url: "https://reportcard.tnedu.gov/",
    date: "2024",
  },
  {
    title: "Education Funding in Tennessee: A Primer",
    description: "Research brief explaining the Tennessee Investment in Student Achievement (TISA) formula.",
    category: "Research",
    type: "PDF",
    source: "Sycamore Institute",
    url: "#",
    date: "2023",
  },
  {
    title: "Charter School Annual Report",
    description: "Tennessee Public Charter School Commission's annual performance and compliance report.",
    category: "Reports",
    type: "PDF",
    source: "TPCSC",
    url: "#",
    date: "Dec 2023",
  },
  {
    title: "Tennessee Higher Education Fact Book",
    description: "Comprehensive data on enrollment, completion, and outcomes across TN colleges and universities.",
    category: "Data",
    type: "PDF",
    source: "THEC",
    url: "#",
    date: "2024",
  },
  {
    title: "MNPS Strategic Plan 2024-2029",
    description: "Metro Nashville Public Schools' five-year strategic vision and goals.",
    category: "Official Documents",
    type: "PDF",
    source: "MNPS",
    url: "#",
    date: "2024",
  },
  {
    title: "Teacher Supply and Demand Report",
    description: "Analysis of teacher workforce trends and shortage areas in Tennessee.",
    category: "Research",
    type: "PDF",
    source: "TN DOE",
    url: "#",
    date: "2024",
  },
  {
    title: "Tennessee Promise Outcomes Study",
    description: "Research on the effects of Tennessee Promise on enrollment and completion rates.",
    category: "Research",
    type: "PDF",
    source: "THEC",
    url: "#",
    date: "2023",
  },
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "All" || resource.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-3 border-b border-border bg-muted/30">
        <div className="container">
          <PolicyBreadcrumb items={[{ label: "Resources" }]} />
        </div>
      </section>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground">
              <FileText className="w-6 h-6" />
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
              Reference Library
            </Badge>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Resource Library
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Access primary sources, research reports, and official documents related to Nashville education policy. 
            All resources are curated for accuracy and relevance.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-16 bg-background z-10">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={categoryFilter === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter(cat)}
                  className="shrink-0"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredResources.length} resources
                </p>
              </div>
              <div className="space-y-4">
                {filteredResources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex items-start gap-4 p-5 bg-card border border-border rounded-lg transition-all hover:border-accent hover:shadow-lg"
                    )}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary shrink-0">
                      {resource.type === "PDF" ? (
                        <Download className="w-5 h-5 text-primary" />
                      ) : (
                        <ExternalLink className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="secondary">{resource.category}</Badge>
                        <Badge variant="outline">{resource.type}</Badge>
                        <span className="text-xs text-muted-foreground">{resource.source}</span>
                      </div>
                      <h3 className="font-serif font-semibold mb-1 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{resource.date}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 mt-1" />
                  </a>
                ))}
              </div>
              {filteredResources.length === 0 && (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <p className="text-muted-foreground">No resources found matching your criteria.</p>
                  <Button variant="link" onClick={() => { setSearchQuery(""); setCategoryFilter("All"); }}>
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
            <aside className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <NewsletterSignup />
                <div className="bg-secondary/50 rounded-lg p-6">
                  <h3 className="font-serif font-semibold mb-3">Key Sources</h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="https://www.tn.gov/education.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                        TN Department of Education <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.mnps.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                        Metro Nashville Public Schools <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.tn.gov/thec.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                        TN Higher Education Commission <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.sycamoreinstitutetn.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                        Sycamore Institute <ExternalLink className="w-3 h-3" />
                      </a>
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