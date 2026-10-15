import type { ProjectTitle } from "./projects";

export type ProjectItem = {
  title: ProjectTitle;
  des: string;
  tags: string[];
  img: string;
  platform: string;
  metric?: string;
};

const projectList: ProjectItem[] = [
  {
    title: "EAR",
    des: "출근길에 열면, 오늘 들을 게 준비되어 있어요. 매일 아침 도착하는 AI 팟캐스트!",
    tags: [
      "AI",
      "JS/TS",
      "PYTHON",
      "REACT NATIVE",
      "NEXT",
      "NEST",
      "FAST API",
      "SQL",
      "AWS",
    ],
    img: "ear_3.png",
    platform: "iOS · Android",
    metric: "출시 2주 만에 가입자 500명+",
  },
  {
    title: "SYNAPSE",
    des: "입력만 하세요, 연결은 AI가 도와줍니다. 생각을 이어주는 AI 지식 그래프 노트!",
    tags: ["AI", "JS/TS", "PYTHON", "NEXT", "NEST", "FAST API", "SQL", "REDIS"],
    img: "synapse_3.png",
    platform: "Web",
  },
  {
    title: "SANGMYUNG AI",
    des: "공지사항 데이터를 RAG 기반으로 학습한 대학생 전용 AI 챗봇을 만나보세요!",
    tags: ["AI", "JS/TS", "PYTHON", "NEXT", "NEST", "FAST API", "SQL"],
    img: "sangmyung_ai_4.png",
    platform: "Web App",
    metric: "4일 만에 실사용자 400명+",
  },
  {
    title: "DISMU",
    des: "AI 전용 노래 플랫폼, 미래 노래 시장은 이렇게 될 것입니다!",
    tags: [
      "AI",
      "JS/TS",
      "PYTHON",
      "NEXT",
      "NEST",
      "FAST API",
      "SQL",
      "FIREBASE",
    ],
    img: "dismu_5.png",
    platform: "Web · Discord Bot",
  },
  {
    title: "HARU AI",
    des: "뉴스 요약과 하루 TTS 브리핑까지, 이젠 쇼츠 말고 뉴스를 스크롤 하세요!",
    tags: ["AI", "JS/TS", "PYTHON", "REACT NATIVE", "NEST", "FAST API", "SQL"],
    img: "haru_ai_2.png",
    platform: "Android",
  },
  {
    title: "TRAIVEL",
    des: "이제 여행 일정을 AI로 한 번에 계획해보세요!",
    tags: ["AI", "JS/TS", "NEXT", "EXPRESS", "SQL"],
    img: "traivel_1.png",
    platform: "Web",
  },
];

export default projectList;
