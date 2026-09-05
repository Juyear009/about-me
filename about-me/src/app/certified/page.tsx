import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";
import credentials, { type Credential } from "@/data/certificates";

export const metadata: Metadata = {
  title: "Certified",
  description:
    "SQLD, COSPRO 1급·2급 자격증과 COSICAL:100 수상 이력을 정리했습니다.",
  alternates: { canonical: "/certified" },
};

const SECTIONS = [
  { kind: "certification", label: "CERTIFICATION", caption: "자격증" },
  { kind: "award", label: "AWARD", caption: "수상" },
] as const;

function CredentialCard({
  credential,
  index,
}: {
  credential: Credential;
  index: number;
}) {
  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className={styles.cardTop}>
        <div className={styles.logoWrapper}>
          <Image
            src={credential.logo}
            width={42}
            height={42}
            alt={`${credential.issuer} 로고`}
          />
        </div>
        <div className={styles.medal} aria-hidden="true" />
      </div>

      <p className={styles.cardName}>{credential.name}</p>
      {credential.note && <p className={styles.cardNote}>{credential.note}</p>}

      <div className={styles.cardMeta}>
        <p className={styles.metaLabel}>ISSUER</p>
        <p className={`${styles.metaLabel} ${styles.metaRight}`}>DATE</p>
        <p className={styles.metaValue}>{credential.issuer}</p>
        <p className={`${styles.metaValue} ${styles.metaRight}`}>
          {credential.date}
        </p>
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.titleSection}>
        <p className={styles.title}>경험을 넘어 자격으로.</p>
        <p className={styles.des}>
          JUYEAR가 취득한 자격증과 수상 이력을 확인해보세요.
        </p>
      </div>

      {SECTIONS.map((section) => {
        const items = credentials.filter((c) => c.kind === section.kind);
        if (items.length === 0) return null;

        return (
          <section key={section.kind} className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionLabel}>{section.label}</span>
              <span className={styles.sectionCaption}>{section.caption}</span>
              <span className={styles.sectionRule} />
              <span className={styles.sectionCount}>
                {String(items.length).padStart(2, "0")}
              </span>
            </div>
            <div className={styles.cards}>
              {items.map((credential, index) => (
                <CredentialCard
                  key={credential.name}
                  credential={credential}
                  index={index}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
