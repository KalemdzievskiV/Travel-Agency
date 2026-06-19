"use client";

import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { login } from "./actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} style={{ display: "grid", gap: 18 }}>
      <Input label="Email" name="email" type="email" placeholder="you@bookit.mk" required />
      <Input label="Password" name="password" type="password" placeholder="••••••••" required />
      {error && (
        <p style={{ margin: 0, fontSize: 13, color: "var(--wf-error)" }}>{error}</p>
      )}
      <Button type="submit" variant="primary" size="lg" fullWidth disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
