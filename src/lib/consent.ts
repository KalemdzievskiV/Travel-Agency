// Cookie-consent state, shared by the corner notice and by anything that should
// wait for the visitor to answer it (the newsletter invite queues behind it so
// the two cards never fight for the same corner).
//
// Kept in localStorage rather than a cookie: the choice is only read in the
// browser, so there's nothing for the server to do with it.

export type Consent = "all" | "essential";

const CONSENT_KEY = "bookit.cookie-consent";
const NEWSLETTER_KEY = "bookit.newsletter-invite";

/** Fired on `window` whenever the visitor answers the cookie notice. */
export const CONSENT_EVENT = "bookit:consent";

// localStorage throws in private modes and when storage is disabled; a visitor
// who can't be remembered simply sees the notice again next time.
function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

/** Subscribe to consent changes — the shape `useSyncExternalStore` expects. */
export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const v = safeGet(CONSENT_KEY);
  return v === "all" || v === "essential" ? v : null;
}

export function writeConsent(value: Consent) {
  safeSet(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/** True once the visitor has signed up or closed the newsletter invite. */
export function newsletterAnswered(): boolean {
  if (typeof window === "undefined") return false;
  return safeGet(NEWSLETTER_KEY) !== null;
}

export function markNewsletterAnswered(value: "signed-up" | "dismissed") {
  safeSet(NEWSLETTER_KEY, value);
}
