import * as React from "react";

export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected (filled) state. */
  selected?: boolean;
  children?: React.ReactNode;
}

/** Selectable pill chip for filters and category rails. */
export function Tag(props: TagProps): JSX.Element;
