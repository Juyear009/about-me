"use client";

import { useEffect, useState } from "react";
import styles from "./SectionNav.module.css";

const SECTIONS = [
  { id: "hero", label: "ABOUT" },
  { id: "profile", label: "PROFILE" },
  { id: "skills", label: "SKILLS" },
  { id: "timeline", label: "TIMELINE" },
  { id: "motto", label: "MOTTO" },
];

/** 화면 오른쪽에서 현재 섹션을 표시하고, 눌러서 이동한다 */
export default function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        setActive(visible[visible.length - 1].target.id);
      },
      // 화면 한가운데를 지나는 섹션만 현재 섹션으로 친다
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <nav className={styles.nav} aria-label="섹션 바로가기">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          className={`${styles.dot} ${
            active === section.id ? styles.active : ""
          }`}
          onClick={() => goTo(section.id)}
          aria-label={section.label}
          aria-current={active === section.id}
        >
          <span className={styles.label}>{section.label}</span>
        </button>
      ))}
    </nav>
  );
}
