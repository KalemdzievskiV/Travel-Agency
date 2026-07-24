import { TextField, CheckboxField, FormCard } from "@/components/admin/ui";
import { SubmitButton, ImageField } from "@/components/admin/controls";
import type { Region } from "@/db/schema";
import { saveRegion } from "./actions";

export function RegionForm({ region }: { region?: Region }) {
  const r = region;
  return (
    <form action={saveRegion}>
      <FormCard>
        {r && <input type="hidden" name="id" value={r.id} />}
        <TextField label="Label" name="label" defaultValue={r?.label} required placeholder="Africa" />
        <TextField label="Label (Macedonian)" name="labelMk" defaultValue={r?.labelMk ?? ""} placeholder="Африка" />
        <TextField
          label="Slug"
          name="slug"
          defaultValue={r?.slug}
          hint="Leave blank to generate from the label."
        />
        <ImageField
          currentUrl={r?.image}
          label="Masthead image"
          hint="Landscape. Heads the region page. Upload to replace; leave empty to keep the current one."
        />
        <ImageField
          name="menuImage"
          currentUrl={r?.menuImage}
          label="Mega-menu image"
          ratio="portrait"
          hint="Portrait (roughly 3:4). Shown beside the country list in the Destinations menu — leave empty and the menu simply drops the image."
        />
        <TextField label="Gradient (fallback)" name="grad" defaultValue={r?.grad} hint="CSS gradient shown when no image is set." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "end" }}>
          <TextField label="Sort order" name="sortOrder" type="number" defaultValue={r?.sortOrder ?? 0} />
          <CheckboxField label="Published" name="published" defaultChecked={r ? r.published : true} />
        </div>
        <div>
          <SubmitButton>{r ? "Save changes" : "Create region"}</SubmitButton>
        </div>
      </FormCard>
    </form>
  );
}
