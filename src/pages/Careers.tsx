import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { SponsorshipFooter } from "@/components/SponsorshipFooter";
import { Briefcase, Users, GraduationCap } from "lucide-react";

const openings = [
  { type: "internship", title: "Software Development Intern", desc: "3-6 month internship in full-stack development. React, Node.js, Supabase.", location: "Buea / Remote" },
  { type: "internship", title: "Graphic Design Intern", desc: "Work on real client projects — branding, social media, and print.", location: "Douala" },
  { type: "freelance", title: "Freelance Videographer", desc: "Project-based cinematography and editing for events and commercials.", location: "Cameroon-wide" },
  { type: "partnership", title: "Strategic Partner — Dance Events", desc: "Collaborate on large-scale dance events, competitions, and workshops.", location: "Pan-African" },
  { type: "internship", title: "Automotive Sales Intern", desc: "Learn vehicle sales, customer relations, and fleet management.", location: "Douala / Buea" },
  { type: "freelance", title: "Freelance Web Developer", desc: "Build client websites, landing pages, and e-commerce solutions.", location: "Remote" },
];

const typeConfig = {
  internship: { icon: <GraduationCap size={16} />, label: "Internship", color: "text-primary" },
  freelance: { icon: <Briefcase size={16} />, label: "Freelance", color: "text-secondary" },
  partnership: { icon: <Users size={16} />, label: "Partnership", color: "text-accent" },
};

const Careers = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen pt-[calc(1.75rem+6rem)]">
      <div className="container px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground text-glow">
            {theme === "wave" ? "// RECRUIT" : "Join the Team"}
          </h1>
          <p className="mt-3 text-muted-foreground font-body">
            {theme === "wave" ? "We're assembling operatives." : "Internships, freelance & partnerships."}
          </p>
        </motion.div>

        <div className="mt-10 space-y-4">
          {openings.map((o, i) => {
            const cfg = typeConfig[o.type as keyof typeof typeConfig];
            return (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-lg border border-border bg-card hover:box-glow hover:border-glow transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={cfg.color}>{cfg.icon}</span>
                  <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">{cfg.label}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground font-body">{o.location}</span>
                </div>
                <h3 className="font-display text-base font-bold text-card-foreground">{o.title}</h3>
                <p className="text-xs text-muted-foreground font-body mt-1 mb-4">{o.desc}</p>
                <a href={getWhatsAppUrl(`Hi! I'd like to apply for: ${o.title} (${cfg.label})`)} target="_blank" rel="noopener noreferrer">
                  <Button variant="hero" size="sm">
                    {theme === "wave" ? "Apply" : "Submit Interest"}
                  </Button>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>

      <SponsorshipFooter />
    </div>
  );
};

export default Careers;
