import React from "react";

/**
 * MediaPlaceholder — a tonal-gradient stand-in for real photography, labelled so
 * it reads clearly as a slot to be filled. Swap `grad` for a real <Image> when
 * the client supplies photos. Server-safe.
 */
export function MediaPlaceholder({
  grad,
  label = "Your photo",
  ratio = "4 / 3",
  rounded = true,
  children,
}: {
  grad: string;
  label?: string;
  ratio?: string;
  rounded?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: ratio,
        background: grad,
        borderRadius: rounded ? "var(--wf-radius-md)" : 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children ?? (
        <span
          style={{
            fontFamily: "var(--wf-font-sans)",
            fontSize: 12,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.66)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
