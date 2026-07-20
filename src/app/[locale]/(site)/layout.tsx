import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getRegionsWithDestinations } from "@/lib/queries/regions";
import { getExperienceCategories } from "@/lib/queries/experiences";

// Marketing chrome — header and footer. Enquiries live on their own page
// (/make-an-enquiry). Admin routes have their own group and don't inherit this.
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [regionsNav, whoCategories, remarkableCategories] = await Promise.all([
    getRegionsWithDestinations(),
    getExperienceCategories("who"),
    getExperienceCategories("remarkable"),
  ]);
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        regionsNav={regionsNav}
        experienceCategories={whoCategories}
        remarkableCategories={remarkableCategories}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
