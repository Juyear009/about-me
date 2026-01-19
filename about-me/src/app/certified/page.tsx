import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.titleSection}>
        <p className={styles.title}>경험을 넘어 자격으로.</p>
        <p className={styles.des}>JUYEAR가 취득한 자격증을 확인해보세요.</p>
      </div>
    </div>
  );
}
