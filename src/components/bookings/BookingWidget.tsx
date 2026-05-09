"use client";

import { useState } from "react";
import { format, differenceInCalendarDays, addDays, isBefore, isAfter, isSameDay } from "date-fns";
import { CalendarDays, Users, ChevronLeft, ChevronRight, Star, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

interface BookingWidgetProps {
  listing: {
    id: string;
    title: string;
    price_per_night: number;
    max_guests: number;
    rating: number;
    review_count: number;
  };
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function BookingWidget({ listing }: BookingWidgetProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [step, setStep] = useState<"checkin" | "checkout">("checkin");
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [booked, setBooked] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const nights = checkIn && checkOut
    ? differenceInCalendarDays(checkOut, checkIn)
    : 0;
  const subtotal = nights * listing.price_per_night;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  const handleDayClick = (date: Date) => {
    if (isBefore(date, today)) return;
    if (step === "checkin" || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      setStep("checkout");
    } else {
      if (isBefore(date, checkIn!) || isSameDay(date, checkIn!)) {
        setCheckIn(date);
        setCheckOut(null);
        return;
      }
      setCheckOut(date);
      setStep("checkin");
    }
  };

  const isInRange = (date: Date) => {
    if (!checkIn) return false;
    const end = checkOut || hoveredDate;
    if (!end) return false;
    return isAfter(date, checkIn) && isBefore(date, end);
  };

  const handleBook = () => {
    if (!checkIn || !checkOut) { toast.error("Please select check-in and check-out dates."); return; }
    setBooked(true);
    toast.success("Booking confirmed! 🎉 Check your dashboard.");
  };

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const calDays: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(calYear, calMonth, i + 1)),
  ];

  if (booked) {
    return (
      <div className="glass rounded-2xl p-8 sticky top-24 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-green-400/20 flex items-center justify-center mx-auto">
          <Check className="h-7 w-7 text-green-400" />
        </div>
        <h3 className="font-display text-xl font-bold text-white">Booking Confirmed!</h3>
        <p className="text-white/50 text-sm">
          {listing.title}<br />
          {checkIn && format(checkIn, "MMM d")} → {checkOut && format(checkOut, "MMM d, yyyy")}<br />
          {guestCount} guest{guestCount > 1 ? "s" : ""}
        </p>
        <p className="text-amber-400 font-bold text-lg">{formatPrice(total)} total</p>
        <button
          onClick={() => { setBooked(false); setCheckIn(null); setCheckOut(null); setStep("checkin"); }}
          className="text-white/40 text-xs hover:text-white/70 transition underline"
        >
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 sticky top-24 space-y-5">
      {/* Price + rating */}
      <div className="flex items-start justify-between">
        <div className="flex items-baseline gap-1">
          <span className="font-bold text-white text-2xl">{formatPrice(listing.price_per_night)}</span>
          <span className="text-white/40 text-sm">/ night</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-white font-medium">{listing.rating.toFixed(2)}</span>
          <span className="text-white/40">({listing.review_count})</span>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 text-xs font-medium">
        <button
          onClick={() => setStep("checkin")}
          className={`flex-1 py-2 rounded-lg border transition ${step === "checkin" ? "border-amber-400 text-amber-400 bg-amber-400/10" : "border-white/10 text-white/40"}`}
        >
          {checkIn ? format(checkIn, "MMM d") : "Check-in"}
        </button>
        <button
          onClick={() => checkIn && setStep("checkout")}
          className={`flex-1 py-2 rounded-lg border transition ${step === "checkout" ? "border-amber-400 text-amber-400 bg-amber-400/10" : "border-white/10 text-white/40"}`}
        >
          {checkOut ? format(checkOut, "MMM d") : "Check-out"}
        </button>
      </div>

      {/* Calendar */}
      <div className="rounded-xl bg-white/5 p-3">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-3">
          <button onClick={prevMonth} className="p-1 text-white/40 hover:text-white transition">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-white text-sm font-medium">
            {MONTHS[calMonth]} {calYear}
          </span>
          <button onClick={nextMonth} className="p-1 text-white/40 hover:text-white transition">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-xs text-white/30 py-1">{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-y-1">
          {calDays.map((date, idx) => {
            if (!date) return <div key={idx} />;
            const isPast = isBefore(date, today);
            const isStart = checkIn && isSameDay(date, checkIn);
            const isEnd = checkOut && isSameDay(date, checkOut);
            const inRange = isInRange(date);

            return (
              <button
                key={idx}
                onClick={() => handleDayClick(date)}
                onMouseEnter={() => setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(null)}
                disabled={isPast}
                className={`
                  h-8 w-full rounded-lg text-xs transition font-medium
                  ${isPast ? "text-white/20 cursor-not-allowed" : "cursor-pointer"}
                  ${isStart || isEnd ? "bg-amber-400 text-black" : ""}
                  ${inRange ? "bg-amber-400/20 text-white rounded-none" : ""}
                  ${!isStart && !isEnd && !inRange && !isPast ? "text-white/70 hover:bg-white/10" : ""}
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Guests */}
      <div className="glass rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Users className="h-4 w-4 text-amber-400" />
          Guests
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white transition text-lg leading-none flex items-center justify-center"
          >−</button>
          <span className="text-white text-sm w-4 text-center">{guestCount}</span>
          <button
            onClick={() => setGuestCount(Math.min(listing.max_guests, guestCount + 1))}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white transition text-lg leading-none flex items-center justify-center"
          >+</button>
        </div>
      </div>

      {/* Price breakdown */}
      {nights > 0 && (
        <div className="space-y-2 text-sm border-t border-white/10 pt-3">
          <div className="flex justify-between text-white/60">
            <span>{formatPrice(listing.price_per_night)} × {nights} night{nights > 1 ? "s" : ""}</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>Service fee (10%)</span>
            <span>{formatPrice(serviceFee)}</span>
          </div>
          <div className="flex justify-between text-white font-bold text-base border-t border-white/10 pt-2">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      )}

      {/* Book button */}
      <button
        onClick={handleBook}
        disabled={!checkIn || !checkOut}
        className="w-full py-3 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-300 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <CalendarDays className="h-4 w-4" />
        {!checkIn ? "Select dates to book" : !checkOut ? "Select check-out date" : "Reserve now"}
      </button>

      <p className="text-center text-white/30 text-xs">
        No charge until confirmed · Free cancellation
      </p>
    </div>
  );
}
