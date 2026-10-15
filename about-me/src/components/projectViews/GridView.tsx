import styles from "./GridView.module.css";
import ProjectCard from "@/components/ProjectCard";
import projectList from "@/data/projectList";

const rows = Array.from({ length: Math.ceil(projectList.length / 2) }, (_, i) =>
  projectList.slice(i * 2, i * 2 + 2),
);

export default function GridView() {
  return (
    <>
      {rows.map((row) => (
        <div key={row[0].title} className={styles.projects}>
          {row.map((p) => (
            <ProjectCard
              key={p.title}
              projectTitle={p.title}
              projectDes={p.des}
              skillTag={p.tags}
              imgSrc={p.img}
            />
          ))}
        </div>
      ))}
    </>
  );
}
