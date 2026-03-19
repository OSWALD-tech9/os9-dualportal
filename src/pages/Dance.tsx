import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { EventTicker } from "@/components/EventTicker";
import { SponsorshipFooter } from "@/components/SponsorshipFooter";
import { Music, Users, Calendar, ShoppingBag, Globe, Zap, Drum } from "lucide-react";
import { sanitizeInput, sanitizeOnChange } from "@/lib/sanitize";
import { products } from "@/data/products";
import { Link } from "react-router-dom";

type DanceTab = "modern" | "traditional";

const modernGenres = [
  { name: "Afro-House", desc: "High-energy fusion of house beats and African rhythm" },
  { name: "Afro-Gist", desc: "Viral social dance trends from across the continent" },
  { name: "Contemporary", desc: "Fluid expression blending African and Western techniques" },
  { name: "Hip-Hop", desc: "Street-style choreography with raw, powerful movement" },
  { name: "Krump", desc: "Aggressive, high-intensity freestyle battle dance" },
];

const traditionalGenres = [
  { name: "Coupé Décalé", desc: "Ivorian dance style — sharp, flashy, celebratory" },
  { name: "Mbolé", desc: "Rhythmic Central African movement rooted in ceremony" },
  { name: "Makossa (Makuné)", desc: "Classic Cameroonian groove — smooth and infectious" },
  { name: "Njang", desc: "Traditional Grassfields ceremonial dance" },
  { name: "Bikutsi", desc: "Fast-paced Southern Cameroon rhythm and body percussion" },
];

const trainingDays = ["Monday", "Wednesday", "Friday", "Saturday"];
const rehearsalSlots = ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM", "5:00 PM - 7:00 PM"];

const danceServices = [
  { title: "Choreography Creation", desc: "Custom routines for music videos, weddings, events", icon: <Music size={16} /> },
  { title: "Dance Classes", desc: "All genres — beginners to advanced", icon: <Users size={16} /> },
  { title: "Event Booking", desc: "Book dancers for your event, concert, or commercial", icon: <Calendar size={16} /> },
];

const upcomingEvents = [
  { title: "Afrobeats Dance Battle", date: "Apr 12", type: "competition" as const },
  { title: "Open Dance Workshop — Free", date: "Apr 18", type: "event" as const },
  { title: "OS9 Dance Showcase Night", date: "May 3", type: "event" as const },
  { title: "National Dance Competition", date: "May 20", type: "competition" as const },
  { title: "Kids Dance Camp Registration", date: "Jun 1", type: "notification" as const },
];

const Dance = () => {
  const { theme } = useTheme();
  const [tab, setTab] = useState<DanceTab>("modern");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [international, setInternational] = useState(false);
  const [bookingName, setBookingName] = useState("");

  const apparel = products.filter((p) => p.category === "heritage-apparel");
  const genres = tab === "modern" ? modernGenres : traditionalGenres;

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]);
  };

  const buildBookingMessage = () => {
    const parts = [
      `Hi! I'd like to book dance training.`,
      `Name: ${bookingName || "N/A"}`,
      `Style: ${tab === "modern" ? "Modern" : "Traditional"}`,
      `Genre: ${selectedGenre || "Any"}`,
      `Days: ${selectedDays.length ? selectedDays.join(", ") : "Flexible"}`,
      `Slot: ${selectedSlot || "Flexible"}`,
      international ? "International booking: Yes" : "",
    ].filter(Boolean);
    return parts.join("\n");
  };

  return (
    <div className="min-h-screen pt-[calc(1.75rem+6rem)]">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground text-glow">
            {theme === "wave" ? "// MOTION LAB" : "Dance Studio"}
          </h1>
          <p className="mt-3 text-muted-foreground font-body">
            {theme === "wave" ? "Choreograph. Execute. Dominate." : "Movement is culture."}
          </p>
        </motion.div>

        {/* Services */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {danceServices.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-lg border border-border bg-card hover:box-glow hover:border-glow transition-all text-center"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                {s.icon}
              </div>
              <h3 className="font-display text-sm uppercase tracking-wider text-card-foreground">{s.title}</h3>
              <p className="text-xs text-muted-foreground font-body mt-2 mb-4">{s.desc}</p>
              <a href={getWhatsAppUrl(`Hi! I'd like to book: ${s.title}`)} target="_blank" rel="noopener noreferrer">
                <Button variant="heroOutline" size="sm" className="w-full">
                  {theme === "wave" ? "Book Now" : "Inquire"}
                </Button>
              </a>
            </motion.div>
          ))}
        </div>

        {/* === BIFURCATED GENRE SECTION === */}
        <div className="mt-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground text-glow">
              {theme === "wave" ? "// SELECT PROTOCOL" : "Choose Your Style"}
            </h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => { setTab("modern"); setSelectedGenre(null); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-display text-xs uppercase tracking-wider border transition-all duration-300 ${
                tab === "modern"
                  ? "bg-primary text-primary-foreground border-primary box-glow"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              <Zap size={14} />
              {theme === "wave" ? "Modern Ops" : "Modern"}
            </button>
            <button
              onClick={() => { setTab("traditional"); setSelectedGenre(null); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-display text-xs uppercase tracking-wider border transition-all duration-300 ${
                tab === "traditional"
                  ? "bg-primary text-primary-foreground border-primary box-glow"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              <Drum size={14} />
              {theme === "wave" ? "Legacy Moves" : "Traditional"}
            </button>
          </div>

          {/* Genre Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {genres.map((g, i) => (
              <motion.button
                key={g.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelectedGenre(selectedGenre === g.name ? null : g.name)}
                className={`text-left p-5 rounded-lg border transition-all duration-300 ${
                  selectedGenre === g.name
                    ? "border-primary bg-primary/10 box-glow"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <h4 className="font-display text-sm font-bold text-card-foreground">{g.name}</h4>
                <p className="text-xs text-muted-foreground font-body mt-1">{g.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* === BOOKING FORM === */}
        <div className="mt-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="max-w-2xl mx-auto p-6 rounded-lg border border-border bg-card">
              <h3 className="font-display text-lg font-bold text-card-foreground text-glow mb-4 text-center">
                {theme === "wave" ? "// DEPLOY TRAINING" : "Book a Session"}
              </h3>

              {/* Name */}
              <div className="mb-4">
                <label className="block font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Your Name</label>
                <Input
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-background"
                />
              </div>

              {/* Training Days */}
              <div className="mb-4">
                <label className="block font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Training Days</label>
                <div className="flex flex-wrap gap-2">
                  {trainingDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded text-xs font-display uppercase tracking-wider border transition-all ${
                        selectedDays.includes(day)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rehearsal Slots */}
              <div className="mb-4">
                <label className="block font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Rehearsal Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {rehearsalSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(selectedSlot === slot ? null : slot)}
                      className={`px-3 py-2 rounded text-xs font-body border transition-all ${
                        selectedSlot === slot
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* International Toggle */}
              <div className="mb-6 flex items-center gap-3">
                <button
                  onClick={() => setInternational(!international)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-display uppercase tracking-wider border transition-all ${
                    international
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "bg-transparent text-muted-foreground border-border hover:border-secondary/50"
                  }`}
                >
                  <Globe size={14} />
                  International Booking
                </button>
              </div>

              {/* Submit */}
              <a
                href={getWhatsAppUrl(buildBookingMessage())}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="hero" size="lg" className="w-full">
                  {theme === "wave" ? "Deploy Request" : "Book via WhatsApp"}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Apparel Section */}
        <div className="mt-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShoppingBag size={18} className="text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground text-glow">
                {theme === "wave" ? "// STEALTH APPAREL" : "Heritage Apparel"}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground font-body">
              {theme === "wave" ? "Gear up for the field" : "Traditional meets modern — Toghu & Ndop collection"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apparel.map((product, i) => {
              const image = theme === "wave" ? product.image_wave : product.image_roots;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/product/${product.id}`} className="group block">
                    <div className="rounded-lg border border-border bg-card hover:box-glow hover:border-glow transition-all overflow-hidden">
                      <div className="aspect-square bg-muted relative overflow-hidden">
                        <img src={image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-display text-xs uppercase tracking-widest">🌍 HERITAGE</div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-card-foreground">{product.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2 font-body">{product.description}</p>
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="font-display text-lg font-bold text-primary">${product.price_usd}</span>
                          <span className="text-xs text-muted-foreground">{product.price_xaf.toLocaleString()} XAF</span>
                        </div>
                        <p className="mt-1 text-[10px] text-muted-foreground italic font-body">✦ Customizable upon Request</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Event Ticker */}
        <div className="mt-12">
          <h3 className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-3 text-center">
            {theme === "wave" ? "// UPCOMING OPERATIONS" : "Events & Competitions"}
          </h3>
          <EventTicker events={upcomingEvents} />
        </div>
      </div>

      <SponsorshipFooter />
    </div>
  );
};

export default Dance;
