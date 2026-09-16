"use client";
import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./animation-utils";
gsap.registerPlugin(ScrollTrigger);
export function usePinnedStoryAnimation(root: RefObject<HTMLElement | null>) { useLayoutEffect(() => { const el = root.current; if (!el || prefersReducedMotion()) return; const ctx = gsap.context(() => { const panels = gsap.utils.toArray<HTMLElement>(".story-panel"); gsap.to(panels, { yPercent: -100 * (panels.length - 1), ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 1, pin: ".story-pin", invalidateOnRefresh: true } }); }, el); return () => ctx.revert(); }, [root]); }
