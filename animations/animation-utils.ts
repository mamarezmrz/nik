import gsap from "gsap";

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const reveal = (elements: gsap.TweenTarget, options: gsap.TweenVars = {}) => gsap.to(elements, { opacity: 1, y: 0, duration: .9, ease: "power3.out", ...options });
