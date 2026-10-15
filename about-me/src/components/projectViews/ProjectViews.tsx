"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSyncExternalStore, type ReactNode } from "react";
import styles from "./ProjectViews.module.css";
import GridView from "./GridView";
import BentoView from "./BentoView";
import ListView from "./ListView";
import StackView from "./StackView";
import CarouselView from "./CarouselView";
import projectList from "@/data/projectList";

const VIEWS = [
  {
    key: "grid",
    label: "그리드",
    View: GridView,
    icon: (
      <>
        <rect x="2" y="2" width="9" height="5.5" rx="1.5" />
        <rect x="13" y="2" width="9" height="5.5" rx="1.5" />
        <rect x="2" y="9.25" width="9" height="5.5" rx="1.5" />
        <rect x="13" y="9.25" width="9" height="5.5" rx="1.5" />
        <rect x="2" y="16.5" width="9" height="5.5" rx="1.5" />
        <rect x="13" y="16.5" width="9" height="5.5" rx="1.5" />
      </>
    ),
  },
  {
    key: "bento",
    label: "벤토",
    View: BentoView,
    icon: (
      <>
        <rect x="2" y="2" width="11" height="11" rx="1.5" />
        <rect x="15" y="2" width="7" height="4.5" rx="1.5" />
        <rect x="15" y="8.5" width="7" height="4.5" rx="1.5" />
        <rect x="2" y="15" width="9" height="7" rx="1.5" />
        <rect x="13" y="15" width="9" height="7" rx="1.5" />
      </>
    ),
  },
  {
    key: "list",
    label: "리스트",
    View: ListView,
    icon: (
      <>
        <rect x="2" y="3" width="3" height="3" rx="1" />
        <rect x="7" y="3" width="15" height="3" rx="1" />
        <rect x="2" y="10.5" width="3" height="3" rx="1" />
        <rect x="7" y="10.5" width="15" height="3" rx="1" />
        <rect x="2" y="18" width="3" height="3" rx="1" />
        <rect x="7" y="18" width="15" height="3" rx="1" />
      </>
    ),
  },
  {
    key: "stack",
    label: "스택",
    View: StackView,
    icon: (
      <>
        <rect x="6" y="2" width="12" height="3" rx="1.2" opacity="0.4" />
        <rect x="4" y="6" width="16" height="3" rx="1.2" opacity="0.7" />
        <rect x="2" y="10" width="20" height="12" rx="1.8" />
      </>
    ),
  },
  {
    key: "carousel",
    label: "캐러셀",
    View: CarouselView,
    icon: (
      <>
        <rect x="5" y="3" width="14" height="14" rx="1.8" />
        <rect x="0" y="5" width="3.5" height="10" rx="1" opacity="0.4" />
        <rect x="20.5" y="5" width="3.5" height="10" rx="1" opacity="0.4" />
        <circle cx="8" cy="20.5" r="1.3" />
        <circle cx="12" cy="20.5" r="1.3" opacity="0.4" />
        <circle cx="16" cy="20.5" r="1.3" opacity="0.4" />
      </>
    ),
  },
] satisfies { key: string; label: string; View: () => ReactNode; icon: ReactNode }[];

type ViewKey = (typeof VIEWS)[number]["key"];

const STORAGE_KEY = "project-view";

const isViewKey = (v: string | null): v is ViewKey =>
  VIEWS.some((view) => view.key === v);

let memoryView: ViewKey = "grid";
const listeners = new Set<() => void>();

const readView = (): ViewKey => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isViewKey(saved)) return saved;
  } catch {}
  return memoryView;
};

const writeView = (key: ViewKey) => {
  memoryView = key;
  try {
    localStorage.setItem(STORAGE_KEY, key);
  } catch {}
  listeners.forEach((l) => l());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export default function ProjectViews() {
  const view = useSyncExternalStore(subscribe, readView, () => "grid" as ViewKey);

  const Current = VIEWS.find((v) => v.key === view)!.View;

  return (
    <>
      <div className={styles.toolbar}>
        <p className={styles.count}>
          <span>{projectList.length}</span> Projects
        </p>
        <div className={styles.switcher} role="radiogroup" aria-label="보기 방식">
          {VIEWS.map((v) => (
            <button
              key={v.key}
              type="button"
              role="radio"
              aria-checked={view === v.key}
              title={`${v.label}로 보기`}
              className={`${styles.option} ${view === v.key ? styles.active : ""}`}
              onClick={() => writeView(v.key)}
            >
              {view === v.key && (
                <motion.span
                  layoutId="project-view-pill"
                  className={styles.pill}
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
                {v.icon}
              </svg>
              <span className={styles.label}>{v.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Current />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
