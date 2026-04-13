import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

interface CityWeather {
  city: string;
  country: string;
  temp: number;
  condition: string;
  icon: string;
  timezone: string; // IANA timezone
}

const weatherData: CityWeather[] = [
  { city: "Buea", country: "🇨🇲", temp: 22, condition: "Partly Cloudy", icon: "⛅", timezone: "Africa/Douala" },
  { city: "Douala", country: "🇨🇲", temp: 31, condition: "Humid", icon: "🌤️", timezone: "Africa/Douala" },
  { city: "Yaoundé", country: "🇨🇲", temp: 27, condition: "Sunny", icon: "☀️", timezone: "Africa/Douala" },
  { city: "Lagos", country: "🇳🇬", temp: 30, condition: "Overcast", icon: "🌥️", timezone: "Africa/Lagos" },
  { city: "Nairobi", country: "🇰🇪", temp: 19, condition: "Cool", icon: "🌤️", timezone: "Africa/Nairobi" },
  { city: "London", country: "🇬🇧", temp: 12, condition: "Rainy", icon: "🌧️", timezone: "Europe/London" },
  { city: "New York", country: "🇺🇸", temp: 8, condition: "Clear", icon: "☀️", timezone: "America/New_York" },
  { city: "Tokyo", country: "🇯🇵", temp: 15, condition: "Cloudy", icon: "☁️", timezone: "Asia/Tokyo" },
  { city: "São Paulo", country: "🇧🇷", temp: 25, condition: "Warm", icon: "🌤️", timezone: "America/Sao_Paulo" },
  { city: "Sydney", country: "🇦🇺", temp: 20, condition: "Breezy", icon: "🌬️", timezone: "Australia/Sydney" },
];

const getLocalTime = (timezone: string): string => {
  try {
    return new Date().toLocaleTimeString("en-GB", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "--:--";
  }
};

export const WeatherTicker = () => {
  const { theme } = useTheme();
  const [times, setTimes] = useState<Record<string, string>>({});
  const doubled = [...weatherData, ...weatherData];

  useEffect(() => {
    const update = () => {
      const t: Record<string, string> = {};
      weatherData.forEach((w) => {
        t[w.city] = getLocalTime(w.timezone);
      });
      setTimes(t);
    };
    update();
    const iv = setInterval(update, 30_000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-7 overflow-hidden border-b border-border/50 bg-card/90 backdrop-blur-md">
      <motion.div
        className="flex items-center h-full whitespace-nowrap"
        animate={{ x: [0, -(weatherData.length * 220)] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((w, i) => (
          <span
            key={`${w.city}-${i}`}
            className="inline-flex items-center gap-1.5 px-4 font-body text-[10px] uppercase tracking-wider text-muted-foreground"
          >
            <span className="text-sm not-sr-only">{w.country}</span>
            <span>{w.icon}</span>
            <span className="text-foreground font-display">{w.city}</span>
            <span>{w.temp}°C</span>
            <span className="text-primary font-display">{times[w.city] || "--:--"}</span>
            <span className="text-muted-foreground/60">|</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};
