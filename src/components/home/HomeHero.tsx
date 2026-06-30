"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
import { site } from "@/content/site";

export function HomeHero() {
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
        <Eyebrow tone="light">Tailor-made · {site.established}</Eyebrow>
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
          Every journey starts
          <br />
          with a <span style={{ fontStyle: "italic" }}>feeling</span>.
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
          Fully personalised itineraries for couples, families and solo
          travellers — designed around how you want to feel, not where the
          crowds go.
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
            Explore our trips
          </Link>
          <Button as="a" href="/trip-finder" variant="dark" size="lg">
            Plan my trip
          </Button>
        </div>
      </div>

      {/* Scroll cue — jumps to the intro section */}
      <button type="button" onClick={scrollToContent} className="wf-scroll-cue" aria-label="Scroll to content">
        <span>Scroll</span>
        <ChevronDown size={22} strokeWidth={1.5} aria-hidden className="wf-scroll-cue__icon" />
      </button>
    </section>
  );
}
