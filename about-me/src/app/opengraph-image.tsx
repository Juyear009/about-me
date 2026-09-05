import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "JUYEAR — 대학생 개발자 포트폴리오";

/** 공유 링크에 붙는 카드 이미지. 기본 폰트로 그리므로 문구는 영문으로 둔다 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#f2f1ef",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "64px",
            height: "8px",
            backgroundColor: "#ec4931",
            marginBottom: "44px",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 700,
            color: "#161513",
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          JUYEAR
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: 40,
            fontWeight: 700,
            color: "#4a4a4a",
          }}
        >
          FULLSTACK DEVELOPER · AI RESEARCHER
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 28,
            color: "#8a8a8a",
          }}
        >
          juyear.dev
        </div>
      </div>
    ),
    size,
  );
}
