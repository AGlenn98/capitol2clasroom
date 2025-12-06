import { Layout } from "@/components/layout/Layout";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
import { Compass, Target, Eye, Mail, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-3 border-b border-border bg-muted/30">
        <div className="container">
          <PolicyBreadcrumb items={[{ label: "About" }]} />
        </div>
      </section>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground">
              <Compass className="w-6 h-6" />
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
              About
            </Badge>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            About Nashville Policy Compass
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Your trusted, nonpartisan guide to understanding education policy in Nashville and Tennessee.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 prose-article">
              <h2 className="font-serif text-2xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nashville Policy Compass exists to make education policy accessible to all Nashvillians. 
                We believe that informed citizens are empowered citizens, and that understanding the policies 
                shaping our schools is essential to building a better future for our community.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif font-semibold">Purpose</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    To provide clear, accurate, and nonpartisan analysis of education policy that helps 
                    Nashville residents understand how decisions at the local, state, and federal levels 
                    affect our schools.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif font-semibold">Vision</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A Nashville where every citizen has the knowledge and tools to participate meaningfully 
                    in education policy discussions and advocate effectively for students.
                  </p>
                </div>
              </div>

              <h2 className="font-serif text-2xl font-bold mb-6">Our Approach</h2>
              <p className="text-muted-foreground mb-4">
                We follow several guiding principles in our work:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent-foreground text-sm font-bold shrink-0 mt-0.5">1</span>
                  <div>
                    <span className="font-semibold">Nonpartisan Analysis</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      We present facts and multiple perspectives without advocating for specific policies or candidates. 
                      Our goal is to inform, not to persuade.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent-foreground text-sm font-bold shrink-0 mt-0.5">2</span>
                  <div>
                    <span className="font-semibold">Academic Rigor</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      We rely on primary sources, peer-reviewed research, and official data. 
                      All claims are sourced, and we clearly distinguish between facts and analysis.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent-foreground text-sm font-bold shrink-0 mt-0.5">3</span>
                  <div>
                    <span className="font-semibold">Accessibility</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Policy can be complex, but explanations don't have to be. We translate jargon into 
                      plain language and provide context for all topics.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent-foreground text-sm font-bold shrink-0 mt-0.5">4</span>
                  <div>
                    <span className="font-semibold">Local Focus</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      While we cover state and federal policy, we always connect it back to Nashville. 
                      What does this mean for MNPS? For local families? For our community?
                    </p>
                  </div>
                </li>
              </ul>

              <h2 className="font-serif text-2xl font-bold mb-6">Who We Serve</h2>
              <p className="text-muted-foreground mb-4">
                Nashville Policy Compass is designed for:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-8">
                <li>• <span className="text-foreground">Parents and families</span> seeking to understand policies affecting their children's education</li>
                <li>• <span className="text-foreground">Educators</span> who want to stay informed about legislative developments</li>
                <li>• <span className="text-foreground">Community members</span> interested in civic engagement</li>
                <li>• <span className="text-foreground">Policymakers and staff</span> who need accessible summaries and analysis</li>
                <li>• <span className="text-foreground">Journalists and researchers</span> looking for reliable policy context</li>
              </ul>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <NewsletterSignup />
                <div id="contact" className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-serif font-semibold mb-4">Contact Us</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Have questions, feedback, or a tip? We'd love to hear from you.
                  </p>
                  <a 
                    href="mailto:contact@nashvillepolicycompass.com" 
                    className="flex items-center gap-2 text-primary hover:underline mb-4"
                  >
                    <Mail className="w-4 h-4" />
                    contact@nashvillepolicycompass.com
                  </a>
                  <p className="text-xs text-muted-foreground">
                    For press inquiries or partnerships, please include "Press" or "Partnership" in your subject line.
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-6">
                  <h3 className="font-serif font-semibold mb-3">Transparency</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Nashville Policy Compass is independently operated and does not accept funding from 
                    political campaigns, parties, or advocacy organizations that lobby on education policy.
                  </p>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    View Our Methodology <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}