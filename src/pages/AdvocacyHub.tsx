import { Layout } from "@/components/layout/Layout";
import { Scale, Search, ExternalLink, AlertCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEducationBills } from "@/hooks/useLegislation";
import { NewsCommentary } from "@/components/advocacy/NewsCommentary";
import { CriticalDatesTimeline } from "@/components/advocacy/CriticalDatesTimeline";
import { useAllStances } from "@/hooks/useUserStance";

// Legislative session critical dates
const criticalDates = [
  {
    date: "Jan 14, 2025",
    label: "114th General Assembly Convenes",
    description: "Session opening day",
    isPast: false,
    isCurrent: true,
  },
  {
    date: "Feb 1, 2025",
    label: "Bill Filing Deadline",
    description: "Last day to introduce new legislation",
    isPast: false,
  },
  {
    date: "Mar 15, 2025",
    label: "Committee Hearings Peak",
    description: "Most bills reviewed in committee",
    isPast: false,
  },
  {
    date: "May 2025",
    label: "Expected Adjournment",
    description: "End of regular session",
    isPast: false,
  },
];

export default function AdvocacyHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: bills, isLoading, error } = useEducationBills();
  const stances = useAllStances();

  const filteredBills = bills?.filter(bill => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      bill.title.toLowerCase().includes(query) ||
      bill.bill_number.toLowerCase().includes(query) ||
      bill.last_action?.toLowerCase().includes(query)
    );
  }) || [];

  const supportedCount = Object.values(stances).filter(s => s === 'support').length;
  const opposedCount = Object.values(stances).filter(s => s === 'oppose').length;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground">
              <Scale className="w-6 h-6" />
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
              Advocacy Hub
            </Badge>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Tennessee Education Advocacy
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mb-6">
            Track real education bills in the Tennessee General Assembly. Set your stance, 
            contact legislators, and make your voice heard on issues that matter.
          </p>
          
          {/* User Stats */}
          {(supportedCount > 0 || opposedCount > 0) && (
            <div className="flex gap-4 text-sm">
              {supportedCount > 0 && (
                <span className="px-3 py-1 bg-success/20 text-success-foreground rounded-full">
                  ✅ {supportedCount} bills supported
                </span>
              )}
              {opposedCount > 0 && (
                <span className="px-3 py-1 bg-destructive/20 text-destructive-foreground rounded-full">
                  ❌ {opposedCount} bills opposed
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Search */}
      <section className="py-6 border-b border-border sticky top-16 bg-background z-10">
        <div className="container">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search education bills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bills List */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-bold mb-2">
                  Active Education Bills
                </h2>
                <p className="text-muted-foreground">
                  Real-time legislation from the Tennessee General Assembly
                </p>
              </div>

              {isLoading && (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <Skeleton className="h-5 w-24 mb-3" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {error && (
                <Card className="border-destructive/50 bg-destructive/5">
                  <CardContent className="p-6 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-destructive">
                        Unable to load legislation
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Please check your connection or try again later. 
                        You can also browse legislation directly on the TN General Assembly website.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => window.open('https://wapp.capitol.tn.gov/apps/BillInfo/default.aspx', '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit TN Legislature
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!isLoading && !error && filteredBills.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {searchQuery 
                        ? "No bills match your search criteria."
                        : "No education bills found. Check back during legislative session."
                      }
                    </p>
                  </CardContent>
                </Card>
              )}

              {!isLoading && !error && filteredBills.length > 0 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredBills.length} education-related bills
                  </p>
                  {filteredBills.map((bill) => {
                    const userStance = stances[String(bill.bill_id)];
                    
                    return (
                      <Link
                        key={bill.bill_id}
                        to={`/advocacy/bill/${bill.bill_id}`}
                        className="block"
                      >
                        <Card className="transition-all hover:border-accent hover:shadow-lg group">
                          <CardContent className="p-6">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="font-mono text-sm font-semibold text-primary">
                                {bill.bill_number}
                              </span>
                              <Badge variant="secondary">TN</Badge>
                              {userStance && (
                                <Badge 
                                  variant="outline" 
                                  className={userStance === 'support' 
                                    ? 'bg-success/20 text-success border-success/50' 
                                    : 'bg-destructive/20 text-destructive border-destructive/50'
                                  }
                                >
                                  {userStance === 'support' ? '✓ Supporting' : '✗ Opposing'}
                                </Badge>
                              )}
                            </div>
                            
                            <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {bill.title}
                            </h3>
                            
                            <p className="text-sm text-muted-foreground mb-4">
                              Last action: {bill.last_action} ({bill.last_action_date})
                            </p>
                            
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                              View details & take action
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Critical Dates Timeline */}
              <Card>
                <CardContent className="p-6">
                  <CriticalDatesTimeline dates={criticalDates} />
                </CardContent>
              </Card>

              {/* News & Commentary */}
              <NewsCommentary />

              {/* Direct Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold mb-4">Official Resources</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => window.open('https://www.capitol.tn.gov/', '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      TN General Assembly
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => window.open('https://www.tn.gov/education.html', '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      TN Dept. of Education
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => window.open('https://www.capitol.tn.gov/legislators/', '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Find Your Legislator
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
