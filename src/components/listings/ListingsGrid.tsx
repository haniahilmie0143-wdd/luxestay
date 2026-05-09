"use client";

import { useSearchParams } from "next/navigation";
import { ListingCard } from "./ListingCard";
import { SEED_LISTINGS, filterListings } from "@/lib/seed-listings";
import { Building2 } from "lucide-react";

export function ListingsGrid() {
  const searchParams = useSearchParams();

  const city = searchParams.get("city") ?? undefined;
  const guests = searchParams.get("guests") ? parseInt(searchParams.get("guests")!) : undefined;
  const minPrice = searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : undefined;

  const listings = filterListings(SEED_LISTINGS, city, guests, minPrice, maxPrice);

  if (!listings || listings.length === 0) {
    return (
      <div className="text-center py-20">
        <Building2 className="h-12 w-12 text-white/20 mx-auto mb-4" />
        <p className="text-white/40 text-lg font-display">No properties found</p>
        <p className="text-white/30 text-sm mt-2">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing, i) => (
        <ListingCard key={listing.id} listing={listing as any} index={i} />
      ))}
    </div>
  );
}
