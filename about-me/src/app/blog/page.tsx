import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.titleSection}>
        <p className={styles.title}>기술로 다가가는 생각.</p>
        <p className={styles.des}>JUYEAR의 최신 블로그 글을 확인해보세요.</p>
      </div>
    </div>
  );
}
