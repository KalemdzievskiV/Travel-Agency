import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { EnquiryPanels } from "@/components/site/EnquiryPanels";
import { getDestinations } from "@/lib/queries/public";

export const metadata: Metadata = {
  title: "Make an enquiry",
  description:
    "Tell us about the trip you have in mind. No planning fees, no obligation — just the start of a conversation with a bookit travel expert.",
};

export default async function EnquiryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const to = typeof sp.to === "string" ? sp.to : "";
  const destinations = await getDestinations();
  const destinationNames = [...new Set(destinations.map((d) => d.title))].sort((a, b) => a.localeCompare(b));

  return (
    <section
      style={{
        background: "var(--wf-cream)",
        padding: "calc(var(--wf-header-h) + clamp(28px, 5vw, 56px)) 0 clamp(48px, 8vw, 96px)",
        minHeight: "100vh",
      }}
    >
      <div className="wf-wrap wf-wrap--wide">
        <EnquiryPanels presetDestination={to} destinations={destinationNames} />
      </div>
    </section>
  );
}
