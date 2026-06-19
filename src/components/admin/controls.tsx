"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui";
import { Field, inputStyle } from "./ui";

export function SubmitButton({ children = "Save" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" size="md" disabled={pending}>
      {pending ? "Saving…" : children}
    </Button>
  );
}

export function DeleteButton({
  action,
  id,
  label = "Delete",
  confirmText = "Delete this item? This cannot be undone.",
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: number;
  label?: string;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
      style={{ display: "inline" }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        style={{
          fontFamily: "var(--wf-font-sans)",
          fontSize: 13,
          fontWeight: 500,
          color: "var(--wf-error)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {label}
      </button>
    </form>
  );
}

export function ImageField({
  name = "image",
  currentUrl,
}: {
  name?: string;
  currentUrl?: string | null;
}) {
  const [preview, setPreview] = React.useState<string | null>(currentUrl ?? null);

  return (
    <Field
      label="Image"
      htmlFor={name}
      hint="Upload to replace. Leave empty to keep the current image."
    >
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          style={{
            width: 220,
            height: 132,
            objectFit: "cover",
            borderRadius: "var(--wf-radius-md)",
            border: "1px solid var(--wf-border)",
            marginBottom: 8,
          }}
        />
      )}
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setPreview(file ? URL.createObjectURL(file) : currentUrl ?? null);
        }}
        style={{ ...inputStyle, padding: 8 }}
      />
    </Field>
  );
}
