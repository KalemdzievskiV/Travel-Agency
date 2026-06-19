import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import { Logo } from "@/components/site/Logo";
import { Eyebrow } from "@/components/ui";
import { AdminNav } from "@/components/admin/AdminNav";
import { signOutAction } from "./actions";

export const metadata: Metadata = {
  title: { default: "Studio", template: "%s · bookit Studio" },
  robots: { index: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  return (
    <div style={{ minHeight: "100svh", background: "var(--wf-cream)" }}>
      <header
        style={{
          background: "var(--wf-paper)",
          borderBottom: "1px solid var(--wf-border)",
        }}
      >
        <div
          className="wf-wrap wf-wrap--wide"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
            paddingBlock: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Logo href="/admin" size={28} />
            <Eyebrow>Studio</Eyebrow>
          </div>
          <AdminNav />
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 13, color: "var(--wf-ink-500)" }}>
              {user.email}
            </span>
            <form action={signOutAction}>
              <button
                type="submit"
                style={{
                  fontFamily: "var(--wf-font-sans)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--wf-ink-700)",
                  background: "transparent",
                  border: "1px solid var(--wf-border-strong)",
                  borderRadius: "var(--wf-radius-pill)",
                  padding: "7px 14px",
                  cursor: "pointer",
                }}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="wf-wrap wf-wrap--wide" style={{ paddingBlock: 40 }}>
        {children}
      </main>
    </div>
  );
}
