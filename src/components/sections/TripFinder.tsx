"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, Eyebrow } from "@/components/ui";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { feelings, months } from "@/content/site";
import type { Destination } from "@/content/types";

export function TripFinder({ destinations }: { destinations: Destination[] }) {
  const t = useTranslations("tripFinder");
  const tf = useTranslations("feelings");
  const tm = useTranslations("months");
  const [feeling, setFeeling] = React.useState<string | null>(null);
  const [month, setMonth] = React.useState<string | null>(null);
  const ready = Boolean(feeling && month);

  const matches = React.useMemo(() => {
    if (!ready) return [];
    const byFeeling = destinations.filter((d) => feeling && d.feelings.includes(feeling));
    const inMonth = byFeeling.filter((d) => month && d.bestMonths.includes(month));
    const pool = inMonth.length ? inMonth : byFeeling.length ? byFeeling : destinations;
    return pool.slice(0, 3);
  }, [feeling, month, ready, destinations]);

  return (
    <div
      style={{
        background: "var(--wf-ink-900)",
        minHeight: "100vh",
        color: "#fff",
        padding: "calc(var(--wf-header-h) + 56px) 0 96px",
        marginTop: "calc(-1 * var(--wf-header-h))",
      }}
    >
      <div className="wf-wrap" style={{ maxWidth: 980 }}>
        <div style={{ textAlign: "center" }}>
          <Eyebrow tone="light">{t("eyebrow")}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(34px, 7vw, 58px)",
              letterSpacing: "-0.02em",
              margin: "18px 0 0",
            }}
          >
            {t("title")}
          </h1>
        </div>

        {/* 01 — feeling */}
        <div style={{ marginTop: 56 }}>
          <Step n="01" label={t("feelingStep")} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {feelings.map((f) => (
              <button
                key={f}
                onClick={() => setFeeling(f)}
                style={{
                  padding: "12px 22px",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontFamily: "var(--wf-font-sans)",
                  fontSize: 15,
                  fontWeight: 500,
                  background: feeling === f ? "var(--wf-coral-500)" : "transparent",
                  color: "#fff",
                  border: `1px solid ${feeling === f ? "var(--wf-coral-500)" : "rgba(255,255,255,0.3)"}`,
                  transition: "all .2s",
                }}
              >
                {tf(f)}
              </button>
            ))}
          </div>
        </div>

        {/* 02 — when */}
        <div style={{ marginTop: 48 }}>
          <Step n="02" label={t("whenStep")} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {months.map((m) => (
              <button
                key={m}
                onClick={() => setMonth(m)}
                style={{
                  width: 72,
                  padding: "12px 0",
                  borderRadius: "var(--wf-radius-md)",
                  cursor: "pointer",
                  fontFamily: "var(--wf-font-sans)",
                  fontSize: 14,
                  fontWeight: 500,
                  background: month === m ? "#fff" : "transparent",
                  color: month === m ? "var(--wf-ink-900)" : "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  transition: "all .2s",
                }}
              >
                {tm(m)}
              </button>
            ))}
          </div>
        </div>

        {/* result */}
        <div
          style={{
            marginTop: 56,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          <Button variant="primary" size="lg" disabled={!ready}>
            {ready
              ? t("show", { feeling: tf(feeling as string), month: tm(month as string) })
              : t("choose")}
          </Button>
          {ready && matches.length > 0 && (
            <div style={{ width: "100%", marginTop: 12 }}>
              <DestinationGrid items={matches} height={300} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Step({ n, label }: { n: string; label: string }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "rgba(244,239,231,0.55)",
        marginBottom: 16,
      }}
    >
      {n} — {label}
    </div>
  );
}
