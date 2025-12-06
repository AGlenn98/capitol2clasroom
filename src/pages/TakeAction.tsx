import { Layout } from "@/components/layout/Layout";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
import { Megaphone, Phone, Calendar, MapPin, Users, ExternalLink, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import { TennesseeLegislatorContact } from "@/types/legislation";

const actionItems = [
  {
    title: "Support Teacher Pay Increase",
    description: "HB 1234 proposes a 10% increase in base teacher salaries. Let your representatives know you support investing in educators.",
    priority: "high",
    deadline: "Jan 20, 2025",
    billNumber: "HB 1234",
  },
  {
    title: "Attend MNPS Budget Hearing",
    description: "The Metro Council is holding public hearings on the FY2025 MNPS budget. Your input matters.",
    priority: "medium",
    deadline: "Feb 5, 2025",
    billNumber: null,
  },
  {
    title: "Comment on Charter School Regulations",
    description: "The TN DOE is accepting public comments on proposed charter school accountability standards.",
    priority: "medium",
    deadline: "Jan 31, 2025",
    billNumber: null,
  },
];

const upcomingEvents = [
  {
    title: "MNPS Board of Education Meeting",
    date: "Jan 14, 2025",
    time: "5:00 PM",
    location: "MNPS Central Office",
    type: "Public Meeting",
  },
  {
    title: "TN House Education Committee",
    date: "Jan 21, 2025",
    time: "9:00 AM",
    location: "Cordell Hull Building, Nashville",
    type: "Committee Hearing",
  },
  {
    title: "Metro Council Public Hearing on Education",
    date: "Feb 5, 2025",
    time: "6:30 PM",
    location: "Metro Courthouse",
    type: "Public Hearing",
  },
];

// Real Tennessee legislators - Education Committee leaders and key representatives by region
const legislators: TennesseeLegislatorContact[] = [
  // Senate Education Committee
  {
    name: "Jon Lundberg",
    title: "Senator",
    party: "R",
    chamber: "Senate",
    district: "SD-4",
    counties: ["Carter", "Johnson", "Sullivan", "Unicoi", "Washington"],
    phone: "(615) 741-5761",
    email: "sen.jon.lundberg@capitol.tn.gov",
    role: "Senate Education Committee Chair",
  },
  {
    name: "Heidi Campbell",
    title: "Senator",
    party: "D",
    chamber: "Senate",
    district: "SD-20",
    counties: ["Davidson"],
    phone: "(615) 741-2368",
    email: "sen.heidi.campbell@capitol.tn.gov",
    role: "Davidson County Senator",
  },
  {
    name: "Jeff Yarbro",
    title: "Senator",
    party: "D",
    chamber: "Senate",
    district: "SD-21",
    counties: ["Davidson"],
    phone: "(615) 741-3291",
    email: "sen.jeff.yarbro@capitol.tn.gov",
    role: "Senate Education Committee Member",
  },
  {
    name: "Bo Watson",
    title: "Senator",
    party: "R",
    chamber: "Senate",
    district: "SD-11",
    counties: ["Hamilton"],
    phone: "(615) 741-4496",
    email: "sen.bo.watson@capitol.tn.gov",
    role: "Senate Finance Chair",
  },
  // House Education Committee
  {
    name: "Mark White",
    title: "Representative",
    party: "R",
    chamber: "House",
    district: "HD-83",
    counties: ["Shelby"],
    phone: "(615) 741-4415",
    email: "rep.mark.white@capitol.tn.gov",
    role: "House Education Committee Chair",
  },
  {
    name: "Harold Love Jr.",
    title: "Representative",
    party: "D",
    chamber: "House",
    district: "HD-58",
    counties: ["Davidson"],
    phone: "(615) 741-3831",
    email: "rep.harold.love@capitol.tn.gov",
    role: "Davidson County Representative",
  },
  {
    name: "Vincent Dixie",
    title: "Representative",
    party: "D",
    chamber: "House",
    district: "HD-54",
    counties: ["Davidson"],
    phone: "(615) 741-1934",
    email: "rep.vincent.dixie@capitol.tn.gov",
    role: "House Education Committee Member",
  },
  {
    name: "John Ray Clemmons",
    title: "Representative",
    party: "D",
    chamber: "House",
    district: "HD-55",
    counties: ["Davidson"],
    phone: "(615) 741-4410",
    email: "rep.john.clemmons@capitol.tn.gov",
    role: "Davidson County Representative",
  },
  {
    name: "Bob Freeman",
    title: "Representative",
    party: "D",
    chamber: "House",
    district: "HD-56",
    counties: ["Davidson"],
    phone: "(615) 741-4317",
    email: "rep.bob.freeman@capitol.tn.gov",
    role: "House Education Committee Member",
  },
  {
    name: "Debra Moody",
    title: "Representative",
    party: "R",
    chamber: "House",
    district: "HD-81",
    counties: ["Blount", "Sevier"],
    phone: "(615) 741-3774",
    email: "rep.debra.moody@capitol.tn.gov",
    role: "House K-12 Subcommittee Chair",
  },
  {
    name: "William Lamberth",
    title: "Representative",
    party: "R",
    chamber: "House",
    district: "HD-44",
    counties: ["Sumner"],
    phone: "(615) 741-1980",
    email: "rep.william.lamberth@capitol.tn.gov",
    role: "House Majority Leader",
  },
  {
    name: "Gloria Johnson",
    title: "Representative",
    party: "D",
    chamber: "House",
    district: "HD-90",
    counties: ["Knox"],
    phone: "(615) 741-2095",
    email: "rep.gloria.johnson@capitol.tn.gov",
    role: "Former Teacher, Education Advocate",
  },
];

// Group legislators by county for easy lookup
const MIDDLE_TN_COUNTIES = ["Davidson", "Williamson", "Rutherford", "Wilson", "Sumner", "Robertson", "Cheatham", "Montgomery"];
const WEST_TN_COUNTIES = ["Shelby", "Madison", "Gibson", "Dyer", "Obion", "Weakley", "Henry", "Carroll"];
const EAST_TN_COUNTIES = ["Knox", "Hamilton", "Sullivan", "Washington", "Blount", "Sevier", "Anderson", "Bradley", "Carter", "Johnson", "Unicoi"];

export default function TakeAction() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<"all" | "middle" | "west" | "east">("all");

  const filteredLegislators = useMemo(() => {
    let filtered = legislators;

    // Region filter
    if (regionFilter === "middle") {
      filtered = filtered.filter(l => l.counties.some(c => MIDDLE_TN_COUNTIES.includes(c)));
    } else if (regionFilter === "west") {
      filtered = filtered.filter(l => l.counties.some(c => WEST_TN_COUNTIES.includes(c)));
    } else if (regionFilter === "east") {
      filtered = filtered.filter(l => l.counties.some(c => EAST_TN_COUNTIES.includes(c)));
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(l => 
        l.name.toLowerCase().includes(query) ||
        l.counties.some(c => c.toLowerCase().includes(query)) ||
        l.district.toLowerCase().includes(query) ||
        l.role?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, regionFilter]);

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-3 border-b border-border bg-muted/30">
        <div className="container">
          <PolicyBreadcrumb items={[{ label: "Take Action" }]} />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground">
              <Megaphone className="w-6 h-6" />
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
              Advocacy Center
            </Badge>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Take Action
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Your voice matters in shaping Nashville's education policy. Find opportunities to engage, 
            contact your representatives, and attend public hearings.
          </p>
        </div>
      </section>

      {/* Current Actions */}
      <section className="py-12">
        <div className="container">
          <h2 className="font-serif text-2xl font-bold mb-6">Current Calls to Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actionItems.map((action, index) => (
              <Card key={index} className="relative overflow-hidden">
                {action.priority === "high" && (
                  <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-medium px-3 py-1">
                    Priority
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {action.billNumber && (
                      <Badge variant="outline" className="font-mono">{action.billNumber}</Badge>
                    )}
                    <Badge variant="secondary">Deadline: {action.deadline}</Badge>
                  </div>
                  <CardTitle className="font-serif text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Take Action</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Legislators */}
      <section id="contact" className="py-12 bg-secondary/30">
        <div className="container">
          <h2 className="font-serif text-2xl font-bold mb-2">Contact Your Legislators</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            These are key education committee members and representatives from across Tennessee. 
            Search by your county to find your local representatives.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, county, or district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Tabs value={regionFilter} onValueChange={(v) => setRegionFilter(v as typeof regionFilter)}>
              <TabsList>
                <TabsTrigger value="all">All Regions</TabsTrigger>
                <TabsTrigger value="middle">Middle TN</TabsTrigger>
                <TabsTrigger value="west">West TN</TabsTrigger>
                <TabsTrigger value="east">East TN</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredLegislators.length} legislators
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredLegislators.map((legislator, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex gap-1">
                      <Badge variant="outline">{legislator.district}</Badge>
                      <Badge 
                        variant="secondary" 
                        className={legislator.party === "R" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}
                      >
                        {legislator.party}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="font-serif text-lg">{legislator.name}</CardTitle>
                  <CardDescription>
                    {legislator.title} • {legislator.chamber}
                    {legislator.role && (
                      <span className="block text-xs font-medium text-accent mt-1">
                        {legislator.role}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Counties:</span> {legislator.counties.join(", ")}
                  </p>
                  <a 
                    href={`tel:${legislator.phone}`} 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {legislator.phone}
                  </a>
                  <a 
                    href={`mailto:${legislator.email}`} 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors truncate"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="truncate">{legislator.email}</span>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLegislators.length === 0 && (
            <div className="text-center py-8 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">No legislators found matching your search.</p>
              <Button variant="link" onClick={() => { setSearchQuery(""); setRegionFilter("all"); }}>
                Clear filters
              </Button>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <a href="https://wapp.capitol.tn.gov/Apps/fml/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                Find My Legislator <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
            <a href="https://www.capitol.tn.gov/legislators/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                Full TN Legislature Directory <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="hearings" className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-bold mb-6">Upcoming Hearings & Meetings</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex gap-4 p-5 bg-card border border-border rounded-lg">
                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-primary/10 rounded-lg shrink-0 text-center">
                      <Calendar className="w-5 h-5 text-primary mb-1" />
                      <span className="text-xs font-medium text-primary">{event.date.split(",")[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary">{event.type}</Badge>
                        <span className="text-sm text-muted-foreground">{event.time}</span>
                      </div>
                      <h3 className="font-serif font-semibold mb-1">{event.title}</h3>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <aside className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <NewsletterSignup />
                <div className="bg-accent/20 rounded-lg p-6">
                  <h3 className="font-serif font-semibold mb-3">Tips for Effective Advocacy</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">1.</span>
                      Be specific about which bill or issue you're addressing
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">2.</span>
                      Share personal stories about how education policy affects you
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">3.</span>
                      Be respectful and professional in all communications
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">4.</span>
                      Follow up with a thank you after meetings or votes
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