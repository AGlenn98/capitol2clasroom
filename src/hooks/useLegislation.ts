import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LegiScanBill, LegiScanBillDetail, LegiScanSearchResult } from "@/types/legislation";
import { filterEducationBills } from "@/lib/educationBillFilter";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export function useEducationBills() {
  return useQuery({
    queryKey: ["education-bills"],
    queryFn: async () => {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/legislation?action=search&query=education`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch education bills");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // LegiScan returns results in a specific format
      const searchResults = data.searchresult || {};
      const bills: LegiScanSearchResult[] = [];

      // Convert object to array, filtering out summary
      Object.entries(searchResults).forEach(([key, value]) => {
        if (key !== 'summary' && typeof value === 'object') {
          bills.push(value as LegiScanSearchResult);
        }
      });

      // Filter to only include bills truly related to K-12, higher ed, or vocational education
      const filteredBills = filterEducationBills(bills);

      console.log(`Education bill filter: ${bills.length} -> ${filteredBills.length} bills (filtered out ${bills.length - filteredBills.length})`);

      return filteredBills;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useBillDetail(billId: number | null) {
  return useQuery({
    queryKey: ["bill-detail", billId],
    queryFn: async () => {
      if (!billId) return null;
      
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/legislation?action=getBill&bill_id=${billId}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch bill details");
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      return data.bill as LegiScanBillDetail;
    },
    enabled: !!billId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMasterBillList() {
  return useQuery({
    queryKey: ["master-bill-list"],
    queryFn: async () => {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/legislation?action=getMasterList`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch bill list");
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Convert object to array
      const masterlist = data.masterlist || {};
      const bills: LegiScanBill[] = [];
      
      Object.entries(masterlist).forEach(([key, value]) => {
        if (key !== 'session' && typeof value === 'object') {
          bills.push(value as LegiScanBill);
        }
      });
      
      return bills;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
