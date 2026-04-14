import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

// ── Products (schema: id, price_usd, price_xaf, category, image_url, created_at) ──

export interface SupabaseProduct {
  id: string;
  price_usd: number;
  price_xaf: number;
  category: string;
  image_url: string;
  created_at: string;
}

export const useSupabaseProducts = () => {
  const [data, setData] = useState<SupabaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data: rows, error: err } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) {
        console.error("Supabase products fetch failed:", err.message, err);
        setError(err.message);
      } else {
        setData(rows || []);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { data, loading, error };
};

// ── Services (schema: id, tittle, category, description, whatsapp_link) ──

export interface SupabaseService {
  id: string;
  tittle: string; // Note: column name has typo in DB
  category: string;
  description: string;
  whatsapp_link: string;
}

export const useSupabaseServices = () => {
  const [data, setData] = useState<SupabaseService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data: rows, error: err } = await supabase
        .from("services")
        .select("*");

      if (err) {
        console.error("Supabase services fetch failed:", err.message, err);
        setError(err.message);
      } else {
        setData(rows || []);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { data, loading, error };
};

// ── Vehicles (schema: id, model, year, price_xaf, status, image_front, image_back, image_interior) ──

export interface SupabaseVehicle {
  id: string;
  model: string;
  year: number;
  price_xaf: number;
  status: string;
  image_front: string | null;
  image_back: string | null;
  image_interior: string | null;
}

export const useSupabaseVehicles = () => {
  const [data, setData] = useState<SupabaseVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data: rows, error: err } = await supabase
        .from("vehicles")
        .select("*");

      if (err) {
        console.error("Supabase vehicles fetch failed:", err.message, err);
        setError(err.message);
      } else {
        setData(rows || []);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { data, loading, error };
};

// ── Profiles (schema: id, username, created_at) ──

export interface SupabaseProfile {
  id: string;
  username: string;
  created_at: string;
}

export const useSupabaseProfile = (userId: string | null) => {
  const [data, setData] = useState<SupabaseProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const fetch = async () => {
      const { data: row, error: err } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (err) {
        console.error("Supabase profile fetch failed:", err.message, err);
        setError(err.message);
      } else {
        setData(row);
      }
      setLoading(false);
    };
    fetch();
  }, [userId]);

  return { data, loading, error };
};

// ── Orders (schema: id, product_id, status, order_date) ──

export const insertOrder = async (payload: {
  product_id: string;
  status: string;
  order_date: string;
}): Promise<{ success: boolean; error?: string }> => {
  const { error } = await supabase.from("orders").insert(payload);

  if (error) {
    console.error("Supabase order insert failed:", error.message, error);
    return { success: false, error: error.message };
  }
  return { success: true };
};
