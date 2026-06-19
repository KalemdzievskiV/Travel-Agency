"use client";

import React from "react";
import { Button, Eyebrow, Input, Icon } from "@/components/ui";
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

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
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
          aria-label="Start your journey"
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
              maxWidth: 560,
              width: "100%",
              maxHeight: "calc(100dvh - 32px)",
              overflowY: "auto",
              padding: "clamp(28px, 6vw, 40px) clamp(22px, 6vw, 44px)",
              boxShadow: "var(--wf-shadow-lg)",
              position: "relative",
            }}
          >
            <button
              onClick={close}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Icon name="x" size={22} color="var(--wf-ink-500)" />
            </button>

            {sent ? (
              <div style={{ padding: "16px 0" }}>
                <Eyebrow>Thank you</Eyebrow>
                <h2
                  style={{
                    fontFamily: "var(--wf-font-display)",
                    fontWeight: 500,
                    fontSize: 32,
                    letterSpacing: "-0.02em",
                    margin: "14px 0 8px",
                    color: "var(--wf-ink-900)",
                  }}
                >
                  Your enquiry is on its way
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--wf-ink-500)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  One of our planners will be in touch within 24 hours. In the
                  meantime, you can reach us any time on {site.phone}.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // No backend yet — this is the enquiry UI only.
                  setSent(true);
                }}
              >
                <Eyebrow>Start your journey</Eyebrow>
                <h2
                  style={{
                    fontFamily: "var(--wf-font-display)",
                    fontWeight: 500,
                    fontSize: 34,
                    letterSpacing: "-0.02em",
                    margin: "14px 0 6px",
                    color: "var(--wf-ink-900)",
                  }}
                >
                  Let&apos;s plan something remarkable
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--wf-ink-500)",
                    margin: "0 0 26px",
                    lineHeight: 1.6,
                  }}
                >
                  Tell us a little about your trip. No planning fees, no
                  obligation — one of our experts will be in touch within 24
                  hours.
                </p>
                <div className="wf-form-grid">
                  <Input label="First name" placeholder="Jane" required />
                  <Input label="Last name" placeholder="Appleseed" required />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@email.com"
                    required
                  />
                  <Input
                    label="Destination"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div style={{ marginTop: 28 }}>
                  <Button type="submit" variant="primary" size="lg" fullWidth>
                    Send enquiry
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}
