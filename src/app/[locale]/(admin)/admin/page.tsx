import Link from "next/link";
import { db } from "@/db";
import {
  destinations,
  experiences,
  testimonials,
  trips,
} from "@/db/schema";

export default async function AdminDashboardPage() {
  const [destCount, expCount, testCount, tripCount] = await Promise.all([
    db.$count(destinations),
    db.$count(experiences),
    db.$count(testimonials),
    db.$count(trips),
  ]);

  const cards: { label: string; count: number; href: string }[] = [
    { label: "Destinations", count: destCount, href: "/admin/destinations" },
    { label: "Experiences", count: expCount, href: "/admin/experiences" },
    { label: "Testimonials", count: testCount, href: "/admin/testimonials" },
    { label: "Trips", count: tripCount, href: "/admin/trips" },
  ];

  return (
    <div>
      <h1
        style={{
          fontFamily: "var(--wf-font-display)",
          fontWeight: 500,
          fontSize: "clamp(28px, 4vw, 38px)",
          letterSpacing: "-0.02em",
          margin: "0 0 6px",
        }}
      >
        Welcome back
      </h1>
      <p style={{ color: "var(--wf-ink-500)", margin: "0 0 32px" }}>
        Manage the content that powers bookit.{" "}
        <Link href="/" style={{ color: "var(--wf-coral-600)" }}>
          View the site
        </Link>
      </p>

      <div className="wf-grid wf-grid-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            style={{
              textDecoration: "none",
              background: "var(--wf-paper)",
              border: "1px solid var(--wf-border)",
              borderRadius: "var(--wf-radius-md)",
              padding: "22px 24px",
              boxShadow: "var(--wf-shadow-xs)",
              display: "block",
            }}
          >
            <div
              style={{
                fontFamily: "var(--wf-font-display)",
                fontSize: 40,
                fontWeight: 500,
                color: "var(--wf-ink-900)",
                lineHeight: 1,
              }}
            >
              {c.count}
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--wf-ink-500)",
              }}
            >
              {c.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
