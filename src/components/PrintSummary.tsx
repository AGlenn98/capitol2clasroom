import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PrintSummaryProps {
  billNumber: string;
  billTitle: string;
  summary?: string;
  sponsors?: Array<{ name: string; party: string; district: string }>;
  status?: string;
  lastAction?: string;
  lastActionDate?: string;
}

export function PrintSummary({
  billNumber,
  billTitle,
  summary,
  sponsors = [],
  status,
  lastAction,
  lastActionDate,
}: PrintSummaryProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className="print:hidden gap-2"
    >
      <Printer className="w-4 h-4" />
      Print Summary
    </Button>
  );
}

// Printable content component for bill details
export function PrintableBillContent({
  billNumber,
  billTitle,
  description,
  summary,
  sponsors = [],
  status,
  history = [],
}: {
  billNumber: string;
  billTitle: string;
  description?: string;
  summary?: string;
  sponsors?: Array<{ name: string; party: string; district: string }>;
  status?: string;
  history?: Array<{ date: string; action: string; chamber: string }>;
}) {
  return (
    <div className="hidden print:block print:p-8">
      <div className="border-b-2 border-primary pb-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-mono font-bold">{billNumber}</span>
          <span className="text-sm text-muted-foreground">
            Nashville Policy Compass
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold">{billTitle}</h1>
      </div>

      {description && (
        <section className="mb-6">
          <h2 className="font-serif text-lg font-semibold mb-2">Description</h2>
          <p className="text-sm leading-relaxed">{description}</p>
        </section>
      )}

      {summary && (
        <section className="mb-6">
          <h2 className="font-serif text-lg font-semibold mb-2">Plain English Summary</h2>
          <p className="text-sm leading-relaxed">{summary}</p>
        </section>
      )}

      {sponsors.length > 0 && (
        <section className="mb-6">
          <h2 className="font-serif text-lg font-semibold mb-2">Sponsors</h2>
          <ul className="text-sm space-y-1">
            {sponsors.map((sponsor, i) => (
              <li key={i}>
                {sponsor.name} ({sponsor.party}) - District {sponsor.district}
              </li>
            ))}
          </ul>
        </section>
      )}

      {status && (
        <section className="mb-6">
          <h2 className="font-serif text-lg font-semibold mb-2">Current Status</h2>
          <p className="text-sm">{status}</p>
        </section>
      )}

      {history.length > 0 && (
        <section className="mb-6">
          <h2 className="font-serif text-lg font-semibold mb-2">Legislative History</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 w-24">Date</th>
                <th className="text-left py-2 w-20">Chamber</th>
                <th className="text-left py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 10).map((event, i) => (
                <tr key={i} className="border-b border-muted">
                  <td className="py-2">{event.date}</td>
                  <td className="py-2">{event.chamber}</td>
                  <td className="py-2">{event.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <footer className="mt-8 pt-4 border-t text-xs text-muted-foreground">
        <p>Printed from Nashville Policy Compass • capitoltoclassroom.org</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}
