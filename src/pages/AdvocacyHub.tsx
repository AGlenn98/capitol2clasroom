import { Layout } from "@/components/layout/Layout";
import { Scale, Search, ExternalLink, AlertCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useEducationBills } from "@/hooks/useLegislation";
import { NewsCommentary } from "@/components/advocacy/NewsCommentary";
import { CriticalDatesTimeline } from "@/components/advocacy/CriticalDatesTimeline";
import { useAllStances } from "@/hooks/useUserStance";
import { PaginationControls } from "@/components/PaginationControls";

const BILLS_PER_PAGE = 8;

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
    isPast: false,
  },
  {
    date: "May 2025",
    label: "Expected Adjournment",
    isPast: false,
  },
];

export default function AdvocacyHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: bills, isLoading, error } = useEducationBills();
  const stances = useAllStances();

  const filteredBills = useMemo(() => {
    if (!bills) return [];
    if (!searchQuery) return bills;
    
    const query = searchQuery.toLowerCase();
    return bills.filter(bill =>
      bill.title.toLowerCase().includes(query) ||
      bill.bill_number.toLowerCase().includes(query) ||
      bill.last_action?.toLowerCase().includes(query)
    );
  }, [bills, searchQuery]);

  const totalPages = Math.ceil(filteredBills.length / BILLS_PER_PAGE);
  const paginatedBills = filteredBills.slice(
    (currentPage - 1) * BILLS_PER_PAGE,
    currentPage * BILLS_PER_PAGE
  );

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const supportedCount = Object.values(stances).filter(s => s === 'support').length;
  const opposedCount = Object.values(stances).filter(s => s === 'oppose').length;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground">
              <Scale className="w-5 h-5" />
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
              Advocacy Hub
            </Badge>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            Tennessee Education Advocacy
          </h1>
          <p className="text-base text-primary-foreground/80 max-w-2xl mb-4">
            Track real education bills, set your stance, contact legislators, and make your voice heard.
          </p>
          
          {(supportedCount > 0 || opposedCount > 0) && (
            <div className="flex gap-3 text-sm">
              {supportedCount > 0 && (
                <span className="px-3 py-1 bg-success/20 rounded-full text-xs">
                  ✅ {supportedCount} supported
                </span>
              )}
              {opposedCount > 0 && (
                <span className="px-3 py-1 bg-destructive/20 rounded-full text-xs">
                  ❌ {opposedCount} opposed
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Search */}
      <section className="py-4 border-b border-border sticky top-16 bg-background z-10">
        <div className="container">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search education bills..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bills List */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold">Active Education Bills</h2>
                  {!isLoading && !error && (
                    <p className="text-sm text-muted-foreground">
                      {filteredBills.length} bills found
                      {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
                    </p>
                  )}
                </div>
              </div>

              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-5">
                        <Skeleton className="h-4 w-20 mb-3" />
                        <Skeleton className="h-5 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-3" />
                        <Skeleton className="h-3 w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {error && (
                <Card className="border-destructive/50 bg-destructive/5">
                  <CardContent className="p-5 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-destructive">Unable to load legislation</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Please try again later or browse legislation directly.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => window.open('https://wapp.capitol.tn.gov/apps/BillInfo/default.aspx', '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        TN Legislature
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!isLoading && !error && paginatedBills.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Scale className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      {searchQuery ? "No bills match your search." : "No education bills found."}
                    </p>
                    {searchQuery && (
                      <Button variant="link" onClick={() => handleSearchChange("")}>
                        Clear search
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}

              {!isLoading && !error && paginatedBills.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paginatedBills.map((bill) => {
                      const userStance = stances[String(bill.bill_id)];
                      
                      return (
                        <Link
                          key={bill.bill_id}
                          to={`/advocacy/bill/${bill.bill_id}`}
                          className="block"
                        >
                          <Card className="h-full transition-all hover:border-accent hover:shadow-md group">
                            <CardContent className="p-5">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="font-mono text-sm font-semibold text-primary">
                                  {bill.bill_number}
                                </span>
                                {userStance && (
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${userStance === 'support' 
                                      ? 'bg-success/20 text-success border-success/50' 
                                      : 'bg-destructive/20 text-destructive border-destructive/50'
                                    }`}
                                  >
                                    {userStance === 'support' ? '✓' : '✗'}
                                  </Badge>
                                )}
                              </div>
                              
                              <h3 className="font-serif text-sm font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                {bill.title}
                              </h3>
                              
                              <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                                {bill.last_action_date} • {bill.last_action}
                              </p>
                              
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                                View & take action
                                <ArrowRight className="w-3 h-3" />
                              </span>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="mt-6"
                  />
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-5">
              {/* Critical Dates */}
              <Card>
                <CardContent className="p-5">
                  <CriticalDatesTimeline dates={criticalDates} />
                </CardContent>
              </Card>

              {/* News */}
              <NewsCommentary />

              {/* Quick Links */}
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-serif font-semibold mb-3 text-sm">Official Resources</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => window.open('https://www.capitol.tn.gov/', '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      TN General Assembly
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => window.open('https://www.capitol.tn.gov/legislators/', '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
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
