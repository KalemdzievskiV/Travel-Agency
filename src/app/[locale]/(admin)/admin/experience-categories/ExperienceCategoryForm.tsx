import { TextField, TextAreaField, CheckboxField, FormCard } from "@/components/admin/ui";
import { SubmitButton, ImageField } from "@/components/admin/controls";
import type { ExperienceCategoryRow } from "@/db/schema";
import { saveExperienceCategory } from "./actions";

export function ExperienceCategoryForm({ category }: { category?: ExperienceCategoryRow }) {
  const c = category;
  return (
    <form action={saveExperienceCategory}>
      <FormCard>
        {c && <input type="hidden" name="id" value={c.id} />}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <TextField label="Title" name="title" defaultValue={c?.title} required placeholder="Families" />
          <TextField label="Slug" name="slug" defaultValue={c?.slug} hint="Leave blank to generate from the title." />
        </div>
        <TextField label="Subtitle" name="subtitle" defaultValue={c?.subtitle} placeholder="Luxury family travel, designed around you" />
        <TextAreaField label="Hero text" name="heroText" defaultValue={c?.heroText} rows={2} hint="Short intro shown at the top." />

        <TextAreaField label="Concept" name="concept" defaultValue={c?.concept} rows={6} hint="The main editorial copy." />
        <TextAreaField label="Our recommendations" name="recommendations" defaultValue={c?.recommendations} rows={5} />
        <TextAreaField
          label="FAQs"
          name="faqs"
          defaultValue={c?.faqs.join("\n")}
          rows={6}
          hint="One per line as 'Question | Answer'."
        />
        <TextField
          label="Trips tag (who option key)"
          name="whoOptionKey"
          defaultValue={c?.whoOptionKey}
          hint="The 'who' filter option key whose tagged trips fill the carousel (e.g. families). Blank falls back to recent trips."
        />

        <ImageField currentUrl={c?.image} />
        <TextField label="Gradient (fallback)" name="grad" defaultValue={c?.grad} hint="CSS gradient shown when no image is set." />

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
          <TextField label="Title (MK)" name="titleMk" defaultValue={c?.titleMk ?? ""} />
          <TextField label="Subtitle (MK)" name="subtitleMk" defaultValue={c?.subtitleMk ?? ""} />
        </div>
        <TextAreaField label="Hero text (MK)" name="heroTextMk" defaultValue={c?.heroTextMk ?? ""} rows={2} />
        <TextAreaField label="Concept (MK)" name="conceptMk" defaultValue={c?.conceptMk ?? ""} rows={6} />
        <TextAreaField label="Our recommendations (MK)" name="recommendationsMk" defaultValue={c?.recommendationsMk ?? ""} rows={5} />
        <TextAreaField label="FAQs (MK)" name="faqsMk" defaultValue={(c?.faqsMk ?? []).join("\n")} rows={6} hint="One per line as 'Question | Answer'." />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "end" }}>
          <TextField label="Sort order" name="sortOrder" type="number" defaultValue={c?.sortOrder ?? 0} />
          <CheckboxField label="Published" name="published" defaultChecked={c ? c.published : true} />
        </div>
        <div>
          <SubmitButton>{c ? "Save changes" : "Create category"}</SubmitButton>
        </div>
      </FormCard>
    </form>
  );
}
