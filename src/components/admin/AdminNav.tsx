"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links: [string, string][] = [
  ["Dashboard", "/admin"],
  ["Destinations", "/admin/destinations"],
  ["Experiences", "/admin/experiences"],
  ["Testimonials", "/admin/testimonials"],
  ["Trips", "/admin/trips"],
  ["Filters", "/admin/filters"],
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {links.map(([label, href]) => {
        const active =
          href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            style={{
              textDecoration: "none",
              fontFamily: "var(--wf-font-sans)",
              fontSize: 14,
              fontWeight: 500,
              padding: "8px 14px",
              borderRadius: "var(--wf-radius-pill)",
              color: active ? "var(--wf-text-on-dark)" : "var(--wf-ink-700)",
              background: active ? "var(--wf-ink-900)" : "transparent",
            }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
