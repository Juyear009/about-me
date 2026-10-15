import type { Metadata } from "next";
import styles from "./page.module.css";
import ProjectViews from "@/components/projectViews/ProjectViews";

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
      <ProjectViews />
    </div>
  );
}
