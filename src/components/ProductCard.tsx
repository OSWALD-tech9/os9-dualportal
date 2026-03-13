import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { theme } = useTheme();
  const image = theme === "wave" ? product.image_wave : product.image_roots;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:box-glow hover:border-glow">
          {/* Image placeholder */}
          <div className="aspect-square bg-muted relative overflow-hidden">
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-display text-xs uppercase tracking-widest">
              {product.category === "spy-tech" ? "⚡ SPY-TECH" : "🌍 HERITAGE"}
            </div>
            {product.featured && (
              <div className="absolute top-3 right-3 bg-primary px-2 py-0.5 rounded text-[10px] font-display uppercase tracking-wider text-primary-foreground">
                Featured
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-card-foreground">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2 font-body">
              {product.description}
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-lg font-bold text-primary">${product.price_usd}</span>
              <span className="text-xs text-muted-foreground">{product.price_xaf.toLocaleString()} XAF</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
