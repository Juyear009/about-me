"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./page.module.css";
import posts, {
  BLOG_URL,
  CATEGORY_LABELS,
  TOTAL_POST_COUNT,
  type BlogCategory,
  type BlogPost,
} from "@/data/posts";

type Filter = "recommended" | BlogCategory;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "recommended", label: "추천" },
  { key: "tech", label: "기술" },
  { key: "business", label: "사업" },
  { key: "experience", label: "경험" },
];

export default function Page() {
  const [filter, setFilter] = useState<Filter>("recommended");
  const [selected, setSelected] = useState<BlogPost | null>(null);

  const counts = useMemo(() => {
    return FILTERS.reduce(
      (acc, f) => {
        acc[f.key] =
          f.key === "recommended"
            ? posts.filter((p) => p.recommended).length
            : posts.filter((p) => p.category === f.key).length;
        return acc;
      },
      {} as Record<Filter, number>,
    );
  }, []);

  const list = useMemo(() => {
    return filter === "recommended"
      ? posts.filter((p) => p.recommended)
      : posts.filter((p) => p.category === filter);
  }, [filter]);

  // 모달이 열려 있는 동안 ESC로 닫고, 뒤쪽 페이지의 스크롤을 잠근다
  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <div className={styles.page}>
      <div className={styles.titleSection}>
        <p className={styles.title}>기술로 다가가는 생각.</p>
        <p className={styles.des}>JUYEAR의 블로그 글을 확인해보세요.</p>
      </div>

      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`${styles.filter} ${
              filter === f.key ? styles.filterActive : ""
            }`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className={styles.filterCount}>{counts[f.key]}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={filter}
          className={styles.list}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {list.map((post, i) => (
            <motion.li
              key={post.url}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
            >
              <button
                type="button"
                className={styles.row}
                onClick={() => setSelected(post)}
              >
                <span className={styles.rowCategory}>
                  {CATEGORY_LABELS[post.category]}
                </span>
                <span className={styles.rowTitle}>{post.title}</span>
                <span className={styles.rowDate}>{post.date}</span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <a
        className={styles.allPosts}
        href={BLOG_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        블로그에서 전체 {TOTAL_POST_COUNT}편 보기{" "}
        <span aria-hidden="true">→</span>
      </a>

      <AnimatePresence>
        {selected && (
          <motion.div
            className={styles.overlay}
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setSelected(null)}
                aria-label="닫기"
              >
                <span aria-hidden="true">×</span>
              </button>

              <p className={styles.modalMeta}>
                <span className={styles.metaCategory}>
                  {CATEGORY_LABELS[selected.category]}
                </span>
                <span className={styles.metaDot} aria-hidden="true">
                  ·
                </span>
                <span className={styles.metaDate}>{selected.date}</span>
              </p>
              <p className={styles.modalTitle}>{selected.title}</p>

              <p className={styles.modalSummary}>{selected.summary}</p>

              {selected.achievement && (
                <div className={styles.block}>
                  <p className={styles.blockLabel}>성과</p>
                  <p className={styles.blockText}>{selected.achievement}</p>
                </div>
              )}

              <div className={styles.block}>
                <p className={styles.blockLabel}>TECH STACK</p>
                <div className={styles.tags}>
                  {selected.tags.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.12 + i * 0.06,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>

              <a
                className={styles.readLink}
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                블로그에서 읽기 <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
