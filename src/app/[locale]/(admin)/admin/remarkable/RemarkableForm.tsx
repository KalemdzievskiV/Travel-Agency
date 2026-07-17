import { TextField, TextAreaField, CheckboxField, FormCard, Field } from "@/components/admin/ui";
import { SubmitButton, ImageField } from "@/components/admin/controls";
import type { RemarkableExperienceRow } from "@/db/schema";
import { saveRemarkable } from "./actions";

export function RemarkableForm({
  experience,
  allTrips,
}: {
  experience?: RemarkableExperienceRow;
  allTrips: { id: number; title: string }[];
}) {
  const e = experience;
  const selectStyle = {
    width: "100%",
    fontFamily: "var(--wf-font-sans)",
    fontSize: 15,
    color: "var(--wf-ink-900)",
    background: "var(--wf-paper)",
    border: "1px solid var(--wf-border-strong)",
    borderRadius: "var(--wf-radius-md)",
    padding: "10px 12px",
  } as const;

  return (
    <form action={saveRemarkable}>
      <FormCard>
        {e && <input type="hidden" name="id" value={e.id} />}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <TextField label="Title" name="title" defaultValue={e?.title} required placeholder="Dine on a private island" />
          <TextField label="Slug" name="slug" defaultValue={e?.slug} hint="Leave blank to generate from the title." />
        </div>

        <Field label="Linked trip" hint="The trip this experience showcases — the card links to it.">
          <select name="tripId" defaultValue={e?.tripId ?? ""} style={selectStyle}>
            <option value="">— None —</option>
            {allTrips.map((t) => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </Field>

        <TextField label="Teaser" name="teaser" defaultValue={e?.teaser} hint="One-line card summary." />
        <TextAreaField label="Description" name="description" defaultValue={e?.description} rows={4} />

        <ImageField currentUrl={e?.image} />
        <TextField label="Gradient (fallback)" name="grad" defaultValue={e?.grad} hint="CSS gradient shown when no image is set." />

        <div
          style={{
            marginTop: 8,
            paddingTop: 20,
            borderTop: "1px solid var(--wf-border)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--wf-ink-500)",
          }}
        >
          Macedonian (leave blank to fall back to English)
        </div>
        <TextField label="Title (MK)" name="titleMk" defaultValue={e?.titleMk ?? ""} />
        <TextField label="Teaser (MK)" name="teaserMk" defaultValue={e?.teaserMk ?? ""} />
        <TextAreaField label="Description (MK)" name="descriptionMk" defaultValue={e?.descriptionMk ?? ""} rows={4} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "end" }}>
          <TextField label="Sort order" name="sortOrder" type="number" defaultValue={e?.sortOrder ?? 0} />
          <CheckboxField label="Published" name="published" defaultChecked={e ? e.published : true} />
        </div>
        <div>
          <SubmitButton>{e ? "Save changes" : "Create experience"}</SubmitButton>
        </div>
      </FormCard>
    </form>
  );
}
