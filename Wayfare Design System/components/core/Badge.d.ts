import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "coral" | "success" | "warning";
  variant?: "soft" | "solid";
  children?: React.ReactNode;
}

/** Small uppercase status / category marker. */
export function Badge(props: BadgeProps): JSX.Element;
