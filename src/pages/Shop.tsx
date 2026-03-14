import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { products, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

type Filter = "all" | "spy-tech" | "heritage-apparel";

const Shop = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "spy-tech", label: theme === "wave" ? "⚡ Spy-Tech" : "⚡ Technology" },
    { value: "heritage-apparel", label: theme === "wave" ? "🌍 Heritage" : "🌍 Apparel" },
  ];

  return (
    <div className="min-h-screen pt-[calc(1.75rem+6rem)] pb-16">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground text-glow text-center">
            {theme === "wave" ? "// ARSENAL" : "The Collection"}
          </h1>
          <p className="mt-3 text-center text-muted-foreground font-body">
            {theme === "wave" ? "Select your loadout" : "Curated with intention"}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mt-10 flex justify-center gap-3 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg font-display text-xs uppercase tracking-wider border transition-all duration-300 ${
                filter === f.value
                  ? "bg-primary text-primary-foreground border-primary box-glow"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
