"use client";

import React from "react";
import { uploadAdminImage } from "@/app/[locale]/(admin)/actions";
import { Field, inputStyle } from "./ui";

// Just under the Server Action body cap (next.config.ts), which each single
// upload still has to fit through.
const MAX_BYTES = 4 * 1024 * 1024 - 64 * 1024;

/**
 * A gallery of image URLs, posted as one newline-separated field (`name`), so
 * the save action reads it exactly as it read the old textarea. Photos picked
 * from the device upload straight away, one request each, and join the list
 * when they finish; the list can be reordered and trimmed, and a URL can still
 * be pasted in.
 */
export function GalleryField({
  name = "images",
  label = "Gallery images",
  hint,
  initial = [],
}: {
  name?: string;
  label?: string;
  hint?: string;
  initial?: string[];
}) {
  const [urls, setUrls] = React.useState<string[]>(initial);
  const [busy, setBusy] = React.useState<{ done: number; total: number } | null>(null);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [pasted, setPasted] = React.useState("");
  const fileRef = React.useRef<HTMLInputElement>(null);

  async function onFiles(files: FileList | null) {
    const list = Array.from(files ?? []);
    if (!list.length) return;
    const errs: string[] = [];
    setBusy({ done: 0, total: list.length });
    // One at a time: keeps each request small and the order as picked.
    for (let k = 0; k < list.length; k++) {
      const file = list[k];
      if (file.size > MAX_BYTES) {
        errs.push(`${file.name} is larger than 4 MB. Please resize it and try again.`);
      } else {
        try {
          const fd = new FormData();
          fd.append("file", file);
          const url = await uploadAdminImage(fd);
          setUrls((u) => [...u, url]);
        } catch {
          errs.push(`${file.name} could not be uploaded.`);
        }
      }
      setBusy({ done: k + 1, total: list.length });
    }
    setBusy(null);
    setErrors(errs);
    if (fileRef.current) fileRef.current.value = "";
  }

  const move = (i: number, d: -1 | 1) =>
    setUrls((u) => {
      const j = i + d;
      if (j < 0 || j >= u.length) return u;
      const next = u.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  function addPasted() {
    const add = pasted.split(/\s+/).map((s) => s.trim()).filter(Boolean);
    if (add.length) setUrls((u) => [...u, ...add]);
    setPasted("");
  }

  return (
    <Field label={label} hint={hint}>
      <input type="hidden" name={name} value={urls.join("\n")} />

      {urls.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
          {urls.map((u, i) => (
            <div
              key={`${u}-${i}`}
              style={{ border: "1px solid var(--wf-border)", borderRadius: "var(--wf-radius-md)", overflow: "hidden", background: "var(--wf-paper)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u} alt="" style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover", background: "var(--wf-sand)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 4, padding: 6 }}>
                <span style={{ fontSize: 12, color: "var(--wf-ink-500)", marginRight: "auto", paddingLeft: 4 }}>{i + 1}</span>
                <IconButton label="Move earlier" onClick={() => move(i, -1)} disabled={i === 0}>←</IconButton>
                <IconButton label="Move later" onClick={() => move(i, 1)} disabled={i === urls.length - 1}>→</IconButton>
                <IconButton label="Remove" onClick={() => setUrls((x) => x.filter((_, k) => k !== i))} danger>×</IconButton>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
        <label
          style={{
            fontFamily: "var(--wf-font-sans)",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--wf-ink-900)",
            background: "var(--wf-paper)",
            border: "1px solid var(--wf-border-strong)",
            borderRadius: "var(--wf-radius-md)",
            padding: "9px 14px",
            cursor: busy ? "default" : "pointer",
            opacity: busy ? 0.5 : 1,
          }}
        >
          Upload photos
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            disabled={!!busy}
            onChange={(e) => onFiles(e.target.files)}
            style={{ display: "none" }}
          />
        </label>
        {busy && (
          <span role="status" style={{ fontSize: 13, color: "var(--wf-ink-700)" }}>
            Uploading {Math.min(busy.done + 1, busy.total)} of {busy.total}… wait for it to finish before saving.
          </span>
        )}
      </div>

      {errors.length > 0 && (
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "var(--wf-error)" }}>
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={pasted}
          onChange={(e) => setPasted(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addPasted();
            }
          }}
          placeholder="…or paste an image URL"
          style={inputStyle}
        />
        <IconButton label="Add URL" onClick={addPasted} wide>
          Add
        </IconButton>
      </div>
    </Field>
  );
}

function IconButton({
  children,
  label,
  onClick,
  disabled,
  danger,
  wide,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      style={{
        minWidth: wide ? 64 : 30,
        height: wide ? "auto" : 30,
        fontFamily: "var(--wf-font-sans)",
        fontSize: wide ? 14 : 15,
        fontWeight: 600,
        color: danger ? "var(--wf-error)" : "var(--wf-ink-800)",
        background: "var(--wf-paper)",
        border: "1px solid var(--wf-border-strong)",
        borderRadius: "var(--wf-radius-md)",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.35 : 1,
      }}
    >
      {children}
    </button>
  );
}
