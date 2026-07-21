import { TextField, TextAreaField, CheckboxField, FormCard, Field } from "@/components/admin/ui";
import { SubmitButton, ImageField } from "@/components/admin/controls";
import type { HotelRow } from "@/db/schema";
import { saveHotel } from "./actions";

export function HotelForm({
  hotel,
  allDestinations,
}: {
  hotel?: HotelRow;
  allDestinations: { id: number; title: string }[];
}) {
  const h = hotel;
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
    <form action={saveHotel}>
      <FormCard>
        {h && <input type="hidden" name="id" value={h.id} />}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <TextField label="Name" name="name" defaultValue={h?.name} required placeholder="Amanzoe" />
          <TextField label="Slug" name="slug" defaultValue={h?.slug} hint="Leave blank to generate from the name." />
        </div>

        <Field label="Destination" hint="Which destination this stay belongs to.">
          <select name="destinationId" defaultValue={h?.destinationId ?? ""} style={selectStyle}>
            <option value="">— None —</option>
            {allDestinations.map((d) => (
              <option key={d.id} value={d.id}>{d.title}</option>
            ))}
          </select>
        </Field>

        <TextField label="Teaser" name="teaser" defaultValue={h?.teaser} hint="One-line card summary." />
        <TextAreaField label="Description" name="description" defaultValue={h?.description} rows={4} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          <TextField label="Price from" name="priceFrom" defaultValue={h?.priceFrom} placeholder="€600 / night" />
          <TextField label="Stars" name="stars" type="number" defaultValue={h?.stars ?? ""} placeholder="5" />
          <div />
        </div>
        <TextAreaField label="Style tags" name="style" defaultValue={h?.style.join("\n")} rows={3} hint="One per line, e.g. Beachfront, Boutique, Adults-only." />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <TextField label="Latitude" name="lat" defaultValue={h?.lat ?? ""} placeholder="37.30" hint="For maps. Decimal degrees." />
          <TextField label="Longitude" name="lng" defaultValue={h?.lng ?? ""} placeholder="23.16" />
        </div>

        <ImageField currentUrl={h?.image} />
        <TextAreaField label="Gallery images" name="images" defaultValue={h?.images.join("\n")} rows={4} hint="One image URL per line." />
        <TextField label="Gradient (fallback)" name="grad" defaultValue={h?.grad} hint="CSS gradient shown when no image is set." />

        <div
          style={{
            marginTop: 8,
            paddingTop: 20,
            borderTop: "1px solid var(--wf-border)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--wf-ink-500)",
          }}
        >
          Macedonian (leave blank to fall back to English)
        </div>
        <TextField label="Name (MK)" name="nameMk" defaultValue={h?.nameMk ?? ""} />
        <TextField label="Teaser (MK)" name="teaserMk" defaultValue={h?.teaserMk ?? ""} />
        <TextAreaField label="Description (MK)" name="descriptionMk" defaultValue={h?.descriptionMk ?? ""} rows={4} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "end" }}>
          <TextField label="Sort order" name="sortOrder" type="number" defaultValue={h?.sortOrder ?? 0} />
          <CheckboxField label="Published" name="published" defaultChecked={h ? h.published : true} />
        </div>
        <div>
          <SubmitButton>{h ? "Save changes" : "Create hotel"}</SubmitButton>
        </div>
      </FormCard>
    </form>
  );
}
