"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Icon } from "@/components/ui";
import { Logo } from "./Logo";
import { useEnquiry } from "./EnquiryProvider";
import { nav, aboutMenu, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const { open } = useEnquiry();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);

  // Home has a full-bleed hero — the header floats transparent over it until
  // the user scrolls, then becomes solid cream. The open mobile menu is solid.
  const overHero = pathname === "/";
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
            l.label === "About" ? (
              <div className="wf-megamenu" key={l.label}>
                <Link
                  href={l.href}
                  style={{
                    ...navLinkStyle(l.href),
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {l.label}
                  <Icon
                    name="chevron"
                    size={14}
                    color={dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)"}
                  />
                </Link>
                <div className="wf-megamenu__panel">
                  {aboutMenu.map((group) => (
                    <div key={group.group}>
                      <div className="wf-megamenu__col-title">{group.group}</div>
                      {group.items.map((item) => (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          className="wf-megamenu__link"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={l.label} href={l.href} style={navLinkStyle(l.href)}>
                {l.label}
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
            <Button
              variant={dark ? "primary" : "dark"}
              size="sm"
              onClick={() => open()}
            >
              Enquire now
            </Button>
          </span>

          {/* Mobile menu toggle */}
          <button
            className="wf-nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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
            l.label === "About" ? (
              <div key={l.label}>
                <button
                  className="wf-mobile-about__toggle"
                  aria-expanded={aboutOpen}
                  onClick={() => setAboutOpen((v) => !v)}
                >
                  About
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
                      <React.Fragment key={group.group}>
                        <div className="wf-mobile-about__group">{group.group}</div>
                        {group.items.map((item) => (
                          <Link key={item.href + item.label} href={item.href}>
                            {item.label}
                          </Link>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={l.label} href={l.href}>
                {l.label}
              </Link>
            )
          )}
          <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>{site.phone}</a>
          <div style={{ marginTop: 16 }}>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
            >
              Enquire now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
