import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, MapPin, BedDouble, Bath, Users, Wifi, Car, Waves, Coffee, Mountain, Flame } from "lucide-react";
import { BookingWidget } from "@/components/bookings/BookingWidget";
import { SEED_LISTINGS } from "@/lib/seed-listings";

const AMENITY_ICONS: Record<string, React.ElementType> = {
  wifi: Wifi,
  parking: Car,
  pool: Waves,
  breakfast: Coffee,
  "sea view": Mountain,
  "mountain view": Mountain,
  fireplace: Flame,
};

export function generateStaticParams() {
  return SEED_LISTINGS.map((l) => ({ id: l.id }));
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const listing = SEED_LISTINGS.find((l) => l.id === id);
  if (!listing) notFound();

  return (
    <div className="min-h-screen mesh-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="mb-6">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            {listing.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-white font-medium">{listing.rating.toFixed(2)}</span>
              <span>({listing.review_count} reviews)</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {listing.city}, {listing.country}
            </span>
          </div>
        </div>

        {/* Cover image */}
        <div className="relative h-72 sm:h-[28rem] rounded-2xl overflow-hidden mb-8">
          <Image
            src={listing.cover_image_url}
            alt={listing.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick stats */}
            <div className="glass rounded-2xl p-6">
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <BedDouble className="h-4 w-4 text-amber-400" />
                  {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? "s" : ""}
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Bath className="h-4 w-4 text-amber-400" />
                  {listing.bathrooms} bathroom{listing.bathrooms !== 1 ? "s" : ""}
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Users className="h-4 w-4 text-amber-400" />
                  Up to {listing.max_guests} guests
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-display text-xl font-semibold text-white mb-3">
                About this property
              </h2>
              <p className="text-white/60 leading-relaxed">{listing.description}</p>
            </div>

            {/* Amenities */}
            {listing.amenities.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-white mb-4">
                  Amenities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity) => {
                    const Icon = AMENITY_ICONS[amenity.toLowerCase()];
                    return (
                      <span
                        key={amenity}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-white/70 text-sm"
                      >
                        {Icon && <Icon className="h-3.5 w-3.5 text-amber-400" />}
                        {amenity}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Location */}
            <div>
              <h2 className="font-display text-xl font-semibold text-white mb-4">
                Location
              </h2>
              <div className="glass rounded-2xl p-4 text-white/60 text-sm flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{listing.address}</span>
              </div>
            </div>
          </div>

          {/* Right: Booking widget */}
          <div className="lg:col-span-1">
            <BookingWidget listing={listing as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
