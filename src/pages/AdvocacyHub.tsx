import { Layout } from "@/components/layout/Layout";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
import { HeroPattern } from "@/components/HeroPattern";
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
import { CategoryFilter, CategoryBadge } from "@/components/advocacy/CategoryFilter";
import { useAllStances } from "@/hooks/useUserStance";
import { PaginationControls } from "@/components/PaginationControls";
import { BillCategoryId, categorizeBill } from "@/lib/billCategories";
import { cn } from "@/lib/utils";
const BILLS_PER_PAGE = 8;
const criticalDates = [{
  date: "Jan 14, 2025",
  label: "114th General Assembly Convenes",
  description: "Session opening day",
  isPast: false,
  isCurrent: true
}, {
  date: "Feb 1, 2025",
  label: "Bill Filing Deadline",
  description: "Last day to introduce new legislation",
  isPast: false
}, {
  date: "Mar 15, 2025",
  label: "Committee Hearings Peak",
  isPast: false
}, {
  date: "May 2025",
  label: "Expected Adjournment",
  isPast: false
}];
export default function AdvocacyHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<BillCategoryId>('all');
  const {
    data: bills,
    isLoading,
    error
  } = useEducationBills();
  const stances = useAllStances();

  // Add categories to bills
  const billsWithCategories = useMemo(() => {
    return bills?.map(bill => ({
      ...bill,
      category: categorizeBill(bill.title, bill.last_action)
    })) || [];
  }, [bills]);
  const filteredBills = useMemo(() => {
    return billsWithCategories.filter(bill => {
      // Category filter
      if (selectedCategory !== 'all' && bill.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return bill.title.toLowerCase().includes(query) || bill.bill_number.toLowerCase().includes(query) || bill.last_action?.toLowerCase().includes(query);
      }
      return true;
    });
  }, [billsWithCategories, searchQuery, selectedCategory]);
  const totalPages = Math.ceil(filteredBills.length / BILLS_PER_PAGE);
  const paginatedBills = filteredBills.slice((currentPage - 1) * BILLS_PER_PAGE, currentPage * BILLS_PER_PAGE);
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  const handleCategoryChange = (category: BillCategoryId) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  const supportedCount = Object.values(stances).filter(s => s === 'support').length;
  const opposedCount = Object.values(stances).filter(s => s === 'oppose').length;
  return <Layout>
      {/* Breadcrumb */}
      <section className="py-3 border-b border-border bg-muted/30">
        <div className="container">
          <PolicyBreadcrumb items={[{
          label: "Advocacy Hub"
        }]} />
        </div>
      </section>
      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-10">
        <HeroPattern />
        <div className="container relative">
          <div className="flex items-center gap-3 mb-3">
            
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
              Advocacy Hub
            </Badge>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">
            Tennessee Education Advocacy
          </h1>
          <p className="text-sm text-primary-foreground/80 max-w-2xl mb-3">
            Track real education bills, set your stance, and make your voice heard.
          </p>
          
          {(supportedCount > 0 || opposedCount > 0) && <div className="flex gap-3 text-sm">
              {supportedCount > 0 && <span className="px-3 py-1 bg-success/20 rounded-full text-xs">
                  ✅ {supportedCount} supported
                </span>}
              {opposedCount > 0 && <span className="px-3 py-1 bg-destructive/20 rounded-full text-xs">
                  ❌ {opposedCount} opposed
                </span>}
            </div>}
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 border-b border-border sticky top-16 bg-background z-10">
        <div className="container space-y-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="search" placeholder="Search education bills..." value={searchQuery} onChange={e => handleSearchChange(e.target.value)} className="pl-9" />
          </div>
          <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bills List */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg font-bold">Active Education Bills</h2>
                  {!isLoading && !error && <p className="text-xs text-muted-foreground">
                      {filteredBills.length} bills
                      {totalPages > 1 && ` • Page ${currentPage}/${totalPages}`}
                    </p>}
                </div>
              </div>

              {isLoading && <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map(i => <Card key={i}>
                      <CardContent className="p-4">
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-5 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardContent>
                    </Card>)}
                </div>}

              {error && <Card className="border-destructive/50 bg-destructive/5">
                  <CardContent className="p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                    <div>
                      <p className="font-medium text-destructive text-sm">Unable to load legislation</p>
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => window.open('https://wapp.capitol.tn.gov/apps/BillInfo/default.aspx', '_blank')}>
                        <ExternalLink className="w-3 h-3 mr-1" />
                        TN Legislature
                      </Button>
                    </div>
                  </CardContent>
                </Card>}

              {!isLoading && !error && paginatedBills.length === 0 && <Card>
                  <CardContent className="p-8 text-center">
                    <Scale className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {searchQuery || selectedCategory !== 'all' ? "No bills match your filters." : "No education bills found."}
                    </p>
                    {(searchQuery || selectedCategory !== 'all') && <Button variant="link" size="sm" onClick={() => {
                  handleSearchChange("");
                  setSelectedCategory('all');
                }}>
                        Clear filters
                      </Button>}
                  </CardContent>
                </Card>}

              {!isLoading && !error && paginatedBills.length > 0 && <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {paginatedBills.map(bill => {
                  const userStance = stances[String(bill.bill_id)];
                  return <Link key={bill.bill_id} to={`/advocacy/bill/${bill.bill_id}`} className="block">
                          <Card className={cn("h-full transition-all hover:shadow-md group", userStance === 'support' && "border-l-4 border-l-success", userStance === 'oppose' && "border-l-4 border-l-destructive", !userStance && "hover:border-accent")}>
                            <CardContent className="p-4">
                              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                                <span className="font-mono text-xs font-semibold text-primary">
                                  {bill.bill_number}
                                </span>
                                <CategoryBadge categoryId={bill.category} size="sm" />
                                {userStance && <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", userStance === 'support' ? 'bg-success/20 text-success border-success/50' : 'bg-destructive/20 text-destructive border-destructive/50')}>
                                    {userStance === 'support' ? '✓ Support' : '✗ Oppose'}
                                  </Badge>}
                              </div>
                              
                              <h3 className="font-serif text-sm font-semibold mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                                {bill.title}
                              </h3>
                              
                              <p className="text-[11px] text-muted-foreground mb-2 line-clamp-1">
                                {bill.last_action_date} • {bill.last_action}
                              </p>
                              
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-1.5 transition-all">
                                View details
                                <ArrowRight className="w-3 h-3" />
                              </span>
                            </CardContent>
                          </Card>
                        </Link>;
                })}
                  </div>

                  <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="mt-5" />
                </>}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <CriticalDatesTimeline dates={criticalDates} />
                </CardContent>
              </Card>

              <NewsCommentary />

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-serif font-semibold mb-2 text-sm">Official Resources</h3>
                  <div className="space-y-1.5">
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8" onClick={() => window.open('https://www.capitol.tn.gov/', '_blank')}>
                      <ExternalLink className="w-3 h-3 mr-2" />
                      TN General Assembly
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8" onClick={() => window.open('https://www.capitol.tn.gov/legislators/', '_blank')}>
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
    </Layout>;
}