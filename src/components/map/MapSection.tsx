"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SEED_LISTINGS, filterListings } from "@/lib/seed-listings";
import { formatPrice } from "@/lib/utils";
import { MapPin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PopupListing {
  id: string;
  title: string;
  city: string;
  country: string;
  price_per_night: number;
  cover_image_url: string;
  rating: number;
  lat: number;
  lng: number;
}

export function MapSection() {
  const searchParams = useSearchParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<PopupListing | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const markersRef = useRef<any[]>([]);
  const mapInstanceRef = useRef<any>(null);

  const city = searchParams.get("city") ?? undefined;
  const guests = searchParams.get("guests") ? parseInt(searchParams.get("guests")!) : undefined;
  const minPrice = searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : undefined;

  const listings = filterListings(SEED_LISTINGS, city, guests, minPrice, maxPrice);

  // Load Leaflet dynamically (no SSR)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Inject Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setMapReady(true);
    if (!document.getElementById("leaflet-js")) {
      script.id = "leaflet-js";
      document.head.appendChild(script);
    } else {
      setMapReady(true);
    }
  }, []);

  // Init map once Leaflet is ready
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([20, 10], 2);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(mapInstanceRef.current);
    }
  }, [mapReady]);

  // Update markers when listings change
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    listings.forEach((listing) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="
          background: #c9a84c;
          color: #000;
          font-weight: 700;
          font-size: 11px;
          padding: 5px 10px;
          border-radius: 20px;
          white-space: nowrap;
          box-shadow: 0 2px 12px rgba(0,0,0,0.4);
          border: 2px solid #fff;
          cursor: pointer;
          font-family: DM Sans, sans-serif;
        ">$${listing.price_per_night.toLocaleString()}</div>`,
        iconAnchor: [30, 14],
      });

      const marker = L.marker([listing.lat, listing.lng], { icon })
        .addTo(mapInstanceRef.current)
        .on("click", () => setSelected(listing));

      markersRef.current.push(marker);
    });

    // Fit map to markers if there are any
    if (listings.length > 0) {
      const group = L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.2), {
        maxZoom: listings.length === 1 ? 10 : 5,
        animate: true,
      });
    } else {
      mapInstanceRef.current.setView([20, 10], 2);
    }
  }, [mapReady, listings]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ height: 420 }}>
      <div ref={mapRef} style={{ height: "100%", width: "100%", background: "#1a1a2e" }} />

      {/* Legend */}
      <div className="absolute top-3 left-3 z-[500] glass rounded-xl px-3 py-2 text-xs text-white/60 flex items-center gap-2">
        <MapPin className="h-3 w-3 text-amber-400" />
        {listings.length} {listings.length === 1 ? "property" : "properties"} shown
      </div>

      {/* Popup card */}
      {selected && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[500] w-72">
          <div className="glass rounded-2xl overflow-hidden shadow-2xl border border-amber-400/20">
            <div className="relative h-36">
              <Image
                src={selected.cover_image_url}
                alt={selected.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
            <div className="p-3">
              <p className="text-white font-semibold text-sm line-clamp-1">{selected.title}</p>
              <p className="text-white/50 text-xs mt-0.5">{selected.city}, {selected.country}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-amber-400 font-bold text-sm">
                  {formatPrice(selected.price_per_night)}<span className="text-white/40 font-normal text-xs"> /night</span>
                </span>
                <Link
                  href={`/listings/${selected.id}`}
                  className="text-xs px-3 py-1.5 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-300 transition"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
