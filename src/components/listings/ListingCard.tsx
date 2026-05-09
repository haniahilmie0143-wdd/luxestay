"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, BedDouble, Users } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import type { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

export function ListingCard({ listing, index = 0 }: ListingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link href={`/listings/${listing.id}`} className="group block">
        <div className="rounded-2xl overflow-hidden glass hover:border-amber-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/5">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={
                listing.cover_image_url ||
                "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80"
              }
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {listing.rating >= 4.8 && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-black">
                Top rated
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-semibold text-base text-white line-clamp-1 leading-snug">
                {listing.title}
              </h3>
              <div className="flex items-center gap-1 shrink-0">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs text-white font-medium">
                  {listing.rating.toFixed(1)}
                </span>
                {listing.review_count > 0 && (
                  <span className="text-xs text-white/40">
                    ({listing.review_count})
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/50 text-xs">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {listing.city}, {listing.country}
              </span>
            </div>

            <div className="flex items-center gap-3 text-white/40 text-xs">
              <span className="flex items-center gap-1">
                <BedDouble className="h-3 w-3" />
                {listing.bedrooms} bed{listing.bedrooms !== 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {listing.max_guests} guests
              </span>
            </div>

            <div className="pt-1 flex items-baseline gap-1 border-t border-white/5 mt-2">
              <span className="text-white font-bold text-lg">
                {formatPrice(listing.price_per_night)}
              </span>
              <span className="text-white/40 text-xs">/ night</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
