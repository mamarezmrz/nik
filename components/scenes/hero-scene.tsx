import EnergyCore from "../visual/energy-core";
import LightBeams from "../visual/light-beams";
import { copy, type Locale } from "@/lib/content";

export default function HeroScene({ locale }: { locale: Locale }) {
  const fa = locale === "fa";
  return <section id="hero" className="corporate-scene corporate-hero"><svg className="hero-flow-art" viewBox="0 0 900 360" aria-hidden="true"><defs><linearGradient id="hero-flow-gradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="var(--corp-accent)" stopOpacity=".2"/><stop offset=".5" stopColor="var(--corp-accent)"/><stop offset="1" stopColor="#a78bfa" stopOpacity=".45"/></linearGradient></defs><path d="M-30 258 C130 55 280 54 420 206 S690 355 930 92"/><path d="M-30 300 C130 100 282 98 420 234 S700 378 930 138"/><path d="M-30 216 C126 12 282 15 420 178 S675 320 930 48"/></svg><div className="corporate-hero-copy"><span className="eyebrow">{fa ? "۰۱ / نیک اتیلن" : "01 / NIK ETHYLENE"}</span><h1>{fa ? copy.hero.fa : copy.hero.en}</h1><p>{fa ? copy.heroLead.fa : copy.heroLead.en}</p></div><EnergyCore/><LightBeams/><div className="hero-scroll-cue" aria-hidden="true"><span>{fa ? "برای ورود اسکرول کنید" : "SCROLL TO ENTER"}</span><i><b/></i></div></section>;
}
