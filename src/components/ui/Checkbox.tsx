import React from "react";

/**
 * Checkbox — a checkbox with its label, the pattern the enquiry form already
 * used inline for the newsletter opt-in. Revision 3.1 adds six more of these
 * across two forms (flexible dates, "inspire me", and the four contact
 * channels), so it is a primitive rather than a copied block.
 *
 * The whole row is the label, so the text is part of the hit target.
 */
export function Checkbox({
  name,
  value,
  defaultChecked,
  children,
  style,
  ...rest
}: {
  name: string;
  value?: string;
  defaultChecked?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "value" | "defaultChecked" | "children" | "style" | "type">) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        fontSize: 13.5,
        color: "var(--wf-ink-700)",
        lineHeight: 1.5,
        cursor: "pointer",
        ...style,
      }}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        style={{ width: 17, height: 17, marginTop: 2, flex: "none", accentColor: "var(--wf-coral-500)" }}
        {...rest}
      />
      <span>{children}</span>
    </label>
  );
}

/**
 * A titled row of checkboxes — "Како најмногу ти одговара да разговараме?" and
 * its four channels, which 3.1 asks for on both the flights and enquiry forms.
 * Wraps rather than fixing a column count: four short labels sit on one line on
 * a desktop and stack on a phone without needing a breakpoint of their own.
 */
export function CheckboxGroup({
  legend,
  name,
  options,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
}) {
  return (
    <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
      <legend style={{ fontSize: 13, fontWeight: 700, color: "var(--wf-ink-900)", padding: 0, marginBottom: 10 }}>
        {legend}
      </legend>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px clamp(16px, 3vw, 28px)" }}>
        {options.map((o) => (
          <Checkbox key={o.value} name={name} value={o.value} style={{ alignItems: "center" }}>
            {o.label}
          </Checkbox>
        ))}
      </div>
    </fieldset>
  );
}
