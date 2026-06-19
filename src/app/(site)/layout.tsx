import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { EnquiryProvider } from "@/components/site/EnquiryProvider";

// Marketing chrome — header, footer, and the global enquiry modal. Admin
// routes live in their own group and deliberately don't inherit this.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EnquiryProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </EnquiryProvider>
  );
}
