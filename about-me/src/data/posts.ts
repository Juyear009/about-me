// 블로그 큐레이션 — blog.juyear.dev 글 85편 중 25편.
// 글이 추가되면 이 파일에 항목을 더한다.

export type BlogCategory = "tech" | "business" | "experience";

export type BlogPost = {
  title: string;
  url: string;
  date: string;
  category: BlogCategory;
  summary: string;
  /** 글 안에서 확인되는 수치·결과. 없으면 생략한다 */
  achievement?: string;
  tags: string[];
  recommended?: boolean;
};

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  tech: "기술",
  business: "사업",
  experience: "경험",
};

export const BLOG_URL = "https://blog.juyear.dev/category";
export const TOTAL_POST_COUNT = 85;

const posts: BlogPost[] = [
  // ─────────────── 기술 ───────────────
  {
    title: "[SYNAPSE #2] Redis Streams로 서버 간 의존도 낮추기",
    url: "https://blog.juyear.dev/128",
    date: "2026.07.04",
    category: "tech",
    summary:
      "AI 서버에 Read Only DB를 준 탓에 생긴 저장 문제. Write 권한을 주는 것도, 메인 서버 API를 역호출하는 것도 각각 도메인 소유권과 순환 호출 때문에 접고 Redis Streams 기반 이벤트 구조로 갔다.",
    tags: ["Redis Streams", "이벤트 기반", "아키텍처 설계"],
    recommended: true,
  },
  {
    title: "[DB 아키텍처] 1초에 1000명이 몰리면 DB는 정합성을 어떻게 지킬까",
    url: "https://blog.juyear.dev/123",
    date: "2026.05.06",
    category: "tech",
    summary:
      "선착순 쿠폰 상황을 만들어 lock 없이 재고가 어긋나는 걸 재현하고, optimistic·pessimistic·redis lock을 차례로 걸어 JMeter로 비교했다. 락마다 DB에 실제로 무슨 일이 일어나는지 로그로 확인했다.",
    achievement: "동시 요청 부하 테스트로 락별 DB 부하 차이 실측",
    tags: ["MySQL", "동시성 제어", "JMeter"],
    recommended: true,
  },
  {
    title: "[SYNAPSE #6] AWS 인프라 구축기",
    url: "https://blog.juyear.dev/134",
    date: "2026.08.25",
    category: "tech",
    summary:
      "Lambda 대신 EC2를, ECS Fargate 대신 EC2를 고른 이유를 하나씩 적었다. Backend는 Public Subnet, AI 서버는 Private Subnet으로 나눴다.",
    tags: ["AWS", "EC2", "VPC"],
  },
  {
    title: "[SYNAPSE #5] 테스트 코드 도입과 GitHub Actions CI",
    url: "https://blog.juyear.dev/133",
    date: "2026.08.16",
    category: "tech",
    summary:
      "커버리지 숫자 대신 핵심 로직을 기준으로 삼았다. Service는 Unit Test로 덮고, Controller·DTO·Guard는 E2E가 맡는다.",
    achievement: "PR에서 테스트가 깨지면 merge를 막는 CI 구축",
    tags: ["Jest", "GitHub Actions", "CI"],
  },
  {
    title: "[SYNAPSE #3] GraphRAG 파이프라인 구축",
    url: "https://blog.juyear.dev/130",
    date: "2026.07.25",
    category: "tech",
    summary:
      "노트 임베딩 → 유사 노트 검색 → 연결 이유 생성으로 이어지는 파이프라인을 Orchestrator가 조합하도록 만들었다. 만들어진 link를 화면에 띄우기 위한 DB 설계 고민도 담았다.",
    tags: ["GraphRAG", "Orchestrator", "SSE"],
  },
  {
    title: "[SYNAPSE #1] GraphRAG를 위한 AI 서버 아키텍처 설계",
    url: "https://blog.juyear.dev/127",
    date: "2026.07.02",
    category: "tech",
    summary:
      "Note 도메인 하나에 다 넣으려다 NoteService가 Link·Graph 도메인의 구현까지 알게 됐다. Orchestrator를 넣어 책임을 가르고, 도메인 소유권을 기준으로 서버를 분리했다.",
    tags: ["아키텍처 설계", "도메인 소유권", "Orchestrator"],
  },
  {
    title: "[DISMU] 요청을 직렬화해 동시성 문제 해결하기",
    url: "https://blog.juyear.dev/135",
    date: "2026.09.05",
    category: "tech",
    summary:
      "배포 전 테스트에서 왜 못 잡았는지부터 짚었다 — 좋은 네트워크, 같은 망, 로컬. 요청을 Promise Chain으로 직렬화하고 상태의 출처를 하나로 정해 순서 정합성을 되찾았다.",
    achievement: "1년 넘게 운영 중인 서비스의 플레이리스트 정합성 문제 해결",
    tags: ["동시성", "Promise Chain", "SSOT"],
  },
  {
    title: "[SANGMYUNG AI] RAG 답변 생성 최적화",
    url: "https://blog.juyear.dev/107",
    date: "2025.07.24",
    category: "tech",
    summary:
      "38초씩 걸리던 답변을 줄이려고 한 시도들을 측정값과 같이 적었다. FAISS 인덱스 교체는 데이터가 적어 소용없었고, 문서 탐색을 병렬로 돌린 게 통했다.",
    achievement: "평균 답변 생성 시간 약 38초 → 약 20초",
    tags: ["RAG", "FAISS", "성능 최적화"],
  },
  {
    title: "왜 내 챗봇은 헛소리를 할까? RAG와 Reranker",
    url: "https://blog.juyear.dev/104",
    date: "2025.07.13",
    category: "tech",
    summary:
      "챗봇이 엉뚱한 답을 하는 원인은 검색 단계에 있었다. Reranker와 문서 순서, 그리고 차원 수가 높다고 꼭 좋은 게 아니라는 것. 1536차원보다 한국어 전용 768차원이 나았다.",
    tags: ["RAG", "Reranker", "임베딩"],
  },
  {
    title: "[SANGMYUNG AI] 응답 속도를 위한 스트리밍 설계",
    url: "https://blog.juyear.dev/106",
    date: "2025.07.21",
    category: "tech",
    summary:
      "Next → Nest → Python 두 단계를 거치느라 길어진 대기 시간을 스트리밍으로 잘랐다. GPT의 stream 옵션부터 화면에 글자가 찍히기까지 전 구간을 이었다.",
    tags: ["Streaming", "FastAPI", "OpenAI"],
  },
  {
    title: "[Home Server #1] 미니PC로 시작하는 Ubuntu 홈서버",
    url: "https://blog.juyear.dev/129",
    date: "2026.07.20",
    category: "tech",
    summary:
      "중고 미니PC 20만원어치로 서버를 세웠다. SSH 키, sshd, UFW까지. 클라우드에서 당연하게 쓰던 것들이 실제로 어떻게 도는지 보려던 게 목적이었다.",
    tags: ["Ubuntu", "SSH", "네트워크"],
  },
  {
    title: "[DISMU] WebSocket으로 공용 플레이리스트 만들기",
    url: "https://blog.juyear.dev/109",
    date: "2025.10.05",
    category: "tech",
    summary:
      "여러 명이 동시에 고치는 플레이리스트를 WebSocket으로 구현했다. 디스코드 길드마다 Room을 나눠 통신 서버를 분리하고, 곡이 끝나면 봇이 알림을 보내 다음 곡으로 넘어가게 했다.",
    tags: ["WebSocket", "NestJS", "실시간 통신"],
  },
  {
    title: "[Nest] 클린코드 6편 연재",
    url: "https://blog.juyear.dev/112",
    date: "2025.11.03",
    category: "tech",
    summary:
      "Nest 백엔드 아키텍처를 정리한 6편짜리 연재. JWT 인증에서 시작해 Guard와 Decorator, DTO와 전역 Pipe, Service·Repository 분리, Interceptor로 응답 통일, Application Layer 도입까지 이어진다.",
    tags: ["NestJS", "클린코드", "DI"],
  },

  // ─────────────── 사업 ───────────────
  {
    title: "[TRAIVEL] 마케팅 분석 - 에브리타임 vs 네이버 카페",
    url: "https://blog.juyear.dev/102",
    date: "2025.07.02",
    category: "business",
    summary:
      "같은 서비스를 두 커뮤니티에 올리고 GA4로 비교했다. 숫자보다 왜 그 차이가 났는지가 궁금해서, 두 채널의 연령대와 이용 목적까지 따져봤다.",
    achievement:
      "에브리타임 45명 / 네이버 카페 2명 유입, 재방문율 24%, 홍보글 스크랩 21건",
    tags: ["GA4", "채널 분석", "마케팅"],
    recommended: true,
  },
  {
    title: "[HARU_AI] 1인 개발자의 광고 제작과 집행 회고",
    url: "https://blog.juyear.dev/125",
    date: "2026.05.25",
    category: "business",
    summary:
      "생성형 AI로 광고를 만들려다 비용과 품질 때문에 접고, 36초짜리를 직접 편집했다. 구글 애즈와 메타로 돌린 뒤 스토어 방문에서 설치까지의 전환율을 계산했다.",
    achievement: "스토어 방문 630명 → 설치 180명, 전환율 28.5%",
    tags: ["구글 애즈", "메타 광고", "CVR"],
  },
  {
    title: "[SYNAPSE] 여러분은 무슨 목적으로 기록하시나요?",
    url: "https://blog.juyear.dev/126",
    date: "2026.06.24",
    category: "business",
    summary:
      "노션을 7년 썼는데 기억나는 기록은 10%도 안 됐다. 기록이 죽는 이유를 파편화에서 찾고, 카테고리라는 분류 방식 자체가 연결을 끊는다는 데까지 갔다.",
    tags: ["문제 정의", "기획"],
  },
  {
    title: "[HARU_AI] AI와 함께하는 뉴스, 하루AI 출시",
    url: "https://blog.juyear.dev/121",
    date: "2026.02.13",
    category: "business",
    summary:
      "2030 뉴스 이용률이 줄어든다는 통계에서 출발해 3줄 요약과 릴스형 스크롤로 진입 장벽을 낮췄다. 뉴스 앱 심사에 걸려 한 번 접었다가 수정해서 다시 냈다.",
    achievement: "2026.01.30 Google Play Store 출시",
    tags: ["React Native", "TTS", "프로덕트 기획"],
  },
  {
    title: "[DISMU] Discord 노래봇의 새로운 기준",
    url: "https://blog.juyear.dev/111",
    date: "2025.10.26",
    category: "business",
    summary:
      "노래봇의 텍스트 UI 한계에서 시작했다. AI 노래는 쏟아지는데 이걸 공유하고 저작권을 지킬 곳이 없다는 공백도 함께 짚었다.",
    tags: ["시장 분석", "프로덕트 기획"],
  },
  {
    title: "[TRAIVEL] 여행 일정 생성 AI, v1.0 출시",
    url: "https://blog.juyear.dev/101",
    date: "2025.06.27",
    category: "business",
    summary:
      "자연어로 쓰면 일차별 일정이 나온다. 구글맵 동선, 자연어 수정, 링크 공유까지 넣은 MVP를 정식으로 배포했다.",
    achievement: "MVP 개발 완료 후 v1.0 정식 배포",
    tags: ["GPT API", "Next.js", "MVP"],
  },
  {
    title: "[TRAIVEL] v1.1 업데이트 - 유저 피드백 반영",
    url: "https://blog.juyear.dev/103",
    date: "2025.07.03",
    category: "business",
    summary:
      "첫 유지보수 사이클. 화면이 낮아지면 겹치던 요금제 페이지를 flex로 고치고 카카오톡 공유를 붙였다. 피드백부터 배포까지 한 바퀴를 돌았다.",
    achievement: "유저 피드백 기반 4건 반영",
    tags: ["유지보수", "사용자 피드백", "카카오 API"],
  },

  // ─────────────── 경험 ───────────────
  {
    title: "[ASM·SWM] 테크리더로서의 프로젝트 설계",
    url: "https://blog.juyear.dev/132",
    date: "2026.08.06",
    category: "experience",
    summary:
      "속도가 나지 않던 팀에 SDD를 들였다. 브랜치 전략과 문서 체계를 세우고 AI로 티켓을 발행하는 흐름까지 만들었다. 설계는 요구사항이 아니라 팀을 보고 하는 것이었다.",
    tags: ["SDD", "테크리더", "협업"],
    recommended: true,
  },
  {
    title: "[ASM·SWM] SW마에스트로 17기 합격 후기",
    url: "https://blog.juyear.dev/122",
    date: "2026.04.27",
    category: "experience",
    summary:
      "16기 2차 코딩테스트에서 떨어지고 1년. 그 사이에 만든 것들과, 12월부터 3개월 동안 코딩테스트와 CS를 병행한 준비 과정을 적었다.",
    achievement: "SW마에스트로 17기 합격 · 백준·프로그래머스 약 1000문제, 플래티넘 5",
    tags: ["SW마에스트로", "코딩테스트", "회고"],
    recommended: true,
  },
  {
    title: "[SANGMYUNG AI] 프로젝트 마무리 및 후기",
    url: "https://blog.juyear.dev/115",
    date: "2025.11.23",
    category: "experience",
    summary:
      "가장 반응이 좋았던 프로젝트를 직접 접은 이유. 미리 확인하지 못한 법적 문제가 있었고, 성과와 실수를 같이 남겼다.",
    achievement: "배포 4일 만에 약 400명 이용 · 교내 학보사 인터뷰 요청",
    tags: ["회고", "서비스 운영"],
  },
  {
    title: "[Custom File Extension] Electron으로 내 확장자 만들기",
    url: "https://blog.juyear.dev/124",
    date: "2026.05.20",
    category: "experience",
    summary:
      "'내 이름으로 된 확장자가 있으면 재밌겠는데'로 시작했다. Electron IPC로 프로세스 간 통신을 짜고, Ctrl+S를 전역에 걸어 다른 앱 입력까지 가로챈 사고도 겪었다.",
    tags: ["Electron", "IPC", "사이드 프로젝트"],
  },
  {
    title: "[EZ_Scheduler] 프로젝트 마무리",
    url: "https://blog.juyear.dev/82",
    date: "2025.03.12",
    category: "experience",
    summary:
      "React를 제대로 익히려고 시작한 첫 연재형 프로젝트. 서버와 DB 연결부터 회원가입, 일정 CRUD, 모달까지 7편에 걸쳐 남겼다.",
    tags: ["React", "Express", "회고"],
  },
];

export default posts;
