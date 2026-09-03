import React from "react";

/**
 * Prose — renders a body string from `src/content/` with two pieces of markup
 * the client's briefs keep asking for and a plain string can't carry:
 *
 * - `\n\n` becomes a real paragraph break (not `white-space: pre-line`, which
 *   collapses to a blank line the type scale can't control), and
 * - `**…**` becomes `<strong>`. Revision 3.1 bolds a closing phrase inside
 *   almost every body it rewrites — "(se sto e boldirano da e boldirano)" —
 *   and those phrases sit mid-paragraph, so they can't be split into a
 *   separate field.
 *
 * Deliberately not a Markdown parser: two constructs, no nesting, no links. The
 * content files are ours, so anything more is scope the site doesn't need and
 * an escaping problem it doesn't have.
 */
export function Prose({
  text,
  style,
  gap = "0.9em",
}: {
  text: string;
  /** Applied to each paragraph, so callers keep control of size and colour. */
  style?: React.CSSProperties;
  /** Space between paragraphs. */
  gap?: string;
}) {
  const paragraphs = text.split(/\n{2,}/);
  return (
    <>
      {paragraphs.map((para, i) => (
        <p key={i} style={{ margin: i === 0 ? 0 : `${gap} 0 0`, ...style }}>
          {emphasise(para)}
        </p>
      ))}
    </>
  );
}

/**
 * Split on `**…**` and wrap the odd segments in <strong>. A single-line join
 * of the even/odd halves, so an unclosed `**` degrades to literal text rather
 * than swallowing the rest of the paragraph.
 */
export function emphasise(text: string): React.ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((chunk, i) =>
    i % 2 === 1 ? <strong key={i}>{chunk}</strong> : <React.Fragment key={i}>{chunk}</React.Fragment>,
  );
}
