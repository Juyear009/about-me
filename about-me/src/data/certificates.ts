// 자격증·수상 이력 — certified 페이지에서 사용한다
export type CredentialKind = "certification" | "award";

export type Credential = {
  name: string;
  issuer: string;
  date: string;
  kind: CredentialKind;
  logo: string;
  /** 등급·순위처럼 이름만으로 드러나지 않는 부가 정보 */
  note?: string;
};

const credentials: Credential[] = [
  {
    name: "SQLD",
    issuer: "한국데이터산업진흥원",
    date: "2026.09.04",
    kind: "certification",
    logo: "/db_logo.svg",
    note: "국가공인 SQL 개발자",
  },
  {
    name: "COSPRO 1급",
    issuer: "YBM IT",
    date: "2021.11.28",
    kind: "certification",
    logo: "/python_logo.png",
    note: "Python",
  },
  {
    name: "COSPRO 2급",
    issuer: "YBM IT",
    date: "2020.02.16",
    kind: "certification",
    logo: "/C_logo.png",
    note: "C",
  },
  {
    name: "COSICAL:100 장려상",
    issuer: "코리아IT아카데미",
    date: "2025.01.18",
    kind: "award",
    logo: "/python_logo.png",
    note: "코딩알고리즘대회 전체 5위",
  },
];

export default credentials;
