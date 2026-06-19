"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Eyebrow, SearchBar } from "@/components/ui";
import { site } from "@/content/site";

export function HomeHero() {
  const router = useRouter();

  // Play the background film unless the visitor prefers reduced motion.
  // Starts false so SSR and first client render match (the photo shows until then).
  const [playVideo, setPlayVideo] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) setPlayVideo(true);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: 640,
        height: "calc(100vh - var(--wf-header-h))",
        marginTop: "calc(-1 * var(--wf-header-h))",
        display: "flex",
        alignItems: "flex-end",
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
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(22,19,15,0.78) 0%, rgba(22,19,15,0.25) 45%, rgba(22,19,15,0.35) 100%)",
        }}
      />

      <div
        className="wf-wrap wf-wrap--wide"
        style={{
          position: "relative",
          paddingBottom: "clamp(40px, 7vw, 64px)",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="light">Tailor-made · {site.established}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(40px, 8.5vw, 78px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              margin: "20px 0 0",
            }}
          >
            Every journey starts
            <br />
            with a <span style={{ fontStyle: "italic" }}>feeling</span>.
          </h1>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.85)",
              margin: "22px 0 0",
              maxWidth: 520,
            }}
          >
            Fully personalised itineraries for couples, families and solo
            travellers — designed around how you want to feel, not where the
            crowds go.
          </p>
        </div>
        <div style={{ marginTop: 38, maxWidth: 920 }}>
          <SearchBar
            fields={[
              { label: "Where", value: "Anywhere" },
              { label: "When", value: "Any month" },
              { label: "Feeling", value: "Choose a feeling" },
            ]}
            ctaLabel="Find my trip"
            onSearch={() => router.push("/trip-finder")}
          />
        </div>
      </div>
    </section>
  );
}
