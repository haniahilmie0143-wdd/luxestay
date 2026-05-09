export interface SeedListing {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  address: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  cover_image_url: string;
  image_urls: string[];
  amenities: string[];
  rating: number;
  review_count: number;
  lat: number;
  lng: number;
}

export const SEED_LISTINGS: SeedListing[] = [
  {
    id: "seed-1",
    title: "Clifftop Villa with Infinity Pool",
    description:
      "Perched on the dramatic Amalfi cliffs, this breathtaking villa offers panoramic Mediterranean views. Wake up to the sound of waves and enjoy a private infinity pool that seems to melt into the sea. The interiors blend traditional Italian stonework with contemporary luxury.",
    city: "Positano",
    country: "Italy",
    address: "Via Cristoforo Colombo 12, Positano",
    price_per_night: 850,
    max_guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    cover_image_url:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    ],
    amenities: ["WiFi", "Pool", "Kitchen", "Parking", "Sea View"],
    rating: 4.97,
    review_count: 214,
    lat: 40.6281,
    lng: 14.4843,
  },
  {
    id: "seed-2",
    title: "Tropical Overwater Bungalow",
    description:
      "Live the ultimate Maldivian dream in this glass-floored overwater bungalow. Step directly from your private deck into the crystal-clear lagoon. Watch tropical fish through the glass floor panel and fall asleep to the sound of gentle waves.",
    city: "Malé",
    country: "Maldives",
    address: "North Malé Atoll, Maldives",
    price_per_night: 1200,
    max_guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    cover_image_url:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
    ],
    amenities: ["WiFi", "Pool", "Breakfast", "Sea View", "Snorkeling"],
    rating: 4.99,
    review_count: 89,
    lat: 4.1755,
    lng: 73.5093,
  },
  {
    id: "seed-3",
    title: "Parisian Haussmann Apartment",
    description:
      "An impeccably restored 19th-century Haussmann apartment in the heart of the Marais. Original herringbone parquet floors, decorative mouldings, and tall windows overlooking a classic Parisian courtyard. Steps from the best galleries, bistros, and the Seine.",
    city: "Paris",
    country: "France",
    address: "Rue de Bretagne, Le Marais, Paris",
    price_per_night: 420,
    max_guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    cover_image_url:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    ],
    amenities: ["WiFi", "Kitchen", "Washer", "City View"],
    rating: 4.91,
    review_count: 367,
    lat: 48.8631,
    lng: 2.3597,
  },
  {
    id: "seed-4",
    title: "Kyoto Traditional Machiya",
    description:
      "A meticulously preserved 100-year-old machiya (townhouse) in Kyoto's historic Nishijin weaving district. Experience the art of wabi-sabi living with tatami rooms, a zen garden, an ofuro cedar bath, and sliding shoji screens filtering golden afternoon light.",
    city: "Kyoto",
    country: "Japan",
    address: "Nishijin, Kamigyo-ku, Kyoto",
    price_per_night: 380,
    max_guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    cover_image_url:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80",
    ],
    amenities: ["WiFi", "Kitchen", "Garden", "Onsen"],
    rating: 4.95,
    review_count: 143,
    lat: 35.0116,
    lng: 135.7681,
  },
  {
    id: "seed-5",
    title: "Manhattan Glass Penthouse",
    description:
      "Floor-to-ceiling glass walls deliver 270° views of the Manhattan skyline from this extraordinary penthouse. A private rooftop terrace, chef's kitchen, and curated art collection make this one of New York's most sought-after retreats.",
    city: "New York",
    country: "USA",
    address: "West 57th Street, Midtown Manhattan",
    price_per_night: 2200,
    max_guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    cover_image_url:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    amenities: ["WiFi", "Pool", "Gym", "Doorman", "City View", "Parking"],
    rating: 4.88,
    review_count: 56,
    lat: 40.7648,
    lng: -73.9808,
  },
  {
    id: "seed-6",
    title: "Santorini Cave House",
    description:
      "Carved into the ancient volcanic caldera, this iconic cave house in Oia combines Cycladic tradition with modern luxury. A private plunge pool, whitewashed domed ceilings, and the world's most photographed sunset views await you.",
    city: "Santorini",
    country: "Greece",
    address: "Oia, Santorini, Cyclades",
    price_per_night: 680,
    max_guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    cover_image_url:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    ],
    amenities: ["WiFi", "Pool", "Breakfast", "Sea View", "Terrace"],
    rating: 4.98,
    review_count: 302,
    lat: 36.4618,
    lng: 25.3753,
  },
  {
    id: "seed-7",
    title: "Bali Jungle Eco-Villa",
    description:
      "Nestled in the emerald rice terraces of Ubud, this eco-villa is a sanctuary of open-air pavilions, a private plunge pool, and a traditional Balinese garden. Daily yoga, organic farm-to-table meals, and spa treatments can be arranged on-site.",
    city: "Ubud",
    country: "Indonesia",
    address: "Jalan Bisma, Ubud, Bali",
    price_per_night: 290,
    max_guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    cover_image_url:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80",
    ],
    amenities: ["WiFi", "Pool", "Breakfast", "Garden", "Yoga"],
    rating: 4.94,
    review_count: 198,
    lat: -8.5069,
    lng: 115.2625,
  },
  {
    id: "seed-8",
    title: "Swiss Alps Chalet",
    description:
      "A beautifully restored 18th-century Alpine chalet with ski-in/ski-out access to the Verbier pistes. Original timber beams, a stone fireplace, and a hammam create the perfect après-ski retreat after a day on Europe's finest powder.",
    city: "Verbier",
    country: "Switzerland",
    address: "Route de Verbier Station, Verbier",
    price_per_night: 1500,
    max_guests: 10,
    bedrooms: 5,
    bathrooms: 4,
    cover_image_url:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    ],
    amenities: ["WiFi", "Fireplace", "Ski-in/out", "Hammam", "Kitchen"],
    rating: 4.96,
    review_count: 77,
    lat: 46.0965,
    lng: 7.2289,
  },
  {
    id: "seed-9",
    title: "Dubai Marina Skytower",
    description:
      "An ultra-modern 52nd floor residence in the iconic Address Marina tower with unobstructed views of the Burj Al Arab and Palm Jumeirah. Smart home technology, a private gym, and access to a rooftop infinity pool included.",
    city: "Dubai",
    country: "UAE",
    address: "Dubai Marina, Dubai",
    price_per_night: 950,
    max_guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    cover_image_url:
      "https://images.unsplash.com/photo-1540541338537-1220059bcc83?w=800&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1540541338537-1220059bcc83?w=800&q=80",
    ],
    amenities: ["WiFi", "Pool", "Gym", "Concierge", "City View", "Parking"],
    rating: 4.87,
    review_count: 112,
    lat: 25.0801,
    lng: 55.1401,
  },
  {
    id: "seed-10",
    title: "Tulum Jungle Cenote House",
    description:
      "A hand-crafted bohemian hideaway in the Tulum jungle, built around a private cenote. Natural materials, an outdoor shower, a rooftop terrace for stargazing, and daily access to the beach club are all included. Pure magic.",
    city: "Tulum",
    country: "Mexico",
    address: "Zona Hotelera, Tulum, Quintana Roo",
    price_per_night: 480,
    max_guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    cover_image_url:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
    ],
    amenities: ["WiFi", "Pool", "Beach Access", "Kitchen", "Garden"],
    rating: 4.93,
    review_count: 165,
    lat: 20.2114,
    lng: -87.4654,
  },
  {
    id: "seed-11",
    title: "Cape Town Clifton Beachhouse",
    description:
      "Directly on Clifton 4th Beach — one of the world's most beautiful stretches of sand — this contemporary glass-and-concrete villa offers direct beach access, a heated pool, and breathtaking views of the Twelve Apostles mountain range.",
    city: "Cape Town",
    country: "South Africa",
    address: "Clifton 4th Beach, Cape Town",
    price_per_night: 620,
    max_guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    cover_image_url:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
    ],
    amenities: ["WiFi", "Pool", "Beach Access", "Kitchen", "Mountain View"],
    rating: 4.92,
    review_count: 88,
    lat: -33.9383,
    lng: 18.3762,
  },
  {
    id: "seed-12",
    title: "Sydney Harbour Waterfront Home",
    description:
      "A stunning contemporary home on the Sydney Harbour foreshore with a private jetty, direct harbour swimming access, and unobstructed views of the Opera House and Harbour Bridge. One of the most coveted addresses in Australia.",
    city: "Sydney",
    country: "Australia",
    address: "Cremorne Point, Sydney Harbour",
    price_per_night: 780,
    max_guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    cover_image_url:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
    amenities: ["WiFi", "Pool", "Jetty", "Kitchen", "Harbour View"],
    rating: 4.96,
    review_count: 134,
    lat: -33.8321,
    lng: 151.2208,
  },
];

// Filter helper used by both grid and map
export function filterListings(
  listings: SeedListing[],
  city?: string,
  guests?: number,
  minPrice?: number,
  maxPrice?: number
): SeedListing[] {
  return listings.filter((l) => {
    if (city && !l.city.toLowerCase().includes(city.toLowerCase()) &&
        !l.country.toLowerCase().includes(city.toLowerCase())) return false;
    if (guests && l.max_guests < guests) return false;
    if (minPrice && l.price_per_night < minPrice) return false;
    if (maxPrice && l.price_per_night > maxPrice) return false;
    return true;
  });
}
