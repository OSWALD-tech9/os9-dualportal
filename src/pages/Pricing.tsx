import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const Pricing = () => {
  const { theme } = useTheme();
  const [currency, setCurrency] = useState<"usd" | "xaf">("usd");

  const plans = [
    {
      name: theme === "wave" ? "Recon" : "Seedling",
      price_usd: 0,
      price_xaf: 0,
      features: ["Browse the catalog", "Standard shipping", "Community access"],
      cta: "Get Started",
      featured: false,
    },
    {
      name: theme === "wave" ? "Operative" : "Elder",
      price_usd: 29,
      price_xaf: 18000,
      features: ["Early access drops", "Priority shipping", "Exclusive colorways", "Member pricing (15% off)"],
      cta: theme === "wave" ? "Go Covert" : "Join the Circle",
      featured: true,
    },
    {
      name: theme === "wave" ? "Ghost Protocol" : "Ancestor",
      price_usd: 99,
      price_xaf: 60000,
      features: ["All Operative perks", "1-on-1 styling", "Custom Toghu embroidery", "Lifetime warranty", "VIP events"],
      cta: theme === "wave" ? "Activate" : "Ascend",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen pt-[calc(1.75rem+6rem)] pb-16">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground text-glow">
            {theme === "wave" ? "// ACCESS TIERS" : "Membership Tiers"}
          </h1>
          <p className="mt-3 text-muted-foreground font-body">
            {theme === "wave" ? "Select your clearance level" : "Choose your path"}
          </p>

          {/* Currency Toggle */}
          <div className="mt-6 inline-flex rounded-lg border border-border overflow-hidden">
            {(["usd", "xaf"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-4 py-2 font-display text-xs uppercase tracking-wider transition-all ${
                  currency === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {c === "usd" ? "$ USD" : "XAF CFA"}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-lg border p-6 flex flex-col ${
                plan.featured
                  ? "border-primary box-glow bg-card scale-105"
                  : "border-border bg-card"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-0.5 rounded font-display text-[10px] uppercase tracking-widest">
                  {theme === "wave" ? "Recommended" : "Most Popular"}
                </div>
              )}
              <h3 className="font-display text-lg font-bold text-card-foreground">{plan.name}</h3>
              <div className="mt-4">
                <span className="font-display text-4xl font-black text-primary text-glow">
                  {currency === "usd"
                    ? `$${plan.price_usd}`
                    : `${plan.price_xaf.toLocaleString()}`}
                </span>
                <span className="text-muted-foreground font-body text-sm ml-1">
                  {currency === "xaf" ? "XAF" : ""}/mo
                </span>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={getWhatsAppUrl(`Hi! I'm interested in the ${plan.name} plan (${currency === "usd" ? `$${plan.price_usd}` : `${plan.price_xaf.toLocaleString()} XAF`}/mo)`)} target="_blank" rel="noopener noreferrer">
                <Button
                  variant={plan.featured ? "hero" : "heroOutline"}
                  className="mt-6 w-full"
                >
                  {plan.cta}
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
