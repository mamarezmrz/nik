export type Locale = "fa" | "en";
export type Theme = "light" | "dark";
export type LocalizedText = { fa: string; en: string };
export type Product = { id: string; title: LocalizedText; description: LocalizedText; category: "pipe" | "fitting" | "equipment"; accent: "cyan" | "blue" | "green" };
export type ProductionStep = { id: string; title: LocalizedText; description: LocalizedText };

export const products: Product[] = [
  { id: "pipe", title: { fa: "لوله‌های پلی‌اتیلن", en: "Polyethylene Pipes" }, description: { fa: "جریان مطمئن برای زیرساخت‌های حیاتی.", en: "Reliable flow for critical infrastructure." }, category: "pipe", accent: "cyan" },
  { id: "fitting", title: { fa: "اتصالات مهندسی", en: "Engineered Fittings" }, description: { fa: "اتصال دقیق، دوام بلندمدت.", en: "Precise connection. Long-term durability." }, category: "fitting", accent: "blue" },
  { id: "water", title: { fa: "تجهیزات انتقال آب", en: "Water Systems" }, description: { fa: "فناوری برای هر قطره.", en: "Technology for every drop." }, category: "equipment", accent: "green" },
];

export const productionSteps: ProductionStep[] = [
  { id: "material", title: { fa: "مواد اولیه", en: "Raw material" }, description: { fa: "انتخاب پلیمر با استانداردهای دقیق.", en: "Polymer selected to exacting standards." } },
  { id: "process", title: { fa: "فرآیند تولید", en: "Production" }, description: { fa: "هندسه‌ای که در خط تولید شکل می‌گیرد.", en: "Geometry shaped on the production line." } },
  { id: "quality", title: { fa: "کنترل کیفیت", en: "Quality control" }, description: { fa: "هر متر، یک تعهد قابل اندازه‌گیری.", en: "Every metre, a measurable promise." } },
  { id: "final", title: { fa: "محصول نهایی", en: "Final product" }, description: { fa: "آماده برای سال‌ها جریان و اعتماد.", en: "Ready for years of flow and trust." } },
];

export const copy = {
  brand: { fa: "نیک اتیلن", en: "Nik Ethylene" },
  hero: { fa: "مهندسی جریان. ساختن آینده.", en: "Engineering flow. Building the future." },
  heroLead: { fa: "راهکارهای پلی‌اتیلن برای آب، صنعت و زندگی.", en: "Polyethylene systems for water, industry and life." },
} as const;
