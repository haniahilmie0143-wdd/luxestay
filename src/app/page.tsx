import { Suspense } from "react";
import { HeroSection } from "@/components/layout/HeroSection";
import { ListingsGrid } from "@/components/listings/ListingsGrid";
import { BentoStats } from "@/components/layout/BentoStats";
import { MapSection } from "@/components/map/MapSection";

export default function HomePage() {
  return (
    <div className="mesh-bg min-h-screen">
      <HeroSection />
      <BentoStats />

      {/* Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="font-display text-3xl font-bold text-white mb-2">
            Explore the World
          </h2>
          <p className="text-white/50 text-sm">
            All 12 properties shown — search above to filter by location
          </p>
        </div>
        <Suspense fallback={<div className="h-96 glass rounded-2xl animate-pulse" />}>
          <MapSection />
        </Suspense>
      </section>

      {/* Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="mb-10">
          <h2 className="font-display text-3xl font-bold text-white mb-2">
            Featured Properties
          </h2>
          <p className="text-white/50 text-sm">
            Handpicked luxury stays around the world
          </p>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden glass animate-pulse">
                  <div className="h-52 bg-white/5" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-white/5 rounded w-3/4" />
                    <div className="h-3 bg-white/5 rounded w-1/2" />
                    <div className="h-4 bg-white/5 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <ListingsGrid />
        </Suspense>
      </section>
    </div>
  );
}
