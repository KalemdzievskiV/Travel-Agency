import * as React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  /** Uppercase field label. */
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** "box" (bordered) or "underline" (editorial hairline). */
  variant?: "box" | "underline";
  /** Error message — also turns the field red. */
  error?: string;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
}

/** Single-line text field with uppercase label and coral focus. */
export function Input(props: InputProps): JSX.Element;
