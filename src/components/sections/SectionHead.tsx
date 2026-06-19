import { Eyebrow } from "@/components/ui";

/**
 * SectionHead — eyebrow → serif display heading → optional intro.
 * The core editorial stack used at the top of most sections.
 */
export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "ink",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  tone?: "ink" | "light";
}) {
  return (
    <div
      style={{
        maxWidth: align === "center" ? 720 : "none",
        margin: align === "center" ? "0 auto" : 0,
        textAlign: align,
      }}
    >
      <Eyebrow tone={tone === "light" ? "light" : "coral"}>{eyebrow}</Eyebrow>
      <h2
        style={{
          fontFamily: "var(--wf-font-display)",
          fontWeight: 500,
          fontSize: "clamp(28px, 4.5vw, 40px)",
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          margin: "14px 0 0",
          color: tone === "light" ? "var(--wf-text-on-dark)" : "var(--wf-ink-900)",
        }}
      >
        {title}
      </h2>
      {intro && (
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: tone === "light" ? "rgba(244,239,231,0.8)" : "var(--wf-ink-500)",
            margin: "16px 0 0",
            maxWidth: 620,
            marginLeft: align === "center" ? "auto" : 0,
            marginRight: align === "center" ? "auto" : 0,
          }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
