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
 * TripFinderLanding — the trip finder entry page (modelled on Black Tomato's
 * /the-trip-finder/): a full-bleed hero with two prompts (feeling + when) that
 * hands off to the results page with the choices applied as filters.
 */
export function TripFinderLanding() {
  const t = useTranslations("tripFinder");
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
        minHeight: "100vh",
        marginTop: "calc(-1 * var(--wf-header-h))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          // Its own backdrop rather than the home hero's, so the two pages don't
          // open on the same photograph.
          background: "url(/images/pelister-prespa.jpg) center/cover no-repeat, linear-gradient(135deg,#0e2a33,#0a1a20)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(14,42,51,0.55) 0%, rgba(14,42,51,0.45) 50%, rgba(14,42,51,0.7) 100%)",
        }}
      />

      <div className="wf-wrap" style={{ position: "relative", maxWidth: 820, textAlign: "center", color: "#fff" }}>
        <h1
          style={{
            fontFamily: "var(--wf-font-display)",
            fontWeight: 500,
            fontSize: "clamp(36px, 7vw, 62px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {t("title")}
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 2.2vw, 19px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.85)",
            margin: "18px auto 0",
            maxWidth: 560,
          }}
        >
          {t("subtitle")}
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            margin: "clamp(28px, 4vw, 40px) auto 0",
            maxWidth: 720,
          }}
        >
          <select
            aria-label={t("feelingPlaceholder")}
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            style={{ ...selectStyle, color: feeling ? "var(--wf-ink-900)" : "var(--wf-ink-500)" }}
          >
            <option value="">{t("feelingPlaceholder")}</option>
            {feelings.map((f) => (
              <option key={f} value={f}>
                {feelingLabel(f)}
              </option>
            ))}
          </select>
          <select
            aria-label={t("whenPlaceholder")}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={{ ...selectStyle, color: month ? "var(--wf-ink-900)" : "var(--wf-ink-500)" }}
          >
            <option value="">{t("whenPlaceholder")}</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {monthLabel(m)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "clamp(22px, 3vw, 30px)" }}>
          <Button variant="dark" size="lg" onClick={submit}>
            {t("takeMeThere")}
          </Button>
        </div>
      </div>
    </section>
  );
}
