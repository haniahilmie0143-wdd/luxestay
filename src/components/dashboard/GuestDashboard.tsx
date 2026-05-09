"use client";

import { useMyBookings } from "@/hooks/useBookings";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { cancelBooking } from "@/actions/bookings";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { CalendarDays, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-green-400/15 text-green-400 border-green-400/20",
  pending: "bg-amber-400/15 text-amber-400 border-amber-400/20",
  cancelled: "bg-red-400/15 text-red-400 border-red-400/20",
  completed: "bg-blue-400/15 text-blue-400 border-blue-400/20",
};

export function GuestDashboard() {
  const { data: bookings, isLoading, refetch } = useMyBookings();
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleCancel = async (id: string) => {
    setCancellingId(id);
    const result = await cancelBooking(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Booking cancelled.");
      refetch();
    }
    setCancellingId(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass rounded-2xl h-28 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <CalendarDays className="h-10 w-10 text-white/20 mx-auto mb-4" />
        <p className="text-white/50 font-display text-lg">No bookings yet</p>
        <p className="text-white/30 text-sm mt-2 mb-6">
          Find your perfect stay and start exploring
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-300 transition text-sm"
        >
          Browse properties
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl text-white font-semibold">
        Your Bookings ({bookings.length})
      </h2>
      {bookings.map((booking) => (
        <div key={booking.id} className="glass rounded-2xl p-4 flex gap-4 items-start">
          {booking.listings?.cover_image_url && (
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
              <Image
                src={booking.listings.cover_image_url}
                alt={booking.listings.title || ""}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <p className="text-white font-semibold text-sm line-clamp-1">
                  {booking.listings?.title}
                </p>
                <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" />
                  {booking.listings?.city}, {booking.listings?.country}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_STYLES[booking.status] || ""}`}
              >
                {booking.status}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-white/50">
              <span>
                {format(new Date(booking.check_in), "MMM d")} →{" "}
                {format(new Date(booking.check_out), "MMM d, yyyy")}
              </span>
              <span className="text-amber-400 font-semibold">
                {formatPrice(booking.total_price)}
              </span>
            </div>
          </div>
          {booking.status === "confirmed" && (
            <button
              onClick={() => handleCancel(booking.id)}
              disabled={cancellingId === booking.id}
              className="shrink-0 text-xs px-3 py-1.5 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition flex items-center gap-1"
            >
              {cancellingId === booking.id ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                "Cancel"
              )}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
