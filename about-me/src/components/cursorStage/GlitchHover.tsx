"use client";

import { useEffect } from "react";

const COOLDOWN = 900;
const AWAY = 400;

export default function GlitchHover() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const last = new WeakMap<Element, number>();
    const left = new WeakMap<Element, number>();

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest(".glitch-hover");
      if (!el || el.contains(e.relatedTarget as Node | null)) return;
      const node = el as HTMLElement;
      const drawing =
        (node.hasAttribute("data-draw") && !node.hasAttribute("data-drawn")) ||
        Boolean(node.style.clipPath || node.style.opacity);
      if (drawing) return;
      const now = performance.now();
      if (now - (last.get(el) ?? -Infinity) < COOLDOWN) return;
      if (now - (left.get(el) ?? -Infinity) < AWAY) return;
      last.set(el, now);
      el.classList.remove("glitching");
      void (el as HTMLElement).offsetWidth;
      el.classList.add("glitching");
      window.setTimeout(() => el.classList.remove("glitching"), 380);
    };

    const onOut = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest(".glitch-hover");
      if (!el || el.contains(e.relatedTarget as Node | null)) return;
      left.set(el, performance.now());
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return null;
}
