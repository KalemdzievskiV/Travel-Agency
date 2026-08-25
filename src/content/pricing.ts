/**
 * How a price reaches a card.
 *
 * Revision 3.0 added sale pricing to trips and destinations. The client's rule
 * is that a sale price *replaces* the normal one — no strikethrough, no "was /
 * now" pair — so there is exactly one price on screen at any time and exactly
 * one function that decides which. Keep it that way: the moment a component
 * reaches for `priceFrom` directly, the two prices start drifting apart between
 * grids, carousels and detail pages.
 *
 * Prices are free text and hold the *amount only* — never a leading preposition
 * and no "per person" tail. The card supplies the localised "сега од" / "now
 * from" label itself, so a stored "сега од 990 EUR" would render as "сега од
 * сега од 990 EUR".
 *
 * Because the field is free text the client will type euros several ways ("990
 * EUR", "€3,200", "1.400"), so `formatPrice` normalises the presentation to one
 * house form — € before the amount — rather than relying on a one-off data
 * clean that drifts again with the next edit. Free text is deliberate, since the
 * client wants control of the wording, but it does mean price can't be sorted,
 * filtered or validated while it stays a string.
 */

/**
 * House format for a price: the euro sign before the amount, thousands grouped.
 *
 *   "990 EUR"  → "€990"        "1400 EUR" → "€1,400"
 *   "€3,200"   → "€3,200"      "1.400"    → "€1,400"
 *
 * Two things it deliberately will not do. It never touches a value carrying
 * another currency — the hotels quote room rates in yen, and rewriting those as
 * euros would invent a price. And it leaves the digits alone whenever they
 * aren't a plain grouped integer (anything with a decimal fraction, say), only
 * moving the symbol, so an unusual entry degrades to "mostly right" instead of
 * being mangled.
 *
 * Any trailing qualifier the client added is preserved: "€260 / night".
 */
export function formatPrice(raw: string): string {
  const s = raw.trim();
  if (!s) return "";
  // Another currency in play — leave it exactly as typed.
  if (/[¥$£₺₽₹]/.test(s)) return s;

  // Parsed in steps rather than one regex: the amount, then an optional
  // currency word after it, then whatever qualifier is left ("/ night").
  let rest = s.replace(/^€\s*/, "");
  const num = rest.match(/^\d[\d.,\s]*/);
  if (!num) return s;
  // `\b` is ASCII-only in JS, so it misfires after Cyrillic ЕУР — a Unicode
  // letter lookahead is what actually stops EUR matching inside a longer word.
  rest = rest.slice(num[0].length).replace(/^(?:EUR|ЕУР|€)(?!\p{L})\s*/iu, "").trim();

  const compact = num[0].replace(/\s/g, "").replace(/[.,]$/, "");
  // Only regroup a plain integer, with or without existing separators. Anything
  // else (a decimal fraction, say) keeps its digits and just gains the symbol.
  const digits = /^\d+$/.test(compact)
    ? compact
    : /^\d{1,3}(?:[.,]\d{3})+$/.test(compact)
      ? compact.replace(/[.,]/g, "")
      : null;
  const amount = digits ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : compact;

  return `€${amount}${rest ? ` ${rest}` : ""}`;
}

/** The pricing fields every priceable item carries. */
export type Priceable = {
  priceFrom?: string | null;
  onSale?: boolean | null;
  salePriceFrom?: string | null;
};

/**
 * The single price to show, or "" when there is none.
 *
 * Falls back to the normal price when an item is flagged on sale but nobody has
 * filled in the sale price yet — a half-configured item shows its old price
 * rather than nothing at all.
 */
export function displayPrice(item: Priceable): string {
  const sale = item.salePriceFrom?.trim() ?? "";
  if (item.onSale && sale) return formatPrice(sale);
  return formatPrice(item.priceFrom?.trim() ?? "");
}

/**
 * Whether to show the ON SALE badge.
 *
 * Tracks the manual flag, not the presence of a sale price: the client sets the
 * flag by hand per item, so staging a price without going live has to stay
 * possible. Requires a price to actually be showing — a badge over a card with
 * no price reads as a bug.
 */
export function showsSaleBadge(item: Priceable): boolean {
  return Boolean(item.onSale) && displayPrice(item) !== "";
}
