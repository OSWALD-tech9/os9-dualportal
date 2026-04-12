export interface Vehicle {
  id: string;
  name: string;
  type: "sale" | "rental";
  category: "suv" | "sedan" | "luxury" | "pickup";
  price_xaf: number;
  price_usd: number;
  desc: string;
  specs: { engine: string; seats: number; transmission: string };
  image_wave: string;
  image_roots: string;
  gallery: string[];
}

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    name: "Toyota Land Cruiser 2024",
    type: "sale",
    category: "suv",
    price_xaf: 28000000,
    price_usd: 44800,
    desc: "Commanding presence. Bulletproof reliability. The king of African terrain.",
    specs: { engine: "4.0L V6", seats: 7, transmission: "Automatic" },
    image_wave: "/images/vehicles/landcruiser-wave.jpg",
    image_roots: "/images/vehicles/landcruiser-roots.jpg",
    gallery: ["/images/vehicles/landcruiser-wave.jpg", "/images/vehicles/landcruiser-roots.jpg"],
  },
  {
    id: "v2",
    name: "Mercedes C-Class 2023",
    type: "sale",
    category: "luxury",
    price_xaf: 18500000,
    price_usd: 29600,
    desc: "Luxury sedan, leather interior, sunroof. Elegance meets engineering.",
    specs: { engine: "2.0L Turbo", seats: 5, transmission: "Automatic" },
    image_wave: "/images/vehicles/mercedes-c-wave.jpg",
    image_roots: "/images/vehicles/mercedes-c-roots.jpg",
    gallery: ["/images/vehicles/mercedes-c-wave.jpg", "/images/vehicles/mercedes-c-roots.jpg"],
  },
  {
    id: "v3",
    name: "Toyota Hilux 4x4",
    type: "rental",
    category: "pickup",
    price_xaf: 75000,
    price_usd: 120,
    desc: "Daily rental — built for rough terrain. Unstoppable workhorse.",
    specs: { engine: "2.8L Diesel", seats: 5, transmission: "Manual" },
    image_wave: "/images/vehicles/hilux-wave.jpg",
    image_roots: "/images/vehicles/hilux-roots.jpg",
    gallery: ["/images/vehicles/hilux-wave.jpg", "/images/vehicles/hilux-roots.jpg"],
  },
  {
    id: "v4",
    name: "BMW X5 xDrive 2024",
    type: "sale",
    category: "luxury",
    price_xaf: 32000000,
    price_usd: 51200,
    desc: "Premium luxury SUV. Adaptive suspension, panoramic roof, night vision.",
    specs: { engine: "3.0L Inline-6", seats: 5, transmission: "Automatic" },
    image_wave: "/images/vehicles/bmw-x5-wave.jpg",
    image_roots: "/images/vehicles/bmw-x5-roots.jpg",
    gallery: ["/images/vehicles/bmw-x5-wave.jpg", "/images/vehicles/bmw-x5-roots.jpg"],
  },
  {
    id: "v5",
    name: "Honda Civic 2023",
    type: "rental",
    category: "sedan",
    price_xaf: 50000,
    price_usd: 80,
    desc: "Daily rental — fuel-efficient city cruiser. Perfect for urban mobility.",
    specs: { engine: "1.5L Turbo", seats: 5, transmission: "CVT" },
    image_wave: "/images/vehicles/civic-wave.jpg",
    image_roots: "/images/vehicles/civic-roots.jpg",
    gallery: ["/images/vehicles/civic-wave.jpg", "/images/vehicles/civic-roots.jpg"],
  },
  {
    id: "v6",
    name: "Range Rover Sport 2024",
    type: "rental",
    category: "luxury",
    price_xaf: 150000,
    price_usd: 240,
    desc: "Premium daily rental — VIP transport, executive comfort, all-terrain capability.",
    specs: { engine: "3.0L V6 Supercharged", seats: 5, transmission: "Automatic" },
    image_wave: "/images/vehicles/rangerover-wave.jpg",
    image_roots: "/images/vehicles/rangerover-roots.jpg",
    gallery: ["/images/vehicles/rangerover-wave.jpg", "/images/vehicles/rangerover-roots.jpg"],
  },
  {
    id: "v7",
    name: "Toyota Corolla 2022",
    type: "sale",
    category: "sedan",
    price_xaf: 12000000,
    price_usd: 19200,
    desc: "Clean title, low mileage, fully serviced. The world's most trusted sedan.",
    specs: { engine: "1.8L Hybrid", seats: 5, transmission: "Automatic" },
    image_wave: "/images/vehicles/corolla-wave.jpg",
    image_roots: "/images/vehicles/corolla-roots.jpg",
    gallery: ["/images/vehicles/corolla-wave.jpg", "/images/vehicles/corolla-roots.jpg"],
  },
  {
    id: "v8",
    name: "Ford Territory 2025",
    type: "sale",
    category: "suv",
    price_xaf: 22000000,
    price_usd: 35200,
    desc: "Next-gen smart SUV. Panoramic display, ADAS suite, turbocharged efficiency.",
    specs: { engine: "1.5L EcoBoost", seats: 5, transmission: "CVT" },
    image_wave: "/images/vehicles/ford-territory-wave.jpg",
    image_roots: "/images/vehicles/ford-territory-roots.jpg",
    gallery: ["/images/vehicles/ford-territory-wave.jpg", "/images/vehicles/ford-territory-roots.jpg"],
  },
];
