import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen pt-[calc(1.75rem+4rem)]">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 scanline pointer-events-none" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

        {/* Grid overlay for Wave */}
        {theme === "wave" && (
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "linear-gradient(hsl(var(--glow) / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--glow) / 0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        )}

        {/* Toghu pattern for Roots */}
        {theme === "roots" && <div className="absolute inset-0 toghu-pattern opacity-30" />}

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
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
              <Link to="/shop">
                <Button variant="hero" size="lg">
                  Enter the {theme === "wave" ? "Grid" : "Village"}
                </Button>
              </Link>
              <a href={getWhatsAppUrl("Hello OS9 Hub! I'd like to inquire about your products.")} target="_blank" rel="noopener noreferrer">
                <Button variant="heroOutline" size="lg">
                  {theme === "wave" ? "Contact HQ" : "Inquire Now"}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Decorative floating elements */}
        <motion.div
          className="absolute bottom-20 left-10 h-2 w-2 rounded-full bg-primary animate-float opacity-60"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 h-3 w-3 rounded-full bg-secondary animate-float opacity-40"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-glow">
              {theme === "wave" ? "// FEATURED INTEL" : "Sacred Selections"}
            </h2>
            <div className="mt-4 mx-auto w-20 h-0.5 bg-primary" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button variant="heroOutline" size="lg">
                View All Products
              </Button>
            </Link>
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

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-sm text-muted-foreground tracking-widest">
            OS9HUB © 2026
          </span>
          <div className="flex gap-6">
            {["Shop", "Pricing", "Dashboard"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors font-body"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
