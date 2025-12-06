import { Layout } from "@/components/layout/Layout";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
import { useParams, Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, ExternalLink, FileText, Loader2, AlertCircle, ArrowLeft, Users, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLegislatorProfile, useSponsoredBills } from "@/hooks/useLegislator";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function LegislatorProfile() {
  const { legislatorId } = useParams<{ legislatorId: string }>();
  const numericId = legislatorId ? parseInt(legislatorId, 10) : null;
  const [showEducationOnly, setShowEducationOnly] = useState(false);
  
  const { data: legislator, isLoading: loadingProfile, error: profileError } = useLegislatorProfile(numericId);
  const { data: allBills, isLoading: loadingAllBills } = useSponsoredBills(numericId, false);
  const { data: educationBills, isLoading: loadingEducationBills } = useSponsoredBills(numericId, true);

  const displayedBills = showEducationOnly ? educationBills : allBills;
  const loadingBills = showEducationOnly ? loadingEducationBills : loadingAllBills;

  if (loadingProfile) {
    return (
      <Layout>
        <section className="py-6">
          <div className="container">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="h-64 w-full" />
              <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (profileError || !legislator) {
    return (
      <Layout>
        <section className="py-12">
          <div className="container max-w-xl">
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="p-6 text-center">
                <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
                <h2 className="font-serif text-lg font-bold mb-2">Legislator Not Found</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Unable to load this legislator's profile.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/legislators">
                    <ArrowLeft className="w-3 h-3 mr-1" />
                    Back to Legislators
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  const partyColor = legislator.party === 'R' 
    ? 'bg-destructive/10 text-destructive border-destructive/30'
    : legislator.party === 'D'
    ? 'bg-blue-500/10 text-blue-700 border-blue-500/30'
    : 'bg-muted text-muted-foreground';

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-3 border-b border-border bg-muted/30 print:hidden">
        <div className="container">
          <PolicyBreadcrumb items={[
            { label: "Legislators", href: "/legislators" },
            { label: legislator.name }
          ]} />
        </div>
      </section>

      {/* Profile Header */}
      <section className="py-8 bg-primary text-primary-foreground print:bg-transparent print:text-foreground">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0 print:bg-muted">
              <User className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground/60 print:text-muted-foreground" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge 
                  variant="outline" 
                  className={cn("border", partyColor)}
                >
                  {legislator.party === 'R' ? 'Republican' : legislator.party === 'D' ? 'Democrat' : legislator.party}
                </Badge>
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none print:bg-muted print:text-foreground">
                  {legislator.role}
                </Badge>
              </div>
              
              <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                {legislator.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/80 print:text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  District {legislator.district}
                </span>
                {legislator.chamber && (
                  <span>{legislator.chamber}</span>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="bg-primary-foreground/10 rounded-lg px-3 py-2">
                  <div className="text-2xl font-bold">{allBills?.length || 0}</div>
                  <div className="text-xs text-primary-foreground/70">Sponsored Bills</div>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg px-3 py-2">
                  <div className="text-2xl font-bold">{educationBills?.length || 0}</div>
                  <div className="text-xs text-primary-foreground/70">Education Bills</div>
                </div>
                {legislator.committee && legislator.committee.length > 0 && (
                  <div className="bg-primary-foreground/10 rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold">{legislator.committee.length}</div>
                    <div className="text-xs text-primary-foreground/70">Committees</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Sidebar */}
            <aside className="space-y-6 print:hidden">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {legislator.email && (
                    <a
                      href={`mailto:${legislator.email}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Email</div>
                        <div className="text-sm font-medium">{legislator.email}</div>
                      </div>
                    </a>
                  )}
                  
                  {legislator.capitol_phone && (
                    <a
                      href={`tel:${legislator.capitol_phone}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Capitol Office</div>
                        <div className="text-sm font-medium">{legislator.capitol_phone}</div>
                      </div>
                    </a>
                  )}

                  {legislator.capitol_address && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground">Capitol Address</div>
                        <div className="text-sm">{legislator.capitol_address}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Committee Memberships */}
              {legislator.committee && legislator.committee.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-serif flex items-center gap-2">
                      <Users className="w-5 h-5 text-accent" />
                      Committee Memberships
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {legislator.committee.map((comm) => (
                        <li key={comm.committee_id} className="p-2 rounded bg-muted/50 text-sm">
                          <div className="font-medium">{comm.name}</div>
                          {comm.position && (
                            <div className="text-xs text-muted-foreground">{comm.position}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card className="bg-secondary/50">
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-serif font-semibold">Take Action</h3>
                  {legislator.email && (
                    <Button asChild className="w-full" size="sm">
                      <a href={`mailto:${legislator.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </a>
                    </Button>
                  )}
                  {legislator.capitol_phone && (
                    <Button asChild variant="outline" className="w-full" size="sm">
                      <a href={`tel:${legislator.capitol_phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call Office
                      </a>
                    </Button>
                  )}
                  {legislator.ballotpedia && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(legislator.ballotpedia, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ballotpedia
                    </Button>
                  )}
                  {legislator.votesmart_id && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(`https://justfacts.votesmart.org/candidate/${legislator.votesmart_id}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      VoteSmart
                    </Button>
                  )}
                  {legislator.followthemoney_eid && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(`https://www.followthemoney.org/entity-details?eid=${legislator.followthemoney_eid}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Follow The Money
                    </Button>
                  )}
                </CardContent>
              </Card>
            </aside>

            {/* Sponsored Bills */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <CardTitle className="font-serif flex items-center gap-2">
                      <FileText className="w-5 h-5 text-accent" />
                      Sponsored Bills
                    </CardTitle>
                    <Button
                      variant={showEducationOnly ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowEducationOnly(!showEducationOnly)}
                      className="gap-2"
                    >
                      <Filter className="w-4 h-4" />
                      {showEducationOnly ? "Education Only" : "All Bills"}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {showEducationOnly 
                      ? `${educationBills?.length || 0} education-related bills`
                      : `${allBills?.length || 0} total sponsored bills`}
                  </p>
                </CardHeader>
                <CardContent>
                  {loadingBills ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : displayedBills && displayedBills.length > 0 ? (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                      {displayedBills.map((bill) => (
                        <Link
                          key={bill.bill_id}
                          to={`/advocacy/bill/${bill.bill_id}`}
                          className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs shrink-0">
                                  {bill.bill_number}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {bill.last_action_date}
                                </span>
                              </div>
                              <h4 className="font-medium text-sm line-clamp-2">
                                {bill.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                {bill.last_action}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        {showEducationOnly 
                          ? "No education-related bills found for this legislator."
                          : "No sponsored bills found for this legislator."}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
