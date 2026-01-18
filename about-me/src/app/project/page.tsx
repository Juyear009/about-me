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
          <div className={styles.projectMainImg}>
            <Image
              src={"/sangmyung_ai_2.png"}
              width={250}
              height={500}
              alt="상명 ai"
            />
          </div>
        </div>
        <div className={styles.project}>
          <p className={styles.projectTitle}>DISMU</p>
          <p className={styles.projectDes}>
            AI 전용 노래 플랫폼, 미래 노래 시장은 이럴 것입니다!
          </p>
        </div>
      </div>
    </div>
  );
}
