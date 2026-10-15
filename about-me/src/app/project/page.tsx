import type { Metadata } from "next";
import styles from "./page.module.css";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Project",
  description:
    "EAR, SYNAPSE, SANGMYUNG AI, DISMU, HARU AI, TRAIVEL. 문제 정의부터 해결 방식과 성과까지 정리한 JUYEAR의 프로젝트입니다.",
  alternates: { canonical: "/project" },
};

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.titleSection}>
        <p className={styles.title}>기술이 아닌 가치를 만들자.</p>
        <p className={styles.des}>JUYEAR의 프로젝트를 구경해보세요.</p>
      </div>
      <div className={styles.projects}>
        <ProjectCard
          projectTitle="EAR"
          projectDes="출근길에 열면, 오늘 들을 게 준비되어 있어요. 매일 아침 도착하는
            AI 팟캐스트!"
          skillTag={[
            "AI",
            "JS/TS",
            "PYTHON",
            "REACT NATIVE",
            "NEXT",
            "NEST",
            "FAST API",
            "SQL",
            "AWS",
          ]}
          imgSrc="ear_3.png"
        />
        <ProjectCard
          projectTitle="SYNAPSE"
          projectDes="입력만 하세요, 연결은 AI가 도와줍니다. 생각을 이어주는 AI 지식
            그래프 노트!"
          skillTag={[
            "AI",
            "JS/TS",
            "PYTHON",
            "NEXT",
            "NEST",
            "FAST API",
            "SQL",
            "REDIS",
          ]}
          imgSrc="synapse_3.png"
        />
      </div>
      <div className={styles.projects}>
        <ProjectCard
          projectTitle="SANGMYUNG AI"
          projectDes="공지사항 데이터를 RAG 기반으로 학습한 대학생 전용 AI 챗봇을
            만나보세요!"
          skillTag={[
            "AI",
            "JS/TS",
            "PYTHON",
            "NEXT",
            "NEST",
            "FAST API",
            "SQL",
          ]}
          imgSrc="sangmyung_ai_4.png"
        />
        <ProjectCard
          projectTitle="DISMU"
          projectDes="AI 전용 노래 플랫폼, 미래 노래 시장은 이렇게 될 것입니다!"
          skillTag={[
            "AI",
            "JS/TS",
            "PYTHON",
            "NEXT",
            "NEST",
            "FAST API",
            "SQL",
            "FIREBASE",
          ]}
          imgSrc="dismu_5.png"
        />
      </div>
      <div className={styles.projects}>
        <ProjectCard
          projectTitle="HARU AI"
          projectDes="뉴스 요약과 하루 TTS 브리핑까지, 이젠 쇼츠 말고 뉴스를 스크롤
            하세요!"
          skillTag={[
            "AI",
            "JS/TS",
            "PYTHON",
            "REACT NATIVE",
            "NEST",
            "FAST API",
            "SQL",
          ]}
          imgSrc="haru_ai_2.png"
        />
        <ProjectCard
          projectTitle="TRAIVEL"
          projectDes="이제 여행 일정을 AI로 한 번에 계획해보세요!"
          skillTag={["AI", "JS/TS", "NEXT", "EXPRESS", "SQL"]}
          imgSrc="traivel_1.png"
        />
      </div>
    </div>
  );
}
