"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/ui";
import { site } from "@/content/site";

// Opening hours: Monday–Friday, 10:00–18:00 (business timezone).
const TZ = "Europe/Skopje";
const OPEN_HOUR = 10;
const CLOSE_HOUR = 18;
const fmtTime = (h: number) => `${h}.00`;

/**
 * PhoneWithHours — the header phone number with a hover tooltip that says
 * whether we're open today and until when, computed live from the Mon–Fri
 * 10–18 schedule in the business timezone.
 */
export function PhoneWithHours({ dark }: { dark: boolean }) {
  const t = useTranslations("hours");
  const locale = useLocale();
  const [msg, setMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    const compute = () => {
      // A Date whose local fields mirror the current time in the business TZ.
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: TZ }));
      const day = now.getDay(); // 0 Sun … 6 Sat
      const hour = now.getHours() + now.getMinutes() / 60;
      const isWeekday = day >= 1 && day <= 5;
      const dayName = (d: Date) =>
        new Intl.DateTimeFormat(locale === "mk" ? "mk" : "en-GB", { weekday: "long" }).format(d);

      if (isWeekday && hour >= OPEN_HOUR && hour < CLOSE_HOUR) {
        setMsg(t("openUntil", { time: fmtTime(CLOSE_HOUR) }));
      } else if (isWeekday && hour < OPEN_HOUR) {
        setMsg(t("opensToday", { time: fmtTime(OPEN_HOUR) }));
      } else {
        // Closed for the day — find the next weekday.
        const next = new Date(now);
        do {
          next.setDate(next.getDate() + 1);
        } while (next.getDay() === 0 || next.getDay() === 6);
        setMsg(t("closed", { day: dayName(next), time: fmtTime(OPEN_HOUR) }));
      }
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [t, locale]);

  const color = dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)";

  return (
    <span className="wf-header-phone wf-phone-wrap">
      <a
        href={`tel:${site.phone.replace(/\s+/g, "")}`}
        style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none", fontSize: 13.5, fontWeight: 500, color }}
      >
        <Icon name="phone" size={15} color={dark ? "#fff" : "var(--wf-ink-700)"} />
        {site.phone}
      </a>
      {msg && (
        <span className="wf-phone-tip" role="status">
          {msg}
        </span>
      )}
    </span>
  );
}
