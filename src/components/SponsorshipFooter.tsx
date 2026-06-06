import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/os9hub-logo.jpg.asset.json";

const sponsorLevels = [
  {
    tier: "Platinum",
    price: "$5,000+",
    perks: "Logo on all pages, event naming rights, VIP access",
    color: "from-primary to-secondary",
  },
  {
    tier: "Gold",
    price: "$2,000+",
    perks: "Logo on homepage, social media features, event tickets",
    color: "from-secondary to-accent",
  },
  {
    tier: "Silver",
    price: "$500+",
    perks: "Footer listing, newsletter mention, community badge",
    color: "from-muted-foreground to-primary",
  },
];

const sectorLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Tech & Computing" },
  { to: "/automotive", label: "Automotive" },
  { to: "/dance", label: "Dance Studio" },
  { to: "/careers", label: "Human Capital" },
  { to: "/pricing", label: "Pricing" },
];

export const SponsorshipFooter = () => {
  const { theme } = useTheme();

  return (
    <footer className="border-t border-border mt-16">
      {/* Sponsorship Board */}
      <div className="py-12 bg-surface-elevated">
        <div className="container px-4">
          <h3 className="font-display text-center text-lg font-bold text-foreground text-glow mb-2">
            {theme === "wave" ? "// ALLIANCE BOARD" : "Sponsorship Levels"}
          </h3>
          <p className="text-center text-xs text-muted-foreground font-body mb-8">
            {theme === "wave" ? "Back the mission. Gain clearance." : "Support culture. Build legacy."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {sponsorLevels.map((s) => (
              <div
                key={s.tier}
                className="p-5 rounded-lg border border-border bg-card hover:box-glow hover:border-glow transition-all text-center"
              >
                <span className={`font-display text-sm font-black uppercase tracking-widest gradient-text`}>
                  {s.tier}
                </span>
                <div className="font-display text-2xl font-bold text-primary mt-2">{s.price}</div>
                <p className="text-xs text-muted-foreground font-body mt-2 mb-4">{s.perks}</p>
                <a
                  href={getWhatsAppUrl(`Hi! I'm interested in ${s.tier} sponsorship.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="heroOutline" size="sm" className="w-full">
                    {theme === "wave" ? "Join Alliance" : "Become Sponsor"}
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation & Certification */}
      <div className="py-8 border-t border-border">
        <div className="container px-4">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {sectorLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors font-body"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Certification Notice */}
          <div className="text-center border border-border rounded-lg p-4 max-w-xl mx-auto bg-card mb-6">
            <p className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {theme === "wave" ? "// CLEARANCE STATUS" : "Accreditation"}
            </p>
            <p className="text-xs text-muted-foreground font-body mt-1">
              Pending Authorization / Certification from the{" "}
              <span className="text-foreground font-semibold">University of Buea</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img
              src={logoAsset.url}
              alt="OS9 Works & Tech logo"
              className="h-12 w-12 object-contain rounded-full bg-white p-0.5 shadow-[0_0_10px_hsl(var(--glow)/0.3)]"
            />
            <span className="font-display text-sm text-muted-foreground tracking-widest">
              OS9<span className="text-primary">HUB</span> © 2026
            </span>
            <span className="text-[10px] text-muted-foreground font-body">
              Buea, Cameroon 🇨🇲 — {theme === "wave" ? "All systems operational" : "Rooted in culture"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
