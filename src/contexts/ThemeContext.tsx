import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "wave" | "roots";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem("os9-theme") as ThemeMode) || "wave";
  });

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem("os9-theme", t);
  };

  const toggleTheme = () => setTheme(theme === "wave" ? "roots" : "wave");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "roots") {
      root.classList.add("roots");
    } else {
      root.classList.remove("roots");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
