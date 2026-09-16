"use client";

import { useEffect, useState } from "react";

export default function SitePreloader() {
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const start = performance.now();
    const finish = () => {
      if (cancelled) return;
      const wait = Math.max(0, 850 - (performance.now() - start));
      window.setTimeout(() => {
        if (cancelled) return;
        setLeaving(true);
        window.setTimeout(() => !cancelled && setMounted(false), 520);
      }, wait);
    };
    const ready = async () => {
      if (document.fonts?.ready) await document.fonts.ready;
      if (document.readyState === "complete") finish();
      else window.addEventListener("load", finish, { once: true });
    };
    void ready();
    return () => { cancelled = true; window.removeEventListener("load", finish); };
  }, []);

  if (!mounted) return null;
  return <div className={`site-preloader${leaving ? " is-leaving" : ""}`} aria-hidden="true"><div className="preloader-mark"><i/><i/><i/></div></div>;
}
