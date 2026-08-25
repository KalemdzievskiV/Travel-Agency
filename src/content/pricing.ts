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
 * Prices are free text (e.g. "€2,400 per person", "сега од 990 EUR"). That is
 * deliberate — the client types the wording they want and no formatting logic
 * sits in the way — but it does mean price can't be sorted, filtered or
 * validated while it stays a string.
 */

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
  if (item.onSale && sale) return sale;
  return item.priceFrom?.trim() ?? "";
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
