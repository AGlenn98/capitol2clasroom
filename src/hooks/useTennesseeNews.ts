import { useQuery } from "@tanstack/react-query";
import { NewsItem, NewsSource } from "@/types/legislation";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface NewsResponse {
  news: NewsItem[];
  sources: NewsSource[];
  lastUpdated: string;
}

export function useTennesseeNews() {
  return useQuery<NewsResponse>({
    queryKey: ["tn-news"],
    queryFn: async () => {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/tn-news`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      return data;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}
