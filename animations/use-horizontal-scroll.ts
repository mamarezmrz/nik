"use client";
import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./animation-utils";
gsap.registerPlugin(ScrollTrigger);
export function useHorizontalScroll(root: RefObject<HTMLElement | null>) { useLayoutEffect(() => { const el = root.current; if (!el || prefersReducedMotion()) return; const track = el.querySelector<HTMLElement>(".horizontal-track"); if (!track) return; const ctx = gsap.context(() => gsap.to(track, { x: () => -(track.scrollWidth - el.clientWidth), ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => `+=${track.scrollWidth - el.clientWidth}`, scrub: 1, pin: true, invalidateOnRefresh: true } }), el); return () => ctx.revert(); }, [root]); }
