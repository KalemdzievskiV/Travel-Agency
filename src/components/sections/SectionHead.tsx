import { Eyebrow } from "@/components/ui";

/**
 * SectionHead — eyebrow → Oswald display heading → optional intro.
 * The core editorial stack used at the top of most sections, and so the single
 * place the type brief's "Section H2" role is defined: Oswald 400, 48–58px on
 * desktop and 36px on mobile, leading 1, no tracking.
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
        className="wf-h2"
        style={{
          margin: "14px 0 0",
          color: tone === "light" ? "var(--wf-text-on-dark)" : "var(--wf-ink-900)",
        }}
      >
        {title}
      </h2>
      {intro && (
        <p
          style={{
            fontSize: "var(--wf-body-size)",
            lineHeight: "var(--wf-body-leading)",
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
