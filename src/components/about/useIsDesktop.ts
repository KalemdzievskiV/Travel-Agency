"use client";

import React from "react";

/**
 * useIsDesktop — hydration-safe wide-screen detection for the pinned scrollers.
 * Returns `null` until mounted so server and first client render agree (both
 * fall back to the stacked layout), then resolves to a boolean via matchMedia.
 */
export function useIsDesktop(query = "(min-width: 980px)") {
  const [isDesktop, setIsDesktop] = React.useState<boolean | null>(null);
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return isDesktop;
}
