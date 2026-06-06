import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/os9hub-logo.jpg.asset.json";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Tech" },
  { to: "/automotive", label: "Automotive" },
  { to: "/dance", label: "Dance" },
  { to: "/careers", label: "Careers" },
  { to: "/pricing", label: "Pricing" },
];

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-7 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-widest text-foreground">
          <span className="relative inline-block">
            <img src={logoAsset.url} alt="OS9 Works & Tech logo" className="h-10 w-10 object-contain rounded-full bg-white p-0.5 shadow-[0_0_10px_hsl(var(--glow)/0.4)]" />
            <svg viewBox="0 0 24 24" className="absolute -bottom-0.5 -right-0.5 h-4 w-4 text-[#1DA1F2] drop-shadow-[0_0_4px_rgba(29,161,242,0.8)]" aria-label="Verified">
              <path fill="currentColor" d="M12 1.5l2.39 2.05 3.13-.34.84 3.04 2.79 1.5-1.06 2.97 1.06 2.97-2.79 1.5-.84 3.04-3.13-.34L12 19.94l-2.39-2.05-3.13.34-.84-3.04L2.85 13.7l1.06-2.97L2.85 7.76l2.79-1.5.84-3.04 3.13.34L12 1.5z"/>
              <path fill="#fff" d="M10.6 14.6l-2.7-2.7 1.1-1.1 1.6 1.6 4-4 1.1 1.1z"/>
            </svg>
          </span>
          <span>OS9<span className="text-primary">HUB</span></span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm uppercase tracking-wider transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary text-glow" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="relative h-8 w-16 rounded-full border border-border bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            <motion.div
              className="absolute top-0.5 h-7 w-7 rounded-full bg-primary"
              animate={{ left: theme === "wave" ? "2px" : "calc(100% - 30px)" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[10px]">⚡</span>
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px]">🌍</span>
          </button>

          {/* Mobile toggle */}
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 font-body text-sm uppercase tracking-wider text-muted-foreground hover:text-primary border-b border-border/50"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};
