"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Search, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

function HeroInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [guests, setGuests] = useState(searchParams.get("guests") ?? "");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city.trim()) params.set("city", city.trim());
    if (guests) params.set("guests", guests);
    router.push(`/?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-16 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0f]" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-400/15 text-amber-400 border border-amber-400/20 mb-6">
            Premium Property Rentals
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Find Your Perfect{" "}
            <span className="italic text-amber-400">Escape</span>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover extraordinary properties curated for the discerning traveller.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto shadow-2xl"
        >
          <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl hover:bg-white/5 transition">
            <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
            <input
              type="text"
              placeholder="City or country..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm"
            />
          </div>
          <div className="hidden sm:block w-px bg-white/10 my-2" />
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition sm:w-36">
            <Users className="h-4 w-4 text-amber-400 shrink-0" />
            <input
              type="number"
              placeholder="Guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              autoComplete="off"
              min={1}
              className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm"
            />
          </div>
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-all hover:shadow-lg hover:shadow-amber-400/25 text-sm shrink-0"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-8 mt-10 text-sm text-white/40"
        >
          <span>
            <strong className="text-white/80 font-semibold">12</strong> Properties
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>
            <strong className="text-white/80 font-semibold">10</strong> Countries
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>
            <strong className="text-white/80 font-semibold">4.95</strong> Avg. rating
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export function HeroSection() {
  return (
    <Suspense fallback={<div className="min-h-[92vh] mesh-bg" />}>
      <HeroInner />
    </Suspense>
  );
}
