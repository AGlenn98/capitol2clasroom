import { Layout } from "@/components/layout/Layout";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
import { Megaphone, Phone, Calendar, MapPin, Users, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

const legislators = [
  {
    name: "Rep. Jane Smith",
    district: "HD-51",
    role: "Education Committee Chair",
    phone: "(615) 555-0101",
    email: "rep.jane.smith@capitol.tn.gov",
  },
  {
    name: "Sen. John Davis",
    district: "SD-19",
    role: "Education Committee Vice Chair",
    phone: "(615) 555-0102",
    email: "sen.john.davis@capitol.tn.gov",
  },
  {
    name: "Rep. Maria Garcia",
    district: "HD-52",
    role: "Education Committee Member",
    phone: "(615) 555-0103",
    email: "rep.maria.garcia@capitol.tn.gov",
  },
];

export default function TakeAction() {
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
          <h2 className="font-serif text-2xl font-bold mb-6">Contact Your Legislators</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            These are key education committee members representing Nashville. Find your specific representatives 
            using the tools below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {legislators.map((legislator, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="outline">{legislator.district}</Badge>
                  </div>
                  <CardTitle className="font-serif text-lg">{legislator.name}</CardTitle>
                  <CardDescription>{legislator.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a 
                    href={`tel:${legislator.phone}`} 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {legislator.phone}
                  </a>
                  <a 
                    href={`mailto:${legislator.email}`} 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {legislator.email}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="https://wapp.capitol.tn.gov/Apps/fml/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                Find My Legislator <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
            <a href="https://www.capitol.tn.gov/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                TN General Assembly <ExternalLink className="w-4 h-4" />
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