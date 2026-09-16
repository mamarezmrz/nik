"use client";
import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./animation-utils";
gsap.registerPlugin(ScrollTrigger);
export function useSectionReveals(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => { const el = root.current; if (!el) return; const ctx = gsap.context(() => { if (prefersReducedMotion()) { gsap.set(".reveal", { opacity: 1, y: 0 }); return; } gsap.utils.toArray<HTMLElement>(".reveal").forEach((item) => gsap.to(item, { opacity: 1, y: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 86%", once: true } })); }, el); return () => ctx.revert(); }, [root]);
}
