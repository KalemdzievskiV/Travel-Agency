"use client";

import React from "react";

/**
 * Blocks copying page text, at the client's request.
 *
 * The CSS in `.wf-guard` stops selection; this catches the rest — a copy fired
 * from the keyboard, or a selection made before the styles applied. Anything
 * the visitor typed themselves is exempt, so the forms keep working.
 *
 * This is a deterrent and nothing more. View-source, reader mode, printing and
 * any scraper are all untouched by it, and there is no way to change that from
 * inside the page. Worth saying plainly rather than letting it be mistaken for
 * protection.
 */
export function CopyGuard() {
  React.useEffect(() => {
    const isOwnInput = (node: EventTarget | null): boolean => {
      const el = node instanceof Element ? node : null;
      return Boolean(el?.closest("input, textarea, select, [contenteditable='true']"));
    };

    const onCopy = (e: ClipboardEvent) => {
      // Let people copy what they typed — an email they are checking, a phone
      // number they are correcting. Only page copy is blocked.
      if (isOwnInput(e.target) || isOwnInput(document.activeElement)) return;
      e.preventDefault();
    };

    document.addEventListener("copy", onCopy);
    document.addEventListener("cut", onCopy);
    return () => {
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("cut", onCopy);
    };
  }, []);

  return null;
}
