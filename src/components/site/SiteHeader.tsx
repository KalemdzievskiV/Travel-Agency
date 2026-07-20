"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, Icon } from "@/components/ui";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DestinationsMegaMenu } from "./DestinationsMegaMenu";
import { ExperiencesMegaMenu } from "./ExperiencesMegaMenu";
import { AboutMegaMenu } from "./AboutMegaMenu";
import { SearchOverlay } from "./SearchOverlay";
import { PhoneWithHours } from "./PhoneWithHours";
import type { RegionNavItem } from "@/lib/queries/regions";
import type { ExperienceCategory } from "@/content/types";
import { nav, aboutMenu, site } from "@/content/site";

export function SiteHeader({
  regionsNav = [],
  experienceCategories = [],
  remarkableCategories = [],
}: {
  regionsNav?: RegionNavItem[];
  experienceCategories?: ExperienceCategory[];
  remarkableCategories?: ExperienceCategory[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const goEnquire = () => router.push("/make-an-enquiry");
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  // Which mega-menu is showing, if any. Tracked by key rather than a boolean so
  // one menu closing can't clear the flag another has just set.
  const [openMega, setOpenMega] = React.useState<string | null>(null);
  const megaHandler = React.useCallback(
    (key: string) => (isOpen: boolean) =>
      setOpenMega((prev) => (isOpen ? key : prev === key ? null : prev)),
    [],
  );

  // Top-level nav labels are translated; the About submenu stays English for now.
  const navLabel = (href: string) => {
    switch (href) {
      case "/destinations":
        return t("nav.destinations");
      case "/trips":
        return t("nav.trips");
      case "/experiences":
        return t("nav.experiences");
      case "/trip-finder":
        return t("nav.tripFinder");
      case "/flight-tickets":
        return t("nav.flightTickets");
      case "/about":
        return t("nav.about");
      default:
        return href;
    }
  };

  // Full-bleed hero pages — the header floats transparent over the hero until
  // the user scrolls, then becomes solid cream. The open mobile menu is solid.
  // Region landing pages and destination detail pages both open on a full-bleed
  // image hero (matched as /destinations/<slug>, not the /destinations listing).
  const isDestinationHero = /^\/destinations\/[^/]+$/.test(pathname);
  const isExperienceHero = /^\/experiences\/[^/]+$/.test(pathname);
  const overHero = pathname === "/" || pathname === "/trip-finder" || isDestinationHero || isExperienceHero;
  // Routes that are dark from top to bottom. Unlike a hero, these never hand over
  // to a light background, so the header stays transparent past the scroll point —
  // letting the pinned imagery and copy run behind it the whole way down.
  const darkThroughout = pathname === "/about/5-reasons";
  // An open mega-menu makes the header solid regardless: the panel is white, so a
  // transparent header left the two reading as separate surfaces.
  const dark = (darkThroughout || (overHero && !scrolled)) && !menuOpen && !openMega;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu (and its About accordion) on route change.
  React.useEffect(() => {
    setMenuOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === pathname ||
    (href.startsWith("/") &&
      !href.includes("#") &&
      href !== "/" &&
      pathname.startsWith(href));

  // The underline itself lives in .wf-navlink::after (responsive.css) so it can
  // animate — inline styles can't hold a pseudo-element.
  const navLinkStyle = (): React.CSSProperties => ({
    textDecoration: "none",
    fontFamily: "var(--wf-font-sans)",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: dark ? "#fff" : "var(--wf-ink-900)",
    paddingBottom: 3,
  });

  const navLinkClass = (href: string) =>
    `wf-navlink${isActive(href) ? " wf-navlink--on" : ""}`;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        // Longhands only — mixing the `background` shorthand with the
        // backgroundOrigin/Repeat longhands below lets React reset one when it
        // reapplies the other on re-render.
        //
        // Floating over imagery, the header carries a soft top-down scrim rather
        // than being fully transparent: white nav on a pale sky (or a bright
        // video frame) drops below a readable contrast otherwise. It fades to
        // nothing, so the content still reads as running behind the header.
        backgroundColor: dark ? "transparent" : "var(--wf-cream)",
        backgroundImage: dark
          ? "linear-gradient(180deg, rgba(20,18,16,0.55) 0%, rgba(20,18,16,0.28) 55%, rgba(20,18,16,0) 100%)"
          : "none",
        // The gradient must span the border box. Background images are sized to
        // the padding box by default but painted to the border box, so the
        // transparent 1px bottom border was filled by a repeat of the gradient's
        // first stop — a dark hairline under the header.
        backgroundOrigin: "border-box",
        backgroundRepeat: "no-repeat",
        borderBottom: `1px solid ${dark ? "transparent" : "var(--wf-border)"}`,
        transition: "background-color .3s, border-color .3s",
      }}
    >
      <div
        className="wf-wrap wf-wrap--wide"
        style={{
          height: "var(--wf-header-h)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo light={dark} />

        <nav className="wf-header-nav">
          <SearchOverlay regions={regionsNav} dark={dark} />
          {nav.map((l) =>
            l.href === "/destinations" ? (
              <DestinationsMegaMenu
                key={l.href}
                regions={regionsNav}
                onOpenChange={megaHandler("destinations")}
                label={navLabel(l.href)}
                triggerStyle={navLinkStyle()}
                triggerClassName={navLinkClass(l.href)}
                iconColor={dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)"}
              />
            ) : l.href === "/experiences" ? (
              <ExperiencesMegaMenu
                key={l.href}
                categories={experienceCategories}
                remarkableCategories={remarkableCategories}
                onOpenChange={megaHandler("experiences")}
                label={navLabel(l.href)}
                triggerStyle={navLinkStyle()}
                triggerClassName={navLinkClass(l.href)}
                iconColor={dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)"}
              />
            ) : l.href === "/about" ? (
              <AboutMegaMenu
                key={l.href}
                onOpenChange={megaHandler("about")}
                label={navLabel(l.href)}
                triggerStyle={navLinkStyle()}
                triggerClassName={navLinkClass(l.href)}
                iconColor={dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)"}
              />
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={navLinkClass(l.href)}
                style={navLinkStyle()}
              >
                {navLabel(l.href)}
              </Link>
            )
          )}
        </nav>

        <div className="wf-header-actions">
          <PhoneWithHours dark={dark} />
          <span className="wf-header-enquire">
            <LanguageSwitcher dark={dark} />
          </span>
          <span className="wf-header-enquire">
            <Button
              variant={dark ? "primary" : "dark"}
              size="sm"
              onClick={goEnquire}
            >
              {t("common.enquireNow")}
            </Button>
          </span>

          {/* Mobile menu toggle */}
          <button
            className="wf-nav-toggle"
            aria-label={menuOpen ? t("common.closeMenu") : t("common.openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon
              name={menuOpen ? "x" : "menu"}
              size={24}
              color={dark ? "#fff" : "var(--wf-ink-900)"}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="wf-mobile-menu">
          {nav.map((l) =>
            l.href === "/about" ? (
              <div key={l.href}>
                <button
                  className="wf-mobile-about__toggle"
                  aria-expanded={aboutOpen}
                  onClick={() => setAboutOpen((v) => !v)}
                >
                  {navLabel(l.href)}
                  <span
                    style={{
                      display: "inline-flex",
                      transform: aboutOpen ? "rotate(180deg)" : "none",
                      transition: "transform .2s var(--wf-ease-out)",
                    }}
                  >
                    <Icon name="chevron" size={18} color="var(--wf-ink-700)" />
                  </span>
                </button>
                {aboutOpen && (
                  <div className="wf-mobile-about__panel">
                    {aboutMenu.map((group) => (
                      <React.Fragment key={t(`aboutMenu.groups.${group.key}`)}>
                        <Link href={group.href} className="wf-mobile-about__group">
                          {t(`aboutMenu.groups.${group.key}`)}
                        </Link>
                        {group.items.map((item) => (
                          <Link key={item.key} href={item.href}>
                            {t(`aboutMenu.items.${item.key}`)}
                          </Link>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={l.href} href={l.href}>
                {navLabel(l.href)}
              </Link>
            )
          )}
          <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>{site.phone}</a>
          <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
            <LanguageSwitcher />
          </div>
          <div style={{ marginTop: 16 }}>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => {
                setMenuOpen(false);
                goEnquire();
              }}
            >
              {t("common.enquireNow")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
