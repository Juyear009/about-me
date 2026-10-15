"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import styles from "./StackView.module.css";
import projectList, { type ProjectItem } from "@/data/projectList";
import ProjectModal from "@/components/ProjectModal";

function Card({
  project,
  index,
  total,
  progress,
  onOpen,
}: {
  project: ProjectItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onOpen: () => void;
}) {
  const scale = useTransform(
    progress,
    [index / total, 1],
    [1, 1 - (total - index - 1) * 0.04],
  );

  return (
    <div className={styles.cardWrap} style={{ top: `calc(110px + ${index * 18}px)` }}>
      <motion.article className={styles.card} style={{ scale }}>
        <div className={styles.cardText}>
          <p className={styles.no}>
            {String(index + 1).padStart(2, "0")}
            <span>/ {String(total).padStart(2, "0")}</span>
          </p>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.platform}>{project.platform}</p>
          <p className={styles.des}>{project.des}</p>
          {project.metric && <p className={styles.metric}>{project.metric}</p>}
          <div className={styles.tags}>
            {project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <button type="button" className={styles.more} onClick={onOpen}>
            자세히 보기 →
          </button>
        </div>
        <button
          type="button"
          className={styles.cardImg}
          onClick={onOpen}
          aria-label={`${project.title} 자세히 보기`}
        >
          <Image
            src={`/${project.img}`}
            width={1200}
            height={750}
            alt={`${project.title} 대표 이미지`}
          />
        </button>
      </motion.article>
    </div>
  );
}

export default function StackView() {
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <div ref={container} className={styles.stack}>
        {projectList.map((p, i) => (
          <Card
            key={p.title}
            project={p}
            index={i}
            total={projectList.length}
            progress={scrollYProgress}
            onOpen={() => setSelected(p)}
          />
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
