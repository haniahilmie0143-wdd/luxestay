"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Booking } from "@/types";

export function useMyBookings() {
  const supabase = createClient();

  return useQuery<Booking[]>({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("bookings")
        .select("*, listings(title, city, country, cover_image_url, price_per_night)")
        .eq("guest_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data as Booking[]) ?? [];
    },
  });
}

export function useHostBookings() {
  const supabase = createClient();

  return useQuery<Booking[]>({
    queryKey: ["host-bookings"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("bookings")
        .select(
          "*, listings!inner(title, city, country, cover_image_url, price_per_night, host_id), profiles(full_name, avatar_url)"
        )
        .eq("listings.host_id", user.id)
        .order("check_in", { ascending: true });

      if (error) throw error;
      return (data as Booking[]) ?? [];
    },
  });
}

export function useListingBookedDates(listingId: string) {
  const supabase = createClient();

  return useQuery<Date[]>({
    queryKey: ["booked-dates", listingId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("check_in, check_out")
        .eq("listing_id", listingId)
        .neq("status", "cancelled")
        .gte("check_out", new Date().toISOString().split("T")[0]);

      if (error) throw error;

      const bookedDates: Date[] = [];
      data?.forEach(({ check_in, check_out }) => {
        const start = new Date(check_in);
        const end = new Date(check_out);
        for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
          bookedDates.push(new Date(d));
        }
      });

      return bookedDates;
    },
    enabled: !!listingId,
  });
}
