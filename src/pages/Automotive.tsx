import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { EventTicker } from "@/components/EventTicker";
import { Car, Key } from "lucide-react";

const vehicles = [
  { id: "v1", name: "Toyota Corolla 2022", type: "sale", price_xaf: 12000000, price_usd: 19200, desc: "Clean title, low mileage, fully serviced" },
  { id: "v2", name: "Mercedes C-Class 2020", type: "sale", price_xaf: 18500000, price_usd: 29600, desc: "Luxury sedan, leather interior, sunroof" },
  { id: "v3", name: "Toyota Hilux 4x4", type: "rental", price_xaf: 75000, price_usd: 120, desc: "Daily rental — perfect for rough terrain" },
  { id: "v4", name: "Honda Civic 2023", type: "rental", price_xaf: 50000, price_usd: 80, desc: "Daily rental — fuel-efficient city cruiser" },
];

const Automotive = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen pt-[calc(1.75rem+6rem)] pb-16">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground text-glow">
            {theme === "wave" ? "// MOTOR VAULT" : "Automotive Portal"}
          </h1>
          <p className="mt-3 text-muted-foreground font-body">
            {theme === "wave" ? "Vehicles for operatives" : "Sales & Rentals"}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {vehicles.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-lg border border-border bg-card hover:box-glow hover:border-glow transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                {v.type === "sale" ? <Car size={16} className="text-primary" /> : <Key size={16} className="text-secondary" />}
                <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                  {v.type === "sale" ? "For Sale" : "Rental"}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground">{v.name}</h3>
              <p className="text-xs text-muted-foreground font-body mt-1">{v.desc}</p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-xl font-black text-primary">${v.price_usd.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">{v.price_xaf.toLocaleString()} XAF{v.type === "rental" ? "/day" : ""}</span>
              </div>
              <a href={getWhatsAppUrl(`Hi! I'm interested in the ${v.name} (${v.type}).`)} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="sm" className="w-full mt-4">
                  {theme === "wave" ? "Inquire" : "Contact Us"}
                </Button>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <EventTicker events={[
            { title: "New Arrivals This Week", date: "Now", type: "notification" },
            { title: "Free Vehicle Inspection Day", date: "Apr 10", type: "event" },
            { title: "Weekend Rental Discount 20%", date: "Ongoing", type: "notification" },
          ]} />
        </div>
      </div>
    </div>
  );
};

export default Automotive;
