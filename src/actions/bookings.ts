"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const BookingSchema = z.object({
  listingId: z.string().uuid(),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guestCount: z.number().int().min(1),
  totalPrice: z.number().positive(),
});

type BookingResult =
  | { success: true; bookingId: string }
  | { error: string };

export async function createBooking(input: unknown): Promise<BookingResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "You must be signed in to book." };

  const parsed = BookingSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Invalid booking data: " + parsed.error.message };
  }

  const { listingId, checkIn, checkOut, guestCount, totalPrice } = parsed.data;

  if (checkOut <= checkIn) {
    return { error: "Check-out must be after check-in." };
  }

  // Check availability via DB function (atomic, race-condition safe)
  const { data: available, error: checkError } = await supabase.rpc(
    "check_availability",
    {
      p_listing_id: listingId,
      p_check_in: checkIn,
      p_check_out: checkOut,
    }
  );

  if (checkError) return { error: "Could not verify availability." };
  if (!available) return { error: "These dates are no longer available." };

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      listing_id: listingId,
      guest_id: user.id,
      check_in: checkIn,
      check_out: checkOut,
      guest_count: guestCount,
      total_price: totalPrice,
      status: "confirmed",
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath(`/listings/${listingId}`);
  revalidatePath("/dashboard");

  return { success: true, bookingId: data.id };
}

export async function cancelBooking(bookingId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId)
    .eq("guest_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return {};
}
