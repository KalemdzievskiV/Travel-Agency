"use client";

import React from "react";
import type { TripExcursion } from "@/db/schema";
import { uploadAdminImage } from "@/app/[locale]/(admin)/actions";
import { Field, inputStyle, labelStyle } from "./ui";

type Row = TripExcursion & { key: string; status: string };

const EMPTY: TripExcursion = {
  image: "",
  label: "",
  labelMk: "",
  eyebrow: "",
  eyebrowMk: "",
  title: "",
  titleMk: "",
  price: "",
  body: "",
  bodyMk: "",
};

let seq = 0;
const newKey = () => `x${Date.now().toString(36)}${seq++}`;

/**
 * Repeatable excursions (ФАКУЛТАТИВИ) for a trip: one picture per excursion and
 * the copy that goes with it. The text travels to the action as one JSON field
 * (`excursions`). A photo uploads the moment it's picked (one request per
 * photo, like GalleryField), so the row already holds its URL by save time.
 */
export function ExcursionsEditor({ initial = [] }: { initial?: TripExcursion[] }) {
  const [rows, setRows] = React.useState<Row[]>(() =>
    initial.map((x) => ({ ...EMPTY, ...x, key: newKey(), status: "" })),
  );

  const update = (key: string, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  const move = (i: number, d: -1 | 1) =>
    setRows((rs) => {
      const j = i + d;
      if (j < 0 || j >= rs.length) return rs;
      const next = rs.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const payload = JSON.stringify(
    rows.map((r) => {
      const x: Partial<Row> = { ...r };
      delete x.key;
      delete x.status;
      return x;
    }),
  );

  return (
    <Field
      label="Excursions (факултативи)"
      hint="Shown on the trip page as the “За ова ќе раскажуваш” slider, between the notes and the enquiry card. Each picture carries its own text, so the copy changes with the photo. Leave empty to hide the section. Photos upload as soon as they're picked (max 4 MB each)."
    >
      <input type="hidden" name="excursions" value={payload} />
      <div style={{ display: "grid", gap: 14 }}>
        {rows.map((r, i) => (
          <div
            key={r.key}
            style={{
              border: "1px solid var(--wf-border)",
              borderRadius: "var(--wf-radius-md)",
              padding: 16,
              display: "grid",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={labelStyle}>Excursion {i + 1}</span>
              <span style={{ flex: 1 }} />
              <SmallButton onClick={() => move(i, -1)} disabled={i === 0}>
                Up
              </SmallButton>
              <SmallButton onClick={() => move(i, 1)} disabled={i === rows.length - 1}>
                Down
              </SmallButton>
              <SmallButton onClick={() => setRows((rs) => rs.filter((x) => x.key !== r.key))} danger>
                Remove
              </SmallButton>
            </div>

            <div className="wf-form-grid" style={{ alignItems: "start" }}>
              <div style={{ display: "grid", gap: 8 }}>
                <span style={labelStyle}>Picture</span>
                {r.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.image}
                    alt=""
                    style={{
                      width: 220,
                      maxWidth: "100%",
                      height: 132,
                      objectFit: "cover",
                      borderRadius: "var(--wf-radius-md)",
                      border: "1px solid var(--wf-border)",
                    }}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const input = e.currentTarget;
                    const file = input.files?.[0];
                    if (!file) return;
                    if (file.size > 4 * 1024 * 1024 - 64 * 1024) {
                      update(r.key, { status: "That photo is larger than 4 MB. Please resize it." });
                      input.value = "";
                      return;
                    }
                    update(r.key, { status: "Uploading… wait for it to finish before saving." });
                    try {
                      const fd = new FormData();
                      fd.append("file", file);
                      update(r.key, { image: await uploadAdminImage(fd), status: "" });
                    } catch {
                      update(r.key, { status: "The photo could not be uploaded." });
                    }
                    input.value = "";
                  }}
                  style={{ ...inputStyle, padding: 8 }}
                />
                {r.status && <span role="status" style={{ fontSize: 13, color: "var(--wf-ink-700)" }}>{r.status}</span>}
              </div>
              <Input label="Price (per person)" value={r.price} placeholder="€90" onChange={(v) => update(r.key, { price: v })} />
            </div>

            <div className="wf-form-grid">
              <Input label="Photo label" value={r.label} placeholder="Day 4 · Luxor" onChange={(v) => update(r.key, { label: v })} />
              <Input label="Photo label (MK)" value={r.labelMk} placeholder="Ден 4 · Луксор" onChange={(v) => update(r.key, { labelMk: v })} />
              <Input label="Eyebrow" value={r.eyebrow} placeholder="A different perspective" onChange={(v) => update(r.key, { eyebrow: v })} />
              <Input label="Eyebrow (MK)" value={r.eyebrowMk} placeholder="Од една поинаква перспектива" onChange={(v) => update(r.key, { eyebrowMk: v })} />
              <Input label="Title" value={r.title} placeholder="Luxor from the air" onChange={(v) => update(r.key, { title: v })} />
              <Input label="Title (MK)" value={r.titleMk} placeholder="Луксор од воздух" onChange={(v) => update(r.key, { titleMk: v })} />
              <Input label="Text" value={r.body} multiline onChange={(v) => update(r.key, { body: v })} />
              <Input label="Text (MK)" value={r.bodyMk} multiline onChange={(v) => update(r.key, { bodyMk: v })} />
            </div>
          </div>
        ))}

        <div>
          <SmallButton onClick={() => setRows((rs) => [...rs, { ...EMPTY, key: newKey(), status: "" }])}>
            + Add excursion
          </SmallButton>
        </div>
      </div>
    </Field>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <label style={{ display: "grid", gap: 7 }}>
      <span style={labelStyle}>{label}</span>
      {multiline ? (
        <textarea rows={5} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} style={{ ...inputStyle, resize: "vertical" }} />
      ) : (
        <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      )}
    </label>
  );
}

function SmallButton({
  children,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "var(--wf-font-sans)",
        fontSize: 13,
        fontWeight: 600,
        color: danger ? "var(--wf-error)" : "var(--wf-ink-800)",
        background: "var(--wf-paper)",
        border: "1px solid var(--wf-border-strong)",
        borderRadius: "var(--wf-radius-md)",
        padding: "7px 12px",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {children}
    </button>
  );
}
