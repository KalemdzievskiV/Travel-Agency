import { TextField, TextAreaField, CheckboxField, FormCard } from "@/components/admin/ui";
import { SubmitButton, ImageField } from "@/components/admin/controls";
import type { Experience } from "@/db/schema";
import { saveExperience } from "./actions";

export function ExperienceForm({ experience }: { experience?: Experience }) {
  const e = experience;
  return (
    <form action={saveExperience}>
      <FormCard>
        {e && <input type="hidden" name="id" value={e.id} />}
        <TextField label="Title" name="title" defaultValue={e?.title} required />
        <TextField
          label="Slug"
          name="slug"
          defaultValue={e?.slug}
          hint="Leave blank to generate from the title."
        />
        <TextField label="Eyebrow" name="eyebrow" defaultValue={e?.eyebrow} placeholder="By Feeling" />
        <TextAreaField label="Body" name="body" defaultValue={e?.body} rows={3} />
        <ImageField currentUrl={e?.image} />
        <TextField label="Gradient (fallback)" name="grad" defaultValue={e?.grad} hint="CSS gradient shown when no image is set." />
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
