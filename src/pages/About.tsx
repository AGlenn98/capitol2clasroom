import { Layout } from "@/components/layout/Layout";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
import { HeroPattern } from "@/components/HeroPattern";
import { Target, Eye, Mail, ExternalLink, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-4 border-b border-border/50 bg-muted/30">
        <div className="container">
          <PolicyBreadcrumb items={[{ label: "About" }]} />
        </div>
      </section>

      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-20">
        <HeroPattern />
        <div className="container">
          <div className="flex items-center gap-4 mb-5">
            <Badge variant="secondary" className="bg-primary-foreground/15 text-primary-foreground border-none rounded-full px-4 py-1">
              About
            </Badge>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-5">Capitol 2 Classroom</h1>
          <p className="text-xl text-primary-foreground/85 max-w-2xl leading-relaxed">
            Your trusted, nonpartisan guide to understanding education policy in Tennessee.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 prose-article">
              <h2 className="font-serif text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Capitol to Classroom exists to make education policy accessible to all Tennesseans. We believe that
                informed citizens are empowered citizens, and that understanding the policies shaping our schools is
                essential to building a better future for our community.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
                <div className="bg-card border border-border/50 rounded-2xl p-7 shadow-sm hover:shadow-card transition-shadow duration-normal">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold">Purpose</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide clear, accurate, and nonpartisan analysis of education policy that helps Tennessee
                    residents understand how decisions at the local, state, and federal levels affect our schools.
                  </p>
                </div>
                <div className="bg-card border border-border/50 rounded-2xl p-7 shadow-sm hover:shadow-card transition-shadow duration-normal">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/15">
                      <Eye className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold">Vision</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    A state where every citizen has the knowledge and tools to participate meaningfully in education
                    policy discussions and advocate effectively for students.
                  </p>
                </div>
              </div>

              <h2 className="font-serif text-3xl font-bold mb-6">Our Approach</h2>
              <p className="text-muted-foreground mb-6 text-lg">We follow several guiding principles in our work:</p>
              <ul className="space-y-5 mb-12">
                {[
                  {
                    num: "1",
                    title: "Nonpartisan Analysis",
                    desc: "We present facts and multiple perspectives without advocating for specific policies or candidates. Our goal is to inform, not to persuade."
                  },
                  {
                    num: "2",
                    title: "Academic Rigor",
                    desc: "We rely on primary sources, peer-reviewed research, and official data. All claims are sourced, and we clearly distinguish between facts and analysis."
                  },
                  {
                    num: "3",
                    title: "Accessibility",
                    desc: "Policy can be complex, but explanations don't have to be. We translate jargon into plain language and provide context for all topics."
                  },
                  {
                    num: "4",
                    title: "Local Focus",
                    desc: "While we cover state and federal policy, we always connect it back to Nashville. What does this mean for MNPS? For local families? For our community?"
                  }
                ].map((item) => (
                  <li key={item.num} className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-accent/15 text-accent font-bold text-sm shrink-0 mt-1">
                      {item.num}
                    </span>
                    <div>
                      <span className="font-semibold text-foreground text-lg">{item.title}</span>
                      <p className="text-muted-foreground mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <h2 className="font-serif text-3xl font-bold mb-6">Who We Serve</h2>
              <p className="text-muted-foreground mb-5 text-lg">Capitol to Classroom is designed for:</p>
              <ul className="space-y-3 text-muted-foreground mb-10">
                {[
                  { bold: "Parents and families", rest: "seeking to understand policies affecting their children's education" },
                  { bold: "Educators", rest: "who want to stay informed about legislative developments" },
                  { bold: "Community members", rest: "interested in civic engagement" },
                  { bold: "Policymakers and staff", rest: "who need accessible summaries and analysis" },
                  { bold: "Students and researchers", rest: "looking for reliable policy context" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Heart className="w-4 h-4 text-accent shrink-0 mt-1.5" />
                    <span>
                      <span className="text-foreground font-medium">{item.bold}</span> {item.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <NewsletterSignup />
                <div id="contact" className="bg-card border border-border/50 rounded-2xl p-7 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold mb-4">Contact Us</h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    Have questions, feedback, or a tip? We'd love to hear from you.
                  </p>
                  <a 
                    href="mailto:contact@c2c.org" 
                    className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors duration-normal font-medium mb-5"
                  >
                    <Mail className="w-4 h-4" />
                    contact@c2c.org
                  </a>
                  <p className="text-xs text-muted-foreground">
                    For press inquiries or partnerships, please include "Press" or "Partnership" in your subject line.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-2xl p-7">
                  <h3 className="font-serif text-xl font-semibold mb-4">Transparency</h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    Captiol to Classroom is currently a beta tester
                  </p>
                  <Button variant="outline" size="sm" className="w-full gap-2 rounded-xl">
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
