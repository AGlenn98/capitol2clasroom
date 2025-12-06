import { Layout } from "@/components/layout/Layout";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
import { Users, Search, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useEducationBills } from "@/hooks/useLegislation";
import { cn } from "@/lib/utils";

interface LegislatorSummary {
  people_id: number;
  name: string;
  first_name: string;
  last_name: string;
  party: string;
  district: string;
  billCount: number;
}

export default function Legislators() {
  const [searchQuery, setSearchQuery] = useState("");
  const [partyFilter, setPartyFilter] = useState<"All" | "R" | "D">("All");
  const [chamberFilter, setChamberFilter] = useState<"All" | "House" | "Senate">("All");
  
  const { data: bills, isLoading } = useEducationBills();

  // Extract unique legislators from bill sponsors
  const legislators = useMemo(() => {
    if (!bills) return [];
    
    const legislatorMap = new Map<number, LegislatorSummary>();
    
    // Note: We'd need detailed bill data to get sponsors
    // For now, this serves as the structure
    
    return Array.from(legislatorMap.values()).sort((a, b) => 
      b.billCount - a.billCount
    );
  }, [bills]);

  // Static legislator data for demonstration
  const staticLegislators: LegislatorSummary[] = [
    { people_id: 1, name: "Sen. Todd Gardenhire", first_name: "Todd", last_name: "Gardenhire", party: "R", district: "SD-10", billCount: 5 },
    { people_id: 2, name: "Rep. Mark White", first_name: "Mark", last_name: "White", party: "R", district: "HD-83", billCount: 8 },
    { people_id: 3, name: "Sen. Raumesh Akbari", first_name: "Raumesh", last_name: "Akbari", party: "D", district: "SD-29", billCount: 4 },
    { people_id: 4, name: "Rep. Antonio Parkinson", first_name: "Antonio", last_name: "Parkinson", party: "D", district: "HD-98", billCount: 6 },
    { people_id: 5, name: "Sen. Jon Lundberg", first_name: "Jon", last_name: "Lundberg", party: "R", district: "SD-4", billCount: 3 },
    { people_id: 6, name: "Rep. Scott Cepicky", first_name: "Scott", last_name: "Cepicky", party: "R", district: "HD-64", billCount: 7 },
  ];

  const displayLegislators = legislators.length > 0 ? legislators : staticLegislators;

  const filteredLegislators = displayLegislators.filter((leg) => {
    const matchesSearch = searchQuery === "" ||
      leg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leg.district.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesParty = partyFilter === "All" || leg.party === partyFilter;
    
    const matchesChamber = chamberFilter === "All" ||
      (chamberFilter === "House" && leg.district.startsWith("HD")) ||
      (chamberFilter === "Senate" && leg.district.startsWith("SD"));

    return matchesSearch && matchesParty && matchesChamber;
  });

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-3 border-b border-border bg-muted/30">
        <div className="container">
          <PolicyBreadcrumb items={[{ label: "Legislators" }]} />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground">
              <Users className="w-6 h-6" />
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
              Directory
            </Badge>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Tennessee Legislators
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Find your representatives and see their education policy record, sponsored bills, and contact information.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-16 bg-background z-10">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex gap-2">
                {(["All", "R", "D"] as const).map((party) => (
                  <Button
                    key={party}
                    variant={partyFilter === party ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPartyFilter(party)}
                    className={cn(
                      "shrink-0",
                      party === "R" && partyFilter === party && "bg-destructive hover:bg-destructive/90",
                      party === "D" && partyFilter === party && "bg-blue-600 hover:bg-blue-700"
                    )}
                  >
                    {party === "All" ? "All Parties" : party === "R" ? "Republican" : "Democrat"}
                  </Button>
                ))}
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="flex gap-2">
                {(["All", "House", "Senate"] as const).map((chamber) => (
                  <Button
                    key={chamber}
                    variant={chamberFilter === chamber ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setChamberFilter(chamber)}
                    className="shrink-0"
                  >
                    {chamber === "All" ? "Both Chambers" : chamber}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legislators Grid */}
      <section className="py-8">
        <div className="container">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredLegislators.length} legislators
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLegislators.map((legislator) => (
                  <Link
                    key={legislator.people_id}
                    to={`/legislators/${legislator.people_id}`}
                  >
                    <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0",
                            legislator.party === "R" 
                              ? "bg-destructive/10 text-destructive"
                              : "bg-blue-500/10 text-blue-700"
                          )}>
                            {legislator.first_name[0]}{legislator.last_name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif font-semibold truncate">
                              {legislator.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  "text-xs",
                                  legislator.party === "R" 
                                    ? "border-destructive/30 text-destructive"
                                    : "border-blue-500/30 text-blue-700"
                                )}
                              >
                                {legislator.party}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {legislator.district}
                              </span>
                            </div>
                            {legislator.billCount > 0 && (
                              <p className="text-xs text-muted-foreground mt-2">
                                {legislator.billCount} education bill{legislator.billCount !== 1 ? 's' : ''} sponsored
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {filteredLegislators.length === 0 && (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <Users className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No legislators found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    onClick={() => { 
                      setSearchQuery(""); 
                      setPartyFilter("All"); 
                      setChamberFilter("All"); 
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
