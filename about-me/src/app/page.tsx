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
      <div className={styles.profileSummary}>
        <div className={styles.profileSummaryHeading}>
          <p className={styles.profileSummaryTitle}>
            FULLSTACK <br />
            DEVELOPER
            <br />
            AI RESEARCHER
          </p>
          <p className={styles.profileSummaryDes}>
            저는 다가오는 기술에 빠르게 적응하며,
            <br />
            단순히 기술을 활용하는 개발자가 아닌 <br />
            문제를 해결하는 개발자로 성장하고자 합니다.
          </p>
        </div>
        <div className={styles.profileSummaryBoxes}>
          <div className={styles.profileSummaryBox1}>
            <p className={styles.boxTitle}>DONGTAN</p>
            <p className={styles.boxDes}>LOCATION</p>
          </div>
          <div className={styles.profileSummaryBox2}>
            <p className={styles.boxTitle}>7+</p>
            <p className={styles.boxDes}>YEARS OF EXPREIENCE</p>
          </div>
          <div className={styles.profileSummaryBox1}>
            <p className={styles.boxTitle}>2005.07.28</p>
            <p className={styles.boxDes}>DATE OF BIRTH</p>
          </div>
        </div>
      </div>
      <div className={styles.skillSection}>
        <div className={styles.skillSectionHeading}>
          <Image
            src={"/red_button.svg"}
            width={50}
            height={50}
            alt="빨간 아이콘"
          />
          <p className={styles.skillSectionTitle}>SKILLS</p>
          <p className={styles.skillSectionDes}>
            현재 기술 스택과 배우고 있는 기술을 정리해봤어요.
          </p>
        </div>
        <div className={styles.skillBoxes}>
          <div className={styles.skillBox}></div>
        </div>
      </div>
    </div>
  );
}
