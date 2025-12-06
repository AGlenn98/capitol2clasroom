import { Layout } from "@/components/layout/Layout";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
import { useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, FileText, Calendar, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBillDetail } from "@/hooks/useLegislation";
import { useUserStance } from "@/hooks/useUserStance";
import { BillTimeline, TimelineStage, generateTimelineSteps } from "@/components/BillTimeline";
import { AdvocacyBar } from "@/components/advocacy/AdvocacyBar";
import { CriticalDatesTimeline } from "@/components/advocacy/CriticalDatesTimeline";
import { PlainEnglishSummary } from "@/components/advocacy/PlainEnglishSummary";
import { ImpactDashboard } from "@/components/advocacy/ImpactDashboard";
import { StakeholderView } from "@/components/advocacy/StakeholderView";
import { CategoryBadge } from "@/components/advocacy/CategoryFilter";
import { categorizeBill } from "@/lib/billCategories";
import { PrintSummary, PrintableBillContent } from "@/components/PrintSummary";
import { BillSubscription } from "@/components/BillSubscription";
import { Link } from "react-router-dom";

const statusToStage = (status: number): TimelineStage => {
  switch (status) {
    case 1: return 'introduced';
    case 2: return 'committee';
    case 3: return 'floor_vote';
    case 4: return 'enacted';
    case 5:
    case 6: return 'failed';
    default: return 'introduced';
  }
};

const statusToBillStatus = (status: number): 'proposed' | 'committee' | 'passed' | 'failed' => {
  switch (status) {
    case 1: return 'proposed';
    case 2:
    case 3: return 'committee';
    case 4: return 'passed';
    case 5:
    case 6: return 'failed';
    default: return 'proposed';
  }
};

export default function BillDetail() {
  const { billId } = useParams<{ billId: string }>();
  const numericBillId = billId ? parseInt(billId, 10) : null;
  
  const { data: bill, isLoading, error } = useBillDetail(numericBillId);
  const { stance, setStance } = useUserStance(numericBillId || 0);

  const criticalDates = bill?.history?.slice(0, 5).map((h, i) => ({
    date: h.date,
    label: h.action,
    description: h.chamber,
    isPast: true,
    isCurrent: i === 0,
  })) || [];

  if (bill?.calendar) {
    bill.calendar.forEach(event => {
      criticalDates.push({
        date: event.date,
        label: event.type,
        description: event.description || event.location,
        isPast: false,
        isCurrent: false,
      });
    });
  }

  const sponsors = bill?.sponsors?.map(s => ({
    name: `${s.first_name} ${s.last_name}`,
    party: s.party,
    district: s.district,
    email: undefined,
  })) || [];

  if (isLoading) {
    return (
      <Layout>
        <section className="py-6">
          <div className="container">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !bill) {
    return (
      <Layout>
        <section className="py-12">
          <div className="container max-w-xl">
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="p-6 text-center">
                <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
                <h2 className="font-serif text-lg font-bold mb-2">Bill Not Found</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Unable to load this bill.
                </p>
                <div className="flex justify-center gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/advocacy">
                      <ArrowLeft className="w-3 h-3 mr-1" />
                      Back
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => window.open('https://wapp.capitol.tn.gov/apps/BillInfo/default.aspx', '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    TN Legislature
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  const stage = statusToStage(bill.status);
  const billStatus = statusToBillStatus(bill.status);
  const timelineSteps = generateTimelineSteps(stage, billStatus);
  const category = categorizeBill(bill.title, bill.description);

  return (
    <Layout>
      {/* Printable content - hidden on screen, shown on print */}
      <PrintableBillContent
        billNumber={bill.bill_number}
        billTitle={bill.title}
        description={bill.description}
        sponsors={sponsors}
        history={bill.history?.map(h => ({ date: h.date, action: h.action, chamber: h.chamber }))}
      />

      {/* Breadcrumb */}
      <section className="py-3 border-b border-border bg-muted/30 print:hidden">
        <div className="container">
          <PolicyBreadcrumb items={[
            { label: "Advocacy Hub", href: "/advocacy" },
            { label: bill.bill_number }
          ]} />
        </div>
      </section>

      {/* Bill Header */}
      <section className="py-6 bg-primary text-primary-foreground print:hidden">
        <div className="container">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-base font-bold">{bill.bill_number}</span>
            <CategoryBadge categoryId={category} />
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none text-xs">
              {bill.session.session_name}
            </Badge>
            {stance && (
              <Badge 
                variant="outline" 
                className={stance === 'support' 
                  ? 'bg-success/20 text-success-foreground border-success/50' 
                  : 'bg-destructive/20 text-destructive-foreground border-destructive/50'
                }
              >
                {stance === 'support' ? '✓ Supporting' : '✗ Opposing'}
              </Badge>
            )}
          </div>
          
          <h1 className="font-serif text-xl md:text-2xl font-bold mb-2">
            {bill.title}
          </h1>
          
          {bill.description && (
            <p className="text-sm text-primary-foreground/80 max-w-3xl line-clamp-2">
              {bill.description}
            </p>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-4 bg-muted/30 border-b border-border print:hidden">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <BillTimeline steps={timelineSteps} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bill Details */}
            <div className="lg:col-span-2 space-y-5">
              {/* Plain English Summary */}
              <PlainEnglishSummary
                billNumber={bill.bill_number}
                billTitle={bill.title}
                billDescription={bill.description}
              />

              {/* Impact Dashboard */}
              <ImpactDashboard
                billNumber={bill.bill_number}
                billTitle={bill.title}
                billDescription={bill.description}
              />

              {/* Stakeholder Analysis */}
              <StakeholderView
                billNumber={bill.bill_number}
                billTitle={bill.title}
                billDescription={bill.description}
              />

              {/* Sponsors */}
              {bill.sponsors && bill.sponsors.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        Sponsors ({bill.sponsors.length})
                      </CardTitle>
                      <PrintSummary
                        billNumber={bill.bill_number}
                        billTitle={bill.title}
                        summary={bill.description}
                        sponsors={sponsors}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {bill.sponsors.slice(0, 6).map((sponsor) => (
                        <Link
                          key={sponsor.people_id}
                          to={`/legislators/${sponsor.people_id}`}
                          className="p-2 bg-muted/50 rounded-lg text-xs hover:bg-muted transition-colors"
                        >
                          <p className="font-medium truncate">
                            {sponsor.first_name} {sponsor.last_name}
                          </p>
                          <p className="text-muted-foreground">
                            {sponsor.party} • D-{sponsor.district.replace('HD-', '').replace('SD-', '')}
                          </p>
                        </Link>
                      ))}
                    </div>
                    {bill.sponsors.length > 6 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        +{bill.sponsors.length - 6} more sponsors
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* History */}
              {bill.history && bill.history.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      Legislative History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {bill.history.slice(0, 10).map((event, i) => (
                        <div key={i} className="flex gap-3 pb-2 border-b border-border last:border-0 text-xs">
                          <span className="shrink-0 w-20 text-muted-foreground">{event.date}</span>
                          <div>
                            <p className="font-medium">{event.action}</p>
                            <p className="text-muted-foreground">{event.chamber}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Documents */}
              {bill.texts && bill.texts.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4 text-accent" />
                      Bill Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1.5">
                    {bill.texts.slice(0, 3).map((text) => (
                      <Button
                        key={text.doc_id}
                        variant="outline"
                        size="sm"
                        className="w-full justify-between h-8 text-xs"
                        onClick={() => window.open(text.state_link || text.url, '_blank')}
                      >
                        <span>{text.type} - {text.date}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Official Links */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Official Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5">
                  {bill.state_link && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between h-8 text-xs"
                      onClick={() => window.open(bill.state_link, '_blank')}
                    >
                      View on TN Legislature
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                  {bill.url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between h-8 text-xs"
                      onClick={() => window.open(bill.url, '_blank')}
                    >
                      LegiScan Bill Page
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Advocacy Sidebar */}
            <aside className="lg:col-span-1 space-y-4">
              <AdvocacyBar
                billId={bill.bill_id}
                billNumber={bill.bill_number}
                billTitle={bill.title}
                stance={stance}
                onStanceChange={setStance}
                sponsors={sponsors}
              />

              {criticalDates.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <CriticalDatesTimeline dates={criticalDates.slice(0, 5)} />
                  </CardContent>
                </Card>
              )}

              {/* Email Subscription */}
              <BillSubscription
                billId={bill.bill_id}
                billNumber={bill.bill_number}
                billTitle={bill.title}
              />
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
