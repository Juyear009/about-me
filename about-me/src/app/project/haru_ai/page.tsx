import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.section}>
        <p className={styles.mainTitle}>👤 서비스 페이지</p>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>📧 개발자 연락처</p>
        <ul>
          <li>운영자 : 박준현</li>
          <li>앱이름 : 하루 AI</li>
          <li>이메일 : githubbruny@gmail.com</li>
        </ul>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>📌 서비스 소개</p>
        <p>
          하루 AI는 다양한 뉴스 API와 기상 데이터를 기반으로,
          <br />
          사용자 맞춤형 뉴스 요약과 날씨 정보를 제공하는 모바일 애플리케이션
          입니다.
        </p>
        <br />
        <p>
          뉴스 카테고리별 주요 이슈를 간단히 확인할 수 있으며,
          <br />
          날씨 예보 및 맞춤형 브리핑 기능을 통해 하루의 시작을 더 알차게 시작할
          수 있도록 돕습니다.
        </p>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>📰 뉴스 데이터 출처</p>
        <p>
          본 앱에서 제공하는 뉴스 데이터는 [newsdata.io](http://newsdata.io)
          API를 통해 수집되며, <br />
          직접 기사 내용을 작성하지 않습니다.
        </p>
        <ul>
          <li>뉴스 데이터 제공 : [newsdata.io](http://newsdata.io) </li>
          <li>
            날씨 데이터 제공 : [Free Weather API -
            WeatherAPI.com](https://www.weatherapi.com/)
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>⚖️ 저작권 및 책임 고지</p>
        <ul>
          <li>
            본 앱은 뉴스 데이터 제공사의 API를 활용하며, 기사 내용의 저작권은
            해당 언론사 또는 작성자에게 있습니다.
          </li>
          <li>
            본 앱은 제공된 데이터의 정확성, 시의성, 완전성에 대해 책임지지
            않습니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
