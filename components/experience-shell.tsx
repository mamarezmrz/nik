"use client";

import { useRef, useState } from "react";
import { useExperienceRuntime } from "@/animations/use-experience-runtime";
import { LocaleProvider, useLocale } from "./ui/locale-provider";
import { ThemeProvider } from "./ui/theme-provider";
import CorporateNavigation from "./layout/navigation";
import WorldBackdrop from "./visual/world-backdrop";
import FilmScrollTrack from "./film/film-scroll-track";
import FilmStage from "./film/film-stage";
import FilmProgress from "./film/film-progress";
import BackToTop from "./ui/back-to-top";
import SitePreloader from "./ui/site-preloader";
import HeroScene from "./scenes/hero-scene";
import CompanyScene from "./scenes/company-scene";
import MaterialScene from "./scenes/material-scene";
import ProductsScene from "./scenes/products-scene";
import ProductionScene from "./scenes/production-scene";
import ApplicationsScene from "./scenes/applications-scene";
import TrustScene from "./scenes/trust-scene";
import ContactScene from "./scenes/contact-scene";

function FilmExtras({ locale }: { locale: "fa" | "en" }) {
  const fa = locale === "fa";
  const [open, setOpen] = useState(-1);
  const faQuestions = [
    { q: "محصولات نیک اتیلن در چه پروژه‌هایی استفاده می‌شوند؟", a: "محصولات نیک اتیلن در پروژه‌های آب و فاضلاب، شبکه‌های آبرسانی، کشاورزی، زیرساخت شهری و پروژه‌های صنعتی استفاده می‌شوند. هر راهکار بر اساس فشار کاری، شرایط نصب، مسیر انتقال و نیاز واقعی پروژه انتخاب می‌شود تا در کنار عملکرد مناسب، نگهداری ساده و عمر مفید طولانی داشته باشد." },
    { q: "چطور کیفیت مواد اولیه را کنترل می‌کنید؟", a: "مواد اولیه پیش از ورود به خط تولید بررسی می‌شوند و مشخصات فنی آن‌ها با استانداردهای پروژه و الزامات کنترل کیفیت تطبیق داده می‌شود. در ادامه، نمونه‌برداری و ثبت اطلاعات تولید انجام می‌گیرد تا مسیر هر محصول از ماده اولیه تا محصول نهایی قابل پیگیری و ارزیابی باشد." },
    { q: "آیا محصولات برای پروژه‌های سفارشی مناسب هستند؟", a: "بله، مشخصات محصول می‌تواند بر اساس فشار کاری، قطر، شرایط محیطی، روش اجرا و نیاز مهندسی پروژه بررسی شود. تیم فنی با دریافت اطلاعات پروژه، گزینه‌های مناسب را مقایسه می‌کند و پیشنهاد فنی متناسبی ارائه می‌دهد تا انتخاب محصول دقیق و قابل اتکا باشد." },
    { q: "زمان آماده‌سازی و تحویل محصولات چقدر است؟", a: "زمان تحویل به نوع محصول، حجم سفارش، مشخصات فنی و برنامه تولید بستگی دارد. پس از بررسی درخواست، ظرفیت تولید و جزئیات ارسال، یک زمان‌بندی شفاف و قابل پیگیری ارائه می‌کنیم و در طول فرآیند، هماهنگی لازم برای تحویل منظم انجام می‌شود." },
    { q: "چه خدماتی پیش از خرید ارائه می‌شود؟", a: "تیم فنی می‌تواند در انتخاب محصول، بررسی مسیر انتقال، محاسبه نیاز پروژه، مشخصات اتصال و هماهنگی راهکار با شرایط اجرا همراه شما باشد. هدف این است که پیش از ثبت سفارش، ابهام‌های فنی برطرف شود و راهکاری انتخاب شود که در اجرا و بهره‌برداری نیز عملکرد مطمئنی داشته باشد." },
    { q: "چگونه دوام و عملکرد محصول تضمین می‌شود؟", a: "کنترل مواد اولیه، پایش فرآیند تولید و بررسی محصول نهایی در کنار مستندسازی فنی، کیفیت و دوام سیستم را قابل اندازه‌گیری می‌کند. این رویکرد کمک می‌کند محصول از نظر ابعاد، یکنواختی، اتصال‌پذیری و آمادگی برای استفاده در پروژه‌های بلندمدت بررسی و تأیید شود." },
    { q: "چطور برای دریافت مشاوره با شما ارتباط بگیریم؟", a: "از طریق دکمه تماس در انتهای تجربه یا ایمیل hello@nikethylene.com درخواست خود را ارسال کنید. اگر اطلاعاتی مثل نوع پروژه، کاربرد، قطر یا فشار کاری را هم همراه درخواست بفرستید، کارشناسان ما سریع‌تر می‌توانند پاسخ دقیق‌تری آماده کنند و برای ادامه همکاری با شما هماهنگ شوند." },
  ];
  const enQuestions = [
    { q: "Where are Nik Ethylene products used?", a: "Nik Ethylene systems are used across water and wastewater networks, agriculture, urban infrastructure and industrial projects. Each solution is considered against working pressure, installation conditions, flow paths and the long-term maintenance needs of the project." },
    { q: "How do you control raw material quality?", a: "Materials are checked before entering production and their technical specifications are matched to project standards and quality requirements. Production information is recorded throughout the process so the finished product can be reviewed and traced from source to delivery." },
    { q: "Can products be specified for custom projects?", a: "Yes. Product recommendations can be aligned with working pressure, diameter, environmental conditions, installation method and the engineering needs of each project. Our technical team can compare suitable options and prepare a clear recommendation before ordering." },
    { q: "How long does preparation and delivery take?", a: "Lead time depends on product type, technical specifications, order volume and the production schedule. After reviewing the request and delivery details, we share a clear timeline and keep coordination transparent through preparation and dispatch." },
    { q: "What support is available before purchase?", a: "Our technical team can help with product selection, flow paths, project requirements, connection details and matching the solution to site conditions. The goal is to resolve technical questions before ordering and make the final system dependable in operation." },
    { q: "How do you ensure long-term performance?", a: "Material checks, production monitoring and final product inspection combine with technical documentation to make quality and durability measurable. Dimensions, consistency, connection readiness and suitability for long-term project use are considered before release." },
    { q: "How can we request a consultation?", a: "Use the contact action at the end of the experience or email hello@nikethylene.com and our team will follow up with you. Including the application, project scale, diameter or working pressure helps us prepare a more relevant first response." },
  ];
  const questions = fa ? faQuestions : enQuestions;
  return <>
    <section id="advantages" className="corporate-scene advantages-scene"><span className="eyebrow">{fa ? "۰۶ / مزیت‌ها" : "06 / ADVANTAGES"}</span><h2>{fa ? "کیفیّتی که می‌ماند." : "Quality that stays."}</h2><div className="advantage-list">{(fa ? ["مقاومت واقعی", "استانداردهای حرفه‌ای", "ساخت دقیق", "اعتماد بلندمدت"] : ["Built to endure", "Professional standards", "Precision made", "Trust that lasts"]).map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div></section>
    <section id="faq" className="corporate-scene faq-scene"><div><span className="eyebrow">{fa ? "۰۹ / پرسش‌ها" : "09 / FAQ"}</span><h2>{fa ? "پرسش‌های مهم، پاسخ‌های روشن." : "Important questions. Clear answers."}</h2></div><div className="faq-list">{questions.map((item, index) => <div className={`faq-item ${open === index ? "open" : ""}`} key={item.q}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{item.q}</span><b>{open === index ? "−" : "+"}</b></button><p>{item.a}</p></div>)}</div></section>
  </>;
}

function FilmExperience() { const root = useRef<HTMLElement>(null); useExperienceRuntime(root); const { locale } = useLocale(); return <main ref={root} dir={locale === "fa" ? "rtl" : "ltr"} className="experience corporate-experience film-experience"><SitePreloader/><CorporateNavigation/><WorldBackdrop/><FilmProgress/><BackToTop/><FilmScrollTrack><FilmStage><HeroScene locale={locale}/><CompanyScene locale={locale}/><MaterialScene locale={locale}/><ProductsScene locale={locale}/><ProductionScene locale={locale}/><ApplicationsScene locale={locale}/><TrustScene locale={locale}/><FilmExtras locale={locale}/><ContactScene locale={locale}/></FilmStage></FilmScrollTrack></main>; }
export default function ExperienceShell() { return <LocaleProvider><ThemeProvider><FilmExperience/></ThemeProvider></LocaleProvider>; }
