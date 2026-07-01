"use client";

import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui";
import { useRouter } from "@/i18n/navigation";

/**
 * Navigates to the /make-an-enquiry page, optionally pre-filling a destination.
 * Safe to drop into server components.
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
  const router = useRouter();
  const go = () =>
    router.push(
      destination ? `/make-an-enquiry?to=${encodeURIComponent(destination)}` : "/make-an-enquiry",
    );
  return (
    <Button variant={variant} size={size} fullWidth={fullWidth} onClick={go}>
      {children}
    </Button>
  );
}
