import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { SponsorshipFooter } from "@/components/SponsorshipFooter";
import { Monitor, Car, Music, Briefcase, CreditCard } from "lucide-react";

const sectors = [
  {
    to: "/services",
    icon: <Monitor size={28} />,
    title_wave: "Tech Suite",
    title_roots: "Tech & Computing",
    desc_wave: "Engineering. Creative. Classified tech.",
    desc_roots: "App dev, design, and smart hardware.",
  },
  {
    to: "/automotive",
    icon: <Car size={28} />,
    title_wave: "Motor Vault",
    title_roots: "Automotive",
    desc_wave: "Acquire or deploy vehicles.",
    desc_roots: "Premium sales & daily rentals.",
  },
  {
    to: "/dance",
    icon: <Music size={28} />,
    title_wave: "Motion Lab",
    title_roots: "Dance Studio",
    desc_wave: "Choreography. Apparel. Domination.",
    desc_roots: "Classes, events & heritage apparel.",
  },
  {
    to: "/careers",
    icon: <Briefcase size={28} />,
    title_wave: "Recruit",
    title_roots: "Human Capital",
    desc_wave: "Assembling operatives.",
    desc_roots: "Internships, freelance & partnerships.",
  },
  {
    to: "/pricing",
    icon: <CreditCard size={28} />,
    title_wave: "Clearance Tiers",
    title_roots: "Pricing",
    desc_wave: "Access levels unlocked.",
    desc_roots: "Transparent service pricing.",
  },
];

const Index = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen pt-[calc(1.75rem+4rem)]">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 scanline pointer-events-none" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

        {theme === "wave" && (
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "linear-gradient(hsl(var(--glow) / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--glow) / 0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        )}
        {theme === "roots" && <div className="absolute inset-0 toghu-pattern opacity-30" />}

        <div className="container relative z-10 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {theme === "wave" ? "[ SYSTEM ONLINE ]" : "— From the Motherland —"}
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-foreground text-glow-strong leading-tight">
              OS9
              <span className="gradient-text block mt-2">
                {theme === "wave" ? "THE WAVE" : "THE ROOTS"}
              </span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto font-body text-base text-muted-foreground leading-relaxed">
              {theme === "wave"
                ? "Covert technology. Encrypted lifestyle. The future is classified."
                : "Heritage redefined. Culture encoded. The ancestors are watching."}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={getWhatsAppUrl("Hello OS9 Hub! I'd like to learn more about your services.")} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg">
                  {theme === "wave" ? "Contact HQ" : "Inquire Now"}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-20 left-10 h-2 w-2 rounded-full bg-primary animate-float opacity-60" animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.div className="absolute top-40 right-20 h-3 w-3 rounded-full bg-secondary animate-float opacity-40" animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
      </section>

      {/* Sector Gateway */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-glow">
              {theme === "wave" ? "// SELECT DIVISION" : "Our Sectors"}
            </h2>
            <div className="mt-4 mx-auto w-20 h-0.5 bg-primary" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.to}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={sector.to} className="group block">
                  <div className="p-6 rounded-lg border border-border bg-card hover:box-glow hover:border-glow transition-all duration-500 text-center h-full">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                      {sector.icon}
                    </div>
                    <h3 className="font-display text-lg font-bold text-card-foreground">
                      {theme === "wave" ? sector.title_wave : sector.title_roots}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground font-body">
                      {theme === "wave" ? sector.desc_wave : sector.desc_roots}
                    </p>
                    <div className="mt-4 font-display text-[10px] uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      {theme === "wave" ? "Enter →" : "Explore →"}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 border-t border-b border-border bg-surface-elevated">
        <div className="container px-4 text-center">
          <h3 className="font-display text-2xl font-bold text-foreground">
            {theme === "wave" ? "DECRYPT YOUR POTENTIAL" : "Honor the Legacy"}
          </h3>
          <p className="mt-3 text-muted-foreground font-body max-w-md mx-auto">
            {theme === "wave"
              ? "Access level: Classified. Your clearance awaits."
              : "Every thread tells a story. Every pattern holds a secret."}
          </p>
        </div>
      </section>

      <SponsorshipFooter />
    </div>
  );
};

export default Index;
