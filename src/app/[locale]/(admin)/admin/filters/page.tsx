import { PageHeader, FormCard, TextField, CheckboxField } from "@/components/admin/ui";
import { SubmitButton, DeleteButton } from "@/components/admin/controls";
import { getAllFilterGroups } from "@/lib/queries/filters";
import {
  createGroup,
  updateGroup,
  deleteGroup,
  createOption,
  updateOption,
  deleteOption,
} from "./actions";

export default async function AdminFiltersPage() {
  const groups = await getAllFilterGroups();

  return (
    <div>
      <PageHeader title="Filters" />
      <p style={{ color: "var(--wf-ink-500)", margin: "0 0 24px", maxWidth: 640 }}>
        Manage the facets travellers filter trips and destinations by. Add a group (e.g. Who,
        Experience) and options within it, then tag trips/destinations on their edit pages.
        Duration and Price per person are derived automatically from each trip and don&rsquo;t
        need a group here.
      </p>
      <p style={{ color: "var(--wf-ink-500)", margin: "0 0 24px", maxWidth: 640 }}>
        The <strong>Feeling</strong> group is the trip finder&rsquo;s &ldquo;Што ти недостасува?&rdquo;
        dropdown: its options, names and order are what visitors see. Rename an option here
        rather than deleting and re-adding it &mdash; deleting removes it from every trip tagged
        with it.
      </p>

      {/* New group */}
      <FormCard>
        <form
          action={createGroup}
          style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 0.7fr auto", gap: 14, alignItems: "end" }}
        >
          <TextField label="New group" name="label" required placeholder="e.g. Who" />
          <TextField label="Key" name="key" hint="Auto from label if blank." />
          <TextField label="Sort" name="sortOrder" type="number" defaultValue={groups.length} />
          <SubmitButton>Add group</SubmitButton>
        </form>
      </FormCard>

      <div style={{ display: "grid", gap: 20, marginTop: 20 }}>
        {groups.map((g) => (
          <FormCard key={g.id}>
            {/* Group header */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 14, flexWrap: "wrap" }}>
              <form
                action={updateGroup}
                style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr auto auto", gap: 14, alignItems: "end", flex: 1, minWidth: 320 }}
              >
                <input type="hidden" name="id" value={g.id} />
                <TextField label={`Group · ${g.key}`} name="label" defaultValue={g.label} required />
                <TextField label="Sort" name="sortOrder" type="number" defaultValue={g.sortOrder} />
                <CheckboxField label="Published" name="published" defaultChecked={g.published} />
                <SubmitButton>Save</SubmitButton>
              </form>
              <DeleteButton action={deleteGroup} id={g.id} label="Delete group" />
            </div>

            {/* Options */}
            <div style={{ marginTop: 18, display: "grid", gap: 8 }}>
              {g.options.length === 0 ? (
                <p style={{ color: "var(--wf-ink-400)", fontSize: 14, margin: 0 }}>No options yet.</p>
              ) : (
                g.options.map((o) => (
                  <div
                    key={o.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 12,
                      padding: "10px 12px",
                      background: "var(--wf-cream)",
                      borderRadius: "var(--wf-radius-md)",
                    }}
                  >
                    <form
                      action={updateOption}
                      style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 0.5fr auto", gap: 12, alignItems: "end", flex: 1, minWidth: 0 }}
                    >
                      <input type="hidden" name="id" value={o.id} />
                      <TextField label={`Name (MK) · ${o.key}`} name="labelMk" defaultValue={o.labelMk} placeholder={o.label} />
                      <TextField label="Name (EN)" name="label" defaultValue={o.label} required />
                      <TextField label="Sort" name="sortOrder" type="number" defaultValue={o.sortOrder} />
                      <SubmitButton>Save</SubmitButton>
                    </form>
                    <DeleteButton action={deleteOption} id={o.id} />
                  </div>
                ))
              )}
            </div>

            {/* Add option */}
            <form
              action={createOption}
              style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1fr 0.5fr auto", gap: 14, alignItems: "end", marginTop: 14 }}
            >
              <input type="hidden" name="groupId" value={g.id} />
              <TextField label="New option (EN)" name="label" required placeholder="e.g. Couples" />
              <TextField label="Name (MK)" name="labelMk" placeholder="e.g. Парови" />
              <TextField label="Key" name="key" hint="Auto from EN name if blank. Can't be changed later." />
              <TextField label="Sort" name="sortOrder" type="number" defaultValue={g.options.length} />
              <SubmitButton>Add option</SubmitButton>
            </form>
          </FormCard>
        ))}
      </div>
    </div>
  );
}
