import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.HeroSection}>
        <div>
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
        <p>코딩</p>
        <p>UI/UX</p>
        <p>디자인</p>
        <p>창업</p>
        <p>AI</p>
        <p>INTJ</p>
        <p>백준 플레티넘</p>
        <p>남자</p>
        <p>20살</p>
      </div>
    </div>
  );
}
