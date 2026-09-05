"use client";

import { useEffect, useState } from "react";
import styles from "./SecretCodeEgg.module.css";

/** 이 단어를 타이핑하면 색종이가 쏟아진다 */
const CODE = "juyearisgoat";

const COLORS = ["#ec4931", "#161513", "#f2f1ef", "#ec4931", "#8ed0f6"];

export default function SecretCodeEgg() {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    let buffer = "";

    const onKeyDown = (e: KeyboardEvent) => {
      // 조합키나 특수키는 세지 않는다
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;

      // 입력창에 타이핑 중이면 무시한다
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      // 최근 입력만 남겨두고 비교하므로 중간에 오타가 나도 이어서 칠 수 있다
      buffer = (buffer + e.key.toLowerCase()).slice(-CODE.length);
      if (buffer === CODE) {
        buffer = "";
        setFired(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!fired) return;
    const timer = setTimeout(() => setFired(false), 4600);
    return () => clearTimeout(timer);
  }, [fired]);

  if (!fired) return null;

  return (
    <div className={styles.layer} aria-hidden="true">
      {Array.from({ length: 70 }, (_, i) => (
        <span
          key={i}
          className={styles.piece}
          style={{
            left: `${(i * 37) % 100}%`,
            backgroundColor: COLORS[i % COLORS.length],
            animationDelay: `${((i * 13) % 20) * 0.08}s`,
            animationDuration: `${2.2 + ((i * 7) % 20) / 10}s`,
            transform: `rotate(${(i * 47) % 360}deg)`,
          }}
        />
      ))}
      <p className={styles.toast}>맞습니다. JUYEAR IS GOAT 🐐</p>
    </div>
  );
}
