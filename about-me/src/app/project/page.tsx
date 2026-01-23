import styles from "./page.module.css";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.titleSection}>
        <p className={styles.title}>기술이 아닌 가치를 만들자.</p>
        <p className={styles.des}>JUYEAR의 프로젝트를 구경해보세요.</p>
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
          imgSrc="dismu_2.png"
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
          projectTitle="TARIVEL"
          projectDes="이제 여행 일정을 AI로 한 번에 계획해보세요!"
          skillTag={["AI", "JS/TS", "NEXT", "EXPRESS", "SQL"]}
          imgSrc="traivel_1.png"
        />
      </div>
    </div>
  );
}
