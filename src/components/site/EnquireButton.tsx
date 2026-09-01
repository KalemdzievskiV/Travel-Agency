"use client";

import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui";
import { useRouter } from "@/i18n/navigation";

/**
 * Navigates to the /make-an-enquiry page, optionally pre-filling a destination.
 * Pass `trip` (a slug) to carry the trip through as well — the enquiry page
 * shows its summary card and presets the destination from it.
 * Safe to drop into server components.
 *
 * `className` reaches the Button itself — it is how a CTA opts into
 * `.wf-cta-mono`, the mobile black-and-white treatment.
 */
export function EnquireButton({
  children = "Enquire now",
  destination,
  trip,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: {
  children?: React.ReactNode;
  destination?: string;
  trip?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const go = () => {
    const params = new URLSearchParams();
    if (trip) params.set("trip", trip);
    if (destination) params.set("to", destination);
    const qs = params.toString();
    router.push(qs ? `/make-an-enquiry?${qs}` : "/make-an-enquiry");
  };
  return (
    <Button variant={variant} size={size} fullWidth={fullWidth} className={className} onClick={go}>
      {children}
    </Button>
  );
}
