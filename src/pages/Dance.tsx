import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { EventTicker } from "@/components/EventTicker";
import { Music, Users, Calendar } from "lucide-react";

const danceServices = [
  { title: "Choreography Creation", desc: "Custom routines for music videos, weddings, events", icon: <Music size={16} /> },
  { title: "Dance Classes", desc: "Afrobeats, Contemporary, Hip-Hop — all levels", icon: <Users size={16} /> },
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

  return (
    <div className="min-h-screen pt-[calc(1.75rem+6rem)] pb-16">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground text-glow">
            {theme === "wave" ? "// MOTION LAB" : "Dance Studio"}
          </h1>
          <p className="mt-3 text-muted-foreground font-body">
            {theme === "wave" ? "Choreograph. Execute. Dominate." : "Movement is culture."}
          </p>
        </motion.div>

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

        {/* Event Ticker Bar */}
        <div className="mt-12">
          <h3 className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-3 text-center">
            {theme === "wave" ? "// UPCOMING OPERATIONS" : "Events & Competitions"}
          </h3>
          <EventTicker events={upcomingEvents} />
        </div>
      </div>
    </div>
  );
};

export default Dance;
