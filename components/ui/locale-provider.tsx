"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/content";
const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({ locale: "en", setLocale: () => undefined });
const toPersian = (value: string) => value.replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
const toLatin = (value: string) => value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fa");
  const setLocale = (next: Locale) => { setLocaleState(next); window.localStorage.setItem("nik-locale", next); };
  useEffect(() => { const saved = window.localStorage.getItem("nik-locale"); if (saved === "fa" || saved === "en") window.setTimeout(() => setLocaleState(saved), 0); }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    const convert = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      nodes.forEach((node) => { node.nodeValue = locale === "fa" ? toPersian(node.nodeValue ?? "") : toLatin(node.nodeValue ?? ""); });
    };
    convert();
  }, [locale]);
  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export const useLocale = () => useContext(LocaleContext);
