import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./SkillIcon.module.css";

export default function SkillIcon({
  skill,
}: {
  skill: { hover: string; default: string; size: number; name: string };
}) {
  return (
    <span
      className={styles.icon}
      style={{ "--icon-size": `${skill.size}px` } as CSSProperties}
    >
      <Image
        className={styles.base}
        src={skill.default}
        width={skill.size}
        height={skill.size}
        alt={`${skill.name} 로고`}
      />
      <Image
        className={styles.color}
        src={skill.hover}
        width={skill.size}
        height={skill.size}
        alt=""
        aria-hidden="true"
      />
    </span>
  );
}
