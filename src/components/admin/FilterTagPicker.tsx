import type { FilterGroupWithOptions } from "@/lib/queries/filters";

/**
 * FilterTagPicker — renders the taxonomy as grouped checkboxes named
 * `optionIds`, for tagging a trip or destination. Server-safe.
 */
export function FilterTagPicker({
  groups,
  selected,
}: {
  groups: FilterGroupWithOptions[];
  selected: number[];
}) {
  const sel = new Set(selected);

  if (groups.length === 0) {
    return (
      <p style={{ color: "var(--wf-ink-400)", fontSize: 14, margin: 0 }}>
        No filter groups yet — add some under Filters first.
      </p>
    );
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {groups.map((g) => (
        <div key={g.id}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--wf-ink-500)",
              marginBottom: 8,
            }}
          >
            {g.label}
          </div>
          {g.options.length === 0 ? (
            <span style={{ color: "var(--wf-ink-400)", fontSize: 13 }}>No options.</span>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {g.options.map((o) => (
                <label
                  key={o.id}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 12px",
                    border: "1px solid var(--wf-border-strong)",
                    borderRadius: "var(--wf-radius-pill)",
                    fontSize: 14,
                    color: "var(--wf-ink-800)",
                    cursor: "pointer",
                    background: "var(--wf-paper)",
                  }}
                >
                  <input
                    type="checkbox"
                    name="optionIds"
                    value={o.id}
                    defaultChecked={sel.has(o.id)}
                    style={{ accentColor: "var(--wf-coral-500)" }}
                  />
                  {o.label}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
