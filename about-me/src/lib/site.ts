/** 사이트 전역 정보. 배포 주소가 바뀌면 여기(또는 NEXT_PUBLIC_SITE_URL)만 고치면 된다 */
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://juyear.dev",
  name: "JUYEAR",
  title: "JUYEAR — 대학생 개발자 포트폴리오",
  description:
    "대학생 개발자 JUYEAR의 포트폴리오. RAG·GraphRAG 기반 AI 서비스부터 앱 출시와 마케팅까지, 문제를 정의하고 해결한 기록을 모았습니다.",
  keywords: [
    "JUYEAR",
    "주이어",
    "대학생 개발자",
    "포트폴리오",
    "풀스택 개발자",
    "AI 개발자",
    "RAG",
    "GraphRAG",
    "Next.js",
    "NestJS",
    "React Native",
    "SW마에스트로",
  ],
  locale: "ko_KR",
  blog: "https://blog.juyear.dev",
  github: "https://github.com/Juyear009",
  linkedin: "https://www.linkedin.com/in/junhyeon-park-549046347/",
  instagram: "https://www.instagram.com/juyear_coding/",
  email: "githubbruny@gmail.com",
} as const;
