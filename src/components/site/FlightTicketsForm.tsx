"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";

const control: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--wf-font-sans)",
  fontSize: 15,
  color: "var(--wf-ink-900)",
  background: "var(--wf-paper)",
  border: "1px solid var(--wf-border-strong)",
  borderRadius: "var(--wf-radius-md)",
  padding: "12px 14px",
};

function Field({ label, htmlFor, children }: { label: string; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label htmlFor={htmlFor} style={{ fontSize: 13, fontWeight: 700, color: "var(--wf-ink-900)" }}>{label}</label>
      {children}
    </div>
  );
}

/**
 * FlightTicketsForm — the /flight-tickets ("Авионски карти") request form. A
 * From/To + dates + passengers row, contact details and a note, then a "request
 * an offer" CTA. Front-end only for now (no backend), like the enquiry form.
 */
export function FlightTicketsForm() {
  const t = useTranslations("flightTickets");
  const [sent, setSent] = React.useState(false);

  if (sent) {
    return (
      <div style={{ maxWidth: 620, margin: "0 auto", background: "var(--wf-sand)", borderRadius: "var(--wf-radius-lg)", padding: "clamp(32px, 6vw, 56px)", textAlign: "center" }}>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: "clamp(24px, 4vw, 34px)", margin: "12px 0 12px", color: "var(--wf-ink-900)" }}>{t("sentTitle")}</h2>
        <p style={{ fontSize: 16, color: "var(--wf-ink-700)", lineHeight: 1.65, margin: "0 auto", maxWidth: 460 }}>{t("sentBody")}</p>
        <div style={{ marginTop: 26 }}>
          <Link href="/" style={{ display: "inline-flex", padding: "13px 26px", borderRadius: "var(--wf-radius-md)", background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)", fontFamily: "var(--wf-font-sans)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>{t("backHome")}</Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      style={{ background: "var(--wf-sand)", borderRadius: "var(--wf-radius-lg)", padding: "clamp(24px, 4vw, 40px)", display: "grid", gap: 20, maxWidth: 900, margin: "0 auto" }}
    >
      <div className="wf-flight-grid">
        <Field label={t("from")} htmlFor="from"><input id="from" name="from" required placeholder={t("fromPlaceholder")} style={control} /></Field>
        <Field label={t("to")} htmlFor="to"><input id="to" name="to" required placeholder={t("toPlaceholder")} style={control} /></Field>
        <Field label={t("departure")} htmlFor="departure"><input id="departure" name="departure" type="date" required style={control} /></Field>
        <Field label={t("return")} htmlFor="return"><input id="return" name="return" type="date" style={control} /></Field>
        <Field label={t("passengers")} htmlFor="passengers">
          <select id="passengers" name="passengers" defaultValue="1" style={control}>
            {["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => <option key={n}>{n}</option>)}
          </select>
        </Field>
      </div>

      <div className="wf-form-grid">
        <Field label={t("name")} htmlFor="name"><input id="name" name="name" required placeholder={t("name")} style={control} /></Field>
        <Field label={t("phone")} htmlFor="phone"><input id="phone" name="phone" type="tel" required placeholder={t("phone")} style={control} /></Field>
      </div>
      <Field label={t("email")} htmlFor="email"><input id="email" name="email" type="email" required placeholder="you@email.com" style={control} /></Field>
      <Field label={t("note")} htmlFor="note">
        <textarea id="note" name="note" rows={3} placeholder={t("notePlaceholder")} style={{ ...control, resize: "vertical", lineHeight: 1.5 }} />
      </Field>

      <div style={{ textAlign: "center", marginTop: 6 }}>
        <Button type="submit" variant="primary" size="lg">{t("submit")}</Button>
        <p style={{ fontSize: 12.5, color: "var(--wf-ink-500)", margin: "12px 0 0" }}>{t("finePrint")}</p>
      </div>
    </form>
  );
}
