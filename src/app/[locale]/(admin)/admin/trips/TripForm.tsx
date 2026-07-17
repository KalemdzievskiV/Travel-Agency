import { TextField, TextAreaField, CheckboxField, FormCard, Field } from "@/components/admin/ui";
import { SubmitButton, ImageField } from "@/components/admin/controls";
import { FilterTagPicker } from "@/components/admin/FilterTagPicker";
import type { FilterGroupWithOptions } from "@/lib/queries/filters";
import type { Trip } from "@/db/schema";
import { saveTrip } from "./actions";

export function TripForm({
  trip,
  allDestinations,
  selectedIds = [],
  filterGroups = [],
  selectedOptionIds = [],
}: {
  trip?: Trip;
  allDestinations: { id: number; title: string; region: string }[];
  selectedIds?: number[];
  filterGroups?: FilterGroupWithOptions[];
  selectedOptionIds?: number[];
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

        <Field label="Filters" hint="Tag this trip so travellers can filter to it. Feeling tags also feed the trip finder.">
          <FilterTagPicker groups={filterGroups} selected={selectedOptionIds} />
        </Field>

        <TextAreaField
          label="Itinerary"
          name="itinerary"
          defaultValue={t?.itinerary.join("\n")}
          rows={7}
          hint="One stop per line — 'Place | notes'. Coordinates are looked up automatically from the place name on save (type it like you'd search it, e.g. 'Cusco, Peru | The old Inca capital'). Optionally prefix a day label to show as-is, e.g. 'Days 1–5 Lima, Peru | ...' renders 'Days 1–5' (otherwise days auto-number). Saving may take a moment while it looks up new places; you can tweak the filled-in coordinates afterwards."
        />
        <TextAreaField
          label="Departures"
          name="departures"
          defaultValue={t?.departures.join("\n")}
          rows={3}
          hint="One departure date per line, e.g. '12 May 2026'."
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <TextAreaField label="What's included" name="included" defaultValue={t?.included.join("\n")} rows={5} hint="One item per line." />
          <TextAreaField label="What's not included" name="notIncluded" defaultValue={t?.notIncluded.join("\n")} rows={5} hint="One item per line." />
        </div>
        <TextAreaField label="Visa & entry notes" name="visaNotes" defaultValue={t?.visaNotes} rows={3} hint="Important notes, entry conditions, visa." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <TextAreaField label="Included (MK)" name="includedMk" defaultValue={(t?.includedMk ?? []).join("\n")} rows={5} />
          <TextAreaField label="Not included (MK)" name="notIncludedMk" defaultValue={(t?.notIncludedMk ?? []).join("\n")} rows={5} />
        </div>
        <TextAreaField label="Visa & entry notes (MK)" name="visaNotesMk" defaultValue={t?.visaNotesMk ?? ""} rows={3} />

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
        <TextAreaField
          label="Gallery images"
          name="images"
          defaultValue={t?.images.join("\n")}
          rows={5}
          hint="One image URL per line — shown in the trip's carousel. The hero image above stays the card image."
        />
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
