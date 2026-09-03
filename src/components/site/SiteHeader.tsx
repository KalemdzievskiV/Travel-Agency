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
import { MobileNav } from "./MobileNav";
import type { RegionNavItem } from "@/lib/queries/regions";
import type { ExperienceCategory } from "@/content/types";
import { nav } from "@/content/site";

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
  const overHero =
    pathname === "/" ||
    pathname === "/trip-finder" ||
    pathname === "/experiences" ||
    isDestinationHero ||
    isExperienceHero;
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

  // Close the mobile drawer on route change.
  React.useEffect(() => {
    setMenuOpen(false);
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
    // 12px, per the brief: 13 is the stated ceiling and 14–15 "ќе се изгуби
    // поелегантниот luxury изглед".
    fontSize: "var(--wf-nav-size)",
    fontWeight: "var(--wf-nav-weight)",
    letterSpacing: "var(--wf-tracking-nav)",
    textTransform: "uppercase",
    color: dark ? "#fff" : "var(--wf-ink-900)",
    paddingBottom: 3,
  });

  const navLinkClass = (href: string) =>
    `wf-navlink${isActive(href) ? " wf-navlink--on" : ""}`;

  return (
    <>
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "transparent",
      }}
    >
      {/* The two surfaces are stacked and cross-faded on opacity rather than
          swapped: `background-image` can't animate between a gradient and
          `none`, so switching them made the header snap to white. Both layers
          are painted behind the row, which sits in the normal flow above. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          // Floating over imagery the header carries a soft top-down scrim
          // rather than being fully transparent: white nav on a pale sky (or a
          // bright video frame) drops below a readable contrast otherwise. It
          // fades to nothing, so the content still reads as running behind it.
          backgroundImage:
            "linear-gradient(180deg, rgba(20,18,16,0.55) 0%, rgba(20,18,16,0.28) 55%, rgba(20,18,16,0) 100%)",
          opacity: dark ? 1 : 0,
          transition: "opacity .5s var(--wf-ease-out)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--wf-cream)",
          // With a mega-menu open the header and the panel are one continuous
          // white surface, so the hairline is dropped — otherwise the two read
          // as stacked bars rather than a single sheet.
          borderBottom: `1px solid ${openMega ? "transparent" : "var(--wf-border)"}`,
          opacity: dark ? 0 : 1,
          transition: "opacity .5s var(--wf-ease-out), border-color .3s",
          pointerEvents: "none",
        }}
      />
      <div
        className="wf-wrap wf-wrap--wide wf-header-row"
        style={{
          position: "relative",
          height: "var(--wf-header-h)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Collapses to the B once the page has scrolled past the hero, and
            unfolds again on the way back up. */}
        <Logo light={dark} collapsed={scrolled} />

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
          <span className="wf-header-lang">
            <LanguageSwitcher dark={dark} />
          </span>
          {/* Stays beside the burger on mobile, per the client: this is the one
              button that carries the accent at every width, which is what lets
              every other CTA on the page go black-and-white. Sizing down for
              narrow screens is done in CSS (.wf-header-cta), not here — a JS
              breakpoint would have to wait for hydration to pick a size. */}
          <span className="wf-header-cta">
            {/* Keeps its own label ("start here", per the client) but takes
                the site-wide button transition: accent fill with white type,
                inverting to white with accent type on hover. */}
            <Button variant="primary" size="sm" onClick={goEnquire}>
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

    </header>

    {/* Mobile drawer — the drill-down menu the client's brief asks for. It is a
        SIBLING of the header, not a child: the header is sticky with a z-index,
        which makes it a stacking context, and a fixed drawer inside one can
        never rise above the corner popups outside it however high its z-index.
        Hidden above 860px by .wf-drawer, and inert until opened. */}
    <MobileNav
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      regionsNav={regionsNav}
      experienceCategories={experienceCategories}
      remarkableCategories={remarkableCategories}
      navLabel={navLabel}
    />
    </>
  );
}
