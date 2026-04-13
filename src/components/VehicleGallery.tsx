import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { type Vehicle, buildGallery } from "@/data/vehicles";

interface VehicleGalleryProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const viewLabels = ["Front View", "Rear View", "Interior"];

export const VehicleGallery = ({ vehicle, onClose }: VehicleGalleryProps) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = buildGallery(vehicle, theme as "wave" | "roots");

  const next = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-3xl w-full bg-card border border-border rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button onClick={onClose} className="absolute top-3 right-3 z-10 text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>

          {/* Image */}
          <div className="relative aspect-video bg-muted overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`${vehicle.name} - ${viewLabels[currentIndex]}`}
              className="h-full w-full object-cover"
            />
            {theme === "wave" && <div className="absolute inset-0 scanline pointer-events-none opacity-20" />}

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/60 text-foreground hover:bg-background/80">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/60 text-foreground hover:bg-background/80">
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* View label */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/70 px-3 py-1 rounded text-[10px] font-display uppercase tracking-widest text-foreground">
              {viewLabels[currentIndex] || `View ${currentIndex + 1}`}
            </div>
          </div>

          {/* Info */}
          <div className="p-5">
            <h3 className="font-display text-lg font-bold text-card-foreground">{vehicle.name}</h3>
            <p className="text-xs text-muted-foreground font-body mt-1">{vehicle.desc}</p>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {Object.entries(vehicle.specs).map(([key, val]) => (
                <div key={key} className="p-2 rounded border border-border bg-background text-center">
                  <span className="font-display text-[9px] uppercase tracking-widest text-muted-foreground block">{key}</span>
                  <span className="text-xs text-card-foreground font-body">{val}</span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-[10px] text-muted-foreground font-body text-center italic">
              ✦ Customizable upon Request — Contact us via WhatsApp
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
