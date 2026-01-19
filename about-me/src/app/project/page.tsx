import styles from "./page.module.css";
import Image from "next/image";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.titleSection}>
        <p className={styles.title}>기술이 아닌 가치를 만들자.</p>
        <p className={styles.des}>JUYEAR의 프로젝트를 구경해보세요.</p>
      </div>
      <div className={styles.projects}>
        <div className={styles.project}>
          <p className={styles.projectTitle}>SANGMYUNG AI</p>
          <p className={styles.projectDes}>
            공지사항 데이터를 RAG 기반으로 학습한 대학생 전용 AI 챗봇을
            만나보세요!
          </p>
          <div className={styles.skillTag}>
            <p>AI</p>
            <p>JS/TS</p>
            <p>PYTHON</p>
            <p>NEXT</p>
            <p>NEST</p>
            <p>FAST API</p>
            <p>SQL</p>
          </div>
          <div className={styles.projectMainImg}>
            <Image
              src={"/sangmyung_ai_4.png"}
              width={800}
              height={600}
              alt="상명 ai"
            />
          </div>
        </div>
        <div className={styles.project}>
          <p className={styles.projectTitle}>DISMU</p>
          <p className={styles.projectDes}>
            AI 전용 노래 플랫폼, 미래 노래 시장은 이렇게 될 것입니다!
          </p>
          <div className={styles.skillTag}>
            <p>AI</p>
            <p>JS/TS</p>
            <p>PYTHON</p>
            <p>NEXT</p>
            <p>NEST</p>
            <p>FAST API</p>
            <p>SQL</p>
            <p>FIREBASE</p>
          </div>
          <div className={styles.projectMainImg}>
            <Image
              src={"/dismu_2.png"}
              width={800}
              height={550}
              alt="상명 ai"
            />
          </div>
        </div>
      </div>
      <div className={styles.projects}>
        <div className={styles.project}>
          <p className={styles.projectTitle}>HARU AI</p>
          <p className={styles.projectDes}>
            뉴스 요약과 하루 TTS 브리핑까지, 이젠 쇼츠 말고 뉴스를 스크롤
            하세요!
          </p>
          <div className={styles.skillTag}>
            <p>AI</p>
            <p>JS/TS</p>
            <p>PYTHON</p>
            <p>REACT NATIVE</p>
            <p>NEST</p>
            <p>FAST API</p>
            <p>SQL</p>
          </div>
          <div className={styles.projectMainImg}>
            <Image
              src={"/haru_ai_2.png"}
              width={800}
              height={600}
              alt="상명 ai"
            />
          </div>
        </div>
        <div className={styles.project}>
          <p className={styles.projectTitle}>TARIVEL</p>
          <p className={styles.projectDes}>
            이제 여행 일정을 AI로 한 번에 계획해보세요!
          </p>
          <div className={styles.skillTag}>
            <p>AI</p>
            <p>JS/TS</p>
            <p>NEXT</p>
            <p>EXPRESS</p>
            <p>SQL</p>
          </div>
          <div className={styles.projectMainImg}>
            <Image
              src={"/traivel_1.png"}
              width={800}
              height={500}
              alt="상명 ai"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
