export interface Product {
  id: string;
  name: string;
  description: string;
  price_xaf: number;
  price_usd: number;
  category: "spy-tech" | "heritage-apparel";
  image_wave: string;
  image_roots: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Neural Link Earbuds",
    description: "Bone-conduction earbuds with real-time translation. Encrypted comms channel for covert operations.",
    price_xaf: 125000,
    price_usd: 199,
    category: "spy-tech",
    image_wave: "/images/neural-earbuds-wave.jpg",
    image_roots: "/images/neural-earbuds-roots.jpg",
    featured: true,
  },
  {
    id: "2",
    name: "Toghu Bomber Jacket",
    description: "Hand-embroidered Toghu patterns on premium military-grade fabric. RFID-blocking lining.",
    price_xaf: 185000,
    price_usd: 295,
    category: "heritage-apparel",
    image_wave: "/images/toghu-jacket-wave.jpg",
    image_roots: "/images/toghu-jacket-roots.jpg",
    featured: true,
  },
  {
    id: "3",
    name: "Phantom Watch",
    description: "Stealth chronograph with biometric lock and encrypted NFC. Sapphire crystal display.",
    price_xaf: 310000,
    price_usd: 495,
    category: "spy-tech",
    image_wave: "/images/phantom-watch-wave.jpg",
    image_roots: "/images/phantom-watch-roots.jpg",
    featured: true,
  },
  {
    id: "4",
    name: "Ndop Heritage Hoodie",
    description: "Premium cotton hoodie featuring the sacred Ndop indigo patterns of the Bamoun kingdom.",
    price_xaf: 95000,
    price_usd: 150,
    category: "heritage-apparel",
    image_wave: "/images/ndop-hoodie-wave.jpg",
    image_roots: "/images/ndop-hoodie-roots.jpg",
    featured: false,
  },
  {
    id: "5",
    name: "Shadow Lens Glasses",
    description: "AR-enabled smart glasses with facial recognition and night-vision overlay.",
    price_xaf: 250000,
    price_usd: 399,
    category: "spy-tech",
    image_wave: "/images/shadow-lens-wave.jpg",
    image_roots: "/images/shadow-lens-roots.jpg",
    featured: false,
  },
  {
    id: "6",
    name: "Kente Code Sneakers",
    description: "Limited edition sneakers with Kente-inspired geometric uppers. Smart-sole step tracker.",
    price_xaf: 145000,
    price_usd: 230,
    category: "heritage-apparel",
    image_wave: "/images/kente-sneakers-wave.jpg",
    image_roots: "/images/kente-sneakers-roots.jpg",
    featured: true,
  },
];
