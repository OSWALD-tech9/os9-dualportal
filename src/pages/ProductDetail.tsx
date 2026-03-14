import { useParams, Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const ProductDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-foreground">Product not found</h1>
          <Link to="/shop" className="text-primary mt-4 inline-block hover:underline">
            ← Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const image = theme === "wave" ? product.image_wave : product.image_roots;

  return (
    <div className="min-h-screen pt-[calc(1.75rem+6rem)] pb-16">
      <div className="container px-4">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm mb-8"
        >
          <ArrowLeft size={16} /> Back to{" "}
          {theme === "wave" ? "Arsenal" : "Collection"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-lg overflow-hidden border border-border bg-card"
          >
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-display text-sm uppercase tracking-widest">
              {product.name}
            </div>
            {theme === "wave" && <div className="absolute inset-0 scanline pointer-events-none opacity-30" />}
            {theme === "roots" && <div className="absolute inset-0 toghu-pattern pointer-events-none opacity-20" />}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {product.category === "spy-tech" ? "⚡ Spy-Tech Division" : "🌍 Heritage Collection"}
            </span>
            <h1 className="mt-2 font-display text-3xl md:text-4xl font-black text-foreground text-glow">
              {product.name}
            </h1>
            <p className="mt-4 font-body text-base text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-8 p-6 rounded-lg border border-border bg-surface-elevated">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-3xl font-black text-primary text-glow">
                  ${product.price_usd}
                </span>
                <span className="font-body text-sm text-muted-foreground">
                  {product.price_xaf.toLocaleString()} XAF
                </span>
              </div>
              <div className="mt-4 flex gap-3">
                <a href={getWhatsAppUrl(`Hi! I'd like to buy: ${product.name} ($${product.price_usd} / ${product.price_xaf.toLocaleString()} XAF)`)} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="hero" size="lg" className="w-full gap-2">
                    <ShoppingCart size={18} />
                    {theme === "wave" ? "Buy Now" : "Purchase"}
                  </Button>
                </a>
              </div>
            </div>

            {/* Specs */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: "Status", value: "In Stock" },
                { label: "SKU", value: `OS9-${product.id.padStart(4, "0")}` },
                { label: "Clearance", value: theme === "wave" ? "Level 5" : "Ancestral" },
                { label: "Origin", value: "Cameroon 🇨🇲" },
              ].map((spec) => (
                <div key={spec.label} className="p-3 rounded border border-border bg-card">
                  <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground block">
                    {spec.label}
                  </span>
                  <span className="font-body text-sm text-card-foreground mt-0.5 block">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
