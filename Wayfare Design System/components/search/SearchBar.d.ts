import * as React from "react";

export interface SearchField {
  label: string;
  value: string;
  hint?: string;
}

export interface SearchBarProps {
  /** Segmented fields; defaults to Where / When / Who. */
  fields?: SearchField[];
  onSearch?: () => void;
  ctaLabel?: string;
  /** Stack fields two-up for narrow / mobile layouts. */
  compact?: boolean;
}

/**
 * The Wayfare destination booking widget.
 *
 * @startingPoint section="Search" subtitle="Where / when / who booking bar" viewport="900x120"
 */
export function SearchBar(props: SearchBarProps): JSX.Element;
