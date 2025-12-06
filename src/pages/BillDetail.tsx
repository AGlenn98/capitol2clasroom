import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
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
import { NewsCommentary } from "@/components/advocacy/NewsCommentary";

// Map LegiScan status codes to our timeline stages
const statusToStage = (status: number): TimelineStage => {
  // LegiScan status codes:
  // 1 = Introduced
  // 2 = Engrossed
  // 3 = Enrolled
  // 4 = Passed
  // 5 = Vetoed
  // 6 = Failed
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

  // Build critical dates from bill history/calendar
  const criticalDates = bill?.history?.slice(0, 5).map((h, i) => ({
    date: h.date,
    label: h.action,
    description: h.chamber,
    isPast: true,
    isCurrent: i === 0,
  })) || [];

  // Add upcoming calendar events
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

  // Prepare sponsors for contact feature
  const sponsors = bill?.sponsors?.map(s => ({
    name: `${s.first_name} ${s.last_name}`,
    party: s.party,
    district: s.district,
    email: undefined, // LegiScan doesn't provide emails
  })) || [];

  if (isLoading) {
    return (
      <Layout>
        <section className="py-8">
          <div className="container">
            <Skeleton className="h-8 w-32 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-40 w-full" />
              </div>
              <div>
                <Skeleton className="h-80 w-full" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !bill) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container max-w-2xl">
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h2 className="font-serif text-xl font-bold mb-2">Bill Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't load this bill. It may have been removed or there was a connection issue.
                </p>
                <div className="flex justify-center gap-3">
                  <Button asChild variant="outline">
                    <Link to="/advocacy">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Advocacy Hub
                    </Link>
                  </Button>
                  <Button
                    onClick={() => window.open('https://wapp.capitol.tn.gov/apps/BillInfo/default.aspx', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Search TN Legislature
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

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-4 border-b border-border bg-muted/30">
        <div className="container">
          <Button asChild variant="ghost" size="sm" className="gap-2 -ml-2">
            <Link to="/advocacy">
              <ArrowLeft className="w-4 h-4" />
              Back to Advocacy Hub
            </Link>
          </Button>
        </div>
      </section>

      {/* Bill Header */}
      <section className="py-8 bg-primary text-primary-foreground">
        <div className="container">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-lg font-bold">{bill.bill_number}</span>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
              Tennessee
            </Badge>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
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
                {stance === 'support' ? '✓ You support this bill' : '✗ You oppose this bill'}
              </Badge>
            )}
          </div>
          
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {bill.title}
          </h1>
          
          {bill.description && (
            <p className="text-lg text-primary-foreground/80 max-w-3xl">
              {bill.description}
            </p>
          )}
        </div>
      </section>

      {/* Bill Timeline */}
      <section className="py-6 bg-muted/30 border-b border-border">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <BillTimeline steps={timelineSteps} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bill Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Sponsors */}
              {bill.sponsors && bill.sponsors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-serif">
                      <Users className="w-5 h-5 text-accent" />
                      Sponsors ({bill.sponsors.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {bill.sponsors.map((sponsor) => (
                        <div
                          key={sponsor.people_id}
                          className="p-3 bg-muted/50 rounded-lg"
                        >
                          <p className="font-medium">
                            {sponsor.role === 'Sponsor' ? '★ ' : ''}
                            {sponsor.first_name} {sponsor.last_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {sponsor.party} • District {sponsor.district}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {sponsor.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Bill History */}
              {bill.history && bill.history.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-serif">
                      <Calendar className="w-5 h-5 text-accent" />
                      Legislative History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {bill.history.map((event, i) => (
                        <div
                          key={i}
                          className="flex gap-4 pb-3 border-b border-border last:border-0"
                        >
                          <div className="shrink-0 w-24 text-sm text-muted-foreground">
                            {event.date}
                          </div>
                          <div>
                            <p className="font-medium">{event.action}</p>
                            <p className="text-sm text-muted-foreground">
                              {event.chamber}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Bill Texts */}
              {bill.texts && bill.texts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-serif">
                      <FileText className="w-5 h-5 text-accent" />
                      Bill Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {bill.texts.map((text) => (
                        <Button
                          key={text.doc_id}
                          variant="outline"
                          className="w-full justify-between"
                          onClick={() => window.open(text.state_link || text.url, '_blank')}
                        >
                          <span>{text.type} - {text.date}</span>
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Official Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Official Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {bill.state_link && (
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => window.open(bill.state_link, '_blank')}
                    >
                      <span>View on TN Legislature Website</span>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                  {bill.url && (
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => window.open(bill.url, '_blank')}
                    >
                      <span>LegiScan Bill Page</span>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* News */}
              <NewsCommentary />
            </div>

            {/* Advocacy Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <AdvocacyBar
                billId={bill.bill_id}
                billNumber={bill.bill_number}
                billTitle={bill.title}
                stance={stance}
                onStanceChange={setStance}
                sponsors={sponsors}
              />

              {/* Critical Dates */}
              {criticalDates.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <CriticalDatesTimeline dates={criticalDates.slice(0, 6)} />
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
