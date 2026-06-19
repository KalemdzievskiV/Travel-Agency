import * as React from "react";

export interface CardProps {
  image?: string;
  /** Uppercase coral kicker. */
  eyebrow?: string;
  title: string;
  body?: string;
  /** Footer node, e.g. a Button. */
  footer?: React.ReactNode;
  height?: number;
  onClick?: () => void;
}

/** Generic editorial content card (stories, guides, inspiration). */
export function Card(props: CardProps): JSX.Element;
