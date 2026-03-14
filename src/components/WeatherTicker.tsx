import { useTheme } from "@/contexts/ThemeContext";
import { CloudSun, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

interface CityWeather {
  city: string;
  country: string;
  temp: number;
  condition: string;
  icon: string;
}

// Mock weather data — will be replaced with real API
const weatherData: CityWeather[] = [
  { city: "Buea", country: "CM", temp: 22, condition: "Partly Cloudy", icon: "⛅" },
  { city: "Douala", country: "CM", temp: 31, condition: "Humid", icon: "🌤️" },
  { city: "Yaoundé", country: "CM", temp: 27, condition: "Sunny", icon: "☀️" },
  { city: "Lagos", country: "NG", temp: 30, condition: "Overcast", icon: "🌥️" },
  { city: "Nairobi", country: "KE", temp: 19, condition: "Cool", icon: "🌤️" },
  { city: "London", country: "UK", temp: 12, condition: "Rainy", icon: "🌧️" },
  { city: "New York", country: "US", temp: 8, condition: "Clear", icon: "☀️" },
  { city: "Tokyo", country: "JP", temp: 15, condition: "Cloudy", icon: "☁️" },
  { city: "São Paulo", country: "BR", temp: 25, condition: "Warm", icon: "🌤️" },
  { city: "Sydney", country: "AU", temp: 20, condition: "Breezy", icon: "🌬️" },
];

export const WeatherTicker = () => {
  const { theme } = useTheme();
  const doubled = [...weatherData, ...weatherData];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-7 overflow-hidden border-b border-border/50 bg-card/90 backdrop-blur-md">
      <motion.div
        className="flex items-center h-full whitespace-nowrap"
        animate={{ x: [0, -(weatherData.length * 180)] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((w, i) => (
          <span
            key={`${w.city}-${i}`}
            className="inline-flex items-center gap-1.5 px-4 font-body text-[10px] uppercase tracking-wider text-muted-foreground"
          >
            <span>{w.icon}</span>
            <span className="text-foreground font-display">{w.city}</span>
            <span>{w.temp}°C</span>
            <span className="text-muted-foreground/60">|</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};
