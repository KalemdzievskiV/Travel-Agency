import * as React from "react";

export interface DestinationCardProps {
  /** Background photo URL. Omit for a tonal placeholder. */
  image?: string;
  /** Uppercase region eyebrow, e.g. "Indian Ocean". */
  region?: string;
  /** Serif title. */
  title: string;
  /** Small muted meta line (e.g. "7 nights · tailor-made"). */
  meta?: string;
  /** Price string, shown as "from <price>". */
  price?: string;
  /** Rating value, e.g. "4.9". */
  rating?: string;
  /** Corner badge, e.g. "Trending". */
  badge?: string;
  height?: number;
  onClick?: () => void;
}

/**
 * Signature full-bleed destination card with overlay caption.
 *
 * @startingPoint section="Cards" subtitle="Full-bleed destination card" viewport="380x440"
 */
export function DestinationCard(props: DestinationCardProps): JSX.Element;
