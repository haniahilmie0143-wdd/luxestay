"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Listing, ListingFilters } from "@/types";

const PAGE_SIZE = 12;

export function useListings(filters: ListingFilters = {}, page = 0) {
  const supabase = createClient();

  return useQuery<Listing[]>({
    queryKey: ["listings", filters, page],
    queryFn: async () => {
      let query = supabase
        .from("listings")
        .select(
          "id, host_id, title, city, country, price_per_night, cover_image_url, rating, review_count, max_guests, bedrooms, bathrooms, amenities, is_active, created_at, description, address, image_urls"
        )
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (filters.city) {
        query = query.ilike("city", `%${filters.city}%`);
      }
      if (filters.minPrice !== undefined) {
        query = query.gte("price_per_night", filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        query = query.lte("price_per_night", filters.maxPrice);
      }
      if (filters.guests !== undefined) {
        query = query.gte("max_guests", filters.guests);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data as Listing[]) ?? [];
    },
    staleTime: 30_000,
  });
}

export function useListing(id: string) {
  const supabase = createClient();

  return useQuery<Listing>({
    queryKey: ["listing", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*, profiles(full_name, avatar_url)")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Listing;
    },
    enabled: !!id,
  });
}
