import Link from "next/link";
import { Button, Badge } from "@/components/ui";
import { PageHeader } from "./ui";
import { DeleteButton } from "./controls";

export type AdminListRow = {
  id: number;
  primary: string;
  secondary?: string;
  published?: boolean;
  editHref: string;
};

export function AdminList({
  title,
  newHref,
  newLabel,
  rows,
  deleteAction,
  emptyText = "Nothing here yet.",
}: {
  title: string;
  newHref: string;
  newLabel: string;
  rows: AdminListRow[];
  deleteAction: (formData: FormData) => void | Promise<void>;
  emptyText?: string;
}) {
  return (
    <div>
      <PageHeader
        title={title}
        action={
          <Link href={newHref} style={{ textDecoration: "none" }}>
            <Button size="sm">{newLabel}</Button>
          </Link>
        }
      />

      {rows.length === 0 ? (
        <p style={{ color: "var(--wf-ink-500)" }}>{emptyText}</p>
      ) : (
        <div
          style={{
            background: "var(--wf-paper)",
            border: "1px solid var(--wf-border)",
            borderRadius: "var(--wf-radius-md)",
            overflow: "hidden",
          }}
        >
          {rows.map((r, i) => (
            <div
              key={r.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "14px 18px",
                borderTop: i === 0 ? "none" : "1px solid var(--wf-divider)",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontWeight: 700,
                    color: "var(--wf-ink-900)",
                  }}
                >
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {r.primary}
                  </span>
                  {r.published === false && (
                    <Badge tone="warning">Draft</Badge>
                  )}
                </div>
                {r.secondary && (
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--wf-ink-500)",
                      marginTop: 2,
                    }}
                  >
                    {r.secondary}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 18, flex: "none" }}>
                <Link
                  href={r.editHref}
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--wf-ink-900)",
                    textDecoration: "none",
                  }}
                >
                  Edit
                </Link>
                <DeleteButton action={deleteAction} id={r.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
