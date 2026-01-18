import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  const codingWords = [
    "개발자",
    "프로그래머",
    "React",
    "Next",
    "JS",
    "TS",
    "Nest",
    "Python",
    "네트워크",
    "리눅스",
    "MySQL",
    "AI",
  ];
  const designWords = [
    "UI/UX",
    "디자인",
    "블루",
    "Afetr Effect",
    "Illustrator",
    "INTJ",
    "남자",
    "20살",
    "백준 플레티넘",
    "창업",
  ];

  return (
    <div className={styles.page}>
      <div className={styles.HeroSection}>
        <div className={styles.titleSection}>
          <p className={styles.mainTitle1}>대학생 개발자</p>
          <p className={styles.mainTitle1}>JUYEAR</p>
        </div>
        <Image
          className={styles.profileImg}
          height={450}
          width={450}
          src={"/profile.png"}
          alt="프로필 사진"
        />
      </div>
      <div className={styles.keywordSection}>
        <div className={styles.trackLeft}>
          {codingWords.map((w, i) => (
            <span key={`a-${i}`}>{w}</span>
          ))}
          {codingWords.map((w, i) => (
            <span key={`b-${i}`}>{w}</span>
          ))}
        </div>
        <div className={styles.trackRight}>
          {designWords.map((w, i) => (
            <span key={`a-${i}`}>{w}</span>
          ))}
          {designWords.map((w, i) => (
            <span key={`b-${i}`}>{w}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
