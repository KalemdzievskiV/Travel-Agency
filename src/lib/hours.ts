"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";

// Opening hours: Monday–Friday, 10:00–18:00 (business timezone).
const TZ = "Europe/Skopje";
const OPEN_HOUR = 10;
const CLOSE_HOUR = 18;
const fmtTime = (h: number) => `${h}.00`;

/**
 * useOpeningHoursMessage — the live "we are open today until …" line, computed
 * from the Mon–Fri 10–18 schedule in the business timezone and re-checked every
 * minute. Returns null until the first client-side tick, so the server and
 * client markup agree. Shared by the header phone tooltip and the enquiry page.
 */
export function useOpeningHoursMessage(): string | null {
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

  return msg;
}
