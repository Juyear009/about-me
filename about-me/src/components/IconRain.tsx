"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./IconRain.module.css";

/** OTHERS 박스에 적힌 순서 그대로. 브랜드 로고가 없는 항목은 icon 없이 둔다 */
const ITEMS: { label: string; icon?: string }[] = [
  { label: "RAG" },
  { label: "FAISS" },
  { label: "FASTAPI", icon: "/others_icons/fastapi.svg" },
  { label: "EXPRESS", icon: "/others_icons/express.svg" },
  { label: "ARCHITECTURE" },
  { label: "VERCEL", icon: "/others_icons/vercel.svg" },
  { label: "SUPABASE", icon: "/others_icons/supabase.svg" },
  { label: "POSTMAN", icon: "/others_icons/postman.svg" },
  { label: "SWAGGER", icon: "/others_icons/swagger.svg" },
  { label: "NETWORK" },
  { label: "FFMPEG", icon: "/others_icons/ffmpeg.svg" },
  { label: "NOTION", icon: "/others_icons/notion.svg" },
  { label: "GITHUB", icon: "/others_icons/github.svg" },
  { label: "PRISMA", icon: "/others_icons/prisma.svg" },
  { label: "FIREBASE", icon: "/others_icons/firebase.svg" },
];

// 두 번씩 떨어뜨려 화면을 채운다
const DROPS = [...ITEMS, ...ITEMS];

export default function IconRain() {
  return (
    <div className={styles.layer} aria-hidden="true">
      {DROPS.map((item, i) => (
        <span
          key={`${item.label}-${i}`}
          className={styles.item}
          style={
            {
              left: `${(i * 31 + 4) % 94}%`,
              animationDelay: `${((i * 17) % 24) * 0.11}s`,
              animationDuration: `${2.6 + ((i * 11) % 22) / 10}s`,
              "--spin": `${((i % 2 ? 1 : -1) * (180 + ((i * 53) % 360)))}deg`,
            } as CSSProperties
          }
        >
          {item.icon ? (
            <Image
              className={styles.icon}
              src={item.icon}
              width={46}
              height={46}
              alt=""
            />
          ) : (
            <span className={styles.chip}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
