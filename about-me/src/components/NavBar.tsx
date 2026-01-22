"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [section, setSection] = useState<string>("");
  const router = useRouter();

  const routerPage = (page: string) => {
    router.push(`/${page}`);
    setSection(page);
  };

  const prefetchPage = (page: string) => {
    router.prefetch(`/${page}`);
  };

  useEffect(() => {
    console.log(section);
  }, [section]);

  return (
    <div className={styles.container}>
      <div className={styles.homeNav}>
        <p onClick={() => routerPage("")}>ABOUT</p>
      </div>
      <div className={styles.pageNav}>
        <p
          className={`${section === "project" ? styles.selectPage : ""}`}
          onMouseEnter={() => prefetchPage("project")}
          onClick={() => routerPage("project")}
        >
          PROJECT
        </p>
        <p
          className={`${section === "blog" ? styles.selectPage : ""}`}
          onMouseEnter={() => prefetchPage("blog")}
          onClick={() => routerPage("blog")}
        >
          BLOG
        </p>
        <p
          className={`${section === "certified" ? styles.selectPage : ""}`}
          onMouseEnter={() => prefetchPage("certified")}
          onClick={() => routerPage("certified")}
        >
          CERTIFIED
        </p>
        <p
          className={`${section === "github" ? styles.selectPage : ""}`}
          onClick={() => router.push("https://github.com/Juyear009")}
        >
          GITHUB
        </p>
      </div>
      <div className={styles.supportNav}>
        <p>문의하기</p>
      </div>
    </div>
  );
}
