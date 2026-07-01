"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, Eyebrow, Input, Icon, type IconName } from "@/components/ui";
import { site } from "@/content/site";

type EnquiryContextValue = {
  open: (presetDestination?: string) => void;
  close: () => void;
};

const EnquiryContext = React.createContext<EnquiryContextValue | null>(null);

export function useEnquiry(): EnquiryContextValue {
  const ctx = React.useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used within <EnquiryProvider>");
  return ctx;
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--wf-ink-500)",
};
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--wf-coral-600)",
        paddingBottom: 4,
        borderBottom: "1px solid var(--wf-border)",
        marginBottom: 4,
      }}
    >
      {children}
    </div>
  );
}

function SelectField({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      <select id={name} name={name} defaultValue="" style={controlStyle}>
        {children}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        style={{ ...controlStyle, resize: "vertical", lineHeight: 1.5 }}
      />
    </div>
  );
}

function Assurance({
  icon,
  children,
}: {
  icon: IconName;
  children: React.ReactNode;
}) {
  return (
    <li style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <span
        style={{
          flex: "none",
          width: 36,
          height: 36,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.22)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Icon name={icon} size={17} color="var(--wf-coral-400)" strokeWidth={1.5} />
      </span>
      <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "rgba(244,239,231,0.85)" }}>
        {children}
      </span>
    </li>
  );
}

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations("enquiry");
  const [isOpen, setIsOpen] = React.useState(false);
  const [destination, setDestination] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const open = React.useCallback((presetDestination?: string) => {
    setDestination(presetDestination ?? "");
    setSent(false);
    setIsOpen(true);
  }, []);
  const close = React.useCallback(() => setIsOpen(false), []);

  // Lock scroll + close on Escape while open.
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  const value = React.useMemo(() => ({ open, close }), [open, close]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      {isOpen && (
        <div
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={t("dialogLabel")}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(22,19,15,0.55)",
            backdropFilter: "blur(3px)",
            display: "grid",
            placeItems: "center",
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--wf-cream-2)",
              borderRadius: "var(--wf-radius-lg)",
              maxWidth: sent ? 560 : 960,
              width: "100%",
              maxHeight: "calc(100dvh - 32px)",
              overflowY: "auto",
              boxShadow: "var(--wf-shadow-lg)",
              position: "relative",
            }}
          >
            <button
              onClick={close}
              aria-label={t("close")}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                zIndex: 2,
                background: "rgba(255,255,255,0.7)",
                borderRadius: 999,
                width: 34,
                height: 34,
                display: "grid",
                placeItems: "center",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Icon name="x" size={20} color="var(--wf-ink-700)" />
            </button>

            {sent ? (
              <div style={{ padding: "clamp(32px, 6vw, 48px)" }}>
                <Eyebrow>{t("thankYou")}</Eyebrow>
                <h2
                  style={{
                    fontFamily: "var(--wf-font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(26px, 5vw, 34px)",
                    letterSpacing: "-0.02em",
                    margin: "14px 0 10px",
                    color: "var(--wf-ink-900)",
                  }}
                >
                  {t("sentTitle")}
                </h2>
                <p style={{ fontSize: 15.5, color: "var(--wf-ink-700)", lineHeight: 1.65, margin: 0 }}>
                  {t.rich("sentBody", {
                    phone: () => (
                      <a href={`tel:${site.phone.replace(/\s+/g, "")}`} style={{ color: "var(--wf-coral-600)" }}>
                        {site.phone}
                      </a>
                    ),
                  })}
                </p>
                <div style={{ marginTop: 28 }}>
                  <Button variant="dark" size="md" onClick={close}>
                    {t("close")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="wf-enquiry">
                {/* Reassurance panel */}
                <div
                  style={{
                    background: "var(--wf-ink-900)",
                    color: "var(--wf-text-on-dark)",
                    padding: "clamp(28px, 4vw, 44px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 22,
                  }}
                >
                  <div>
                    <Eyebrow tone="light">{t("eyebrow")}</Eyebrow>
                    <h2
                      style={{
                        fontFamily: "var(--wf-font-display)",
                        fontWeight: 500,
                        fontSize: "clamp(28px, 3.4vw, 38px)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        margin: "14px 0 0",
                      }}
                    >
                      {t.rich("title", {
                        i: (chunks) => <span style={{ fontStyle: "italic" }}>{chunks}</span>,
                      })}
                    </h2>
                    <p
                      style={{
                        fontSize: 15.5,
                        lineHeight: 1.6,
                        color: "rgba(244,239,231,0.8)",
                        margin: "16px 0 0",
                      }}
                    >
                      {t("intro")}
                    </p>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                    <Assurance icon="award">{t("assurance1")}</Assurance>
                    <Assurance icon="phone">{t("assurance2")}</Assurance>
                    <Assurance icon="calendar">{t("assurance3")}</Assurance>
                  </ul>

                  <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                    <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(244,239,231,0.55)", marginBottom: 8 }}>
                      {t("preferToTalk")}
                    </div>
                    <a
                      href={`tel:${site.phone.replace(/\s+/g, "")}`}
                      style={{ display: "inline-flex", alignItems: "center", gap: 9, color: "#fff", textDecoration: "none", fontSize: 17, fontWeight: 600 }}
                    >
                      <Icon name="phone" size={16} color="var(--wf-coral-400)" />
                      {site.phone}
                    </a>
                    <div style={{ fontSize: 13, color: "rgba(244,239,231,0.6)", marginTop: 6 }}>
                      {t("hours")}
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // No backend yet — this is the enquiry UI only.
                    setSent(true);
                  }}
                  style={{ padding: "clamp(28px, 4vw, 44px)", display: "grid", gap: 18 }}
                >
                  <SectionLabel>{t("yourTrip")}</SectionLabel>
                  <Input
                    label={t("whereLabel")}
                    name="destination"
                    placeholder={t("wherePlaceholder")}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  <div className="wf-form-grid">
                    <Input label={t("whenLabel")} name="when" placeholder={t("whenPlaceholder")} />
                    <Input label={t("durationLabel")} name="duration" placeholder={t("durationPlaceholder")} />
                  </div>
                  <div className="wf-form-grid">
                    <Input label={t("travellersLabel")} name="travellers" placeholder={t("travellersPlaceholder")} />
                    <SelectField label={t("budgetLabel")} name="budget">
                      <option value="" disabled>
                        {t("budgetSelect")}
                      </option>
                      <option>{t("budgetNotSure")}</option>
                      <option>{t("budgetUnder2")}</option>
                      <option>{t("budget2to5")}</option>
                      <option>{t("budget5to10")}</option>
                      <option>{t("budget10plus")}</option>
                    </SelectField>
                  </div>
                  <TextareaField
                    label={t("notesLabel")}
                    name="notes"
                    rows={3}
                    placeholder={t("notesPlaceholder")}
                  />

                  <SectionLabel>{t("yourDetails")}</SectionLabel>
                  <div className="wf-form-grid">
                    <Input label={t("firstName")} name="firstName" placeholder="Jane" required />
                    <Input label={t("lastName")} name="lastName" placeholder="Appleseed" required />
                  </div>
                  <div className="wf-form-grid">
                    <Input label={t("email")} name="email" type="email" placeholder="you@email.com" required />
                    <Input label={t("phoneLabel")} name="phone" type="tel" placeholder={t("phonePlaceholder")} />
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
                      marginTop: 2,
                    }}
                  >
                    <input
                      type="checkbox"
                      name="newsletter"
                      style={{ width: 17, height: 17, marginTop: 2, accentColor: "var(--wf-coral-500)" }}
                    />
                    {t("newsletter")}
                  </label>

                  <div style={{ marginTop: 6 }}>
                    <Button type="submit" variant="primary" size="lg" fullWidth>
                      {t("send")}
                    </Button>
                    <p style={{ fontSize: 12.5, color: "var(--wf-ink-500)", textAlign: "center", margin: "12px 0 0" }}>
                      {t("finePrint")}
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}
