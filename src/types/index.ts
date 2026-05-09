export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  is_host: boolean;
  created_at: string;
}

export interface Listing {
  id: string;
  host_id: string;
  title: string;
  description: string | null;
  city: string;
  country: string;
  address: string | null;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  cover_image_url: string | null;
  image_urls: string[];
  amenities: string[];
  rating: number;
  review_count: number;
  is_active: boolean;
  created_at: string;
  profiles?: Profile;
}

export interface Booking {
  id: string;
  listing_id: string;
  guest_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
  guest_count: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  created_at: string;
  listings?: Listing;
  profiles?: Profile;
}

export interface ListingFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
}
