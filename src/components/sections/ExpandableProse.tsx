"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, Icon } from "@/components/ui";

/**
 * A paragraph clamped to a few lines with a "read more" toggle beneath it.
 *
 * The toggle only appears when the text is actually taller than the clamp —
 * the experience categories vary a lot in length, and a "read more" that
 * expands nothing reads as broken. That means measuring after layout rather
 * than guessing from character count, since the clamp is in lines and the
 * column is fluid.
 */
export function ExpandableProse({
  text,
  style,
  lines = 4,
  align = "center",
}: {
  text: string;
  style?: React.CSSProperties;
  /** Lines shown while collapsed. */
  lines?: number;
  align?: "center" | "left";
}) {
  const t = useTranslations("experiencesPage");
  const ref = React.useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [overflows, setOverflows] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Re-measure on resize: a paragraph that fits in three lines on a desktop
    // column can run to eight on a phone.
    //
    // Only while collapsed, though. Expanding removes the clamp, so scrollHeight
    // equals clientHeight and the text measures as "fits" — which would hide the
    // toggle the moment it was used and strand the reader with no way to close
    // the text again.
    const measure = () => {
      if (expanded) return;
      const clamped = el.scrollHeight > el.clientHeight + 1;
      setOverflows((was) => (was === clamped ? was : clamped));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, lines, expanded]);

  const clamp: React.CSSProperties = expanded
    ? {}
    : {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lines,
        overflow: "hidden",
      };

  return (
    <>
      <p ref={ref} style={{ ...style, ...clamp }}>
        {text}
      </p>
      {overflows && (
        <div
          style={{
            display: "flex",
            justifyContent: align === "center" ? "center" : "flex-start",
            marginTop: "clamp(14px, 2vw, 20px)",
          }}
        >
          <Button
            variant="link"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            iconRight={
              <span
                style={{
                  display: "inline-flex",
                  transition: "transform var(--wf-dur-fast) var(--wf-ease-out)",
                  transform: expanded ? "rotate(180deg)" : "none",
                }}
              >
                <Icon name="chevron" size={14} />
              </span>
            }
          >
            {expanded ? t("readLess") : t("readMore")}
          </Button>
        </div>
      )}
    </>
  );
}
