"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./BentoView.module.css";
import projectList, { type ProjectItem } from "@/data/projectList";
import ProjectModal from "@/components/ProjectModal";

const LAYOUT = ["hero", "wide", "small", "small", "half", "half"];

export default function BentoView() {
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  return (
    <>
      <div className={styles.bento}>
        {projectList.map((p, i) => (
          <motion.button
            key={p.title}
            type="button"
            className={`${styles.tile} ${styles[LAYOUT[i]]}`}
            onClick={() => setSelected(p)}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
          >
            <div className={styles.tileImg}>
              <Image
                src={`/${p.img}`}
                width={1200}
                height={750}
                alt={`${p.title} 대표 이미지`}
              />
            </div>
            <div className={styles.tileInfo}>
              <div>
                <p className={styles.tilePlatform}>{p.platform}</p>
                <p className={styles.tileTitle}>{p.title}</p>
              </div>
              {p.metric && <p className={styles.tileMetric}>{p.metric}</p>}
            </div>
            <div className={styles.tileHover}>
              <p className={styles.tileDes}>{p.des}</p>
              <p className={styles.tileTags}>{p.tags.join(" · ")}</p>
              <span className={styles.tileMore}>자세히 보기 →</span>
            </div>
          </motion.button>
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
