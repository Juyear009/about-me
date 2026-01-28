"use client";

import styles from "./ProjectCard.module.css";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const projectDetails = {
  "SANGMYUNG AI": {
    problem: [
      "학생들이 동일한 질문을 반복적으로 게시함",
      "학교 공지사항이 길고 복잡해 원하는 내용을 빠르게 파악하기 어려움",
      "비공식 답변으로 인해 정보의 신뢰도가 떨어질 수 있음",
    ],
    solution: [
      "학교 공지사항 데이터를 RAG 기반으로 학습하여 질문 응답 자동화",
      "사용자는 자연어 기반의 채팅 형식으로 간편하게 질문하고 답변을 받을 수 있음",
      "공식 공지 데이터를 기반으로 답변하여 신뢰도 확보",
    ],
    skillPoint: [
      "RAG 기반 문서 검색 및 응답 생성 파이프라인 설계",
      "Reranker 적용을 통한 답변 정확도 및 문서 우선순위 개선",
      "Faiss 병렬 처리로 대규모 문서 검색 성능 최적화",
      "Lottie, react-calendar 등 UI 라이브러리를 활용한 UX 개선",
    ],
    achievment: [
      "4일동안 약 400명 이상의 실제 사용자 확보",
      "학교 학보사 인터뷰 요청으로 교내 신문에 게재",
      "RAG, Reranker, Faiss 등 AI 서비스와 관련된 다양한 기술 습득",
      "홍보, 사용자 피드백, 서비스 운영 등을 경험해볼 수 있었음",
    ],
  },
  DISMU: {
    problem: [
      "AI 노래 시장이 점점 커지고 있지만 이를 위한 플랫폼이 없음",
      "직접 제작한 AI 노래를 디스코드에서 재생하기 위한 과정이 번거로움",
      "디스코드 노래 봇을 시각적인 UI로 쉽게 조작할 수 없음",
    ],
    solution: [
      "AI로 생성한 곡 및 앨범을 등록하고 관리할 수 있는 웹 플랫폼 구축",
      "서버 공용 플레이리스트를 통해 다수의 사용자가 듣고 싶은 노래를 추가할 수 있음",
      "직관적인 UI/UX 제공으로 쉽게 디스코드 노래를 조작할 수 있음",
    ],
    skillPoint: [
      "WebSocket 기반 실시간 동기화로 다중 사용자 공용 플레이리스트 구현",
      "Join/Room 구조를 활용해 서버 단위로 플레이리스트 상태 관리",
      "after callback(곡 종료 감지)를 통해 자동 플레이리스트 구현",
      "FFmpeg 기반 디스코드 음원 스트리밍 파이프라인 구성",
      "Firebase Storage를 활용한 음원 업로드 및 재생 처리",
    ],
    achievment: [
      "내부 테스트를 통해 UI 개선 및 버그 픽스 등을 경험함",
      "현재까지도 내부 디스코드 서버에서 서비스 사용 중",
      "Nest 중앙 서버, Python 디스코드 봇 연동 구조 설계 경험",
    ],
  },
  "HARU AI": {
    problem: [
      "젊은 세대를 중심으로 뉴스 소비율이 지속적으로 감소함",
      "기존 뉴스 기사는 길고 복잡해 접근성이 낮음",
      "질 좋은 정보를 빠르게 습득하기 어렵다는 단점이 있음",
    ],
    solution: [
      "뉴스를 AI가 3줄로 요약 형태로 제공",
      "쇼츠/릴스와 같이 스크롤 형식을 지원해 콘텐츠 접근성을 높임",
      "날씨 및 뉴스를 TTS 기반 브리핑으로 제공",
    ],
    skillPoint: [
      "React Native 기반 크로스플랫폼 모바일 앱 개발",
      "생성된 브리핑 대사를 토큰 단위로 분할하여 Stream 방식으로 TTS변환 및 실시간 재생 처리",
      "초기 방문 시에만 기사 요약을 수행하고 결과를 DB에 캐싱하여 API 호출 비용 절감",
      "Nest Scheduling/CronJob을 활용해 뉴스 데이터를 정해진 시간에 자동 갱신하는 파이프라인 구축",
    ],
    achievment: [
      "앱 출시와 광고 수익을 위해 사업자 등록을 진행",
      "앱 개발부터 내부/비공개 테스트 그리고 출시 도전까지 하나의 사이클을 경험함",
      "React Native, Scheduling, WebSocket 등 다양한 스킬 습득",
    ],
  },
  TRAIVEL: {
    problem: [
      "여행 일정을 체계적으로 기획하는 과정이 복잡하고 시간이 많이 소요됨",
      "일반적인 AI 여행 추천은 답변 품질이 낮고 동선이나 일정을 한 눈에 파악하기 어려움",
      "기존에 존재하는 대부분의 서비스는 선택형 기반이라 개개인의 니즈를 만족시키기 어려움",
    ],
    solution: [
      "자연어 입력 기반 여행 일정 생성으로 개인 맞춤형 일정 제공",
      "동선과 이동시간을 고려한 일정 구성 및 실제 지명 기반 응답 프롬프트를 설정함",
      "일정 저장, 수정, 공유 기능을 통해 편의성 강화",
      "Google Map으로 실제 위치 정보까지 함께 제공",
    ],
    skillPoint: [
      "Next 기반으로 제작한 첫 번째 실서비스 프로젝트",
      "GPT API 및 프롬프트 엔지니어링을 활용한 일정 생성 로직을 구현함",
      "Optimistic UI, Skeleton UI 등의 적용을 통해 사용자 경험 개선함",
      "Zustand 기반 전역 상태에서 AbortController를 활용해 fetch 요청 취소 기능을 구현함",
      "GA4 기반 홍보 실험 및 이탈률 확인을 진행해봄",
    ],
    achievment: [
      "실제 서비스 배포를 목표로 진행한 첫 프로젝트",
      "블로그 및 대학생 커뮤니티 홍보를 통해 실제 사용자 유입을 경험해봄",
      "풀스택 개발자로 성장하기 위한 실질적인 출발점이 된 프로젝트",
    ],
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
