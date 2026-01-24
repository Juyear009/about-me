"use client";

import styles from "./ProjectCard.module.css";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const projectDetails = {
  "SANGMYUNG AI": {
    problem: [
      "학생들이 똑같은 질문을 반복적으로 올림",
      "학교 공지사항을 이해하기에는 길고 복잡함",
      "답변의 신뢰도가 떨어질 수 있음",
    ],
    solution: [
      "학교 공지사항 데이터를 RAG 기반으로 학습시킴",
      "사용자는 채팅 형식으로 간편하게 질문하고 답변을 받을 수 있음",
      "답변의 신뢰도가 올라감",
    ],
    skillPoint: [
      "RAG 기반으로 데이터 학습",
      "Reranker로 답변 정확도 및 품질 향상",
      "Faiss 병렬 처리로 문서 처리 속도 개선",
      "Lottie, react-calendar 등 UI 개선 라이브러리 사용 ",
    ],
    achievment: [
      "4일동안 약 400명의 서비스 이용 달성",
      "학보사 인터뷰 요청으로 학교 신문에 나옴",
      "RAG, Reranker, Faiss 등 AI 서비스와 관련된 다양한 기술 습득",
    ],
  },
  DISMU: {
    problem: [],
    solution: [],
    skillPoint: [],
    achievment: [],
  },
  "HARU AI": {
    problem: [
      "세대가 지날수록 뉴스 소비층이 점점 줄어듬",
      "접근성이 좋지 않고, 길고 복잡하다는 단점이 있음",
      "질 좋은 정보를 빠르게 습득하기 어렵다는 단점이 있음",
    ],
    solution: [
      "뉴스를 AI가 3줄로 요약해서 보여줌",
      "쇼츠/릴스와 같이 스크롤 형식을 지원해 접근성을 높임",
      "날씨와 뉴스를 TTS가 브리핑해주는 기능을 제공",
    ],
    skillPoint: [
      "React Native를 사용한 앱 개발",
      "생성된 브리핑 대사를 토큰 단위로 잘라 TTS로 변환하여 끊기지 않고 재생될 수 있도록 함",
      "모든 기사를 요약하지 않고, 처음 방문했을 경우 요약한 후 DB에 저장하는 식으로 API 비용을 절감",
      "Nest Scheduling/CronJob을 사용하여 뉴스가 정해진 시간에 자동으로 갱신될 수 있도록 함",
    ],
    achievment: [
      "앱 출시와 광고 수익을 위해 사업자 등록을 함",
      "앱 개발부터 내부/비공개 테스트 그리고 출시 도전까지 한 사이클을 경험함",
      "React Native, Scheduling, 웹소켓 등 다양한 스킬 습득",
    ],
  },
  TRAIVEL: {
    problem: [],
    solution: [],
    skillPoint: [],
    achievment: [],
  },
};

export default function ProjectCard({
  projectTitle,
  projectDes,
  skillTag,
  imgSrc,
}: {
  projectTitle: keyof typeof projectDetails;
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
                      {projectDetails[`${projectTitle}`].problem.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div
                    className={styles.projectDetailBottom}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + 7 * 0.08 }}
                  >
                    <p className={styles.smallTitle}>해결 방식</p>
                    <ul className={styles.projectDetailText}>
                      {projectDetails[`${projectTitle}`].solution.map(
                        (s, i) => (
                          <li key={i}>{s}</li>
                        ),
                      )}
                    </ul>
                  </motion.div>
                </div>
                <div className={styles.projectDetail}>
                  <motion.div
                    className={styles.projectDetailTop}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + 6 * 0.08 }}
                  >
                    <p className={styles.smallTitle}>스킬포인트</p>
                    <ul className={styles.projectDetailText}>
                      {projectDetails[`${projectTitle}`].skillPoint.map(
                        (s, i) => (
                          <li key={i}>{s}</li>
                        ),
                      )}
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
                      {projectDetails[`${projectTitle}`].achievment.map(
                        (a, i) => (
                          <li key={i}>{a}</li>
                        ),
                      )}
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
