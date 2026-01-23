"use client";

import SkillIcon from "@/components/SkillIcon";
import styles from "./page.module.css";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { myfont } from "./fonts";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const codingWords = [
    "개발자",
    "프로그래머",
    "React",
    "Next",
    "JS",
    "TS",
    "Nest",
    "Python",
    "네트워크",
    "리눅스",
    "MySQL",
    "AI",
  ];
  const designWords = [
    "UI/UX",
    "디자인",
    "블루",
    "After Effect",
    "Illustrator",
    "INTJ",
    "남자",
    "20살",
    "백준 플레티넘",
    "창업",
  ];
  const backendSkills = [
    {
      name: "Python",
      default: "/skill_icons/black_python.png",
      hover: "/skill_icons/color_python.png",
      size: 90,
    },
    {
      name: "JavaScript",
      default: "/skill_icons/black_js.png",
      hover: "/skill_icons/color_js.png",
      size: 90,
    },
    {
      name: "TypeScript",
      default: "/skill_icons/black_ts.png",
      hover: "/skill_icons/color_ts.png",
      size: 90,
    },
    {
      name: "C",
      default: "/skill_icons/black_c.png",
      hover: "/skill_icons/color_c.png",
      size: 90,
    },
    {
      name: "Nest",
      default: "/skill_icons/black_nest.png",
      hover: "/skill_icons/color_nest.png",
      size: 90,
    },
    {
      name: "MySQL",
      default: "/skill_icons/black_mysql.png",
      hover: "/skill_icons/color_mysql.png",
      size: 100,
    },
  ];
  const frontendSkills = [
    {
      name: "Html",
      default: "/skill_icons/black_html.png",
      hover: "/skill_icons/color_html.png",
      size: 90,
    },
    {
      name: "Css",
      default: "/skill_icons/black_css2.png",
      hover: "/skill_icons/color_css.png",
      size: 90,
    },
    {
      name: "React",
      default: "/skill_icons/black_react.png",
      hover: "/skill_icons/color_react.png",
      size: 85,
    },
    {
      name: "Next",
      default: "/skill_icons/black_next.png",
      hover: "/skill_icons/color_next.png",
      size: 90,
    },
  ];
  const studySkills = [
    {
      name: "Java",
      default: "/skill_icons/black_java.png",
      hover: "/skill_icons/color_java.png",
      size: 90,
    },
    {
      name: "Git",
      default: "/skill_icons/black_git.png",
      hover: "/skill_icons/color_git.png",
      size: 90,
    },
    {
      name: "Linux",
      default: "/skill_icons/black_linux.png",
      hover: "/skill_icons/color_linux.png",
      size: 90,
    },
    {
      name: "AI",
      default: "/skill_icons/black_ai.png",
      hover: "/skill_icons/color_ai.png",
      size: 80,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.HeroSection}>
        <div className={styles.titleSection}>
          <p className={styles.mainTitle1}>대학생 개발자</p>
          <p className={styles.mainTitle1}>JUYEAR</p>
        </div>
        <Image
          className={styles.profileImg}
          height={450}
          width={450}
          src={"/profile.png"}
          alt="프로필 사진"
        />
      </div>
      <div className={styles.keywordSection}>
        <div className={styles.trackLeft}>
          {codingWords.map((w, i) => (
            <span key={`a-${i}`}>{w}</span>
          ))}
          {codingWords.map((w, i) => (
            <span key={`b-${i}`}>{w}</span>
          ))}
        </div>
        <div className={styles.trackRight}>
          {designWords.map((w, i) => (
            <span key={`a-${i}`}>{w}</span>
          ))}
          {designWords.map((w, i) => (
            <span key={`b-${i}`}>{w}</span>
          ))}
        </div>
      </div>
      <div className={styles.profileSummary}>
        <FadeIn>
          <div className={styles.profileSummaryHeading}>
            <p className={styles.profileSummaryTitle}>
              FULLSTACK <br />
              DEVELOPER
              <br />
              AI RESEARCHER
            </p>
            <div>
              <p className={styles.profileSummaryDes}>
                저는 다가오는 기술에 빠르게 적응하며,
                <br />
                단순히 기술을 활용하는 개발자가 아닌 <br />
                문제를 해결하는 개발자로 성장하고자 합니다.
              </p>
              <div className={styles.profileInfo}>
                <div>
                  <p className={styles.profileInfoTitle}>GENDER</p>
                  <p className={styles.profileInfoDes}>남자</p>
                </div>
                <div>
                  <p className={styles.profileInfoTitle}>EDUCATION</p>
                  <p className={styles.profileInfoDes}>대학교 재학</p>
                </div>
                <div>
                  <p className={styles.profileInfoTitle}>YEAR</p>
                  <p className={styles.profileInfoDes}>20살</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn>
          <div className={styles.profileSummaryBoxes}>
            <div className={styles.profileSummaryBox1}>
              <p className={styles.boxTitle}>DONGTAN</p>
              <p className={styles.boxDes}>LOCATION</p>
            </div>
            <div className={styles.profileSummaryBox2}>
              <p className={styles.boxTitle}>7+</p>
              <p className={styles.boxDes}>YEARS OF EXPERIENCE</p>
            </div>
            <div className={styles.profileSummaryBox1}>
              <p className={styles.boxTitle}>2005.07.28</p>
              <p className={styles.boxDes}>DATE OF BIRTH</p>
            </div>
          </div>
        </FadeIn>
      </div>
      <div className={styles.skillSection}>
        <FadeIn>
          <div className={styles.skillSectionHeading}>
            <Image
              src={"/red_button.svg"}
              width={50}
              height={50}
              alt="빨간 아이콘"
            />
            <p className={styles.skillSectionTitle}>SKILLS</p>
            <p className={styles.skillSectionDes}>
              현재 기술 스택과 배우고 있는 기술을 정리해봤어요.
            </p>
          </div>
        </FadeIn>
        <div className={styles.skillBoxes}>
          <FadeIn>
            <div className={styles.skillBox}>
              <span className={styles.label}>BACKEND</span>
              {backendSkills.map((skill) => (
                <SkillIcon key={skill.name} skill={skill} />
              ))}
            </div>
          </FadeIn>
          <FadeIn>
            <div className={styles.skillBox}>
              <span className={styles.label}>FRONTEND</span>
              {frontendSkills.map((skill) => (
                <SkillIcon key={skill.name} skill={skill} />
              ))}
            </div>
          </FadeIn>
          <FadeIn>
            <div className={styles.skillBox}>
              <span className={styles.label}>STUDY</span>
              {studySkills.map((skill) => (
                <SkillIcon key={skill.name} skill={skill} />
              ))}
            </div>
          </FadeIn>
          <FadeIn>
            <div className={`${styles.skillBox} ${styles.textBox}`}>
              <span className={styles.label}>OTHERS</span>
              <p>RAG · FAISS · FASTAPI · EXPRESS · ARCHITECTURE</p>
              <p>VERCEL · SUPABASE · POSTMAN · SWAGGER · NETWORK</p>
              <p>FFMPEG · NOTION · GITHUB · PRISMA · FIREBASE</p>
            </div>
          </FadeIn>
        </div>
      </div>
      <div className={styles.timelineSection}>
        <FadeIn>
          <div className={styles.timelineSectionHeading}>
            <Image
              src={"/red_button.svg"}
              width={50}
              height={50}
              alt="빨간 아이콘"
            />
            <p className={styles.skillSectionTitle}>TIMELINE</p>
            <p className={styles.skillSectionDes}>
              주요 활동을 타임라인 형식으로 정리해봤어요.
            </p>
          </div>
        </FadeIn>
        <div className={styles.timelineBody}>
          <FadeIn>
            <div className={styles.timelineDivide}>
              <div className={styles.timelineItems}>
                <div className={styles.timelineItem}>
                  <p>
                    <span className={styles.year}>2018-01</span> : 처음으로
                    Python이라는 언어로 코딩을 시작했어요.
                  </p>
                </div>
                <div className={styles.timelineItem}>
                  <p>
                    <span className={styles.year}>2019-07</span> : Discord Bot
                    API를 사용해 처음으로 서비스를 만들어봤어요.
                  </p>
                </div>
                <div className={styles.timelineItem}>
                  <p>
                    <span className={styles.year}>2020-02</span> : COSPRO 2급
                    자격증을 취득했어요.
                  </p>
                </div>
                <div className={styles.timelineItem}>
                  <p>
                    <span className={styles.year}>2021-11</span> : COSPRO 1급
                    자격증을 취득했어요.
                  </p>
                </div>
              </div>
              <div className={styles.timelineImg}>
                <Image
                  height={250}
                  width={400}
                  src={"/timelineImg/timeline_img1.jpg"}
                  alt="타임라인 이미지"
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <div className={styles.timelineDivide}>
              <div className={styles.timelineImg}>
                <Image
                  height={250}
                  width={400}
                  src={"/timelineImg/timeline_img2.avif"}
                  alt="타임라인 이미지"
                />
              </div>
              <div className={styles.timelineItems}>
                <div className={styles.timelineItem}>
                  <p>
                    <span className={styles.year}>2022-03</span> : 고등학교 코딩
                    영재반에서 1년동안 앱개발을 진행했어요.
                  </p>
                </div>
                <div className={styles.timelineItem}>
                  <p>
                    <span className={styles.year}>2023-12</span> : 크몽에서
                    자동화 프로그램 개발로 외주를 받기 시작했어요.
                  </p>
                </div>
                <div className={styles.timelineItem}>
                  <p>
                    <span className={styles.year}>2024-04</span> : 4년제 사립
                    대학교에 소프트웨어학과로 입학했어요.
                  </p>
                </div>
                <div className={styles.timelineItem}>
                  <p>
                    <span className={styles.year}>2025-09</span> : 대학교 AI
                    챗봇 개발로 학보사 신문에 나오는 경험을 했어요.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <div className={styles.timelineDivide}>
              <div className={styles.timelineItems}>
                <div className={styles.timelineItem}>
                  <p>
                    <span className={styles.year}>2022-??-??</span> : 처음으로
                    Python이라는 언어로 코딩을 시작했어요.
                  </p>
                </div>
                <div className={styles.timelineItem}>
                  <p>
                    <span className={styles.year}>2022-??-??</span> : 처음으로
                    Python이라는 언어로 코딩을 시작했어요.
                  </p>
                </div>
                <div className={styles.timelineItem}>
                  <p>
                    <span className={styles.year}>2022-??-??</span> : 처음으로
                    Python이라는 언어로 코딩을 시작했어요.
                  </p>
                </div>
                <div className={styles.timelineItem}>
                  <p>
                    <span className={styles.year}>2022-??-??</span> : 처음으로
                    Python이라는 언어로 코딩을 시작했어요.
                  </p>
                </div>
              </div>
              <div className={styles.timelineImg}>
                <Image
                  height={250}
                  width={400}
                  src={"/timelineImg/timeline_img3.jpg"}
                  alt="타임라인 이미지"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      <div className={styles.mottoSection}>
        <FadeIn>
          <div className={styles.mottoSectionHeading}>
            <Image
              src={"/red_button.svg"}
              width={50}
              height={50}
              alt="빨간 아이콘"
            />
            <p className={styles.skillSectionTitle}>MOTTO</p>
            <p className={styles.skillSectionDes}>제 인생 모토를 적어봤어요.</p>
            <p className={`${styles.motto} ${myfont.className}`}>
              <span className={styles.redQuot}>&quot;</span> 항상 위를 보는
              사람은 절대 바닥에 있지 않는다.{" "}
              <span className={styles.redQuot}>&quot;</span>
            </p>
          </div>
        </FadeIn>
      </div>
      <div className={styles.footerSection}>
        <div className={styles.footerDivide}>
          <Image
            className={styles.footerImage}
            src={"/profile.png"}
            height={60}
            width={60}
            alt="링크드인 로고"
          />
          <p className={styles.footerTitle}>Contact Me.</p>
        </div>
        <div className={styles.footerDivide}>
          <div>
            <p className={styles.footerTitle}>© Made by JUYEAR</p>
            <a
              href="https://webflow.com/templates/html/moxa-portfolio-website-template?ps_partner_key=c3RldmViZW5qYW1pbnM2NjY1&ps_xid=mYzBdIG1FLNANI&gsxid=mYzBdIG1FLNANI&gspk=c3RldmViZW5qYW1pbnM2NjY1"
              className={styles.footerDes}
            >
              여기서 디자인을 참고했어요.
            </a>
          </div>
          <div className={styles.snsLinks}>
            <Image
              className={styles.snsLogo}
              onClick={() =>
                router.push(
                  "https://www.linkedin.com/in/junhyeon-park-549046347/",
                )
              }
              src={"/sns_logos/linkedin_logo.png"}
              height={50}
              width={50}
              alt="링크드인 로고"
            />
            <Image
              className={styles.snsLogo}
              onClick={() =>
                router.push("https://www.instagram.com/juyear_coding/?__pwa=1")
              }
              src={"/sns_logos/instagram_logo.png"}
              height={50}
              width={50}
              alt="인스타그램 로고"
            />
            <Image
              className={styles.snsLogo}
              onClick={() => router.push("mailto:githubbruny@gmail.com")}
              src={"/sns_logos/gmail_logo.png"}
              height={50}
              width={50}
              alt="지메일 로고"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
