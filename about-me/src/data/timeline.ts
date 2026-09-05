// 타임라인 — 사진 한 장에 항목 네 개가 한 블록이다.
// imageFirst 는 사진을 왼쪽에 둘지 여부이며, 블록마다 번갈아 준다.

export type TimelineEntry = {
  date: string;
  text: string;
};

export type TimelineBlock = {
  image: string;
  imageFirst: boolean;
  entries: TimelineEntry[];
};

const timeline: TimelineBlock[] = [
  {
    image: "/timelineImg/timeline_img1.jpg",
    imageFirst: false,
    entries: [
      { date: "2018.01", text: "처음으로 Python이라는 언어로 코딩을 시작했어요." },
      {
        date: "2019.07",
        text: "Discord Bot API를 사용해 처음으로 서비스를 만들어봤어요.",
      },
      { date: "2020.02", text: "COSPRO 2급 자격증을 취득했어요." },
      { date: "2021.11", text: "COSPRO 1급 자격증을 취득했어요." },
    ],
  },
  {
    image: "/timelineImg/timeline_img2.avif",
    imageFirst: true,
    entries: [
      {
        date: "2022.03",
        text: "고등학교 코딩 영재반에서 1년동안 앱개발을 진행했어요.",
      },
      {
        date: "2023.12",
        text: "크몽에서 자동화 프로그램 개발로 외주를 받기 시작했어요.",
      },
      {
        date: "2024.03",
        text: "4년제 사립 대학교에 소프트웨어학과로 입학했어요.",
      },
      {
        date: "2025.01",
        text: '"COSICAL:100 코딩알고리즘대회"에서 5등으로 장려상을 수상했어요.',
      },
    ],
  },
  {
    image: "/timelineImg/timeline_img3.jpg",
    imageFirst: false,
    entries: [
      {
        date: "2025.08",
        text: "HARU AI 앱 개발과 이를 위한 사업자 등록을 진행했어요.",
      },
      {
        date: "2025.09",
        text: "AI미디어콘텐츠를 부전공으로 선택하여 수강하기 시작했어요.",
      },
      {
        date: "2025.09",
        text: "대학교 AI 챗봇 개발로 학보사 신문에 나오는 경험을 했어요.",
      },
      {
        date: "2025.10",
        text: '"고려사와 AI" 관련 논문에 보조 프로그램 제작으로 참여했어요.',
      },
    ],
  },
  {
    image: "/timelineImg/timeline_img4.jpg",
    imageFirst: true,
    entries: [
      {
        date: "2025.11",
        text: "학교 전용 AI 챗봇을 배포해 나흘 만에 400명 가까운 학우가 사용했어요.",
      },
      {
        date: "2025.12",
        text: "코딩테스트 준비를 시작해 1000문제 가까이 풀며 플래티넘 5에 올랐어요.",
      },
      {
        date: "2026.01",
        text: "첫 앱 HARU AI를 Google Play 스토어에 출시했어요.",
      },
      {
        date: "2026.04",
        text: "16기 탈락 이후 1년을 준비해 SW마에스트로 17기에 합격했어요.",
      },
    ],
  },
  {
    image: "/timelineImg/timeline_img5.jpg",
    imageFirst: false,
    entries: [
      {
        date: "2026.05",
        text: "HARU AI 광고 영상을 직접 만들어 집행하고 설치 전환율 28.5%를 기록했어요.",
      },
      {
        date: "2026.08",
        text: "테크리더로서 SDD와 티켓 발행 구조 등 팀 개발 환경을 구축했어요.",
      },
      {
        date: "2026.09",
        text: "데이터 모델링과 SQL 활용을 다루는 국가공인 SQLD 자격증을 취득했어요.",
      },
    ],
  },
];

export default timeline;
