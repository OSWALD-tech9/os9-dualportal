import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { CalendarDays, Zap } from "lucide-react";

interface TickerEvent {
  title: string;
  date: string;
  type: "event" | "competition" | "bootcamp" | "notification";
}

interface EventTickerProps {
  events: TickerEvent[];
}

const typeIcon: Record<TickerEvent["type"], string> = {
  event: "🎭",
  competition: "🏆",
  bootcamp: "💻",
  notification: "📢",
};

export const EventTicker = ({ events }: EventTickerProps) => {
  const { theme } = useTheme();
  const doubled = [...events, ...events];

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card/80 backdrop-blur-sm py-2">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: [0, -(events.length * 300)] }}
        transition={{ duration: events.length * 6, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((e, i) => (
          <span
            key={`${e.title}-${i}`}
            className="inline-flex items-center gap-2 px-6 font-body text-xs text-muted-foreground"
          >
            <span>{typeIcon[e.type]}</span>
            <span className="font-display text-[10px] uppercase tracking-wider text-foreground">
              {e.title}
            </span>
            <span className="text-primary text-[10px]">{e.date}</span>
            <span className="text-border">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};
