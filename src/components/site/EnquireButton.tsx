"use client";

import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui";
import { useEnquiry } from "./EnquiryProvider";

/**
 * Client wrapper that opens the global enquiry modal, optionally pre-filling
 * a destination. Safe to drop into server components.
 */
export function EnquireButton({
  children = "Enquire now",
  destination,
  variant = "primary",
  size = "md",
  fullWidth = false,
}: {
  children?: React.ReactNode;
  destination?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}) {
  const { open } = useEnquiry();
  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={() => open(destination)}
    >
      {children}
    </Button>
  );
}
