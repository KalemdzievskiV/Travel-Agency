"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, Icon } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { newsletterPhoto } from "@/content/media";
import {
  CONSENT_EVENT,
  markNewsletterAnswered,
  newsletterAnswered,
  readConsent,
} from "@/lib/consent";

// A short beat after the cookie card is answered — just enough that it doesn't
// pile onto arrival, while still landing on the visitor's first screen.
const DELAY_MS = 2_000;
// How long the thank-you lingers before the card slips away.
const DONE_MS = 2_800;

const field: React.CSSProperties = {
  width: "100%",
  background: "var(--wf-paper)",
  border: "1px solid var(--wf-border)",
  borderRadius: "var(--wf-radius-md)",
  outline: "none",
  color: "var(--wf-ink-900)",
  fontFamily: "var(--wf-font-sans)",
  fontSize: 14.5,
  padding: "14px 16px",
};

/**
 * NewsletterPopup — the bottom-left newsletter invite. Queues behind the cookie
 * notice so a first visit isn't met with two cards at once (and so the two
 * never stack on phones, where both widen to full-width sheets), then appears
 * quietly a little way in. Dismissing or signing up settles it for good.
 *
 * Laid out from the client's reference image: a portrait photo beside the form,
 * email only — they were explicit that the name field wasn't needed.
 *
 * Sign-up is client-side only, matching the footer band; wire both to the same
 * endpoint when the mailing list lands.
 */
export function NewsletterPopup() {
  const t = useTranslations("newsletterPopup");
  const [show, setShow] = React.useState(false);
  const [done, setDone] = React.useState(false);
  // Chosen when the card opens rather than at render: the client asked for a
  // random pick, and picking during render would differ between the server and
  // the client. Safe here because the card never renders until this effect has
  // already run on the client.
  const [photo, setPhoto] = React.useState(newsletterPhoto[0]);

  React.useEffect(() => {
    if (newsletterAnswered()) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const arm = () => {
      if (timer) return;
      timer = setTimeout(() => {
        setPhoto(newsletterPhoto[Math.floor(Math.random() * newsletterPhoto.length)]);
        setShow(true);
      }, DELAY_MS);
    };

    // Wait out the cookie notice: either it was answered on an earlier visit,
    // or it is on screen now and will tell us when the visitor has chosen.
    if (readConsent() !== null) arm();
    window.addEventListener(CONSENT_EVENT, arm);
    return () => {
      window.removeEventListener(CONSENT_EVENT, arm);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const close = React.useCallback(() => {
    markNewsletterAnswered("dismissed");
    setShow(false);
  }, []);

  React.useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, close]);

  if (!show) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    markNewsletterAnswered("signed-up");
    setDone(true);
    setTimeout(() => setShow(false), DONE_MS);
  };

  return (
    <section
      className="wf-corner wf-corner--news wf-corner--left"
      aria-label={t("title")}
      style={{
        background: "var(--wf-paper)",
        border: "1px solid var(--wf-border)",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={close}
        aria-label={t("close")}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 34,
          height: 34,
          background: "var(--wf-paper)",
          border: "1px solid var(--wf-border)",
          borderRadius: "var(--wf-radius-pill)",
          cursor: "pointer",
          color: "var(--wf-ink-700)",
        }}
      >
        <Icon name="x" size={18} color="var(--wf-ink-700)" />
      </button>

      <div className="wf-news">
        <div
          className="wf-news__photo"
          role="presentation"
          style={{ backgroundImage: `url(${photo})` }}
        />

        <div className="wf-news__panel">
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(22px, 2.6vw, 28px)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "var(--wf-ink-900)",
              textWrap: "balance",
              paddingRight: 34,
            }}
          >
            {t("title")}
          </h2>

          {done ? (
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--wf-ink-700)" }}>
              {t("done")}
            </p>
          ) : (
            <>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--wf-ink-700)" }}>
                {t("body")}
              </p>

              <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
                <label
                  htmlFor="wf-news-email"
                  style={{
                    fontFamily: "var(--wf-font-sans)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color: "var(--wf-ink-900)",
                  }}
                >
                  {t("emailLabel")}
                </label>
                <input
                  id="wf-news-email"
                  type="email"
                  name="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  style={field}
                />
                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: 11.5,
                    lineHeight: 1.5,
                    color: "var(--wf-ink-500)",
                  }}
                >
                  {t.rich("consent", {
                    policy: (chunks) => (
                      <Link
                        href="/legal/privacy"
                        // Underlined on purpose: at 11.5px in muted grey, colour
                        // alone doesn't read as a link, and this is the consent
                        // notice — the policy has to be findable.
                        style={{
                          color: "var(--wf-ink-700)",
                          textDecoration: "underline",
                          textUnderlineOffset: "2px",
                        }}
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
                <div style={{ marginTop: 4 }}>
                  {/* Plain primary: accent fill, white type (the client's
                      call — see --wf-text-on-accent-white), inverting to a
                      white fill with accent type on hover. */}
                  <Button type="submit" variant="primary" fullWidth>
                    {t("cta")}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
