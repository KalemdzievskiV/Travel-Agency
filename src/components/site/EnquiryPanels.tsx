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

// International dialling codes for the phone field (North Macedonia first).
const COUNTRY_CODES = ["+389", "+1", "+44", "+30", "+39", "+49", "+33", "+41", "+43", "+31", "+32", "+34", "+351", "+385", "+381", "+382", "+355", "+359", "+40", "+90", "+971", "+61"];
const ADULT_COUNTS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const CHILD_COUNTS = ["0", "1", "2", "3", "4", "5", "6"];
const CHILD_AGES = Array.from({ length: 11 }, (_, i) => String(i + 2).padStart(2, "0")); // 02–12

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

const subLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  color: "var(--wf-ink-500)",
  marginBottom: 6,
};

function Field({ label, htmlFor, required = false, children }: { label: string; htmlFor?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label htmlFor={htmlFor} style={{ fontSize: 13, fontWeight: 500, color: "var(--wf-ink-700)" }}>
        {label}
        {required && <span aria-hidden style={{ color: "var(--wf-coral-500)", marginLeft: 3 }}>*</span>}
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
    <Field label={label} htmlFor={name} required={required}>
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
        fontWeight: 700,
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

/** What the enquiry page shows when you arrive from a trip's "Plan a trip". */
export type EnquiryTripSummary = {
  slug: string;
  title: string;
  image?: string;
  grad: string;
  durationDays: number | null;
  priceFrom: string;
};

/**
 * TripSummaryCard — "here's what you're enquiring about": the trip's photo
 * beside its title, ideal length and price. Links back to the trip.
 */
function TripSummaryCard({ trip }: { trip: EnquiryTripSummary }) {
  const t = useTranslations("enquiry");
  const tCards = useTranslations("cards");
  const tTrip = useTranslations("tripPage");

  return (
    <Link href={`/trips/${trip.slug}`} className="wf-enquiry-trip">
      <div
        className="wf-enquiry-trip__img"
        // Longhands only — a `background` shorthand would reset the image on the
        // client (this is a client component).
        style={{
          backgroundImage: trip.image ? `url(${trip.image})` : trip.grad || undefined,
          backgroundColor: trip.image || trip.grad ? undefined : "var(--wf-ink-800)",
        }}
        aria-hidden
      />
      <div className="wf-enquiry-trip__body">
        <div className="wf-enquiry-trip__title">{trip.title}</div>
        <dl className="wf-enquiry-trip__facts">
          {trip.durationDays && (
            <div>
              {t("idealLength")}{" "}
              <strong>{tCards("days", { count: trip.durationDays })}</strong>
            </div>
          )}
          <div>
            {t("priceFrom")} <strong>{trip.priceFrom || tTrip("onEnquiry")}</strong>
          </div>
        </dl>
      </div>
    </Link>
  );
}

export function EnquiryPanels({
  presetDestination = "",
  destinations = [],
  trip,
}: {
  presetDestination?: string;
  destinations?: string[];
  trip?: EnquiryTripSummary;
}) {
  const t = useTranslations("enquiry");
  const tMonth = useTranslations("months");
  const [sent, setSent] = React.useState(false);
  const [childCount, setChildCount] = React.useState(0);
  const [childAges, setChildAges] = React.useState<string[]>([]);

  const setChildren = (c: number) => {
    setChildCount(c);
    setChildAges((prev) => {
      const next = prev.slice(0, c);
      while (next.length < c) next.push("");
      return next;
    });
  };

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
              fontWeight: 700,
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

          {/* Where — destination dropdown */}
          <Field label={t("whereLabel")} htmlFor="destination" required>
            <select id="destination" name="destination" defaultValue={presetDestination || ""} required style={controlStyle}>
              <option value="" disabled>{t("whereSelect")}</option>
              {presetDestination && !destinations.includes(presetDestination) && (
                <option value={presetDestination}>{presetDestination}</option>
              )}
              {destinations.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
              <option value="__undecided">{t("whereUndecided")}</option>
            </select>
          </Field>

          {/* When — month + year */}
          <Field label={t("whenLabel")} htmlFor="month" required>
            <div style={{ display: "flex", gap: 10 }}>
              <select id="month" name="month" defaultValue="" required style={controlStyle}>
                <option value="" disabled>{t("monthSelect")}</option>
                {MONTH_KEYS.map((m) => (
                  <option key={m}>{tMonth(m)}</option>
                ))}
              </select>
              <select name="year" defaultValue="" required style={controlStyle}>
                <option value="" disabled>{t("yearSelect")}</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
          </Field>

          {/* How long — free text */}
          <TextField label={t("durationLabel")} name="duration" placeholder={t("durationPlaceholder")} required />

          {/* People — adults + children (with each child's age) */}
          <Field label={t("peopleLabel")} htmlFor="adults" required>
            <div className="wf-form-grid">
              <div>
                <label htmlFor="adults" style={subLabelStyle}>{t("adultsLabel")}</label>
                <select id="adults" name="adults" defaultValue="2" required style={controlStyle}>
                  {ADULT_COUNTS.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="children" style={subLabelStyle}>{t("childrenLabel")}</label>
                <select
                  id="children"
                  name="children"
                  value={String(childCount)}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  style={controlStyle}
                >
                  {CHILD_COUNTS.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
            {childCount > 0 && (
              <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                {Array.from({ length: childCount }).map((_, i) => (
                  <div key={i}>
                    <label htmlFor={`childAge${i + 1}`} style={subLabelStyle}>{t("childAge", { n: i + 1 })}</label>
                    <select
                      id={`childAge${i + 1}`}
                      name={`childAge${i + 1}`}
                      required
                      value={childAges[i] ?? ""}
                      onChange={(e) => setChildAges((prev) => { const next = [...prev]; next[i] = e.target.value; return next; })}
                      style={controlStyle}
                    >
                      <option value="" disabled>{t("ageSelect")}</option>
                      {CHILD_AGES.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}
          </Field>

          {/* Budget — free amount */}
          <TextField label={t("budgetLabel")} name="budget" placeholder={t("budgetPlaceholder")} required />

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
          <Field label={t("telephoneLabel")} htmlFor="phone" required>
            <div style={{ display: "flex", gap: 8 }}>
              <select
                name="phoneCountry"
                aria-label={t("countryCode")}
                defaultValue="+389"
                style={{ ...controlStyle, width: "auto", flex: "none" }}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input id="phone" name="phone" type="tel" required placeholder={t("phonePlaceholder")} style={controlStyle} />
            </div>
          </Field>

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
          </div>
        </form>

        {/* Trip summary + call / office hours — sticks as the form scrolls. */}
        <div className="wf-enquiry__aside">
          {trip && <TripSummaryCard trip={trip} />}
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
              fontWeight: 700,
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
            style={{ color: "var(--wf-coral-600)", fontSize: 18, fontWeight: 700, textDecoration: "none" }}
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
              fontWeight: 700,
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
    </div>
  );
}
