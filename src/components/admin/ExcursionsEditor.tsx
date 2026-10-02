"use client";

import React from "react";
import type { TripExcursion } from "@/db/schema";
import { GalleryPicker } from "./GalleryField";
import { Field, inputStyle, labelStyle } from "./ui";

type Row = Omit<TripExcursion, "image" | "images"> & { images: string[]; key: string };

const EMPTY: Omit<Row, "key"> = {
  images: [],
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
 * Repeatable excursions (ФАКУЛТАТИВИ) for a trip: a few pictures per excursion
 * and the copy that goes with them. Everything travels to the action as one
 * JSON field (`excursions`). Photos upload the moment they're picked (one
 * request per photo, via GalleryPicker), so each row already holds its URLs by
 * save time; the first photo doubles as `image` for older readers.
 */
export function ExcursionsEditor({ initial = [] }: { initial?: TripExcursion[] }) {
  const [rows, setRows] = React.useState<Row[]>(() =>
    initial.map(({ image, images, ...x }) => ({
      ...EMPTY,
      ...x,
      images: images?.length ? images : image ? [image] : [],
      key: newKey(),
    })),
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
      return { ...x, image: r.images[0] ?? "" };
    }),
  );

  return (
    <Field
      label="Excursions (факултативи)"
      hint="Shown on the trip page as the “За ова ќе раскажуваш” slider, between the notes and the enquiry card. Each excursion has its own photos and text: the arrows step between excursions, the dots on the photo step through its pictures. The first photo is the cover. Leave empty to hide the section. Photos upload as soon as they're picked (max 4 MB each)."
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

            <div style={{ display: "grid", gap: 8 }}>
              <span style={labelStyle}>Pictures</span>
              <GalleryPicker
                urls={r.images}
                setUrls={(next) =>
                  setRows((rs) =>
                    rs.map((x) =>
                      x.key === r.key ? { ...x, images: typeof next === "function" ? next(x.images) : next } : x,
                    ),
                  )
                }
              />
            </div>

            <div className="wf-form-grid">
              <Input label="Price (per person)" value={r.price} placeholder="€90" onChange={(v) => update(r.key, { price: v })} />
              <div />
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
          <SmallButton onClick={() => setRows((rs) => [...rs, { ...EMPTY, key: newKey() }])}>
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
