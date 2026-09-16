"use client";

import { useLocale } from "../ui/locale-provider";
import { useTheme } from "../ui/theme-provider";
import { copy } from "@/lib/content";

export default function CorporateNavigation() {
  const { locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const fa = locale === "fa";
  return <header className="corporate-nav"><a className="brand-lockup" href="#hero"><span>{copy.brand[locale]}</span><small>{fa ? "مهندسی جریان" : "FLOW / ENGINEERED"}</small></a><nav><a href="#products">{fa ? "محصولات" : "Products"}</a><a href="#technology">{fa ? "فناوری" : "Technology"}</a><a href="#contact">{fa ? "تماس" : "Contact"}</a></nav><div className="nav-tools"><button className="theme-control" onClick={toggleTheme} aria-label={fa ? "تغییر تم" : "Toggle theme"}><span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span></button><button className="language-control" onClick={() => setLocale(fa ? "en" : "fa")} aria-label={fa ? "تغییر زبان به انگلیسی" : "Switch to Persian"}><b>{fa ? "فا" : "EN"}</b></button></div></header>;
}
