"use client";

import { useHostBookings } from "@/hooks/useBookings";
import { format, isAfter, isBefore, addDays } from "date-fns";
import { formatPrice } from "@/lib/utils";
import { TrendingUp, CalendarDays, Users, DollarSign } from "lucide-react";

export function HostDashboard() {
  const { data: bookings, isLoading } = useHostBookings();

  const stats = (() => {
    if (!bookings) return null;
    const confirmed = bookings.filter((b) => b.status !== "cancelled");
    const totalEarnings = confirmed.reduce((sum, b) => sum + b.total_price, 0);
    const today = new Date();
    const upcoming = confirmed.filter((b) => isAfter(new Date(b.check_in), today));
    const active = confirmed.filter(
      (b) =>
        !isAfter(new Date(b.check_in), today) &&
        isAfter(new Date(b.check_out), today)
    );
    return { totalEarnings, upcoming: upcoming.length, active: active.length, total: confirmed.length };
  })();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass rounded-2xl h-24 animate-pulse" />
          ))}
        </div>
        <div className="glass rounded-2xl h-64 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Earnings",
            value: formatPrice(stats?.totalEarnings ?? 0),
            icon: DollarSign,
            color: "text-amber-400",
          },
          {
            label: "Total Bookings",
            value: stats?.total ?? 0,
            icon: CalendarDays,
            color: "text-blue-400",
          },
          {
            label: "Upcoming Guests",
            value: stats?.upcoming ?? 0,
            icon: Users,
            color: "text-green-400",
          },
          {
            label: "Currently Hosting",
            value: stats?.active ?? 0,
            icon: TrendingUp,
            color: "text-purple-400",
          },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-5">
            <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-white/40 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming bookings */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-white mb-4">
          Upcoming Reservations
        </h3>
        {!bookings || bookings.length === 0 ? (
          <p className="text-white/40 text-sm">No upcoming bookings.</p>
        ) : (
          <div className="space-y-3">
            {bookings
              .filter(
                (b) =>
                  b.status === "confirmed" &&
                  isAfter(new Date(b.check_in), new Date())
              )
              .slice(0, 5)
              .map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                >
                  <div>
                    <p className="text-white text-sm font-medium">
                      {(booking.profiles as { full_name?: string })?.full_name || "Guest"}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {booking.listings?.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-400 text-sm font-semibold">
                      {formatPrice(booking.total_price)}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {format(new Date(booking.check_in), "MMM d")} →{" "}
                      {format(new Date(booking.check_out), "MMM d")}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
