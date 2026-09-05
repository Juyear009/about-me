"use client";

import styles from "./ProjectCard.module.css";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import projectDetails, { type ProjectTitle } from "@/data/projects";

/** 모달 본문의 읽는 순서 — 번호가 곧 위계다 */
const NARRATIVE = [
  { key: "problem", step: "01", label: "문제 정의" },
  { key: "solution", step: "02", label: "해결 방식" },
  { key: "skillPoint", step: "03", label: "스킬 포인트" },
] as const;

export default function ProjectCard({
  projectTitle,
  projectDes,
  skillTag,
  imgSrc,
}: {
  projectTitle: ProjectTitle;
  projectDes: string;
  skillTag: string[];
  imgSrc: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const detail = projectDetails[projectTitle];

  // 모달이 열려 있는 동안 ESC로 닫고, 뒤쪽 페이지의 스크롤을 잠근다
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {!open && (
        <motion.div
          className={styles.project}
          layoutId={projectTitle}
          onClick={() => setOpen(true)}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.p
            className={styles.projectTitle}
            layoutId={`${projectTitle}-title`}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          >
            {projectTitle}
          </motion.p>
          <motion.p
            className={styles.projectDes}
            layoutId={`${projectTitle}-des`}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          >
            {projectDes}
          </motion.p>
          <div className={styles.skillTag}>
            {skillTag.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
          <div className={styles.projectMainImg}>
            <Image
              src={`/${imgSrc}`}
              width={800}
              height={600}
              alt={`${projectTitle} 대표 이미지`}
            />
          </div>
        </motion.div>
      )}
      {open && <div className={styles.projectSkelton}></div>}

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className={styles.modal}
              layoutId={projectTitle}
              role="dialog"
              aria-modal="true"
              aria-label={`${projectTitle} 프로젝트 상세`}
              onClick={(e) => e.stopPropagation()}
              transition={{
                layout: { type: "spring", stiffness: 300, damping: 30 },
              }}
            >
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setOpen(false)}
                aria-label="닫기"
              >
                <span aria-hidden="true">×</span>
              </button>

              {/* 좌측 — 프로젝트가 무엇인지 (제목·설명·이미지·스택) */}
              <div className={styles.identityPane}>
                <motion.p
                  className={styles.modalTitle}
                  layoutId={`${projectTitle}-title`}
                >
                  {projectTitle}
                </motion.p>
                <motion.p
                  className={styles.modalDes}
                  layoutId={`${projectTitle}-des`}
                >
                  {projectDes}
                </motion.p>

                <motion.div
                  className={styles.modalMainImg}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.35, ease: "easeOut" }}
                >
                  <Image
                    src={`/${imgSrc}`}
                    width={800}
                    height={600}
                    alt={`${projectTitle} 대표 이미지`}
                  />
                </motion.div>

                <motion.div
                  className={styles.stackBlock}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.35, ease: "easeOut" }}
                >
                  <p className={styles.stackLabel}>TECH STACK</p>
                  <div className={styles.skillTag}>
                    {skillTag.map((s, i) => (
                      <motion.p
                        key={s}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.3 + i * 0.06,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                      >
                        {s}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* 우측 — 어떻게 만들었는지 (하나의 스크롤, 번호로 순서를 고정) */}
              <div className={styles.storyPane}>
                {NARRATIVE.map((section, i) => (
                  <motion.section
                    key={section.key}
                    className={styles.storySection}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.07,
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                  >
                    <div className={styles.storyHeading}>
                      <span className={styles.storyStep}>{section.step}</span>
                      <h3 className={styles.storyTitle}>{section.label}</h3>
                    </div>
                    <ul className={styles.storyList}>
                      {detail[section.key].map((text, index) => (
                        <li key={index}>{text}</li>
                      ))}
                    </ul>
                  </motion.section>
                ))}

                <motion.section
                  className={styles.achievementBlock}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.41, duration: 0.35, ease: "easeOut" }}
                >
                  <div className={styles.storyHeading}>
                    <span className={styles.achievementStep}>04</span>
                    <h3 className={styles.achievementTitle}>결과 &amp; 성과</h3>
                  </div>
                  <ul className={styles.achievementList}>
                    {detail.achievement.map((text, index) => (
                      <li key={index}>{text}</li>
                    ))}
                  </ul>
                </motion.section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
