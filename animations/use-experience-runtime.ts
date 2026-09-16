"use client";
import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function useExperienceRuntime(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const track = el.querySelector<HTMLElement>(".film-scroll-track");
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: .075, smoothWheel: true });
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    lenis.on("scroll", ScrollTrigger.update);
    const ctx = gsap.context(() => {
      const state = { progress: 0 };
      const set = (selector: string, vars: gsap.TweenVars) => el.querySelectorAll<HTMLElement>(selector).forEach((node) => gsap.set(node, vars));
      const ease = (value: number) => value * value * (3 - 2 * value);
      const range = (from: number, to: number) => Math.max(0, Math.min(1, (state.progress - from) / (to - from)));
      const shot = (from: number, to: number) => {
        const value = range(from, to);
        const entering = from === 0 ? 1 : ease(Math.min(1, value / .38));
        const leaving = to === 1 ? 0 : ease(value > .62 ? (value - .62) / .38 : 0);
        const opacity = value === 0 ? (from === 0 ? 1 : 0) : value >= 1 ? (to === 1 ? 1 : 0) : entering * (1 - leaving);
        return { value, entering, leaving, opacity };
      };
      const master = gsap.to(state, { progress: 1, paused: true, duration: 1, ease: "none", onUpdate: () => {
        const p = state.progress;
        el.style.setProperty("--film-progress", String(p));
        el.style.setProperty("--world-hue", String(188 + p * 34));
        const hero = shot(0, .14), company = shot(.14, .25), material = shot(.25, .36), products = shot(.36, .49), applications = shot(.49, .63), trust = shot(.63, .77), faq = shot(.77, .9), final = shot(.9, 1);
        const scene = (selector: string, value: ReturnType<typeof shot>) => set(selector, { opacity: value.opacity, visibility: value.opacity > .01 ? "visible" : "hidden", pointerEvents: value.opacity > .35 ? "auto" : "none", zIndex: value.opacity > .01 ? 10 : 0 });
        scene("#hero", hero); scene("#company", company); scene("#material", material); scene("#products", products); scene("#applications", applications); scene("#trust", trust); scene("#faq", faq); scene("#contact", final);
        set("#hero", { scale: 1 - hero.value * .25, rotation: hero.leaving * -4, xPercent: hero.leaving * -8, filter: `blur(${hero.leaving * 7}px)` });
        set("#hero .corporate-hero-copy", { scale: 1 + hero.leaving * .35, yPercent: -hero.leaving * 18, opacity: 1 - hero.leaving });
        set(".hero-actions-global", { opacity: hero.opacity, pointerEvents: hero.opacity > .35 ? "auto" : "none", yPercent: hero.leaving * 12 });
        set(".hero-scroll-cue", { opacity: hero.opacity, yPercent: hero.leaving * 18 });
        set("#company", { scale: .82 + company.value * .18, xPercent: (1 - company.entering) * 18, rotation: (1 - company.entering) * 5, filter: `blur(${(1 - company.entering) * 10}px)` });
        set("#material", { scale: .7 + material.value * .3, rotation: (1 - material.entering) * -8, yPercent: (1 - material.entering) * 14, filter: `blur(${(1 - material.entering) * 9}px)` });
        set("#material .material-shape", { rotation: 28 + material.value * 130, scale: .75 + material.value * .5 });
        set("#products", { scale: .8 + products.value * .2, xPercent: (1 - products.entering) * -22, rotation: (1 - products.entering) * -4, filter: `blur(${(1 - products.entering) * 8}px)` });
        set("#products .corporate-product", { scale: .72 + products.value * .28, rotation: (1 - products.entering) * 9, yPercent: (1 - products.entering) * 18 });
        set("#applications", { scale: .86 + applications.value * .14, xPercent: (1 - applications.entering) * 20, rotation: (1 - applications.entering) * 4, filter: `blur(${(1 - applications.entering) * 8}px)` });
        set("#applications .application-water", { scale: .65 + applications.value * .5, rotation: -12 + applications.value * 28 });
        set("#trust", { scale: .9 + trust.value * .1, yPercent: (1 - trust.entering) * 12, filter: `blur(${(1 - trust.entering) * 6}px)` });
        set("#faq", { scale: .9 + faq.value * .1, yPercent: (1 - faq.entering) * 15, filter: `blur(${(1 - faq.entering) * 5}px)` });
        set("#contact", { scale: .82 + final.value * .18, yPercent: (1 - final.entering) * 8, filter: `blur(${(1 - final.entering) * 7}px)` });
        set("#contact .contact-halo", { scale: .75 + final.value * .25, rotation: -8 + final.value * 12 });
        set(".film-progress span", { scaleY: p });
      } });
      const trigger = ScrollTrigger.create({ trigger: track, start: "top top", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true, onUpdate: (self) => master.progress(self.progress), onRefresh: (self) => master.progress(self.progress) });
      master.progress(0); ScrollTrigger.refresh();
      return () => { trigger.kill(); master.kill(); };
    }, el);
    const refresh = () => { lenis.resize(); ScrollTrigger.refresh(); };
    window.addEventListener("resize", refresh); window.setTimeout(refresh, 0);
    return () => { window.removeEventListener("resize", refresh); ctx.revert(); lenis.destroy(); gsap.ticker.remove(raf); };
  }, [root]);
}
