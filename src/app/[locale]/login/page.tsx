import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";
import { Logo } from "@/components/site/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "var(--wf-cream)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <Logo href={null} />
        </div>
        <div
          style={{
            background: "var(--wf-paper)",
            border: "1px solid var(--wf-border)",
            borderRadius: "var(--wf-radius-lg)",
            boxShadow: "var(--wf-shadow-sm)",
            padding: "clamp(28px, 6vw, 40px)",
          }}
        >
          <Eyebrow>Studio access</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: 28,
              letterSpacing: "-0.02em",
              margin: "12px 0 24px",
              color: "var(--wf-ink-900)",
            }}
          >
            Sign in to the dashboard
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
