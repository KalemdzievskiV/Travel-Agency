"use client";

import React from "react";
import { Icon } from "@/components/ui";
import { site } from "@/content/site";
import { useOpeningHoursMessage } from "@/lib/hours";

/**
 * PhoneWithHours — the header phone number with a hover tooltip that says
 * whether we're open today and until when, computed live from the Mon–Fri
 * 10–18 schedule in the business timezone.
 */
export function PhoneWithHours({ dark }: { dark: boolean }) {
  const msg = useOpeningHoursMessage();

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
