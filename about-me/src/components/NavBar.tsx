"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

const PAGES = [
  { href: "/project", label: "PROJECT" },
  { href: "/blog", label: "BLOG" },
  { href: "/certified", label: "CERTIFIED" },
];

const GITHUB_URL = "https://github.com/Juyear009";
const CONTACT_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=githubbruny@gmail.com&su=문의하기";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.homeNav}>
        {/* Link는 화면에 보이는 순간 해당 경로를 미리 받아둔다 */}
        <Link href="/" prefetch>
          ABOUT
        </Link>
      </div>
      <div className={styles.pageNav}>
        {PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            prefetch
            className={pathname === page.href ? styles.selectPage : ""}
          >
            {page.label}
          </Link>
        ))}
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          GITHUB
        </a>
      </div>
      <div className={styles.supportNav}>
        <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
          문의하기
        </a>
      </div>
    </div>
  );
}
