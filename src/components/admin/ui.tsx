import React from "react";
import Link from "next/link";

export const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--wf-ink-500)",
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--wf-font-sans)",
  fontSize: 15,
  color: "var(--wf-ink-900)",
  background: "var(--wf-paper)",
  border: "1px solid var(--wf-border-strong)",
  borderRadius: "var(--wf-radius-md)",
  padding: "10px 12px",
};

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label htmlFor={htmlFor} style={labelStyle}>
        {label}
      </label>
      {children}
      {hint && (
        <span style={{ fontSize: 12, color: "var(--wf-ink-400)" }}>{hint}</span>
      )}
    </div>
  );
}

export function TextField({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <Field label={label} htmlFor={name} hint={hint}>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? undefined}
        style={inputStyle}
      />
    </Field>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  options: { value: string; label: string }[];
  hint?: string;
}) {
  return (
    <Field label={label} htmlFor={name} hint={hint}>
      <select id={name} name={name} defaultValue={defaultValue ?? undefined} style={inputStyle}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

/**
 * A scrollable list of checkboxes sharing one field name, so the action reads
 * them with `formData.getAll(name)`. Used where the admin picks several rows
 * (e.g. a category's favourite destinations) and a native multi-select would be
 * fiddly to operate.
 */
export function CheckboxGroupField({
  label,
  name,
  options,
  selected = [],
  hint,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  selected?: string[];
  hint?: string;
}) {
  const on = new Set(selected);
  return (
    <Field label={label} hint={hint}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 8,
          maxHeight: 260,
          overflowY: "auto",
          padding: 12,
          border: "1px solid var(--wf-border)",
          borderRadius: "var(--wf-radius-sm)",
        }}
      >
        {options.length === 0 && (
          <span style={{ fontSize: 13, color: "var(--wf-ink-400)" }}>Nothing to choose from yet.</span>
        )}
        {options.map((o) => (
          <label
            key={o.value}
            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}
          >
            <input type="checkbox" name={name} value={o.value} defaultChecked={on.has(o.value)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </Field>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 4,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <Field label={label} htmlFor={name} hint={hint}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue ?? undefined}
        style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
      />
    </Field>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked = false,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "var(--wf-font-sans)",
        fontSize: 14,
        color: "var(--wf-ink-800)",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        value="on"
        style={{ width: 18, height: 18, accentColor: "var(--wf-coral-500)" }}
      />
      {label}
    </label>
  );
}

export function PageHeader({
  title,
  back,
  action,
}: {
  title: string;
  back?: { href: string; label: string };
  action?: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      {back && (
        <Link
          href={back.href}
          style={{
            fontSize: 13,
            color: "var(--wf-ink-500)",
            textDecoration: "none",
          }}
        >
          ← {back.label}
        </Link>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginTop: back ? 10 : 0,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--wf-font-display)",
            fontWeight: 500,
            fontSize: "clamp(26px, 4vw, 34px)",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {title}
        </h1>
        {action}
      </div>
    </div>
  );
}

export function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--wf-paper)",
        border: "1px solid var(--wf-border)",
        borderRadius: "var(--wf-radius-md)",
        boxShadow: "var(--wf-shadow-xs)",
        padding: "clamp(20px, 4vw, 32px)",
        display: "grid",
        gap: 20,
        maxWidth: 760,
      }}
    >
      {children}
    </div>
  );
}
