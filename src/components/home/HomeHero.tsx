"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";

export function HomeHero() {
  const t = useTranslations();

  // Play the background film unless the visitor prefers reduced motion.
  // Starts false so SSR and first client render match (the photo shows until then).
  const [playVideo, setPlayVideo] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) setPlayVideo(true);
  }, []);

  const scrollToContent = () => {
    const el = document.getElementById("about");
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: 600,
        height: "100vh",
        marginTop: "calc(-1 * var(--wf-header-h))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Hero photography — also the video poster / reduced-motion fallback */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "url(/images/hero.jpg) center/cover no-repeat, linear-gradient(135deg,#43525e,#1a2730 70%)",
        }}
      />
      {playVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero.jpg"
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/hero2.mp4" type="video/mp4" />
        </video>
      )}
      {/* Even scrim so the centred text stays legible across the frame */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(14,42,51,0.45) 0%, rgba(14,42,51,0.35) 45%, rgba(14,42,51,0.55) 100%)",
        }}
      />

      <div
        className="wf-wrap wf-wrap--wide"
        style={{
          position: "relative",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Eyebrow tone="light">{t("hero.eyebrow")}</Eyebrow>
        <h1
          style={{
            fontFamily: "var(--wf-font-display)",
            fontWeight: 500,
            fontSize: "clamp(40px, 8.5vw, 78px)",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            margin: "18px 0 0",
          }}
        >
          {t.rich("hero.title", {
            i: (chunks) => <span style={{ fontStyle: "italic" }}>{chunks}</span>,
            br: () => <br />,
          })}
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 2.2vw, 19px)",
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.85)",
            margin: "22px auto 0",
            maxWidth: 560,
          }}
        >
          {t("hero.intro")}
        </p>
        <div
          style={{
            marginTop: "clamp(28px, 4vw, 40px)",
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link className="wf-btn-ghost-light" href="/trips">
            {t("common.exploreOurTrips")}
          </Link>
          <Button as="a" href="/trip-finder" variant="dark" size="lg">
            {t("common.planMyTrip")}
          </Button>
        </div>
      </div>

      {/* Scroll cue — jumps to the intro section */}
      <button type="button" onClick={scrollToContent} className="wf-scroll-cue" aria-label={t("hero.scroll")}>
        <span>{t("hero.scroll")}</span>
        <ChevronDown size={22} strokeWidth={1.5} aria-hidden className="wf-scroll-cue__icon" />
      </button>
    </section>
  );
}
