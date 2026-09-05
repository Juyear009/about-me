"use client";

import { useEffect } from "react";

type JuyearConsole = {
  help: () => string;
  about: () => string;
  projects: () => string;
  contact: () => string;
  secret: () => string;
};

declare global {
  interface Window {
    juyear?: JuyearConsole;
  }
}

const TITLE = "font-size:44px;font-weight:bold;color:#ec4931;letter-spacing:2px;";
const BODY = "font-size:14px;font-weight:bold;color:#161513;";
const MUTED = "font-size:13px;color:#777;";

/** 개발자 도구를 열어본 사람에게만 보이는 인사와 명령어 */
export default function ConsoleGreeting() {
  useEffect(() => {
    console.log("%cJUYEAR", TITLE);
    console.log("%c콘솔까지 열어보셨네요. 반갑습니다 👋", BODY);
    console.log("%cjuyear.help() 를 입력해보세요.", MUTED);

    window.juyear = {
      help() {
        console.log("%c사용할 수 있는 명령어", BODY);
        console.log(
          "%cjuyear.about()     — 한 줄 소개\n" +
            "juyear.projects()  — 만든 것들\n" +
            "juyear.contact()   — 연락처\n" +
            "juyear.secret()    — ???",
          MUTED,
        );
        return "무엇이 궁금하신가요?";
      },
      about() {
        return "대학생 개발자 JUYEAR. 기술을 쓰는 사람이 아니라 문제를 푸는 사람이 되려고 합니다.";
      },
      projects() {
        console.log(
          "%cSYNAPSE      — 기록을 그래프로 잇는 GraphRAG 서비스\n" +
            "HARU AI      — 뉴스 3줄 요약과 TTS 브리핑 (Google Play 출시)\n" +
            "SANGMYUNG AI — 학교 공지 기반 RAG 챗봇 (4일 만에 400명)\n" +
            "DISMU        — AI 노래 플랫폼과 디스코드 봇\n" +
            "TRAIVEL      — 자연어로 만드는 여행 일정",
          MUTED,
        );
        return "자세한 건 /project 에서 볼 수 있어요.";
      },
      contact() {
        console.log("%cgithubbruny@gmail.com", BODY);
        console.log("%chttps://github.com/Juyear009", MUTED);
        return "언제든 편하게 연락주세요.";
      },
      secret() {
        console.log("%c아무 데서나 키보드로 천천히 쳐보세요.", MUTED);
        return "j u y e a r i s g o a t";
      },
    };

    return () => {
      delete window.juyear;
    };
  }, []);

  return null;
}
