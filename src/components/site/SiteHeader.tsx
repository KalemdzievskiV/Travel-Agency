"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Icon } from "@/components/ui";
import { Logo } from "./Logo";
import { useEnquiry } from "./EnquiryProvider";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const { open } = useEnquiry();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

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

  // Close the mobile menu on route change.
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === pathname ||
    (href.startsWith("/") &&
      !href.includes("#") &&
      href !== "/" &&
      pathname.startsWith(href));

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
          {nav.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                textDecoration: "none",
                fontFamily: "var(--wf-font-sans)",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.01em",
                color: dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)",
                paddingBottom: 2,
                borderBottom: `1.5px solid ${
                  isActive(l.href)
                    ? dark
                      ? "#fff"
                      : "var(--wf-coral-500)"
                    : "transparent"
                }`,
              }}
            >
              {l.label}
            </Link>
          ))}
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
          {nav.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
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
