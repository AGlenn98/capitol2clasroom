import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, Users, DollarSign, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
const relatedPages = [
  { name: "K-12 Policy", href: "/k12", description: "Elementary & secondary education" },
  { name: "Higher Education", href: "/higher-ed", description: "Colleges & universities" },
  { name: "Legislation", href: "/legislation", description: "Current bills & laws" },
  { name: "Advocacy Hub", href: "/advocacy", description: "Take action on policy" },
];

const keyStats = [
  { label: "Students Enrolled", value: "80,000+", icon: GraduationCap },
  { label: "Completion Rate", value: "47%", icon: Users },
  { label: "Avg. Annual Cost Covered", value: "$3,800", icon: DollarSign },
  { label: "Program Since", value: "2015", icon: Calendar },
];

export default function TennesseePromise() {
  return (
    <Layout>
      {/* Explore Education Policy Navigation */}
      <nav className="border-b border-border bg-secondary/30">
        <div className="container py-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Explore Education Policy</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {relatedPages.map((page) => (
              <Link key={page.href} to={page.href}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-foreground whitespace-nowrap"
                >
                  {page.name}
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container pt-6">
        <PolicyBreadcrumb 
          items={[
            { label: "Higher Education", href: "/higher-ed" },
            { label: "Tennessee Promise" },
          ]} 
        />
      </div>

      {/* Clean Header */}
      <header className="container py-8 border-b border-border">
        <Badge variant="secondary" className="mb-4">Higher Education Policy</Badge>
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
          Tennessee Promise
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Understanding Tennessee's tuition-free community college program and its impact on Nashville students.
        </p>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="max-w-4xl">
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {keyStats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabbed Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b bg-transparent p-0 mb-6">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-4 py-3"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="eligibility"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-4 py-3"
              >
                Eligibility
              </TabsTrigger>
              <TabsTrigger 
                value="impact"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-4 py-3"
              >
                Impact Data
              </TabsTrigger>
              <TabsTrigger 
                value="how-to-apply"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-4 py-3"
              >
                How to Apply
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="prose-article">
              <h2>What is Tennessee Promise?</h2>
              <p>
                Tennessee Promise is a last-dollar scholarship program that provides Tennessee high school graduates 
                with tuition-free attendance at a community or technical college. Launched in 2015, it was the first 
                program of its kind in the nation.
              </p>
              
              <h3>How It Works</h3>
              <p>
                The program covers tuition and mandatory fees not paid by the Pell Grant, HOPE Scholarship, or other 
                state student financial aid. Students must attend full-time and maintain satisfactory academic progress.
              </p>
              
              <h3>Mentorship Component</h3>
              <p>
                Each Tennessee Promise student is paired with a volunteer mentor who helps guide them through the 
                college experience, from application to completion. This mentorship is a required component of the program.
              </p>
            </TabsContent>

            <TabsContent value="eligibility" className="prose-article">
              <h2>Who is Eligible?</h2>
              <p>
                To qualify for Tennessee Promise, students must meet the following requirements:
              </p>
              <ul>
                <li>Be a Tennessee resident for at least one year prior to enrollment</li>
                <li>Graduate from an eligible Tennessee high school or earn a GED/HiSET</li>
                <li>Complete the FAFSA application</li>
                <li>Apply by November 1st of senior year</li>
                <li>Complete 8 hours of community service per semester enrolled</li>
                <li>Maintain continuous enrollment as a full-time student</li>
                <li>Maintain a 2.0 cumulative GPA</li>
              </ul>
              
              <h3>Eligible Institutions</h3>
              <p>
                Students can use Tennessee Promise at any of the state's 13 community colleges or 27 colleges of 
                applied technology (TCATs). In Nashville, this includes Nashville State Community College and 
                Tennessee College of Applied Technology Nashville.
              </p>
            </TabsContent>

            <TabsContent value="impact" className="prose-article">
              <h2>Program Impact</h2>
              <p>
                Since its launch in 2015, Tennessee Promise has significantly increased college enrollment among 
                high school graduates, particularly among first-generation college students.
              </p>
              
              <Card className="my-6 bg-secondary/50">
                <CardHeader>
                  <CardTitle className="text-lg">Key Outcomes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span>College-going rate increase</span>
                    <span className="font-semibold text-primary">+12%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span>First-generation enrollment increase</span>
                    <span className="font-semibold text-primary">+18%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span>On-time completion rate</span>
                    <span className="font-semibold text-primary">23%</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>4-year completion rate</span>
                    <span className="font-semibold text-primary">47%</span>
                  </div>
                </CardContent>
              </Card>
              
              <h3>Nashville-Specific Data</h3>
              <p>
                Davidson County sees approximately 2,500 new Tennessee Promise students each year. Nashville State 
                Community College reports that Promise students graduate at slightly higher rates than non-Promise 
                students, likely due to the mentorship and community service requirements.
              </p>
            </TabsContent>

            <TabsContent value="how-to-apply" className="prose-article">
              <h2>Application Process</h2>
              <p>
                Applying for Tennessee Promise is straightforward, but there are strict deadlines students must meet.
              </p>
              
              <h3>Step-by-Step Guide</h3>
              <ol>
                <li>
                  <strong>Apply by November 1st</strong> — Create an account and complete the application at 
                  tnpromise.gov during your senior year of high school.
                </li>
                <li>
                  <strong>Complete the FAFSA</strong> — Submit your Free Application for Federal Student Aid 
                  by the priority deadline (typically January 15th).
                </li>
                <li>
                  <strong>Attend mandatory meetings</strong> — Participate in all required meetings held in 
                  your county (usually 2-3 meetings per year).
                </li>
                <li>
                  <strong>Connect with your mentor</strong> — You'll be assigned a volunteer mentor who will 
                  guide you through the process.
                </li>
                <li>
                  <strong>Enroll at an eligible school</strong> — Choose from any TN community college or TCAT.
                </li>
                <li>
                  <strong>Complete community service</strong> — 8 hours of community service are required 
                  each semester to maintain eligibility.
                </li>
              </ol>
              
              <div className="mt-8 p-6 bg-primary text-primary-foreground rounded-lg">
                <h3 className="text-primary-foreground mb-2">Ready to Apply?</h3>
                <p className="text-primary-foreground/80 mb-4">
                  Visit the official Tennessee Promise website to start your application.
                </p>
                <Button variant="secondary" asChild>
                  <a href="https://tnpromise.gov" target="_blank" rel="noopener noreferrer">
                    Apply at TNPromise.gov
                  </a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </Layout>
  );
}
