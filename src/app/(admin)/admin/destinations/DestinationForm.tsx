import { TextField, TextAreaField, CheckboxField, FormCard } from "@/components/admin/ui";
import { SubmitButton, ImageField } from "@/components/admin/controls";
import type { Destination } from "@/db/schema";
import { saveDestination } from "./actions";

export function DestinationForm({ destination }: { destination?: Destination }) {
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
          <TextField label="Region" name="region" defaultValue={d?.region} placeholder="North Macedonia" />
          <TextField label="Style (badge)" name="badge" defaultValue={d?.badge} placeholder="Lakeside" />
        </div>
        <TextField label="Teaser" name="teaser" defaultValue={d?.teaser} hint="One-line card summary." />
        <TextAreaField label="Intro" name="intro" defaultValue={d?.intro} rows={4} hint="Editorial guide to the place." />

        <TextAreaField label="When to go" name="whenToGo" defaultValue={d?.whenToGo} rows={3} hint="A short editorial note on the best season." />

        <TextAreaField label="Don't miss" name="highlights" defaultValue={d?.highlights.join("\n")} rows={4} hint="One per line." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <TextAreaField label="Best months" name="bestMonths" defaultValue={d?.bestMonths.join("\n")} rows={4} hint="One per line (e.g. May)." />
          <TextAreaField label="Feelings" name="feelings" defaultValue={d?.feelings.join("\n")} rows={4} hint="One per line." />
        </div>

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
