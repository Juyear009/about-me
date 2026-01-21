"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeIn({
  children,
  className = "",
  threshold = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`fadeIn ${isVisible ? "show" : ""} ${className}`}>
      {children}
    </div>
  );
}
