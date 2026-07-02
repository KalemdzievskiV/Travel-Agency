"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui";
import { feelings, months } from "@/content/site";

const selectStyle: React.CSSProperties = {
  flex: "1 1 260px",
  fontFamily: "var(--wf-font-sans)",
  fontSize: 16,
  color: "var(--wf-ink-900)",
  background: "var(--wf-paper)",
  border: "none",
  borderRadius: "var(--wf-radius-md)",
  padding: "18px 20px",
  cursor: "pointer",
};

/**
 * RegionExperienceFinder — a region-scoped "Find your experience" band
 * (modelled on Black Tomato's region finder). Full-bleed hero image, two
 * selects (feeling + month), and a CTA that hands off to the trip finder
 * results page with the chosen feeling/when pre-applied as filters.
 */
export function RegionExperienceFinder({
  regionLabel,
  image,
  grad,
}: {
  regionLabel: string;
  image?: string | null;
  grad?: string | null;
}) {
  const t = useTranslations("regionPage");
  const tt = useTranslations("tripFinder");
  const tf = useTranslations("feelings");
  const tm = useTranslations("months");
  // Fall back to the raw value for feelings/months not in the dictionary.
  const feelingLabel = (f: string) => (tf.has(f) ? tf(f) : f);
  const monthLabel = (m: string) => (tm.has(m) ? tm(m) : m);

  const router = useRouter();
  const [feeling, setFeeling] = React.useState("");
  const [month, setMonth] = React.useState("");

  const submit = () => {
    const params = new URLSearchParams();
    if (feeling) params.set("feeling", feeling);
    if (month) params.set("when", month);
    const qs = params.toString();
    router.push(`/trip-finder/results${qs ? `?${qs}` : ""}`);
  };

  return (
    <section
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "clamp(72px, 12vw, 140px) 0",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: grad ?? "var(--wf-ink-800)",
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "rgba(14,42,51,0.5)" }} />

      <div className="wf-wrap" style={{ position: "relative", maxWidth: 820, textAlign: "center", color: "#fff" }}>
        <h2
          style={{
            fontFamily: "var(--wf-font-sans)",
            fontWeight: 600,
            fontSize: "clamp(18px, 3vw, 26px)",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            margin: 0,
          }}
        >
          {t("experienceHeading")}
        </h2>
        <p
          style={{
            fontSize: "clamp(15px, 2vw, 17px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.85)",
            margin: "16px auto 0",
            maxWidth: 480,
          }}
        >
          {t("experienceSubtitle", { region: regionLabel })}
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            margin: "clamp(24px, 4vw, 36px) auto 0",
            maxWidth: 720,
          }}
        >
          <select
            aria-label={tt("feelingPlaceholder")}
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            style={{ ...selectStyle, color: feeling ? "var(--wf-ink-900)" : "var(--wf-ink-500)" }}
          >
            <option value="">{tt("feelingPlaceholder")}</option>
            {feelings.map((f) => (
              <option key={f} value={f}>
                {feelingLabel(f)}
              </option>
            ))}
          </select>
          <select
            aria-label={tt("whenPlaceholder")}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={{ ...selectStyle, color: month ? "var(--wf-ink-900)" : "var(--wf-ink-500)" }}
          >
            <option value="">{tt("whenPlaceholder")}</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {monthLabel(m)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "clamp(20px, 3vw, 28px)" }}>
          <Button variant="dark" size="lg" onClick={submit}>
            {tt("takeMeThere")}
          </Button>
        </div>
      </div>
    </section>
  );
}
