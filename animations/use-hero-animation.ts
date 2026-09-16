"use client";
import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "./animation-utils";
export function useHeroAnimation(root: RefObject<HTMLElement | null>) { useLayoutEffect(() => { const el = root.current; if (!el || prefersReducedMotion()) return; const ctx = gsap.context(() => { gsap.from(".hero-item", { opacity: 0, y: 35, duration: 1.1, stagger: .12, ease: "power4.out" }); gsap.to(".hero-orb", { yPercent: -18, xPercent: 8, scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } }); }, el); return () => ctx.revert(); }, [root]); }
