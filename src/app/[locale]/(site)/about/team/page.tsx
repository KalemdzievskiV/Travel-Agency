import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { AboutHero, MediaPlaceholder, Reveal } from "@/components/about";

export const metadata: Metadata = {
  title: "Our team",
  description:
    "The travel designers behind bookit — wanderers and planners who know the ground across North Macedonia and the Balkans.",
};

// Placeholder team — names/photos/bios to be supplied by the client. Role
// labels come from the `about` message namespace (roleKey).
const team = [
  { roleKey: "roleFounder", grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)" },
  { roleKey: "roleBalkans", grad: "linear-gradient(135deg,#5a6b86,#2a3550)" },
  { roleKey: "roleExperience", grad: "linear-gradient(135deg,#7a6a52,#2c2418)" },
  { roleKey: "roleConcierge", grad: "linear-gradient(135deg,#4f6f57,#1d2c20)" },
] as const;

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  return (
    <>
      <AboutHero
        eyebrow={t("whoWeAre")}
        title={t("teamTitle")}
        intro={t("teamIntro")}
        grad="linear-gradient(135deg,#5a6b86,#16130f)"
      />

      <section style={{ background: "var(--wf-cream)", padding: "clamp(64px, 9vw, 112px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div className="wf-grid wf-grid-4">
            {team.map((m, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <MediaPlaceholder grad={m.grad} ratio="4 / 5" />
                <h3
                  style={{
                    fontFamily: "var(--wf-font-display)",
                    fontWeight: 500,
                    fontSize: 20,
                    margin: "14px 0 0",
                    color: "var(--wf-ink-900)",
                  }}
                >
                  {t("memberName")}
                </h3>
                <Eyebrow as="p" tone="ink" style={{ marginTop: 6 }}>
                  {t(m.roleKey)}
                </Eyebrow>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
