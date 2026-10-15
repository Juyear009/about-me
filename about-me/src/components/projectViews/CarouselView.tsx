"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./CarouselView.module.css";
import projectList, { type ProjectItem } from "@/data/projectList";
import ProjectModal from "@/components/ProjectModal";

export default function CarouselView() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const [dragging, setDragging] = useState(false);
  const track = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ startX: 0, startLeft: 0, moved: false });

  const total = projectList.length;

  const goTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(total - 1, index));
    const slide = el.children[clamped] as HTMLElement | undefined;
    if (slide) el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const onScroll = () => {
      const slides = Array.from(el.children) as HTMLElement[];
      let nearest = 0;
      let best = Infinity;
      slides.forEach((s, i) => {
        const d = Math.abs(s.offsetLeft - el.offsetLeft - el.scrollLeft);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setActive(nearest);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selected) return;
      if (e.key === "ArrowRight") goTo(active + 1);
      if (e.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = {
      startX: e.clientX,
      startLeft: track.current.scrollLeft,
      moved: false,
    };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !track.current) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    track.current.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    goTo(active);
  };

  return (
    <>
      <div className={styles.tabs}>
        {projectList.map((p, i) => (
          <button
            key={p.title}
            type="button"
            className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
            onClick={() => goTo(i)}
          >
            <span className={styles.tabNo}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.tabTitle}>{p.title}</span>
            <span className={styles.tabPlatform}>{p.platform}</span>
          </button>
        ))}
      </div>

      <div className={styles.head}>
        <p className={styles.counter}>
          <span>{String(active + 1).padStart(2, "0")}</span> /{" "}
          {String(total).padStart(2, "0")}
        </p>
        <div className={styles.arrows}>
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="이전 프로젝트"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === total - 1}
            aria-label="다음 프로젝트"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={track}
        className={`${styles.track} ${dragging ? styles.dragging : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {projectList.map((p, i) => (
          <motion.article
            key={p.title}
            className={styles.slide}
            animate={{ opacity: i === active ? 1 : 0.45, scale: i === active ? 1 : 0.96 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className={styles.slideImg}>
              <Image
                src={`/${p.img}`}
                width={1200}
                height={750}
                alt={`${p.title} 대표 이미지`}
                draggable={false}
              />
            </div>
            <div className={styles.slideText}>
              <div>
                <p className={styles.platform}>{p.platform}</p>
                <h2 className={styles.title}>{p.title}</h2>
                <p className={styles.des}>{p.des}</p>
              </div>
              <div className={styles.slideFoot}>
                {p.metric && <p className={styles.metric}>{p.metric}</p>}
                <p className={styles.tags}>{p.tags.join(" · ")}</p>
                <button
                  type="button"
                  className={styles.more}
                  onClick={() => {
                    if (!drag.current.moved) setSelected(p);
                  }}
                >
                  자세히 보기 →
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
