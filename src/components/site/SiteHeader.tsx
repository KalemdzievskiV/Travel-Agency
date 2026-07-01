"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, Icon } from "@/components/ui";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DestinationsMegaMenu } from "./DestinationsMegaMenu";
import type { RegionNavItem } from "@/lib/queries/regions";
import { nav, aboutMenu, site } from "@/content/site";

export function SiteHeader({ regionsNav = [] }: { regionsNav?: RegionNavItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const goEnquire = () => router.push("/make-an-enquiry");
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);

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
      case "/about":
        return t("nav.about");
      default:
        return href;
    }
  };

  // Full-bleed hero pages — the header floats transparent over the hero until
  // the user scrolls, then becomes solid cream. The open mobile menu is solid.
  const isRegionPage = regionsNav.some((r) => pathname === `/destinations/${r.slug}`);
  const overHero = pathname === "/" || pathname === "/trip-finder" || isRegionPage;
  const dark = overHero && !scrolled && !menuOpen;

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

  const navLinkStyle = (href: string): React.CSSProperties => ({
    textDecoration: "none",
    fontFamily: "var(--wf-font-sans)",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.01em",
    color: dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)",
    paddingBottom: 2,
    borderBottom: `1.5px solid ${
      isActive(href) ? (dark ? "#fff" : "var(--wf-coral-500)") : "transparent"
    }`,
  });

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: dark ? "transparent" : "var(--wf-cream)",
        borderBottom: `1px solid ${dark ? "transparent" : "var(--wf-border)"}`,
        transition: "background .3s, border-color .3s",
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
          {nav.map((l) =>
            l.href === "/destinations" ? (
              <DestinationsMegaMenu
                key={l.href}
                regions={regionsNav}
                label={navLabel(l.href)}
                triggerStyle={navLinkStyle(l.href)}
                iconColor={dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)"}
              />
            ) : l.href === "/about" ? (
              <div className="wf-megamenu" key={l.href}>
                <Link
                  href={l.href}
                  style={{
                    ...navLinkStyle(l.href),
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {navLabel(l.href)}
                  <Icon
                    name="chevron"
                    size={14}
                    color={dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)"}
                  />
                </Link>
                <div className="wf-megamenu__panel">
                  {aboutMenu.map((group) => (
                    <div key={t(`aboutMenu.groups.${group.key}`)}>
                      <div className="wf-megamenu__col-title">{t(`aboutMenu.groups.${group.key}`)}</div>
                      {group.items.map((item) => (
                        <Link
                          key={item.key}
                          href={item.href}
                          className="wf-megamenu__link"
                        >
                          {t(`aboutMenu.items.${item.key}`)}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={l.href} href={l.href} style={navLinkStyle(l.href)}>
                {navLabel(l.href)}
              </Link>
            )
          )}
        </nav>

        <div className="wf-header-actions">
          <a
            className="wf-header-phone"
            href={`tel:${site.phone.replace(/\s+/g, "")}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              textDecoration: "none",
              fontSize: 13.5,
              fontWeight: 500,
              color: dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)",
            }}
          >
            <Icon name="phone" size={15} color={dark ? "#fff" : "var(--wf-ink-700)"} />
            {site.phone}
          </a>
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
                        <div className="wf-mobile-about__group">{t(`aboutMenu.groups.${group.key}`)}</div>
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
