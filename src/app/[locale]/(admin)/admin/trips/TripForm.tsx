import { TextField, TextAreaField, CheckboxField, FormCard, Field } from "@/components/admin/ui";
import { SubmitButton, ImageField } from "@/components/admin/controls";
import { FilterTagPicker } from "@/components/admin/FilterTagPicker";
import { ExcursionsEditor } from "@/components/admin/ExcursionsEditor";
import { GalleryField } from "@/components/admin/GalleryField";
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
        <TextField label="Title (MK)" name="titleMk" defaultValue={t?.titleMk ?? ""} hint="Shown on the Macedonian site. Leave blank to use the English title." />
        <TextField label="Summary" name="summary" defaultValue={t?.summary} hint="One-line card summary." />
        <TextField label="Summary (MK)" name="summaryMk" defaultValue={t?.summaryMk ?? ""} hint="Shown on the Macedonian site. Leave blank to use the English summary." />
        <TextAreaField label="Intro" name="description" defaultValue={t?.description} rows={4} hint="The short opening paragraph on the trip page, above the gallery and the day-by-day programme." />
        <TextAreaField label="Intro (MK)" name="descriptionMk" defaultValue={t?.descriptionMk ?? ""} rows={4} hint="Shown on the Macedonian site. Leave blank to use the English intro." />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <TextField label="Duration (days)" name="durationDays" type="number" defaultValue={t?.durationDays ?? ""} />
          <TextField label="Price from" name="priceFrom" defaultValue={t?.priceFrom} placeholder="€2,400" />
        </div>

        <Field
          label="Sale"
          hint="Ticking the box swaps the sale price in for the normal one on the card and shows the ON SALE badge. Leave it unticked to stage a sale price before it goes live. Enter the amount only — the card adds “сега од” / “now from” in the reader's language."
        >
          <div style={{ display: "grid", gap: 14 }}>
            <CheckboxField label="On sale" name="onSale" defaultChecked={t?.onSale ?? false} />
            <TextField
              label="Sale price from"
              name="salePriceFrom"
              defaultValue={t?.salePriceFrom}
              placeholder="990 EUR"
              hint="Falls back to the normal price if this is empty."
            />
          </div>
        </Field>

        <Field label="Filters" hint="Tag this trip so travellers can filter to it. Feeling tags also feed the trip finder.">
          <FilterTagPicker groups={filterGroups} selected={selectedOptionIds} />
        </Field>

        <TextAreaField
          label="Itinerary (MK)"
          name="itineraryMk"
          defaultValue={(t?.itineraryMk ?? []).join("\n")}
          rows={7}
          hint="One stop per line: day(s), place, then a short description after a dash — e.g. 'Ден 1 - 3 Скопје - Краток опис за местото'. Leave out the day to continue from the line before. The map pin is looked up from the place name on save (this may take a moment); the line is then stored as 'Ден 1 - 3 Скопје | lat | lng | опис', and you can fix the coordinates there if a pin lands wrong. If this is empty, the Macedonian site uses the English itinerary."
        />
        <TextAreaField
          label="Itinerary (EN)"
          name="itinerary"
          defaultValue={t?.itinerary.join("\n")}
          rows={7}
          hint="Same format in English — e.g. 'Days 1 - 3 Skopje - A short description'. Optional: if empty, the English site uses the Macedonian itinerary (day labels still show in English)."
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
        <TextAreaField label="Visa & entry notes" name="visaNotes" defaultValue={t?.visaNotes} rows={5} hint="One row per line. Write 'Label | text' to show a label above it, e.g. 'Passport | Check its validity against the entry rules.'" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <TextAreaField label="Included (MK)" name="includedMk" defaultValue={(t?.includedMk ?? []).join("\n")} rows={5} />
          <TextAreaField label="Not included (MK)" name="notIncludedMk" defaultValue={(t?.notIncludedMk ?? []).join("\n")} rows={5} />
        </div>
        <TextAreaField label="Visa & entry notes (MK)" name="visaNotesMk" defaultValue={t?.visaNotesMk ?? ""} rows={5} hint="Same format, e.g. 'Пасош | Провери ја важноста според условите за влез на дестинацијата.'" />

        <ExcursionsEditor initial={t?.excursions ?? []} />

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
        <GalleryField
          initial={t?.images ?? []}
          hint="Shown in the trip's carousel, in this order. Pick several photos at once; each uploads as soon as it's chosen (max 4 MB each). The hero image above stays the card image."
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
