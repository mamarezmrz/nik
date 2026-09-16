"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Theme } from "@/lib/content";
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({ theme: "dark", toggleTheme: () => undefined });
export function ThemeProvider({ children }: { children: React.ReactNode }) { const [theme, setTheme] = useState<Theme>("dark"); const [hydrated, setHydrated] = useState(false); useEffect(() => { const saved = window.localStorage.getItem("nik-theme"); window.setTimeout(() => { if (saved === "light" || saved === "dark") setTheme(saved); setHydrated(true); }, 0); }, []); useEffect(() => { if (!hydrated) return; document.documentElement.dataset.theme = theme; window.localStorage.setItem("nik-theme", theme); }, [theme, hydrated]); const value = useMemo(() => ({ theme, toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark") }), [theme]); return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>; }
export const useTheme = () => useContext(ThemeContext);
