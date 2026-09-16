import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nik Ethylene — Flow Engineered",
  description: "Engineering polyethylene systems for water, industry and life.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `(()=>{try{const t=localStorage.getItem("nik-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;const l=localStorage.getItem("nik-locale");if(l==="fa"||l==="en"){document.documentElement.lang=l;document.documentElement.dir=l==="fa"?"rtl":"ltr"}}catch{}})()` }}/></head>
      <body>{children}</body>
    </html>
  );
}
