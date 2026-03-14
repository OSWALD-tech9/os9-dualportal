import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, Database, Clock, Shield, Wifi, WifiOff } from "lucide-react";

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
    // Simulate health checks (will be replaced with real Supabase checks)
    const timer = setTimeout(() => {
      setChecks([
        { label: "Supabase Connection", status: "offline", icon: <Database size={18} />, latency: undefined },
        { label: "Auth Service", status: "offline", icon: <Shield size={18} />, latency: undefined },
        { label: "API Latency", status: "offline", icon: <Clock size={18} />, latency: undefined },
        { label: "Realtime", status: "offline", icon: <Activity size={18} />, latency: undefined },
      ]);
    }, 1500);
    return () => clearTimeout(timer);
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
            <WifiOff size={20} className="text-destructive" />
            <h1 className="font-display text-3xl md:text-4xl font-black text-foreground text-glow">
              {theme === "wave" ? "// DEV CONSOLE" : "System Monitor"}
            </h1>
          </div>
          <p className="text-muted-foreground font-body text-sm mb-8">
            Supabase not connected. Provide your credentials to activate health monitoring.
          </p>
        </motion.div>

        {/* Health Grid */}
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

        {/* Connection Form Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 rounded-lg border border-border bg-card"
        >
          <h3 className="font-display text-sm uppercase tracking-wider text-card-foreground mb-3">
            {theme === "wave" ? "// CONNECT SUPABASE" : "Connect Backend"}
          </h3>
          <p className="font-body text-xs text-muted-foreground">
            Once you provide your Supabase Project URL and Anon Key, this dashboard will display real-time
            connection health, API latency metrics, and auth service status.
          </p>
          <div className="mt-4 p-3 rounded border border-border bg-muted">
            <code className="font-body text-xs text-muted-foreground">
              STATUS: AWAITING_CREDENTIALS
            </code>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
