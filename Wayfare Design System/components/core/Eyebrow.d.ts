import * as React from "react";

export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  /** Colour role. */
  tone?: "coral" | "ink" | "light";
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

/** Uppercase tracked label set above headlines. */
export function Eyebrow(props: EyebrowProps): JSX.Element;
