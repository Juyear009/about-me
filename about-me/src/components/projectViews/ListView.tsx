"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import styles from "./ListView.module.css";
import projectList, { type ProjectItem } from "@/data/projectList";
import ProjectModal from "@/components/ProjectModal";

export default function ListView() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const [flip, setFlip] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 28 });
  const springY = useSpring(y, { stiffness: 250, damping: 28 });

  const onMove = (e: React.MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
    const next = e.clientX > window.innerWidth * 0.55;
    if (next !== flip) setFlip(next);
  };

  return (
    <>
      <ul
        className={`${styles.list} ${hovered !== null ? styles.dimmed : ""}`}
        onMouseMove={onMove}
        onMouseLeave={() => setHovered(null)}
      >
        {projectList.map((p, i) => (
          <motion.li
            key={p.title}
            className={`${styles.row} ${hovered === i ? styles.active : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
          >
            <button
              type="button"
              className={styles.rowButton}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onClick={() => setSelected(p)}
            >
              <span className={styles.no}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.name}>{p.title}</span>
              <span className={styles.meta}>
                {p.metric && <span className={styles.metric}>{p.metric}</span>}
                <span className={styles.platform}>{p.platform}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
              <span className={styles.inlineImg}>
                <Image
                  src={`/${p.img}`}
                  width={1200}
                  height={750}
                  alt={`${p.title} 대표 이미지`}
                />
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <motion.div
        className={styles.preview}
        style={{ left: springX, top: springY }}
        aria-hidden="true"
      >
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key={projectList[hovered].title}
              className={`${styles.previewInner} ${flip ? styles.flip : ""}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Image
                src={`/${projectList[hovered].img}`}
                width={1200}
                height={750}
                alt=""
              />
              <p className={styles.previewDes}>{projectList[hovered].des}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
