import { TextField, TextAreaField, CheckboxField, FormCard, Field } from "@/components/admin/ui";
import { SubmitButton, ImageField } from "@/components/admin/controls";
import { FilterTagPicker } from "@/components/admin/FilterTagPicker";
import type { FilterGroupWithOptions } from "@/lib/queries/filters";
import type { Destination, Region } from "@/db/schema";
import { saveDestination } from "./actions";

export function DestinationForm({
  destination,
  regions = [],
  filterGroups = [],
  selectedOptionIds = [],
}: {
  destination?: Destination;
  regions?: Region[];
  filterGroups?: FilterGroupWithOptions[];
  selectedOptionIds?: number[];
}) {
  const d = destination;
  return (
    <form action={saveDestination}>
      <FormCard>
        {d && <input type="hidden" name="id" value={d.id} />}

        <TextField label="Title" name="title" defaultValue={d?.title} required />
        <TextField
          label="Slug"
          name="slug"
          defaultValue={d?.slug}
          hint="Leave blank to generate from the title."
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Field label="Region">
            <select
              id="regionId"
              name="regionId"
              defaultValue={d?.regionId ?? ""}
              style={{
                width: "100%",
                fontFamily: "var(--wf-font-sans)",
                fontSize: 15,
                color: "var(--wf-ink-900)",
                background: "var(--wf-paper)",
                border: "1px solid var(--wf-border-strong)",
                borderRadius: "var(--wf-radius-md)",
                padding: "12px 14px",
              }}
            >
              <option value="">— None —</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </Field>
          <TextField label="Style (badge)" name="badge" defaultValue={d?.badge} placeholder="Lakeside" />
        </div>
        <TextField label="Teaser" name="teaser" defaultValue={d?.teaser} hint="One-line card summary." />
        <TextAreaField label="Intro" name="intro" defaultValue={d?.intro} rows={4} hint="Editorial guide to the place." />

        <TextAreaField label="When to go" name="whenToGo" defaultValue={d?.whenToGo} rows={3} hint="A short editorial note on the best season." />

        <TextAreaField label="Don't miss" name="highlights" defaultValue={d?.highlights.join("\n")} rows={4} hint="One per line." />
        <TextAreaField label="Best months" name="bestMonths" defaultValue={d?.bestMonths.join("\n")} rows={4} hint="One per line (e.g. May)." />

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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <TextField label="Title (MK)" name="titleMk" defaultValue={d?.titleMk ?? ""} placeholder="Египет" />
          <TextField label="Style / badge (MK)" name="badgeMk" defaultValue={d?.badgeMk ?? ""} />
        </div>
        <TextField label="Teaser (MK)" name="teaserMk" defaultValue={d?.teaserMk ?? ""} />
        <TextAreaField label="Intro (MK)" name="introMk" defaultValue={d?.introMk ?? ""} rows={4} />
        <TextAreaField label="When to go (MK)" name="whenToGoMk" defaultValue={d?.whenToGoMk ?? ""} rows={3} />
        <TextAreaField label="Don't miss (MK)" name="highlightsMk" defaultValue={(d?.highlightsMk ?? []).join("\n")} rows={4} hint="One per line." />

        <Field label="Filters" hint="Tag this destination so travellers can filter to it. Feeling tags also feed the trip finder.">
          <FilterTagPicker groups={filterGroups} selected={selectedOptionIds} />
        </Field>

        <ImageField currentUrl={d?.image} />
        <TextField label="Gradient (fallback)" name="grad" defaultValue={d?.grad} hint="CSS gradient shown when no image is set." />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "end" }}>
          <TextField label="Sort order" name="sortOrder" type="number" defaultValue={d?.sortOrder ?? 0} />
          <CheckboxField label="Published" name="published" defaultChecked={d ? d.published : true} />
        </div>

        <div>
          <SubmitButton>{d ? "Save changes" : "Create destination"}</SubmitButton>
        </div>
      </FormCard>
    </form>
  );
}
