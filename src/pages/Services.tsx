import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { EventTicker } from "@/components/EventTicker";
import { SponsorshipFooter } from "@/components/SponsorshipFooter";
import { useSupabaseServices, type SupabaseService } from "@/hooks/use-supabase-data";
import { Monitor, Film, Camera, Code, Wrench, GraduationCap, Palette, ShoppingBag, Loader2 } from "lucide-react";
import { products } from "@/data/products";
import { Link } from "react-router-dom";

interface ServiceItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  whatsapp_link?: string;
  image_wave?: string;
  image_roots?: string;
}

// Local fallback services
const localServices: { category: string; icon: React.ReactNode; items: ServiceItem[] }[] = [
  {
    category: "Creative",
    icon: <Palette size={20} />,
    items: [
      { title: "Graphic Design", desc: "Brand identity, posters, social media visuals", icon: <Palette size={16} />, image_wave: "/images/services/graphic-design-wave.jpg", image_roots: "/images/services/graphic-design-roots.jpg" },
      { title: "Video Editing", desc: "Professional post-production and color grading", icon: <Film size={16} /> },
      { title: "Cinematography", desc: "High-end shooting for commercials and events", icon: <Camera size={16} /> },
    ],
  },
  {
    category: "Engineering",
    icon: <Code size={20} />,
    items: [
      { title: "App Development", desc: "Mobile and web applications built to spec", icon: <Monitor size={16} />, image_wave: "/images/services/webdev-wave.jpg", image_roots: "/images/services/webdev-roots.jpg" },
      { title: "Full-Stack Engineering", desc: "End-to-end product development", icon: <Code size={16} />, image_wave: "/images/services/fullstack-wave.jpg", image_roots: "/images/services/fullstack-roots.jpg" },
      { title: "Maintenance & Updates", desc: "OS updates, troubleshooting, optimization", icon: <Wrench size={16} />, image_wave: "/images/services/maintenance-wave.jpg", image_roots: "/images/services/maintenance-roots.jpg" },
    ],
  },
  {
    category: "Academic & Consultancy",
    icon: <GraduationCap size={20} />,
    items: [
      { title: "School Projects", desc: "IT dissertations, research assistance, lab reports", icon: <GraduationCap size={16} /> },
      { title: "Personal Projects", desc: "Custom builds, automation, personal websites", icon: <Monitor size={16} /> },
    ],
  },
];

const iconMap: Record<string, React.ReactNode> = {
  creative: <Palette size={16} />,
  engineering: <Code size={16} />,
  academic: <GraduationCap size={16} />,
};

/** Merge Supabase services into category groups */
const buildServiceGroups = (remote: SupabaseService[]) => {
  if (remote.length === 0) return localServices;

  const grouped = new Map<string, ServiceItem[]>();
  remote.forEach((s) => {
    const cat = s.category || "Other";
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push({
      title: s.tittle, // DB column has typo
      desc: s.description || "",
      icon: iconMap[cat.toLowerCase()] || <Monitor size={16} />,
      whatsapp_link: s.whatsapp_link,
    });
  });

  // If we got remote data, build groups from it
  const groups = Array.from(grouped.entries()).map(([category, items]) => ({
    category,
    icon: iconMap[category.toLowerCase()] || <Monitor size={20} />,
    items,
  }));

  return groups.length > 0 ? groups : localServices;
};

const bootcampEvents = [
  { title: "Python Bootcamp — Beginners", date: "Apr 5", type: "bootcamp" as const },
  { title: "React Hackathon 2026", date: "Apr 20", type: "competition" as const },
  { title: "UI/UX Design Sprint", date: "May 1", type: "bootcamp" as const },
  { title: "OS9 Coding Challenge", date: "May 15", type: "competition" as const },
  { title: "Free Web Dev Workshop", date: "Jun 2", type: "event" as const },
];

const Services = () => {
  const { theme } = useTheme();
  const { data: remoteServices, loading, error } = useSupabaseServices();
  const spyTech = products.filter((p) => p.category === "spy-tech");

  const services = buildServiceGroups(remoteServices);

  return (
    <div className="min-h-screen pt-[calc(1.75rem+6rem)]">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground text-glow">
            {theme === "wave" ? "// TECH SUITE" : "Tech & Computing"}
          </h1>
          <p className="mt-3 text-muted-foreground font-body">
            {theme === "wave" ? "Deploy your vision. We build the stack." : "From creation to maintenance."}
          </p>
        </motion.div>

        {/* Sync status */}
        {loading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Loader2 size={14} className="animate-spin" /> Syncing services...
          </div>
        )}
        {error && (
          <div className="mt-4 text-center text-xs text-destructive">
            ⚠ Live sync failed — showing cached data
          </div>
        )}

        {/* Services */}
        <div className="mt-12 space-y-12">
          {services.map((cat, ci) => (
            <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.1 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary">{cat.icon}</span>
                <h2 className="font-display text-xl font-bold text-foreground">{cat.category}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item) => {
                  const img = theme === "wave" ? item.image_wave : item.image_roots;
                  const whatsappUrl = item.whatsapp_link || getWhatsAppUrl(`Hi! I'm interested in your ${item.title} service.`);
                  return (
                    <div key={item.title} className="rounded-lg border border-border bg-card hover:box-glow hover:border-glow transition-all overflow-hidden">
                      {img && (
                        <div className="aspect-video bg-muted relative overflow-hidden">
                          <img src={img} alt={item.title} loading="lazy" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          {theme === "wave" && <div className="absolute inset-0 scanline pointer-events-none opacity-20" />}
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-primary mb-2">{item.icon}
                          <h3 className="font-display text-sm uppercase tracking-wider text-card-foreground">{item.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground font-body mb-4">{item.desc}</p>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="heroOutline" size="sm" className="w-full">
                            {theme === "wave" ? "Inquire" : "Get in Touch"}
                          </Button>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spy-Tech Products */}
        <div className="mt-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShoppingBag size={18} className="text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground text-glow">
                {theme === "wave" ? "// SPY-TECH ARSENAL" : "Tech Hardware"}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground font-body">
              {theme === "wave" ? "Classified equipment for operatives" : "Smart devices & wearable tech"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spyTech.map((product, i) => {
              const image = theme === "wave" ? product.image_wave : product.image_roots;
              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/product/${product.id}`} className="group block">
                    <div className="rounded-lg border border-border bg-card hover:box-glow hover:border-glow transition-all overflow-hidden">
                      <div className="aspect-square bg-muted relative overflow-hidden">
                        <img src={image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-display text-xs uppercase tracking-widest">⚡ SPY-TECH</div>
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

        {/* Bootcamp Ticker */}
        <div className="mt-12">
          <h3 className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-3 text-center">
            {theme === "wave" ? "// INCOMING TRANSMISSIONS" : "Upcoming Events"}
          </h3>
          <EventTicker events={bootcampEvents} />
        </div>
      </div>

      <SponsorshipFooter />
    </div>
  );
};

export default Services;
