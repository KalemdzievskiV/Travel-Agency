import { TextField, TextAreaField, CheckboxField, FormCard } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/controls";
import type { Testimonial } from "@/db/schema";
import { saveTestimonial } from "./actions";

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const t = testimonial;
  return (
    <form action={saveTestimonial}>
      <FormCard>
        {t && <input type="hidden" name="id" value={t.id} />}
        <TextAreaField label="Quote" name="quote" defaultValue={t?.quote} rows={3} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <TextField label="Who" name="who" defaultValue={t?.who} placeholder="Brett" />
          <TextField label="Where" name="where" defaultValue={t?.where} placeholder="Lake Ohrid" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "end" }}>
          <TextField label="Sort order" name="sortOrder" type="number" defaultValue={t?.sortOrder ?? 0} />
          <CheckboxField label="Published" name="published" defaultChecked={t ? t.published : true} />
        </div>
        <div>
          <SubmitButton>{t ? "Save changes" : "Create testimonial"}</SubmitButton>
        </div>
      </FormCard>
    </form>
  );
}
