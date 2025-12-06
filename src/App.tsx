import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import K12Policy from "./pages/K12Policy";
import HigherEducation from "./pages/HigherEducation";
import Legislation from "./pages/Legislation";
import Resources from "./pages/Resources";
import TakeAction from "./pages/TakeAction";
import About from "./pages/About";
import Newsletter from "./pages/Newsletter";
import AdvocacyHub from "./pages/AdvocacyHub";
import BillDetail from "./pages/BillDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/k12" element={<K12Policy />} />
          <Route path="/higher-ed" element={<HigherEducation />} />
          <Route path="/legislation" element={<Legislation />} />
          <Route path="/advocacy" element={<AdvocacyHub />} />
          <Route path="/advocacy/bill/:billId" element={<BillDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/action" element={<TakeAction />} />
          <Route path="/about" element={<About />} />
          <Route path="/newsletter" element={<Newsletter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;