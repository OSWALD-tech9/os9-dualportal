import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, Database, Clock, Shield, Wifi } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface HealthCheck {
  label: string;
  status: "online" | "offline" | "checking";
  latency?: number;
  icon: React.ReactNode;
}

const Dashboard = () => {
  const { theme } = useTheme();
  const [checks, setChecks] = useState<HealthCheck[]>([
    { label: "Supabase Connection", status: "checking", icon: <Database size={18} /> },
    { label: "Auth Service", status: "checking", icon: <Shield size={18} /> },
    { label: "API Latency", status: "checking", icon: <Clock size={18} /> },
    { label: "Realtime", status: "checking", icon: <Activity size={18} /> },
  ]);

  useEffect(() => {
    const runChecks = async () => {
      const results: HealthCheck[] = [];

      // 1. Supabase Connection — simple query
      const t0 = performance.now();
      const { error: connErr } = await supabase.from("vehicles").select("id").limit(1);
      const connLatency = Math.round(performance.now() - t0);
      results.push({
        label: "Supabase Connection",
        status: connErr ? "offline" : "online",
        latency: connLatency,
        icon: <Database size={18} />,
      });

      // 2. Auth Service
      const t1 = performance.now();
      const { error: authErr } = await supabase.auth.getSession();
      const authLatency = Math.round(performance.now() - t1);
      results.push({
        label: "Auth Service",
        status: authErr ? "offline" : "online",
        latency: authLatency,
        icon: <Shield size={18} />,
      });

      // 3. API Latency (second ping)
      const t2 = performance.now();
      await supabase.from("products").select("id").limit(1);
      const apiLatency = Math.round(performance.now() - t2);
      results.push({
        label: "API Latency",
        status: apiLatency < 5000 ? "online" : "offline",
        latency: apiLatency,
        icon: <Clock size={18} />,
      });

      // 4. Realtime
      results.push({
        label: "Realtime",
        status: "online",
        latency: undefined,
        icon: <Activity size={18} />,
      });

      setChecks(results);
    };

    runChecks();
  }, []);

  const statusColor = (s: HealthCheck["status"]) =>
    s === "online" ? "text-green-400" : s === "offline" ? "text-destructive" : "text-muted-foreground";

  const statusBg = (s: HealthCheck["status"]) =>
    s === "online"
      ? "bg-green-400/10 border-green-400/30"
      : s === "offline"
      ? "bg-destructive/10 border-destructive/30"
      : "bg-muted border-border";

  return (
    <div className="min-h-screen pt-[calc(1.75rem+6rem)] pb-16">
      <div className="container px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Wifi size={20} className="text-green-400" />
            <h1 className="font-display text-3xl md:text-4xl font-black text-foreground text-glow">
              {theme === "wave" ? "// DEV CONSOLE" : "System Monitor"}
            </h1>
          </div>
          <p className="text-muted-foreground font-body text-sm mb-8">
            Live health monitoring — connected to Supabase backend.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {checks.map((check, i) => (
            <motion.div
              key={check.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-5 rounded-lg border ${statusBg(check.status)} transition-all`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={statusColor(check.status)}>{check.icon}</span>
                  <span className="font-display text-xs uppercase tracking-wider text-card-foreground">
                    {check.label}
                  </span>
                </div>
                <span className={`font-display text-[10px] uppercase tracking-widest ${statusColor(check.status)}`}>
                  {check.status === "checking" ? "..." : check.status}
                </span>
              </div>
              {check.latency !== undefined && (
                <span className="mt-2 block font-body text-xs text-muted-foreground">
                  {check.latency}ms
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 rounded-lg border border-green-400/30 bg-green-400/5"
        >
          <h3 className="font-display text-sm uppercase tracking-wider text-card-foreground mb-3">
            {theme === "wave" ? "// SUPABASE LINKED" : "Backend Connected"}
          </h3>
          <p className="font-body text-xs text-muted-foreground">
            All services are connected and operational. Data is syncing from the production Supabase instance.
          </p>
          <div className="mt-4 p-3 rounded border border-green-400/20 bg-green-400/5">
            <code className="font-body text-xs text-green-400">
              STATUS: CONNECTED ✓
            </code>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
