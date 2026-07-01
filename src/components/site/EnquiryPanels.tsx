"use client";

import React from "react";
import { Phone, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";

/**
 * EnquiryPanels — the /make-an-enquiry page body (modelled on Black Tomato's
 * enquiry page): a centred intro, a form on the left and a "call us / office
 * hours" aside on the right, then a success state after submit.
 */

const MONTH_KEYS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

const controlStyle: React.CSSProperties = {
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
      <label htmlFor={htmlFor} style={{ fontSize: 13, fontWeight: 500, color: "var(--wf-ink-700)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function TextField({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <Field label={label} htmlFor={name}>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        style={controlStyle}
      />
    </Field>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--wf-ink-900)",
        margin: "4px 0",
      }}
    >
      {children}
    </div>
  );
}

export function EnquiryPanels({ presetDestination = "" }: { presetDestination?: string }) {
  const t = useTranslations("enquiry");
  const tMonth = useTranslations("months");
  const [sent, setSent] = React.useState(false);

  const phoneLink = (
    <a href={`tel:${site.phone.replace(/\s+/g, "")}`} style={{ color: "var(--wf-coral-600)" }}>
      {site.phone}
    </a>
  );

  if (sent) {
    return (
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          background: "var(--wf-sand)",
          borderRadius: "var(--wf-radius-lg)",
          padding: "clamp(32px, 6vw, 56px)",
          textAlign: "center",
        }}
      >
        <Eyebrow style={{ textAlign: "center" }}>{t("thankYou")}</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--wf-font-display)",
            fontWeight: 500,
            fontSize: "clamp(26px, 5vw, 36px)",
            letterSpacing: "-0.02em",
            margin: "14px 0 12px",
            color: "var(--wf-ink-900)",
          }}
        >
          {t("sentTitle")}
        </h2>
        <p style={{ fontSize: 16, color: "var(--wf-ink-700)", lineHeight: 1.65, margin: "0 auto", maxWidth: 480 }}>
          {t.rich("sentBody", { phone: () => phoneLink })}
        </p>
        <div style={{ marginTop: 28 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 26px",
              borderRadius: "var(--wf-radius-md)",
              background: "var(--wf-ink-900)",
              color: "var(--wf-text-on-dark)",
              fontFamily: "var(--wf-font-sans)",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            {t("close")}
          </Link>
        </div>
      </div>
    );
  }

  const year = new Date().getFullYear();
  const years = [year, year + 1, year + 2];

  return (
    <div>
      {/* Centred intro */}
      <div style={{ maxWidth: 760, margin: "0 auto clamp(32px, 5vw, 48px)", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--wf-font-display)",
            fontWeight: 500,
            fontSize: "clamp(30px, 5vw, 48px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "var(--wf-ink-900)",
          }}
        >
          {t.rich("title", { i: (chunks) => <span style={{ fontStyle: "italic" }}>{chunks}</span> })}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--wf-ink-700)", margin: "18px auto 0", maxWidth: 640 }}>
          {t.rich("pageIntro", { phone: () => phoneLink })}
        </p>
      </div>

      <div className="wf-enquiry">
        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // No backend yet — this is the enquiry UI only.
            setSent(true);
          }}
          style={{
            background: "var(--wf-sand)",
            borderRadius: "var(--wf-radius-lg)",
            padding: "clamp(24px, 4vw, 40px)",
            display: "grid",
            gap: 20,
          }}
        >
          <SectionLabel>{t("yourTrip")}</SectionLabel>
          <TextField
            label={t("whereLabel")}
            name="destination"
            placeholder={t("wherePlaceholder")}
            defaultValue={presetDestination || undefined}
          />

          <div className="wf-form-grid">
            <Field label={t("whenLabel")} htmlFor="month">
              <div style={{ display: "flex", gap: 10 }}>
                <select id="month" name="month" defaultValue="" style={controlStyle}>
                  <option value="" disabled>
                    {t("monthSelect")}
                  </option>
                  {MONTH_KEYS.map((m) => (
                    <option key={m}>{tMonth(m)}</option>
                  ))}
                </select>
                <select name="year" defaultValue="" style={controlStyle}>
                  <option value="" disabled>
                    {t("yearSelect")}
                  </option>
                  {years.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>
            </Field>
            <TextField label={t("durationLabel")} name="duration" placeholder={t("durationPlaceholder")} />
          </div>

          <Field label={t("peopleLabel")} htmlFor="people">
            <select id="people" name="people" defaultValue="" style={controlStyle}>
              <option value="" disabled>
                {t("peopleSelect")}
              </option>
              {["1", "2", "3", "4", "5", "6", "7+"].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </Field>

          <Field label={t("budgetLabel")} htmlFor="budget">
            <select id="budget" name="budget" defaultValue="" style={controlStyle}>
              <option value="" disabled>
                {t("budgetSelect")}
              </option>
              <option>{t("budgetNotSure")}</option>
              <option>{t("budgetUnder2")}</option>
              <option>{t("budget2to5")}</option>
              <option>{t("budget5to10")}</option>
              <option>{t("budget10plus")}</option>
            </select>
          </Field>

          <Field label={t("commentsLabel")} htmlFor="notes">
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder={t("commentsPlaceholder")}
              style={{ ...controlStyle, resize: "vertical", lineHeight: 1.5 }}
            />
          </Field>

          <SectionLabel>{t("yourDetails")}</SectionLabel>
          <div className="wf-form-grid">
            <TextField label={t("firstName")} name="firstName" placeholder={t("firstName")} required />
            <TextField label={t("lastName")} name="lastName" placeholder={t("lastName")} required />
          </div>
          <div className="wf-form-grid">
            <TextField label={t("emailLabel")} name="email" type="email" placeholder={t("emailPlaceholder")} required />
            <TextField
              label={t("confirmEmailLabel")}
              name="confirmEmail"
              type="email"
              placeholder={t("emailPlaceholder")}
              required
            />
          </div>
          <div className="wf-form-grid">
            <Field label={t("telephoneLabel")} htmlFor="phone">
              <div style={{ display: "flex", gap: 8 }}>
                <span
                  style={{
                    ...controlStyle,
                    width: "auto",
                    flex: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    color: "var(--wf-ink-700)",
                  }}
                >
                  +389
                </span>
                <input id="phone" name="phone" type="tel" placeholder={t("phonePlaceholder")} style={controlStyle} />
              </div>
            </Field>
            <Field label={t("hearLabel")} htmlFor="hear">
              <select id="hear" name="hear" defaultValue="" style={controlStyle}>
                <option value="" disabled>
                  {t("hearSelect")}
                </option>
                <option>{t("hearSearch")}</option>
                <option>{t("hearSocial")}</option>
                <option>{t("hearFriend")}</option>
                <option>{t("hearPress")}</option>
                <option>{t("hearOther")}</option>
              </select>
            </Field>
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 13.5,
              color: "var(--wf-ink-700)",
              lineHeight: 1.5,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              name="newsletter"
              style={{ width: 17, height: 17, marginTop: 2, accentColor: "var(--wf-coral-500)" }}
            />
            {t("newsletter")}
          </label>

          <div style={{ textAlign: "center", marginTop: 6 }}>
            <Button type="submit" variant="primary" size="lg">
              {t("send")}
            </Button>
            <p style={{ fontSize: 12.5, color: "var(--wf-ink-500)", margin: "12px 0 0" }}>{t("finePrint")}</p>
          </div>
        </form>

        {/* Call / office hours aside */}
        <aside
          style={{
            background: "var(--wf-sand)",
            borderRadius: "var(--wf-radius-lg)",
            padding: "clamp(24px, 4vw, 36px)",
            textAlign: "center",
          }}
        >
          <Phone size={26} strokeWidth={1.5} color="var(--wf-ink-900)" aria-hidden style={{ margin: "0 auto" }} />
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--wf-ink-900)",
              margin: "12px 0 8px",
            }}
          >
            {t("callUsToday")}
          </div>
          <a
            href={`tel:${site.phone.replace(/\s+/g, "")}`}
            style={{ color: "var(--wf-coral-600)", fontSize: 18, fontWeight: 600, textDecoration: "none" }}
          >
            {site.phone}
          </a>
          <p style={{ fontSize: 14, color: "var(--wf-ink-500)", margin: "8px 0 0", lineHeight: 1.5 }}>
            {t("openNote")}
          </p>

          <div style={{ height: 1, background: "var(--wf-border)", margin: "clamp(22px, 4vw, 30px) auto" }} />

          <Clock size={26} strokeWidth={1.5} color="var(--wf-ink-900)" aria-hidden style={{ margin: "0 auto" }} />
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--wf-ink-900)",
              margin: "12px 0 14px",
            }}
          >
            {t("officeHours")}
          </div>
          <dl style={{ margin: 0, display: "grid", gap: 8, fontSize: 14.5, color: "var(--wf-ink-700)" }}>
            {(["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const).map((d) => {
              const weekend = d === "sat" || d === "sun";
              return (
                <div key={d}>
                  <strong style={{ color: "var(--wf-ink-900)" }}>{t(`days.${d}`)}:</strong>{" "}
                  {weekend ? t("closed") : t("weekdayHours")}
                </div>
              );
            })}
          </dl>
          <p style={{ fontSize: 13, color: "var(--wf-ink-500)", margin: "16px 0 0" }}>{t("excludingHolidays")}</p>
        </aside>
      </div>
    </div>
  );
}
