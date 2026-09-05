"use client";

import { useEffect, useRef } from "react";

const AWAY_TITLE = "🥺 어디 가세요...";

/** 다른 탭으로 넘어가면 제목이 바뀐다 */
export default function TabTitleEgg() {
  // 페이지를 이동하면 제목도 바뀌므로, 떠나는 시점의 제목을 기억한다
  const lastTitle = useRef("");

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        lastTitle.current = document.title;
        document.title = AWAY_TITLE;
        return;
      }
      if (lastTitle.current) document.title = lastTitle.current;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (lastTitle.current) document.title = lastTitle.current;
    };
  }, []);

  return null;
}
