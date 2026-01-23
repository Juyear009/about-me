import styles from "./page.module.css";
import Image from "next/image";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.titleSection}>
        <p className={styles.title}>경험을 넘어 자격으로.</p>
        <p className={styles.des}>JUYEAR가 취득한 자격증을 확인해보세요.</p>
      </div>
      <div className={styles.certifications}>
        <div className={styles.certificate}>
          <div className={styles.certificateTop}>
            <div className={styles.logoWrapper}>
              <Image
                src={"/python_logo.png"}
                width={40}
                height={40}
                alt="로고 사진"
              />
            </div>
            <p className={styles.certificateTitle}>CERTIFICATE</p>
          </div>
          <hr />
          <p className={styles.certificateName}>COSICAL 5등</p>
          <p className={styles.certificateDes}>2025.01.18</p>
          <p className={styles.certificateDes}>코리아IT아카데미</p>
          <div className={styles.medalWrapper}></div>
        </div>
        <div className={styles.certificate}>
          <div className={styles.certificateTop}>
            <div className={styles.logoWrapper}>
              <Image
                src={"/python_logo.png"}
                width={40}
                height={40}
                alt="로고 사진"
              />
            </div>
            <p className={styles.certificateTitle}>CERTIFICATE</p>
          </div>
          <hr />
          <p className={styles.certificateName}>COSPRO 1급</p>
          <p className={styles.certificateDes}>2021.11.28</p>
          <p className={styles.certificateDes}>YBM IT</p>
          <div className={styles.medalWrapper}></div>
        </div>
        <div className={styles.certificate}>
          <div className={styles.certificateTop}>
            <div className={styles.logoWrapper}>
              <Image
                src={"/C_logo.png"}
                width={40}
                height={40}
                alt="로고 사진"
              />
            </div>
            <p className={styles.certificateTitle}>CERTIFICATE</p>
          </div>
          <hr />
          <p className={styles.certificateName}>COSPRO 2급</p>
          <p className={styles.certificateDes}>2020.02.16</p>
          <p className={styles.certificateDes}>YBM IT</p>
          <div className={styles.medalWrapper}></div>
        </div>
      </div>
    </div>
  );
}
