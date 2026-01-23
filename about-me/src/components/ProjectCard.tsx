"use client";

import styles from "./ProjectCard.module.css";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ProjectCard({
  projectTitle,
  projectDes,
  skillTag,
  imgSrc,
}: {
  projectTitle: string;
  projectDes: string;
  skillTag: string[];
  imgSrc: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {!open && (
        <motion.div
          className={styles.project}
          layoutId={`${projectTitle}`}
          onClick={() => setOpen(true)}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <motion.p
            className={styles.projectTitle}
            layoutId={`${projectTitle}-title`}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
            }}
          >
            {projectTitle}
          </motion.p>
          <motion.p
            className={styles.projectDes}
            layoutId={`${projectTitle}-des`}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
            }}
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
              alt="프로젝트 사진"
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
              onClick={(e) => e.stopPropagation()}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
              }}
            >
              <div>
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
                <div className={styles.skillTag}>
                  {skillTag.map((s, i) => (
                    <motion.p
                      key={s}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.08 }}
                    >
                      {s}
                    </motion.p>
                  ))}
                </div>
                <motion.div
                  className={styles.modalMainImg}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.25 + skillTag.length * 0.08 + 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <Image
                    src={`/${imgSrc}`}
                    width={600}
                    height={450}
                    alt="프로젝트 사진"
                  />
                </motion.div>
              </div>
              <div className={styles.projectDetailSection}>
                <div className={styles.projectDetail}>
                  <motion.div
                    className={styles.projectDetailTop}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + 5 * 0.08 }}
                  >
                    <p className={styles.smallTitle}>문제 정의</p>
                    <ul className={styles.projectDetailText}>
                      <li>fdsafdsa</li>
                      <li>fdsafdsa</li>
                      <li>fdsafdsa</li>
                    </ul>
                  </motion.div>
                  <motion.div
                    className={styles.projectDetailBottom}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + 6 * 0.08 }}
                  >
                    <p className={styles.smallTitle}>해결 방식</p>
                    <ul className={styles.projectDetailText}>
                      <li>fdsafdsa</li>
                      <li>fdsafdsa</li>
                      <li>fdsafdsa</li>
                    </ul>
                  </motion.div>
                </div>
                <div className={styles.projectDetail}>
                  <motion.div
                    className={styles.projectDetailTop}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + 7 * 0.08 }}
                  >
                    <p className={styles.smallTitle}>스킬포인트</p>
                    <ul className={styles.projectDetailText}>
                      <li>fdsafdsa</li>
                      <li>fdsafdsa</li>
                      <li>fdsafdsa</li>
                    </ul>
                  </motion.div>
                  <motion.div
                    className={styles.projectDetailBottom}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + 8 * 0.08 }}
                  >
                    <p className={styles.smallTitle}>결과&성과</p>
                    <ul className={styles.projectDetailText}>
                      <li>fdsafdsa</li>
                      <li>fdsafdsa</li>
                      <li>fdsafdsa</li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
