import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "아키텍처 설계, 성능 개선, 시장 분석과 회고까지. JUYEAR가 직접 고른 블로그 글을 주제별로 모았습니다.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
