"use client";

import styles from "./ProjectCard.module.css";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import projectDetails from "@/data/projects";
import type { ProjectItem } from "@/data/projectList";

const NARRATIVE = [
  { key: "problem", step: "01", label: "문제 정의" },
  { key: "solution", step: "02", label: "해결 방식" },
  { key: "skillPoint", step: "03", label: "스킬 포인트" },
] as const;

export default function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className={styles.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} 프로젝트 상세`}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="닫기"
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className={styles.identityPane}>
              <p className={styles.modalTitle}>{project.title}</p>
              <p className={styles.modalDes}>{project.des}</p>

              <div className={styles.modalMainImg}>
                <Image
                  src={`/${project.img}`}
                  width={800}
                  height={600}
                  alt={`${project.title} 대표 이미지`}
                />
              </div>

              <div className={styles.stackBlock}>
                <p className={styles.stackLabel}>TECH STACK</p>
                <div className={styles.skillTag}>
                  {project.tags.map((s) => (
                    <p key={s}>{s}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.storyPane}>
              {NARRATIVE.map((section) => (
                <section key={section.key} className={styles.storySection}>
                  <div className={styles.storyHeading}>
                    <span className={styles.storyStep}>{section.step}</span>
                    <h3 className={styles.storyTitle}>{section.label}</h3>
                  </div>
                  <ul className={styles.storyList}>
                    {projectDetails[project.title][section.key].map(
                      (text, index) => (
                        <li key={index}>{text}</li>
                      ),
                    )}
                  </ul>
                </section>
              ))}

              <section className={styles.achievementBlock}>
                <div className={styles.storyHeading}>
                  <span className={styles.achievementStep}>04</span>
                  <h3 className={styles.achievementTitle}>결과 &amp; 성과</h3>
                </div>
                <ul className={styles.achievementList}>
                  {projectDetails[project.title].achievement.map(
                    (text, index) => (
                      <li key={index}>{text}</li>
                    ),
                  )}
                </ul>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
