"use client";

import { useState } from "react";
import { strToU8, zip, type Zippable } from "fflate";
import { Button } from "@/components/ui";
import {
  collectImageUrls,
  zipPathFor,
  type BackupData,
} from "@/lib/backup-format";

type Status =
  | { kind: "idle" }
  | { kind: "working"; message: string }
  | { kind: "done"; message: string }
  | { kind: "error"; message: string };

// Images are fetched straight from Vercel Blob by the browser (it allows any
// origin), so the zip never passes through a Vercel Function or its body cap.
const CONCURRENCY = 4;

// Switched off for now; flip to true to let admins download backups again.
const BACKUP_ENABLED = false;

export function BackupPanel() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const working = status.kind === "working";

  async function download() {
    try {
      setStatus({ kind: "working", message: "Reading the database…" });
      const res = await fetch("/api/admin/backup", { cache: "no-store" });
      if (!res.ok) throw new Error(`The server answered ${res.status}.`);
      const data = (await res.json()) as BackupData;

      const urls = collectImageUrls(data.tables);
      const files: Zippable = {};
      const taken = new Set<string>();
      let done = 0;
      let bytes = 0;

      const queue = [...urls];
      const worker = async () => {
        for (let url = queue.shift(); url; url = queue.shift()) {
          try {
            const r = await fetch(url);
            if (!r.ok) throw new Error(String(r.status));
            const body = new Uint8Array(await r.arrayBuffer());
            const path = zipPathFor(url, taken);
            // Images are already compressed; storing them is faster and no bigger.
            files[path] = [body, { level: 0 }];
            data.images[url] = path;
            bytes += body.byteLength;
          } catch {
            data.missingImages.push(url);
          }
          done++;
          setStatus({
            kind: "working",
            message: `Fetching images ${done} of ${urls.length}…`,
          });
        }
      };
      await Promise.all(Array.from({ length: CONCURRENCY }, worker));

      setStatus({ kind: "working", message: "Packing the zip…" });
      files["data.json"] = strToU8(JSON.stringify(data, null, 2));
      const zipped = await new Promise<Uint8Array>((resolve, reject) =>
        zip(files, (err, out) => (err ? reject(err) : resolve(out))),
      );

      const stamp = data.createdAt.slice(0, 16).replace("T", "-").replace(":", "");
      const blobUrl = URL.createObjectURL(
        new Blob([zipped as BlobPart], { type: "application/zip" }),
      );
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `bookit-backup-${stamp}.zip`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10_000);

      const rows = Object.values(data.tables).reduce((n, t) => n + t.length, 0);
      const missing = data.missingImages.length
        ? ` ${data.missingImages.length} image(s) could not be fetched and are listed in data.json.`
        : "";
      setStatus({
        kind: "done",
        message: `Saved ${rows} rows and ${urls.length - data.missingImages.length} images (${(bytes / 1e6).toFixed(1)} MB).${missing}`,
      });
    } catch (e) {
      setStatus({
        kind: "error",
        message: `Backup failed: ${e instanceof Error ? e.message : String(e)}`,
      });
    }
  }

  return (
    <section
      style={{
        marginTop: 40,
        background: "var(--wf-paper)",
        border: "1px solid var(--wf-border)",
        borderRadius: "var(--wf-radius-md)",
        padding: "clamp(20px, 3vw, 28px)",
        boxShadow: "var(--wf-shadow-xs)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--wf-font-display)",
          fontWeight: 400,
          fontSize: "clamp(22px, 3vw, 26px)",
          margin: "0 0 8px",
        }}
      >
        Backup
      </h2>
      <p style={{ color: "var(--wf-ink-500)", margin: "0 0 20px", maxWidth: "62ch" }}>
        Download everything in the Studio (every destination, trip, hotel,
        filter and admin login, plus the uploaded images) as one .zip. Restore
        it on a new host with{" "}
        <code style={{ fontSize: "0.88em" }}>npm run db:restore</code>. Keep the file
        private: it contains login details.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <Button variant="dark" size="md" onClick={download} disabled={!BACKUP_ENABLED || working}>
          {working ? "Preparing…" : "Download backup"}
        </Button>
        {status.kind !== "idle" && (
          <span
            role="status"
            style={{
              fontSize: 14,
              color: status.kind === "error" ? "var(--wf-error)" : "var(--wf-ink-700)",
            }}
          >
            {status.message}
          </span>
        )}
      </div>
    </section>
  );
}
