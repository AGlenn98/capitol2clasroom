import { Layout } from "@/components/layout/Layout";
import { PolicyBreadcrumb } from "@/components/PolicyBreadcrumb";
import { CalendarDays, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useMemo } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO, isToday } from "date-fns";
import { useEducationBills, useBillDetail } from "@/hooks/useLegislation";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  date: Date;
  billId: number;
  billNumber: string;
  title: string;
  type: 'action' | 'hearing' | 'vote';
  description: string;
}

export default function LegislativeCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { data: bills, isLoading } = useEducationBills();

  // Generate calendar events from bills
  const events = useMemo(() => {
    if (!bills) return [];
    
    const calendarEvents: CalendarEvent[] = [];
    
    bills.forEach((bill) => {
      if (bill.last_action_date) {
        try {
          const date = parseISO(bill.last_action_date);
          calendarEvents.push({
            date,
            billId: bill.bill_id,
            billNumber: bill.bill_number,
            title: bill.title,
            type: 'action',
            description: bill.last_action,
          });
        } catch {
          // Skip invalid dates
        }
      }
    });
    
    return calendarEvents;
  }, [bills]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pad start of month to align with Sunday
  const startPadding = monthStart.getDay();
  const paddedDays = [...Array(startPadding).fill(null), ...days];

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(event.date, day));
  };

  const upcomingEvents = events
    .filter((e) => e.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 10);

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-3 border-b border-border bg-muted/30 print:hidden">
        <div className="container">
          <PolicyBreadcrumb items={[
            { label: "Legislation", href: "/legislation" },
            { label: "Calendar" }
          ]} />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 print:hidden">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground">
              <CalendarDays className="w-6 h-6" />
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
              Calendar
            </Badge>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Legislative Calendar
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Track upcoming hearings, votes, and key dates for education legislation in Tennessee.
          </p>
        </div>
      </section>

      {/* Calendar Grid */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Calendar */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-serif text-xl">
                      {format(currentMonth, 'MMMM yyyy')}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentMonth(new Date())}
                      >
                        Today
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <>
                      {/* Day headers */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div
                            key={day}
                            className="text-center text-xs font-medium text-muted-foreground py-2"
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {paddedDays.map((day, i) => {
                          if (!day) {
                            return <div key={`pad-${i}`} className="aspect-square" />;
                          }

                          const dayEvents = getEventsForDay(day);
                          const hasEvents = dayEvents.length > 0;

                          return (
                            <div
                              key={day.toISOString()}
                              className={cn(
                                "aspect-square p-1 border rounded-md transition-colors",
                                !isSameMonth(day, currentMonth) && "opacity-50",
                                isToday(day) && "bg-accent/20 border-accent",
                                hasEvents && "bg-primary/5 border-primary/20"
                              )}
                            >
                              <div className="text-xs font-medium mb-1">
                                {format(day, 'd')}
                              </div>
                              {dayEvents.slice(0, 2).map((event, idx) => (
                                <Link
                                  key={idx}
                                  to={`/advocacy/bill/${event.billId}`}
                                  className="block text-[10px] leading-tight truncate text-primary hover:underline"
                                >
                                  {event.billNumber}
                                </Link>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-[10px] text-muted-foreground">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Key Dates */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Key Legislative Dates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 pb-4 border-b border-border">
                      <div className="w-16 text-center">
                        <div className="text-2xl font-bold text-primary">14</div>
                        <div className="text-xs text-muted-foreground">Jan 2025</div>
                      </div>
                      <div>
                        <h4 className="font-medium">114th General Assembly Convenes</h4>
                        <p className="text-sm text-muted-foreground">
                          First day of the new legislative session
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-4 border-b border-border">
                      <div className="w-16 text-center">
                        <div className="text-2xl font-bold text-primary">1</div>
                        <div className="text-xs text-muted-foreground">Feb 2025</div>
                      </div>
                      <div>
                        <h4 className="font-medium">Bill Filing Deadline</h4>
                        <p className="text-sm text-muted-foreground">
                          Last day to file new legislation for the session
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-16 text-center">
                        <div className="text-2xl font-bold text-primary">May</div>
                        <div className="text-xs text-muted-foreground">2025</div>
                      </div>
                      <div>
                        <h4 className="font-medium">Expected Adjournment</h4>
                        <p className="text-sm text-muted-foreground">
                          Anticipated end of the legislative session
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Upcoming Events */}
            <aside className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : upcomingEvents.length > 0 ? (
                    upcomingEvents.slice(0, 8).map((event, i) => (
                      <Link
                        key={i}
                        to={`/advocacy/bill/${event.billId}`}
                        className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {event.billNumber}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(event.date, 'MMM d')}
                          </span>
                        </div>
                        <p className="text-sm font-medium line-clamp-1">
                          {event.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                          {event.description}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No upcoming events
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-secondary/50">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold mb-2">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get notifications about important legislative dates and bill updates.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/newsletter">Subscribe</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
