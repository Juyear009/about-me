"use client";

import { animate, motionValue, type AnimationSequence } from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./CursorStage.module.css";
import GlitchHover from "./GlitchHover";

const COUNT = 8;
const QUERY =
  "(min-width: 1025px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
type Ease = [number, number, number, number] | "linear" | "easeOut";
const EASE: Ease = [0.25, 1, 0.5, 1];
const POP: Ease = [0.34, 1.56, 0.64, 1];
const GLIDE: Ease = [0.45, 0.05, 0.25, 1];
const TINT = "rgba(236, 73, 49, 0.08)";
const CLEAR = "rgba(236, 73, 49, 0)";
const STAGGER = 0.22;
const ACTIONS = new Set(["type", "box", "grow", "pop", "dup"]);

type Box = { left: number; top: number; right: number; bottom: number; width: number; height: number };
type Controls = ReturnType<typeof animate>;
type Ctx = {
  seq: AnimationSequence;
  helpers: HTMLElement;
  touched: HTMLElement[];
  disposers: (() => void)[];
};
type Section = { name: string; roots: HTMLElement[]; els: HTMLElement[] };
type Running = { section: Section; controls: Controls; ctx: Ctx; snap: number; used: number[] };

function Pointer({ index }: { index: number }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={styles.svg}
      style={{ animationDelay: `${-index * 0.83}s`, animationDuration: `${3.2 + (index % 3) * 0.9}s` }}
    >
      <path
        d="M4.4 3.1C3.6 2.6 2.7 3.2 2.9 4.1L6.6 20.2C6.85 21.2 8.2 21.35 8.65 20.4L11.3 14.7C11.45 14.35 11.8 14.1 12.2 14.05L18.4 13.5C19.4 13.4 19.75 12.1 18.9 11.6Z"
        fill="#111"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CursorStage() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dockRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const dock = dockRef.current;
    const all = Array.from(document.querySelectorAll<HTMLElement>("[data-draw]"));
    const markDrawn = (els: HTMLElement[]) =>
      els.forEach((el) => el.setAttribute("data-drawn", ""));

    if (!stage || !dock || !window.matchMedia(QUERY).matches) {
      markDrawn(all);
      return;
    }

    let alive = true;
    const html = document.documentElement;
    const host = stage.parentElement!;
    html.setAttribute("data-cursors", "");
    host.style.position = "relative";

    const cursors = Array.from(stage.querySelectorAll<HTMLElement>("[data-cursor]"));
    const presses = cursors.map((c) => c.querySelector<HTMLElement>("[data-press]")!);
    const inDock = cursors.map(() => false);
    const pos = cursors.map(() => ({ x: -80, y: -80 }));

    const origin = () => {
      const r = stage.getBoundingClientRect();
      return { x: r.left, y: r.top };
    };
    const doc = (el: Element): Box => {
      const r = el.getBoundingClientRect();
      const o = origin();
      return {
        left: r.left - o.x,
        top: r.top - o.y,
        right: r.right - o.x,
        bottom: r.bottom - o.y,
        width: r.width,
        height: r.height,
      };
    };
    const place = (i: number, x: number, y: number) => {
      cursors[i].style.transform = `translateX(${x}px) translateY(${y}px)`;
      pos[i] = { x, y };
    };
    const dockSpot = (i: number) => ({
      x: 26 + i * 15,
      y: window.innerHeight - 72 + (i % 2) * 10,
    });
    const syncStage = (i: number) => {
      const r = cursors[i].getBoundingClientRect();
      const o = origin();
      if (inDock[i]) stage.appendChild(cursors[i]);
      inDock[i] = false;
      place(i, r.left - o.x, r.top - o.y);
    };
    const toDock = (i: number) => {
      const r = cursors[i].getBoundingClientRect();
      dock.appendChild(cursors[i]);
      inDock[i] = true;
      place(i, r.left, r.top);
    };

    const add = (
      ctx: Ctx,
      el: Element,
      keyframes: Record<string, number | string | (number | string)[]>,
      at: number,
      duration: number,
      ease: Ease = EASE,
    ) => ctx.seq.push([el, keyframes, { at, duration, ease }]);
    const used = new Set<number>();
    const settle = new Map<number, Controls>();
    const move = (
      ctx: Ctx,
      i: number,
      x: number,
      y: number,
      at: number,
      duration = 0.45,
      ease: Ease = EASE,
    ) => {
      let start = at;
      if (!used.has(i)) {
        settle.get(i)?.stop();
        settle.delete(i);
        syncStage(i);
        used.add(i);
        const far = Math.hypot(x - pos[i].x, y - pos[i].y);
        start = Math.max(0, at - Math.min(0.55, far / 1800));
      }
      const distance = Math.hypot(x - pos[i].x, y - pos[i].y);
      if (ease === EASE && distance > 320) ease = GLIDE;
      add(ctx, cursors[i], { x: [pos[i].x, x], y: [pos[i].y, y] }, start, duration + (at - start), ease);
      pos[i] = { x, y };
    };
    const spark = (ctx: Ctx, i: number, at: number) => {
      const el = helper(ctx, styles.spark);
      add(ctx, el, { x: [pos[i].x, pos[i].x], y: [pos[i].y, pos[i].y] }, at, 0.01, "linear");
      add(ctx, el, { scale: [0.2, 1.7], opacity: [0, 1, 0] }, at, 0.4, "easeOut");
    };
    const burst = (ctx: Ctx, el: HTMLElement, at: number) => {
      const trigger = motionValue(0);
      let fired = false;
      ctx.disposers.push(
        trigger.on("change", (v) => {
          if (v < 1 || fired) return;
          fired = true;
          el.classList.remove("cursor-glitch");
          void el.offsetWidth;
          el.classList.add("cursor-glitch");
          window.setTimeout(() => el.classList.remove("cursor-glitch"), 380);
        }),
      );
      ctx.seq.push([trigger, [0, 1], { at, duration: 0.01, ease: "linear" }]);
    };
    const press = (ctx: Ctx, i: number, at: number) => {
      add(ctx, presses[i], { scale: [1, 0.8, 1] }, at, 0.16, "linear");
      spark(ctx, i, at + 0.04);
    };
    const down = (ctx: Ctx, i: number, at: number) => {
      add(ctx, presses[i], { scale: [1, 0.82] }, at, 0.08, "linear");
      spark(ctx, i, at + 0.02);
    };
    const up = (ctx: Ctx, i: number, at: number) =>
      add(ctx, presses[i], { scale: [0.82, 1] }, at, 0.08, "linear");
    const helper = (ctx: Ctx, className: string) => {
      const el = document.createElement("div");
      el.className = className;
      ctx.helpers.appendChild(el);
      return el;
    };
    const frame = (ctx: Ctx) => {
      const el = helper(ctx, styles.frame);
      el.style.animationDuration = `${1.4 + Math.random() * 1.2}s`;
      el.style.animationDelay = `${-Math.random() * 2}s`;
      for (let k = 0; k < 4; k++) el.appendChild(document.createElement("span"));
      return el;
    };
    const showFrame = (ctx: Ctx, f: HTMLElement, at: number) =>
      add(ctx, f, { opacity: [0, 1] }, at, 0.05, "linear");
    const hideFrame = (ctx: Ctx, f: HTMLElement, at: number) =>
      add(ctx, f, { opacity: 0 }, at, 0.2, "linear");
    const hide = (ctx: Ctx, el: HTMLElement) => {
      el.style.opacity = "0";
      ctx.touched.push(el);
    };

    const lineBoxes = (el: HTMLElement) => {
      const base = el.getBoundingClientRect();
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const rects: DOMRect[] = [];
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent?.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        rects.push(...Array.from(range.getClientRects()));
      }
      rects.sort((a, b) => a.top - b.top);
      rects.splice(0, rects.length, ...rects.filter((r) => r.width > 0 && r.height > 0));
      const lines: { left: number; right: number; top: number; bottom: number }[] = [];
      rects.forEach((r) => {
        const last = lines[lines.length - 1];
        const top = r.top - base.top;
        if (last && Math.abs(top - last.top) < (last.bottom - last.top) * 0.5) {
          last.left = Math.min(last.left, r.left - base.left);
          last.right = Math.max(last.right, r.right - base.left);
          last.bottom = Math.max(last.bottom, r.bottom - base.top);
        } else {
          lines.push({
            left: r.left - base.left,
            right: r.right - base.left,
            top,
            bottom: r.bottom - base.top,
          });
        }
      });
      return lines;
    };

    const typeAction = (ctx: Ctx, el: HTMLElement, i: number, at: number) => {
      const b = doc(el);
      const lines = lineBoxes(el);
      if (!lines.length) return popAction(ctx, el, i, at);
      const widths = lines.map((l) => l.right - l.left);
      const total = widths.reduce((sum, w) => sum + w, 0);
      const length = Math.max(1, (el.textContent ?? "").replace(/\s+/g, "").length);
      const duration = Math.min(1.8, Math.max(0.45, length * 0.045));
      const caret = helper(ctx, styles.caret);
      const progress = motionValue(0);
      const caretAt = (p: number) => {
        const stepped = Math.floor(p * length + 0.001) / length;
        let rest = stepped * total;
        let k = 0;
        while (k < lines.length - 1 && rest > widths[k]) {
          rest -= widths[k];
          k++;
        }
        const line = lines[k];
        return { x: line.left + Math.min(rest, widths[k]), line };
      };
      const render = (p: number) => {
        const { x, line } = caretAt(p);
        el.style.clipPath = `polygon(-40px -40px, calc(100% + 40px) -40px, calc(100% + 40px) ${line.top}px, ${x}px ${line.top}px, ${x}px ${line.bottom}px, -40px ${line.bottom}px)`;
        caret.style.transform = `translate(${b.left + x}px, ${b.top + line.top}px)`;
        caret.style.height = `${line.bottom - line.top}px`;
      };
      render(0);
      ctx.disposers.push(progress.on("change", render));
      ctx.touched.push(el);

      const follow = (p: number) => {
        const { x, line } = caretAt(p);
        return { x: b.left + x + 10, y: b.top + line.top + (line.bottom - line.top) * 0.85 };
      };
      const first = follow(0);
      move(ctx, i, first.x, first.y, at, 0.5);
      press(ctx, i, at + 0.55);
      add(ctx, caret, { opacity: [0, 1] }, at + 0.58, 0.01, "linear");
      const start = at + 0.65;
      ctx.seq.push([progress, [0, 1], { at: start, duration, ease: "linear" }]);
      const step = 0.09;
      for (let t = step; t < duration + step / 2; t += step) {
        const p = Math.min(1, t / duration);
        const next = follow(p);
        move(ctx, i, next.x, next.y, start + t - step, step, "linear");
      }
      const done = start + duration;
      add(ctx, caret, { opacity: [1, 0, 1, 0] }, done + 0.05, 0.6, "linear");
      burst(ctx, el, done + 0.02);
      return { done: done + 0.2, free: done + 0.1 };
    };

    const boxAction = (ctx: Ctx, el: HTMLElement, i: number, at: number, grow: boolean) => {
      const b = doc(el);
      const s = grow ? 0.7 : 1;
      const f = frame(ctx);
      const drawing = motionValue(0);
      const clip = (p: number) => {
        const cut = `calc(${(1 - p) * 100}% - ${p * 40}px)`;
        el.style.clipPath = `inset(-40px ${cut} ${cut} -40px)`;
      };
      clip(0);
      ctx.disposers.push(drawing.on("change", clip));
      ctx.touched.push(el);
      if (grow) {
        el.style.transformOrigin = "0 0";
        el.style.transform = `scale(${s})`;
      }
      move(ctx, i, b.left, b.top, at, 0.5);
      down(ctx, i, at + 0.52);
      add(ctx, f, { x: [b.left, b.left], y: [b.top, b.top], backgroundColor: [TINT, TINT] }, at + 0.55, 0.01, "linear");
      showFrame(ctx, f, at + 0.55);
      add(ctx, f, { width: [0, b.width * s], height: [0, b.height * s] }, at + 0.55, 0.6);
      ctx.seq.push([drawing, [0, 1], { at: at + 0.55, duration: 0.6, ease: EASE }]);
      if (grow) add(ctx, el, { scale: [s, s] }, at + 0.55, 0.01, "linear");
      move(ctx, i, b.left + b.width * s, b.top + b.height * s, at + 0.55, 0.6);
      up(ctx, i, at + 1.17);
      add(ctx, f, { backgroundColor: CLEAR }, at + 1.15, 0.3, "linear");
      burst(ctx, el, at + 1.15);
      if (!grow) {
        hideFrame(ctx, f, at + 1.3);
        return { done: at + 1.3, free: at + 1.25 };
      }
      down(ctx, i, at + 1.4);
      add(ctx, el, { scale: 1 }, at + 1.48, 0.6);
      add(ctx, f, { width: b.width, height: b.height }, at + 1.48, 0.6);
      move(ctx, i, b.right, b.bottom, at + 1.48, 0.6);
      up(ctx, i, at + 2.1);
      burst(ctx, el, at + 2.1);
      hideFrame(ctx, f, at + 2.2);
      return { done: at + 2.15, free: at + 2.15 };
    };

    const popAction = (ctx: Ctx, el: HTMLElement, i: number, at: number) => {
      const b = doc(el);
      hide(ctx, el);
      const cx = b.left + b.width / 2;
      const cy = b.top + b.height / 2;
      move(ctx, i, cx + 6, cy + 8, at, 0.5);
      press(ctx, i, at + 0.6);
      add(ctx, el, { opacity: [0, 1] }, at + 0.7, 0.25, "linear");
      add(ctx, el, { scale: [0.55, 1] }, at + 0.7, 0.55, POP);
      burst(ctx, el, at + 0.72);
      move(ctx, i, cx + 26, cy + 30, at + 0.8, 0.5);
      return { done: at + 1.25, free: at + 0.9 };
    };

    const dupAction = (ctx: Ctx, el: HTMLElement, src: HTMLElement, i: number, at: number) => {
      const sb = doc(src);
      const b = doc(el);
      const ghost = src.cloneNode(true) as HTMLElement;
      [ghost, ...Array.from(ghost.querySelectorAll<HTMLElement>("*"))].forEach((n) => {
        ["data-draw", "data-drawn", "data-group", "data-scene"].forEach((a) => n.removeAttribute(a));
        ["opacity", "clip-path", "transform", "transform-origin"].forEach((p) => n.style?.removeProperty(p));
      });
      ghost.classList.add(styles.ghost);
      ghost.style.width = `${sb.width}px`;
      ghost.style.height = `${sb.height}px`;
      ctx.helpers.appendChild(ghost);
      const f = frame(ctx);
      hide(ctx, el);

      move(ctx, i, sb.left + sb.width / 2, sb.top + sb.height / 2, at);
      down(ctx, i, at + 0.47);
      showFrame(ctx, f, at + 0.5);
      add(ctx, ghost, { x: [sb.left, sb.left], y: [sb.top, sb.top], opacity: [0, 0.55] }, at + 0.5, 0.08, "linear");
      add(ctx, ghost, { x: b.left, y: b.top, width: b.width, height: b.height }, at + 0.56, 0.55);
      add(ctx, f, { x: [sb.left, b.left], y: [sb.top, b.top], width: [sb.width, b.width], height: [sb.height, b.height] }, at + 0.56, 0.55);
      move(ctx, i, b.left + b.width / 2, b.top + b.height / 2, at + 0.56, 0.55);
      up(ctx, i, at + 1.13);
      add(ctx, ghost, { opacity: 0 }, at + 1.15, 0.3, "linear");
      add(ctx, el, { opacity: [0, 1] }, at + 1.15, 0.3, "linear");
      burst(ctx, el, at + 1.2);
      hideFrame(ctx, f, at + 1.3);
      return { done: at + 1.45, free: at + 1.2 };
    };

    const buildGeneric = (ctx: Ctx, els: HTMLElement[]) => {
      const free = cursors.map(() => 0);
      const doneOf = new Map<HTMLElement, number>();
      const firstOf = new Map<string, HTMLElement>();
      let base = 0.55 - STAGGER;
      els.forEach((el) => {
        const kind = el.dataset.draw!;
        const group = el.dataset.group;
        let src: HTMLElement | undefined;
        if (group) {
          if (firstOf.has(group)) src = firstOf.get(group);
          else firstOf.set(group, el);
        }
        base += STAGGER;
        let c = 0;
        free.forEach((f, k) => {
          if (f < free[c]) c = k;
        });
        let at = Math.max(base, free[c]);
        if (kind === "dup" && src) at = Math.max(at, doneOf.get(src) ?? 0);
        doneOf.forEach((t, other) => {
          if (other !== el && other.contains(el)) at = Math.max(at, t - 0.2);
        });
        const r =
          kind === "type"
            ? typeAction(ctx, el, c, at)
            : kind === "pop"
              ? popAction(ctx, el, c, at)
              : kind === "dup" && src
                ? dupAction(ctx, el, src, c, at)
                : boxAction(ctx, el, c, at, kind === "grow");
        free[c] = r.free;
        doneOf.set(el, r.done);
      });
      markDrawn(els);
    };

    const buildKeywords = (ctx: Ctx, root: HTMLElement) => {
      const tracks = Array.from(root.children) as HTMLElement[];
      const spans = tracks.flatMap((t) => Array.from(t.querySelectorAll<HTMLElement>("span")));
      if (tracks.length < 2 || !spans.length) {
        markDrawn([root]);
        return;
      }

      tracks.forEach((t) => {
        t.style.animation = "none";
        void t.offsetWidth;
        t.style.removeProperty("animation");
        t.style.animationPlayState = "paused";
      });
      spans.forEach((el) => hide(ctx, el));
      const band = boxAction(ctx, root, 0, 0.5, false);
      markDrawn([root]);

      const vw = window.innerWidth;
      const o = origin();
      const shown = spans.filter((el) => {
        const r = el.getBoundingClientRect();
        return r.right > 0 && r.left < vw;
      });
      const first = shown[0];
      const fb = doc(first);
      const look = getComputedStyle(first);
      const pill = (b: Box) => {
        const el = helper(ctx, styles.ghost);
        el.style.width = `${b.width}px`;
        el.style.height = `${b.height}px`;
        el.style.border = `${look.borderTopWidth} solid ${look.borderTopColor}`;
        el.style.borderRadius = look.borderTopLeftRadius;
        return el;
      };

      const t0 = band.done - 0.1;
      const f = frame(ctx);
      move(ctx, 1, fb.left, fb.top, t0 - 0.45);
      down(ctx, 1, t0 + 0.02);
      add(ctx, f, { x: [fb.left, fb.left], y: [fb.top, fb.top], backgroundColor: [TINT, TINT] }, t0 + 0.05, 0.01, "linear");
      showFrame(ctx, f, t0 + 0.05);
      add(ctx, f, { width: [0, fb.width], height: [0, fb.height] }, t0 + 0.05, 0.4);
      move(ctx, 1, fb.right, fb.bottom, t0 + 0.05, 0.4);
      up(ctx, 1, t0 + 0.47);
      const base = pill(fb);
      add(ctx, base, { x: [fb.left, fb.left], y: [fb.top, fb.top], opacity: [0, 1] }, t0 + 0.5, 0.15, "linear");
      hideFrame(ctx, f, t0 + 0.55);

      const t1 = t0 + 0.75;
      const pad = 6;
      move(ctx, 1, fb.left + fb.width * 0.55, fb.top + fb.height * 0.6, t1 - 0.25, 0.25);
      press(ctx, 1, t1);

      const copies = shown.slice(1).map((el) => ({ el, b: doc(el), g: pill(doc(el)) }));
      const row1 = copies.filter(({ el }) => tracks[0].contains(el));
      const row2 = copies.filter(({ el }) => tracks[1].contains(el));
      const firstRow = [fb, ...row1.map(({ b }) => b)];
      const rowBox = {
        left: Math.max(4, Math.min(...firstRow.map((b) => b.left)) - pad),
        top: Math.min(...firstRow.map((b) => b.top)) - pad,
        right: Math.min(vw - o.x - 28, Math.max(...firstRow.map((b) => b.right)) + pad),
        bottom: Math.max(...firstRow.map((b) => b.bottom)) + pad,
      };
      const key = (at: number, x: number, y: number) => {
        const el = helper(ctx, styles.key);
        el.textContent = "⌘ D";
        add(ctx, el, { x: [x - 64, x - 64], y: [y + 16, y + 16] }, at, 0.01, "linear");
        add(ctx, el, { opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 0.95] }, at, 0.55, "linear");
      };
      const selected = frame(ctx);
      const startW = fb.right + pad - rowBox.left;
      const startH = rowBox.bottom - rowBox.top;
      add(ctx, selected, { x: [rowBox.left, rowBox.left], y: [rowBox.top, rowBox.top], width: [startW, startW], height: [startH, startH], backgroundColor: [CLEAR, CLEAR] }, t1 + 0.08, 0.01, "linear");
      showFrame(ctx, selected, t1 + 0.08);

      const grab = t1 + 0.55;
      move(ctx, 1, rowBox.left + startW, rowBox.bottom, grab - 0.3, 0.3);
      down(ctx, 1, grab);
      const stretch = 0.85;
      add(ctx, selected, { backgroundColor: TINT }, grab + 0.04, 0.12, "linear");
      add(ctx, selected, { width: rowBox.right - rowBox.left }, grab + 0.04, stretch, GLIDE);
      move(ctx, 1, rowBox.right, rowBox.bottom, grab + 0.04, stretch, GLIDE);
      up(ctx, 1, grab + stretch + 0.06);
      add(ctx, selected, { backgroundColor: CLEAR }, grab + stretch + 0.1, 0.2, "linear");

      const k1 = grab + stretch + 0.3;
      key(k1, rowBox.right, rowBox.bottom);
      press(ctx, 1, k1 + 0.05);
      row1.forEach(({ b, g }, k) => {
        const at = k1 + 0.15 + k * 0.012;
        add(ctx, g, { x: [b.left, b.left], y: [b.top, b.top], opacity: [0, 1] }, at, 0.1, "linear");
        add(ctx, g, { scale: [0.85, 1] }, at, 0.25, POP);
      });
      burst(ctx, tracks[0], k1 + 0.2);

      const lower = row2.length ? Math.min(...row2.map(({ b }) => b.top)) - fb.top : 0;
      const k2 = k1 + 0.9;
      key(k2, rowBox.right, rowBox.bottom);
      press(ctx, 1, k2 + 0.05);
      row2.forEach(({ b, g }, k) => {
        const at = k2 + 0.15 + k * 0.012;
        add(ctx, g, { x: [b.left, b.left], y: [b.top - lower, b.top], opacity: [0, 1] }, at, 0.32, GLIDE);
      });
      add(ctx, selected, { y: rowBox.top + lower }, k2 + 0.15, 0.32, GLIDE);
      move(ctx, 1, rowBox.right, rowBox.bottom + lower, k2 + 0.15, 0.32, GLIDE);
      burst(ctx, tracks[1], k2 + 0.4);
      hideFrame(ctx, selected, k2 + 0.65);
      const pasted = k2 + 0.6;

      const t2 = pasted + 0.05;
      spans
        .filter((el) => !shown.includes(el))
        .forEach((el) => add(ctx, el, { opacity: [0, 1] }, t2, 0.01, "linear"));
      const ghostOf = new Map<HTMLElement, HTMLElement>([[first, base], ...copies.map(({ el, g }) => [el, g] as [HTMLElement, HTMLElement])]);
      const typists = [1, 2, 3, 4, 5, 6];
      const perRow = typists.length / 2;
      let typedAll = t2;
      tracks.slice(0, 2).forEach((track, row) => {
        const own = shown.filter((el) => track.contains(el));
        const size = Math.ceil(own.length / perRow);
        for (let k = 0; k < perRow; k++) {
          const who = typists[row * perRow + k];
          const chunk = own.slice(k * size, (k + 1) * size);
          const caret = helper(ctx, styles.caret);
          let at = t2 + k * 0.12 + row * 0.06;
          chunk.forEach((el) => {
            const b = doc(el);
            const chars = Math.max(1, (el.textContent ?? "").trim().length);
            const duration = Math.min(0.7, Math.max(0.25, chars * 0.075));
            const padX = parseFloat(look.paddingLeft) || 0;
            const inner = b.width - padX * 2;
            const progress = motionValue(0);
            const edge = (p: number) => padX + (Math.floor(p * chars + 0.001) / chars) * inner;
            const render = (p: number) => {
              const x = p >= 1 ? b.width : edge(p);
              el.style.clipPath = `inset(-10px ${b.width - x}px -10px -10px)`;
              caret.style.transform = `translate(${b.left + Math.min(x, b.width - padX)}px, ${b.top + b.height * 0.2}px)`;
              caret.style.height = `${b.height * 0.6}px`;
            };
            render(0);
            ctx.disposers.push(progress.on("change", render));
            const sx = b.left + padX + 10;
            const sy = b.top + b.height * 0.75;
            move(ctx, who, sx, sy, at - 0.28, 0.28);
            press(ctx, who, at);
            add(ctx, el, { opacity: [0, 1] }, at + 0.04, 0.01, "linear");
            add(ctx, caret, { opacity: 1 }, at + 0.04, 0.01, "linear");
            const begin = at + 0.06;
            ctx.seq.push([progress, [0, 1], { at: begin, duration, ease: "linear" }]);
            const step = 0.08;
            for (let t = step; t < duration + step / 2; t += step) {
              const x = edge(Math.min(1, t / duration));
              move(ctx, who, b.left + x + 10, sy, begin + t - step, step, "linear");
            }
            const end = begin + duration;
            add(ctx, caret, { opacity: 0 }, end + 0.02, 0.01, "linear");
            const g = ghostOf.get(el);
            if (g) add(ctx, g, { opacity: 0 }, end + 0.05, 0.01, "linear");
            at = end + 0.32;
            typedAll = Math.max(typedAll, end);
          });
        }
      });
      shown.forEach((el) => {
        el.style.clipPath = "inset(-10px 100% -10px -10px)";
      });

      const t3 = typedAll + 0.6;
      const rows = tracks.slice(0, 2).map((t, k) => {
        const r = doc(t);
        const y = r.top + r.height / 2;
        const x = Math.min(vw - o.x - 200, r.left + vw * (k ? 0.62 : 0.38) - o.x);
        return { t, x, y, dir: k ? 1 : -1, drag: motionValue(0) };
      });
      rows.forEach(({ t, x, y, dir, drag }, k) => {
        const c = 2 + k;
        ctx.disposers.push(drag.on("change", (v) => (t.style.translate = `${v}px 0`)));
        move(ctx, c, x, y, t3 - 0.4, 0.4);
        down(ctx, c, t3);
        ctx.seq.push([drag, [0, dir * 70], { at: t3 + 0.05, duration: 0.35, ease: EASE }]);
        move(ctx, c, x + dir * 70, y, t3 + 0.05, 0.35);
        up(ctx, c, t3 + 0.42);
        ctx.seq.push([drag, [dir * 70, 0], { at: t3 + 0.45, duration: 0.7, ease: "easeOut" }]);
        move(ctx, c, x + dir * 120, y + 40, t3 + 0.5, 0.5);
      });
      const go = motionValue(0);
      ctx.disposers.push(
        go.on("change", (v) => {
          if (v < 1) return;
          tracks.forEach((t) => t.style.removeProperty("animation-play-state"));
        }),
      );
      ctx.seq.push([go, [0, 1], { at: t3 + 0.44, duration: 0.01, ease: "linear" }]);
      burst(ctx, root, t3 + 0.44);
      ctx.touched.push(...tracks);
      ctx.disposers.push(() =>
        tracks.forEach((t) => {
          t.style.removeProperty("translate");
          t.style.removeProperty("animation-play-state");
        }),
      );
    };

    const buildHero = (ctx: Ctx, root: HTMLElement) => {
      const find = (name: string) => root.querySelector<HTMLElement>(`[data-draw="${name}"]`);
      const title1 = find("title1");
      const title2 = find("title2");
      const profile = find("profile");
      const hint = find("hint");
      const parts = Array.from(root.querySelectorAll<HTMLElement>("[data-draw]"));
      if (!title1 || !title2 || !profile || !hint) {
        markDrawn(parts);
        return;
      }

      [title1.parentElement, profile]
        .flatMap((el) => el?.getAnimations({ subtree: true }) ?? [])
        .filter((a) => a.effect?.getTiming().iterations !== Infinity)
        .forEach((a) => a.finish());

      const chars1 = Array.from(title1.querySelectorAll<HTMLElement>("span span"));
      const chars2 = Array.from(title2.querySelectorAll<HTMLElement>("span span"));
      const o = origin();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const span = (chars: HTMLElement[]) => {
        const a = doc(chars[0]);
        const z = doc(chars[chars.length - 1]);
        return { left: a.left, top: Math.min(a.top, z.top), right: z.right, bottom: Math.max(a.bottom, z.bottom) };
      };
      const t1 = span(chars1);
      const t2 = span(chars2);
      const p1 = doc(title1);
      const dy = doc(title2).top - p1.top;
      const rp = doc(profile);
      const hintText = doc(hint.firstElementChild ?? hint);
      const hintVisible = hintText.top + o.y < vh - 10;

      const clone = title1.cloneNode(true) as HTMLElement;
      clone.removeAttribute("data-draw");
      clone.removeAttribute("data-drawn");
      clone.classList.add(styles.ghost);
      clone.style.width = `${t1.right - p1.left + 8}px`;
      clone.style.whiteSpace = "nowrap";
      ctx.helpers.appendChild(clone);

      [...chars1, ...chars2, profile, ...(hintVisible ? [hint] : [])].forEach((el) => hide(ctx, el));
      markDrawn(parts);

      const starts = [
        [-40, vh * 0.3],
        [-40, vh * 0.75],
        [vw + 40, vh * 0.2],
        [vw + 40, vh * 0.85],
        [vw * 0.5, vh + 40],
        [vw * 0.25, -40],
        [vw * 0.7, -40],
        [vw * 0.9, vh + 40],
      ];
      starts.forEach(([x, y], i) => {
        if (inDock[i]) return;
        place(i, x - o.x, y - o.y);
      });

      const caret = helper(ctx, styles.caret);
      const type = (chars: HTMLElement[], start: number, step: number, who: number) => {
        chars.forEach((c, i) => {
          const at = start + i * step;
          const cb = doc(c);
          add(ctx, c, { opacity: [0, 1] }, at, 0.04, "linear");
          add(ctx, caret, { x: cb.right + 2 }, at, 0.05, "linear");
          move(ctx, who, cb.right + 12, cb.top + cb.height * 0.85, at, step, "linear");
        });
        return start + chars.length * step;
      };

      move(ctx, 0, t1.left - 4, (t1.top + t1.bottom) / 2, 0.05, 0.6);
      press(ctx, 0, 0.65);
      add(ctx, caret, { x: [t1.left, t1.left], y: [t1.top, t1.top], height: [t1.bottom - t1.top, t1.bottom - t1.top] }, 0.7, 0.01, "linear");
      add(ctx, caret, { opacity: [0, 1] }, 0.7, 0.01, "linear");
      const typed1 = type(chars1, 0.78, 0.085, 0);
      add(ctx, caret, { opacity: 0 }, typed1 + 0.12, 0.01, "linear");
      burst(ctx, title1, typed1 + 0.05);
      move(ctx, 0, t1.right + 36, t1.top - 24, typed1 + 0.1, 0.6);

      const mid = { x: (t1.left + t1.right) / 2, y: (t1.top + t1.bottom) / 2 };
      const ft = { x: t1.left - 10, y: t1.top - 8, w: t1.right - t1.left + 20, h: t1.bottom - t1.top + 16 };
      const frameTitle = frame(ctx);
      move(ctx, 1, t1.left - 50, t1.bottom + 60, 0.1, 0.7);
      move(ctx, 1, mid.x, mid.y, 1.2, 0.3);
      add(ctx, frameTitle, { x: [ft.x, ft.x], y: [ft.y, ft.y], width: [ft.w, ft.w], height: [ft.h, ft.h] }, 1.5, 0.01, "linear");
      showFrame(ctx, frameTitle, 1.5);
      down(ctx, 1, 1.5);
      add(ctx, clone, { x: [p1.left, p1.left], y: [p1.top, p1.top], opacity: [0, 0.45], backgroundColor: [CLEAR, CLEAR] }, 1.6, 0.1, "linear");
      add(ctx, clone, { y: p1.top + dy }, 1.62, 0.5);
      add(ctx, frameTitle, { y: ft.y + dy }, 1.62, 0.5);
      move(ctx, 1, mid.x, mid.y + dy, 1.62, 0.5);
      up(ctx, 1, 2.15);
      add(ctx, clone, { opacity: 1 }, 2.15, 0.1, "linear");
      press(ctx, 1, 2.3);
      press(ctx, 1, 2.46);
      add(ctx, clone, { backgroundColor: "rgba(236, 73, 49, 0.2)" }, 2.46, 0.08, "linear");
      add(ctx, clone, { opacity: 0 }, 2.64, 0.04, "linear");
      hideFrame(ctx, frameTitle, 2.64);
      add(ctx, caret, { x: t2.left, y: t2.top, height: t2.bottom - t2.top }, 2.64, 0.01, "linear");
      add(ctx, caret, { opacity: 1 }, 2.64, 0.01, "linear");
      move(ctx, 1, t2.left + 10, t2.top + (t2.bottom - t2.top) * 0.85, 2.5, 0.16);
      const typed2 = type(chars2, 2.68, 0.08, 1);
      add(ctx, caret, { opacity: 0 }, typed2 + 0.12, 0.01, "linear");
      burst(ctx, title2, typed2 + 0.05);

      const s0 = 0.72;
      const w = rp.width;
      const h = rp.height;
      profile.style.transformOrigin = "0 0";
      const frameProfile = frame(ctx);
      move(ctx, 2, rp.left, rp.top, 0.1, 0.6);
      down(ctx, 2, 0.72);
      add(ctx, frameProfile, { x: [rp.left, rp.left], y: [rp.top, rp.top], backgroundColor: [TINT, TINT] }, 0.8, 0.01, "linear");
      showFrame(ctx, frameProfile, 0.8);
      add(ctx, frameProfile, { width: [0, w * s0], height: [0, h * s0] }, 0.8, 0.55);
      move(ctx, 2, rp.left + w * s0, rp.top + h * s0, 0.8, 0.55);
      up(ctx, 2, 1.38);
      add(ctx, profile, { opacity: [0, 1], scale: [s0, s0] }, 1.4, 0.3, "linear");
      add(ctx, frameProfile, { backgroundColor: CLEAR }, 1.4, 0.3, "linear");
      move(ctx, 2, rp.left - 50, rp.top + h * 0.45, 1.5, 0.6);

      move(ctx, 3, rp.right + 60, rp.top + h * 0.85, 0.2, 0.8);
      move(ctx, 3, rp.left + w * s0, rp.top + h * s0, 1.55, 0.35);
      down(ctx, 3, 1.92);
      add(ctx, profile, { scale: 1 }, 1.98, 0.6);
      add(ctx, frameProfile, { width: w, height: h }, 1.98, 0.6);
      move(ctx, 3, rp.right, rp.bottom, 1.98, 0.6);
      up(ctx, 3, 2.62);
      burst(ctx, profile, 2.62);
      hideFrame(ctx, frameProfile, 2.85);
      move(ctx, 3, rp.right + 44, rp.top + 30, 2.75, 0.6);

      if (hintVisible) {
        const hx = (hintText.left + hintText.right) / 2;
        const hy = (hintText.top + hintText.bottom) / 2;
        const lift = 90;
        add(ctx, hint, { opacity: [0, 1], y: [lift, lift] }, 2.2, 0.2, "linear");
        move(ctx, 4, hx + 4, hy + lift, 1.9, 0.5);
        down(ctx, 4, 2.45);
        add(ctx, hint, { y: 0 }, 2.55, 0.45);
        move(ctx, 4, hx + 4, hy, 2.55, 0.45);
        up(ctx, 4, 3.02);
        move(ctx, 4, hx + 70, hy - 30, 3.15, 0.5);
      } else {
        move(ctx, 4, vw * 0.5 - o.x, vh * 0.8 - o.y, 0.4, 0.8);
      }

      const area = {
        left: Math.min(t1.left, rp.left) - 28,
        top: Math.min(t1.top, rp.top) - 28,
        right: Math.max(t1.right, t2.right, rp.right) + 28,
        bottom: Math.max(t2.bottom, rp.bottom) + 28,
      };
      const frameAll = frame(ctx);
      move(ctx, 5, area.left - 40, area.top - 40, 0.3, 0.8);
      move(ctx, 5, area.left, area.top, 3.15, 0.3);
      down(ctx, 5, 3.46);
      add(ctx, frameAll, { x: [area.left, area.left], y: [area.top, area.top], backgroundColor: [TINT, TINT] }, 3.5, 0.01, "linear");
      showFrame(ctx, frameAll, 3.5);
      add(ctx, frameAll, { width: [0, area.right - area.left], height: [0, area.bottom - area.top] }, 3.5, 0.5);
      move(ctx, 5, area.right, area.bottom, 3.5, 0.5);
      up(ctx, 5, 4.02);
      hideFrame(ctx, frameAll, 4.1);

      move(ctx, 6, t1.right + 60, t1.top - 40, 0.15, 0.7);
      move(ctx, 6, t1.left + 80, t2.bottom + 40, 1.3, 0.7);
      move(ctx, 6, rp.left - 30, rp.top + 50, 2.3, 0.7);
      move(ctx, 7, rp.right + 30, rp.bottom - 30, 0.25, 0.75);
      move(ctx, 7, rp.left + w * 0.5, rp.bottom + 34, 1.25, 0.7);
      move(ctx, 7, t2.right + 56, t2.top + 20, 2.4, 0.7);
    };

    const order = (a: HTMLElement, b: HTMLElement) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    const sections: Section[] = [];
    document.querySelectorAll<HTMLElement>("[data-scene]").forEach((root) => {
      const name = root.dataset.scene!;
      let section = sections.find((x) => x.name === name);
      if (!section) {
        section = { name, roots: [], els: [] };
        sections.push(section);
      }
      section.roots.push(root);
      section.els.push(
        ...(root.hasAttribute("data-draw") ? [root] : []),
        ...Array.from(root.querySelectorAll<HTMLElement>("[data-draw]")),
      );
    });
    const done = new Set<string>();
    let running: Running | null = null;
    let pull = 0;
    let skip = 0;

    const vh = () => window.innerHeight;
    const maxScroll = () => document.documentElement.scrollHeight - vh();
    const atBottom = () => window.scrollY >= maxScroll() - 4;
    const rectOf = (section: Section) => {
      const rects = section.roots.map((el) => el.getBoundingClientRect());
      const top = Math.min(...rects.map((x) => x.top));
      const bottom = Math.max(...rects.map((x) => x.bottom));
      return { top, bottom, height: bottom - top };
    };
    const snapOf = (section: Section) => {
      const r = rectOf(section);
      const offset = r.height < vh() - 160 ? (vh() - r.height) / 2 + 30 : 110;
      return Math.round(Math.min(maxScroll(), Math.max(0, window.scrollY + r.top - offset)));
    };
    const clearStyles = (els: HTMLElement[]) =>
      els.forEach((el) =>
        ["opacity", "clip-path", "transform", "transform-origin", "will-change", "translate"].forEach((p) =>
          el.style.removeProperty(p),
        ),
      );
    const sweep = () =>
      all.forEach((el) => {
        if (!el.hasAttribute("data-drawn")) return;
        if (running?.section.els.includes(el)) return;
        if (el.style.clipPath || el.style.opacity) clearStyles([el]);
      });
    const finish = (section: Section) => {
      markDrawn(section.els);
      done.add(section.name);
    };
    const endOf = (seq: AnimationSequence) =>
      seq.reduce((m, seg) => {
        const opts = (seg as unknown[])[2] as { at?: number; duration?: number } | undefined;
        return Math.max(m, (opts?.at ?? 0) + (opts?.duration ?? 0));
      }, 0);

    const fastForward = () => {
      if (!running) return;
      running.ctx.helpers.style.visibility = "hidden";
      if (running.controls.speed < 10) running.controls.speed = 10;
    };

    let snapping: Section | null = null;
    let stay = true;
    const play = (section: Section) => {
      const isHero = section.name === "hero";
      const snap = isHero || stay ? window.scrollY : snapOf(section);
      stay = false;
      if (Math.abs(snap - window.scrollY) <= 2) {
        begin(section, snap);
        return;
      }
      snapping = section;
      pull = 0;
      skip = 0;
      window.scrollTo({ top: snap, behavior: "smooth" });
      const startedAt = performance.now();
      const wait = () => {
        if (!alive) return;
        if (Math.abs(window.scrollY - snap) < 1.5 || performance.now() - startedAt > 1100) {
          snapping = null;
          begin(section, window.scrollY);
        } else requestAnimationFrame(wait);
      };
      requestAnimationFrame(wait);
    };

    const begin = (section: Section, snap: number) => {
      stopFollow();
      used.clear();
      const isHero = section.name === "hero";
      const helpers = document.createElement("div");
      stage.appendChild(helpers);
      const ctx: Ctx = { seq: [], helpers, touched: [], disposers: [] };
      const root = section.roots[0];
      if (isHero) buildHero(ctx, root);
      else if (section.name === "keywords") buildKeywords(ctx, root);
      else buildGeneric(ctx, section.els.filter((el) => ACTIONS.has(el.dataset.draw ?? "")).sort(order));
      finish(section);
      if (!ctx.seq.length) {
        helpers.remove();
        return;
      }

      const o = origin();
      const stageTop = o.y + window.scrollY;
      const end = endOf(ctx.seq);
      const usedNow = Array.from(used);
      usedNow.forEach((i, k) => {
        const spot = dockSpot(i);
        move(ctx, i, spot.x - o.x, spot.y + snap - stageTop, end + 0.15 + k * 0.05, 0.75);
      });

      const controls = animate(ctx.seq);
      running = { section, controls, ctx, snap, used: usedNow };
      if (skip) fastForward();
      controls.then(() => {
        if (!alive) return;
        clearStyles([...ctx.touched, ...section.els]);
        ctx.disposers.forEach((d) => d());
        helpers.remove();
        usedNow.forEach((i) => {
          toDock(i);
          const spot = dockSpot(i);
          if (Math.abs(pos[i].x - spot.x) + Math.abs(pos[i].y - spot.y) > 2) {
            settle.set(
              i,
              animate(cursors[i], { x: [pos[i].x, spot.x], y: [pos[i].y, spot.y] }, { duration: 0.5, ease: EASE }),
            );
            pos[i] = spot;
          }
        });
        running = null;
        sweep();
        const direction = skip;
        skip = 0;
        pull = 0;
        if (direction > 0) {
          const next = sections.find(
            (x) => !done.has(x.name) && order(section.roots[0], x.roots[0]) < 0,
          );
          if (next) window.scrollTo({ top: snapOf(next), behavior: "smooth" });
        }
        check();
      });
    };

    const check = () => {
      if (running || snapping) return;
      sections.forEach((section) => {
        if (!done.has(section.name) && rectOf(section).bottom <= 0) finish(section);
      });
      const limit = vh() * 0.62;
      const next = sections.find((section) => {
        if (done.has(section.name)) return false;
        const r = rectOf(section);
        if (r.bottom <= 0 || r.top >= vh()) return false;
        if (snapOf(section) < window.scrollY - vh() * 0.35) {
          finish(section);
          return false;
        }
        return r.top < limit || atBottom();
      });
      if (next) play(next);
    };

    const onWheel = (e: WheelEvent) => {
      if (!running && !snapping) return;
      e.preventDefault();
      pull += e.deltaY;
      if (Math.abs(pull) > 450 && !skip) {
        skip = Math.sign(pull);
        fastForward();
      }
    };
    const KEYS: Record<string, number> = {
      ArrowDown: 1,
      PageDown: 1,
      " ": 1,
      End: 1,
      ArrowUp: -1,
      PageUp: -1,
      Home: -1,
    };
    const onKey = (e: KeyboardEvent) => {
      if ((!running && !snapping) || !(e.key in KEYS)) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;
      e.preventDefault();
      pull += KEYS[e.key] * 250;
      if (Math.abs(pull) > 450 && !skip) {
        skip = Math.sign(pull);
        fastForward();
      }
    };
    let ticking = false;
    const onScroll = () => {
      if (snapping || !started) return;
      if (running) {
        if (Math.abs(window.scrollY - running.snap) > vh() * 0.8) fastForward();
        return;
      }
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        check();
      });
    };

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const hero = sections.find((x) => x.name === "hero");
      if (window.scrollY > 40 || !hero) {
        sections.forEach((section) => {
          if (rectOf(section).top < 80) finish(section);
        });
        if (hero) finish(hero);
        cursors.forEach((_, i) => {
          toDock(i);
          const spot = dockSpot(i);
          place(i, spot.x, spot.y);
        });
      }
      check();
      sweep();
    };
    const onLoad = () =>
      requestAnimationFrame(() => requestAnimationFrame(() => alive && start()));
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    const fallback = window.setTimeout(start, 900);
    let following = 0;
    let followUntil = 0;
    let lastStartle = 0;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const history: { x: number; y: number }[] = [];
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const idle = () => !running && !snapping && cursors.every((_, i) => inDock[i]);
    const dockIndex = (target: EventTarget | null) =>
      cursors.findIndex((c) => c.contains(target as Node | null));

    const startle = () => {
      const now = performance.now();
      if (following || now - lastStartle < 1200 || !idle()) return;
      lastStartle = now;
      cursors.forEach((c, i) => {
        const spot = dockSpot(i);
        const hop = 24 + Math.random() * 36;
        const side = (Math.random() - 0.5) * 30;
        settle.get(i)?.stop();
        settle.set(
          i,
          animate(
            c,
            { x: [pos[i].x, spot.x + side, spot.x], y: [pos[i].y, spot.y - hop, spot.y] },
            { duration: 0.6, ease: "easeOut", delay: i * 0.03 },
          ),
        );
        pos[i] = spot;
        c.classList.remove("cursor-glitch");
        void c.offsetWidth;
        c.classList.add("cursor-glitch");
        window.setTimeout(() => c.classList.remove("cursor-glitch"), 400);
      });
    };

    const stopFollow = () => {
      if (!following) return;
      cancelAnimationFrame(following);
      following = 0;
      dock.classList.remove(styles.following);
      cursors.forEach((c, i) => {
        if (!inDock[i]) return;
        const r = c.getBoundingClientRect();
        pos[i] = { x: r.left, y: r.top };
      });
    };
    const followStep = () => {
      history.push({ x: mouse.x, y: mouse.y });
      if (history.length > 80) history.shift();
      cursors.forEach((_, i) => {
        const p = history[Math.max(0, history.length - 1 - (i + 1) * 6)];
        place(i, p.x + 14, p.y + 16);
      });
      if (performance.now() > followUntil) {
        stopFollow();
        cursors.forEach((c, i) => {
          const spot = dockSpot(i);
          settle.set(
            i,
            animate(c, { x: [pos[i].x, spot.x], y: [pos[i].y, spot.y] }, { duration: 0.8, ease: EASE, delay: i * 0.05 }),
          );
          pos[i] = spot;
        });
        return;
      }
      following = requestAnimationFrame(followStep);
    };
    const startFollow = () => {
      if (following || !idle()) return;
      settle.forEach((c) => c.stop());
      settle.clear();
      history.length = 0;
      followUntil = performance.now() + 6000;
      dock.classList.add(styles.following);
      following = requestAnimationFrame(followStep);
    };
    const onDockOver = (e: MouseEvent) => {
      if (dockIndex(e.target) >= 0) startle();
    };
    const onDockClick = (e: MouseEvent) => {
      if (dockIndex(e.target) >= 0) startFollow();
    };
    dock.addEventListener("mouseover", onDockOver);
    dock.addEventListener("click", onDockClick);
    window.addEventListener("mousemove", onMove, { passive: true });

    const canvas = trailRef.current;
    const paint = canvas?.getContext("2d");
    const trails = cursors.map(() => [] as { x: number; y: number; t: number }[]);
    const docked = cursors.map((_, i) => inDock[i]);
    const LIFE = 380;
    let frameId = 0;
    const fit = () => {
      if (!canvas || !paint) return;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      paint.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (now: number) => {
      frameId = requestAnimationFrame(draw);
      if (!paint) return;
      const sy = window.scrollY;
      paint.clearRect(0, 0, window.innerWidth, window.innerHeight);
      paint.lineCap = "round";
      cursors.forEach((c, i) => {
        const trail = trails[i];
        const r = c.getBoundingClientRect();
        const point = { x: r.left, y: r.top + (inDock[i] ? 0 : sy), t: now };
        if (docked[i] !== inDock[i]) {
          docked[i] = inDock[i];
          trail.length = 0;
        }
        const last = trail[trail.length - 1];
        const gap = last ? Math.hypot(point.x - last.x, point.y - last.y) : 0;
        if (gap > 160) trail.length = 0;
        if (!last || gap > 160 || gap > 1.5) trail.push(point);
        while (trail.length && now - trail[0].t > LIFE) trail.shift();
        const shift = inDock[i] ? 0 : sy;
        for (let k = 1; k < trail.length; k++) {
          const life = 1 - (now - trail[k].t) / LIFE;
          if (life <= 0) continue;
          paint.strokeStyle = `rgba(236, 73, 49, ${life * life * 0.18})`;
          paint.lineWidth = 0.5 + life * 1.8;
          paint.beginPath();
          paint.moveTo(trail[k - 1].x, trail[k - 1].y - shift);
          paint.lineTo(trail[k].x, trail[k].y - shift);
          paint.stroke();
        }
      });
    };
    fit();
    frameId = requestAnimationFrame(draw);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("resize", fit);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      alive = false;
      stopFollow();
      dock.removeEventListener("mouseover", onDockOver);
      dock.removeEventListener("click", onDockClick);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", fit);
      window.removeEventListener("load", onLoad);
      window.clearTimeout(fallback);
      cancelAnimationFrame(frameId);
      window.removeEventListener("keydown", onKey);
      running?.controls.stop();
      if (running) {
        clearStyles([...running.ctx.touched, ...running.section.els]);
        running.ctx.disposers.forEach((d) => d());
        running.ctx.helpers.remove();
      }
      settle.forEach((c) => c.stop());
      cursors.forEach((c) => stage.appendChild(c));
      all.forEach((el) => el.removeAttribute("data-drawn"));
      html.removeAttribute("data-cursors");
      host.style.removeProperty("position");
    };
  }, []);

  return (
    <>
      <div ref={stageRef} className={styles.stage} aria-hidden="true">
        {Array.from({ length: COUNT }, (_, i) => (
          <div key={i} className={styles.cursor} data-cursor>
            <div className={styles.bob} style={{ animationDelay: `${-i * 0.37}s` }}>
              <div data-press>
                <Pointer index={i} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <GlitchHover />
      <canvas ref={trailRef} className={styles.trail} aria-hidden="true" />
      <div ref={dockRef} className={styles.dock} aria-hidden="true" />
    </>
  );
}
