import { TextField, TextAreaField, CheckboxField, FormCard, Field } from "@/components/admin/ui";
import { SubmitButton, ImageField } from "@/components/admin/controls";
import type { Trip } from "@/db/schema";
import { saveTrip } from "./actions";

export function TripForm({
  trip,
  allDestinations,
  selectedIds = [],
}: {
  trip?: Trip;
  allDestinations: { id: number; title: string; region: string }[];
  selectedIds?: number[];
}) {
  const t = trip;
  const selected = new Set(selectedIds);
  return (
    <form action={saveTrip}>
      <FormCard>
        {t && <input type="hidden" name="id" value={t.id} />}
        <TextField label="Title" name="title" defaultValue={t?.title} required />
        <TextField
          label="Slug"
          name="slug"
          defaultValue={t?.slug}
          hint="Leave blank to generate from the title."
        />
        <TextField label="Summary" name="summary" defaultValue={t?.summary} hint="One-line card summary." />
        <TextAreaField label="Description" name="description" defaultValue={t?.description} rows={4} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <TextField label="Duration (days)" name="durationDays" type="number" defaultValue={t?.durationDays ?? ""} />
          <TextField label="Price from" name="priceFrom" defaultValue={t?.priceFrom} placeholder="€2,400 per person" />
        </div>

        <TextAreaField label="Feelings" name="feelings" defaultValue={t?.feelings.join("\n")} rows={3} hint="One per line." />

        <Field label="Destinations" hint="Tick the destinations this trip visits.">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 8,
              border: "1px solid var(--wf-border)",
              borderRadius: "var(--wf-radius-md)",
              padding: 14,
            }}
          >
            {allDestinations.length === 0 && (
              <span style={{ fontSize: 13, color: "var(--wf-ink-400)" }}>
                No destinations yet.
              </span>
            )}
            {allDestinations.map((dest) => (
              <label
                key={dest.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  color: "var(--wf-ink-800)",
                }}
              >
                <input
                  type="checkbox"
                  name="destinationIds"
                  value={dest.id}
                  defaultChecked={selected.has(dest.id)}
                  style={{ width: 16, height: 16, accentColor: "var(--wf-coral-500)" }}
                />
                {dest.title}
              </label>
            ))}
          </div>
        </Field>

        <ImageField currentUrl={t?.image} />
        <TextField label="Gradient (fallback)" name="grad" defaultValue={t?.grad} hint="CSS gradient shown when no image is set." />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "end" }}>
          <TextField label="Sort order" name="sortOrder" type="number" defaultValue={t?.sortOrder ?? 0} />
          <CheckboxField label="Published" name="published" defaultChecked={t ? t.published : true} />
        </div>

        <div>
          <SubmitButton>{t ? "Save changes" : "Create trip"}</SubmitButton>
        </div>
      </FormCard>
    </form>
  );
}
