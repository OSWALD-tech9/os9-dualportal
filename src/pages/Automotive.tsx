import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { EventTicker } from "@/components/EventTicker";
import { SponsorshipFooter } from "@/components/SponsorshipFooter";
import { VehicleGallery } from "@/components/VehicleGallery";
import { vehicles as localVehicles, type Vehicle } from "@/data/vehicles";
import { useSupabaseVehicles, type SupabaseVehicle } from "@/hooks/use-supabase-data";
import { Car, Key, Eye, Loader2 } from "lucide-react";

type Filter = "all" | "sale" | "rental";

/** Map Supabase vehicle rows onto the local Vehicle shape for rendering */
const mergeVehicleData = (local: Vehicle[], remote: SupabaseVehicle[]): Vehicle[] => {
  if (remote.length === 0) return local;

  // Build a lookup by model name (lowercase) for fuzzy matching
  const remoteMap = new Map<string, SupabaseVehicle>();
  remote.forEach((r) => remoteMap.set(r.model.toLowerCase(), r));

  return local.map((v) => {
    const match = remoteMap.get(v.name.toLowerCase()) || remote.find((r) => v.name.toLowerCase().includes(r.model.toLowerCase()));
    if (!match) return v;

    return {
      ...v,
      price_xaf: match.price_xaf || v.price_xaf,
      image_front: match.image_front || v.image_front,
      image_back: match.image_back || v.image_back,
      image_interior: match.image_interior || v.image_interior,
    };
  });
};

const Automotive = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<Filter>("all");
  const [galleryVehicle, setGalleryVehicle] = useState<Vehicle | null>(null);
  const { data: remoteVehicles, loading, error } = useSupabaseVehicles();

  const vehicles = mergeVehicleData(localVehicles, remoteVehicles);
  const filtered = filter === "all" ? vehicles : vehicles.filter((v) => v.type === filter);

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "sale", label: theme === "wave" ? "🔒 Buy" : "For Sale" },
    { value: "rental", label: theme === "wave" ? "⚡ Rent" : "Rentals" },
  ];

  return (
    <div className="min-h-screen pt-[calc(1.75rem+6rem)]">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground text-glow">
            {theme === "wave" ? "// MOTOR VAULT" : "Automotive Portal"}
          </h1>
          <p className="mt-3 text-muted-foreground font-body">
            {theme === "wave" ? "Acquire or deploy vehicles for operations" : "Premium Sales & Rentals"}
          </p>
        </motion.div>

        {/* Supabase sync indicator */}
        {loading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Loader2 size={14} className="animate-spin" /> Syncing vehicle data...
          </div>
        )}
        {error && (
          <div className="mt-4 text-center text-xs text-destructive">
            ⚠ Live sync failed — showing cached data
          </div>
        )}

        {/* Filters */}
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg font-display text-xs uppercase tracking-wider border transition-all duration-300 ${
                filter === f.value
                  ? "bg-primary text-primary-foreground border-primary box-glow"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-lg border border-border bg-card hover:box-glow hover:border-glow transition-all overflow-hidden"
            >
              {/* Image */}
              <div
                className="relative aspect-video bg-muted overflow-hidden cursor-pointer group"
                onClick={() => setGalleryVehicle(v)}
              >
                <img
                  src={theme === "wave" ? v.image_wave : v.image_roots}
                  alt={v.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all flex items-center justify-center">
                  <Eye size={24} className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {theme === "wave" && <div className="absolute inset-0 scanline pointer-events-none opacity-20" />}
                <div className="absolute top-2 left-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-display uppercase tracking-wider ${
                    v.type === "sale" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}>
                    {v.type === "sale" ? <Car size={10} /> : <Key size={10} />}
                    {v.type === "sale" ? "For Sale" : "Rental"}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <span className="font-display text-[9px] uppercase tracking-widest text-muted-foreground">{v.category}</span>
                <h3 className="font-display text-base font-bold text-card-foreground mt-0.5">{v.name}</h3>
                <p className="text-xs text-muted-foreground font-body mt-1">{v.desc}</p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-xl font-black text-primary">${v.price_usd.toLocaleString()}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {v.price_xaf.toLocaleString()} XAF{v.type === "rental" ? "/day" : ""}
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <a
                    href={getWhatsAppUrl(`Hi! I'd like to ${v.type === "sale" ? "buy" : "rent"} the ${v.name} ($${v.price_usd.toLocaleString()}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="hero" size="sm" className="w-full">
                      {v.type === "sale"
                        ? (theme === "wave" ? "Acquire" : "Buy Now")
                        : (theme === "wave" ? "Deploy" : "Rent Now")}
                    </Button>
                  </a>
                  <Button variant="heroOutline" size="sm" onClick={() => setGalleryVehicle(v)}>
                    <Eye size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <EventTicker events={[
            { title: "New Arrivals This Week", date: "Now", type: "notification" },
            { title: "Free Vehicle Inspection Day", date: "Apr 10", type: "event" },
            { title: "Weekend Rental Discount 20%", date: "Ongoing", type: "notification" },
            { title: "Luxury Fleet Expansion", date: "May 2026", type: "event" },
          ]} />
        </div>
      </div>

      <SponsorshipFooter />

      {galleryVehicle && (
        <VehicleGallery vehicle={galleryVehicle} onClose={() => setGalleryVehicle(null)} />
      )}
    </div>
  );
};

export default Automotive;
