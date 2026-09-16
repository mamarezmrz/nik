"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./animation-utils";

gsap.registerPlugin(ScrollTrigger);
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: .09, smoothWheel: true });
    const tick = (time: number) => { lenis.raf(time * 1000); };
    const onScroll = () => ScrollTrigger.update();
    gsap.ticker.add(tick); lenis.on("scroll", onScroll); gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); gsap.ticker.remove(tick); };
  }, []);
}
