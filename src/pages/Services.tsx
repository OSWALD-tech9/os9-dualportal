import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { EventTicker } from "@/components/EventTicker";
import { Monitor, Film, Camera, Code, Wrench, GraduationCap, Palette } from "lucide-react";

const services = [
  {
    category: "Creative",
    icon: <Palette size={20} />,
    items: [
      { title: "Graphic Design", desc: "Brand identity, posters, social media visuals", icon: <Palette size={16} /> },
      { title: "Video Editing", desc: "Professional post-production and color grading", icon: <Film size={16} /> },
      { title: "Cinematography", desc: "High-end shooting for commercials and events", icon: <Camera size={16} /> },
    ],
  },
  {
    category: "Engineering",
    icon: <Code size={20} />,
    items: [
      { title: "App Development", desc: "Mobile and web applications built to spec", icon: <Monitor size={16} /> },
      { title: "Full-Stack Engineering", desc: "End-to-end product development", icon: <Code size={16} /> },
      { title: "Maintenance & Updates", desc: "OS updates, troubleshooting, optimization", icon: <Wrench size={16} /> },
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

const bootcampEvents = [
  { title: "Python Bootcamp — Beginners", date: "Apr 5", type: "bootcamp" as const },
  { title: "React Hackathon 2026", date: "Apr 20", type: "competition" as const },
  { title: "UI/UX Design Sprint", date: "May 1", type: "bootcamp" as const },
  { title: "OS9 Coding Challenge", date: "May 15", type: "competition" as const },
  { title: "Free Web Dev Workshop", date: "Jun 2", type: "event" as const },
];

const Services = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen pt-[calc(1.75rem+6rem)] pb-16">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground text-glow">
            {theme === "wave" ? "// TECH SUITE" : "Tech & Computing"}
          </h1>
          <p className="mt-3 text-muted-foreground font-body">
            {theme === "wave" ? "Deploy your vision. We build the stack." : "From creation to maintenance."}
          </p>
        </motion.div>

        <div className="mt-12 space-y-12">
          {services.map((cat, ci) => (
            <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.1 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary">{cat.icon}</span>
                <h2 className="font-display text-xl font-bold text-foreground">{cat.category}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, i) => (
                  <div key={item.title} className="p-5 rounded-lg border border-border bg-card hover:box-glow hover:border-glow transition-all duration-300">
                    <div className="flex items-center gap-2 text-primary mb-2">{item.icon}
                      <h3 className="font-display text-sm uppercase tracking-wider text-card-foreground">{item.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground font-body mb-4">{item.desc}</p>
                    <a href={getWhatsAppUrl(`Hi! I'm interested in your ${item.title} service.`)} target="_blank" rel="noopener noreferrer">
                      <Button variant="heroOutline" size="sm" className="w-full">
                        {theme === "wave" ? "Inquire" : "Get in Touch"}
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bootcamp/Competition Ticker */}
        <div className="mt-12">
          <h3 className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-3 text-center">
            {theme === "wave" ? "// INCOMING TRANSMISSIONS" : "Upcoming Events"}
          </h3>
          <EventTicker events={bootcampEvents} />
        </div>
      </div>
    </div>
  );
};

export default Services;
