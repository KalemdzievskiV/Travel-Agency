"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { readConsent, subscribeConsent, writeConsent } from "@/lib/consent";

// The answer lives in localStorage, which the server can't see. Reading it
// through useSyncExternalStore keeps the server render empty and swaps in the
// real value on hydration — no flash of a notice the visitor already answered.
const noSubscribe = () => () => {};
const onServer = () => null;

/**
 * CookieNotice — the bottom-right cookie card. Non-modal on purpose: it states
 * the choice and gets out of the way rather than blocking the page. Once the
 * visitor answers, the choice is remembered and the newsletter invite in the
 * opposite corner is released (see `NewsletterPopup`).
 */
export function CookieNotice() {
  const t = useTranslations("cookies");
  const consent = React.useSyncExternalStore(subscribeConsent, readConsent, onServer);
  const hydrated = React.useSyncExternalStore(noSubscribe, () => true, () => false);

  // Answering re-runs the store and unmounts the card; nothing local to hold.
  if (!hydrated || consent !== null) return null;

  return (
    <section
      className="wf-corner"
      aria-label={t("title")}
      style={{
        background: "var(--wf-paper)",
        border: "1px solid var(--wf-border)",
        padding: "clamp(18px, 2.4vw, 24px)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "var(--wf-font-sans)",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--wf-ink-500)",
        }}
      >
        {t("title")}
      </p>

      <p
        style={{
          margin: "10px 0 0",
          fontSize: 13.5,
          lineHeight: 1.65,
          color: "var(--wf-ink-700)",
        }}
      >
        {t("body")}{" "}
        <Link
          href="/legal/cookies"
          style={{
            color: "var(--wf-ink-900)",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
        >
          {t("policyLink")}
        </Link>
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
        <Button size="sm" onClick={() => writeConsent("all")}>
          {t("acceptAll")}
        </Button>
        <Button size="sm" variant="outline" onClick={() => writeConsent("essential")}>
          {t("essentialOnly")}
        </Button>
      </div>
    </section>
  );
}
