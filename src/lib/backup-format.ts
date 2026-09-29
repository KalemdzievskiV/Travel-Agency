/**
 * The bookit backup file: a .zip holding `data.json` (every table, row for row)
 * and `images/*` (every uploaded image the data points at).
 *
 * Shared by the admin "Download backup" button (which builds the zip in the
 * browser) and `npm run db:restore` (which reads it on the new host). No
 * server-only imports here — this runs in both places.
 */

export const BACKUP_FORMAT = "bookit-backup";
export const BACKUP_VERSION = 1;

export type BackupData = {
  format: typeof BACKUP_FORMAT;
  version: typeof BACKUP_VERSION;
  createdAt: string;
  /** Where the database schema was when the backup was taken. */
  migrations: { count: number; lastCreatedAt: number | null };
  /** Table name → rows, as Postgres serialises them with `json_agg`. */
  tables: Record<string, Record<string, unknown>[]>;
  /** Original image URL → its path inside the zip. Filled in by the browser. */
  images: Record<string, string>;
  /** Images the data points at that could not be fetched when backing up. */
  missingImages: string[];
};

// Uploaded images live in Vercel Blob in production and in public/uploads in
// dev (see src/lib/uploads.ts). Anything else (e.g. picsum placeholders, the
// static /images/* shipped in the repo) is not ours to carry.
const IMAGE_URL =
  /https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\/[^\s"'<>)\\]+|(?<![\w/.:-])\/uploads\/[^\s"'<>)\\]+/g;

/** Every uploaded-image URL referenced anywhere in the tables. */
export function collectImageUrls(tables: BackupData["tables"]): string[] {
  const found = new Set<string>();
  const visit = (value: unknown) => {
    if (typeof value === "string") {
      for (const m of value.matchAll(IMAGE_URL)) found.add(m[0]);
    } else if (Array.isArray(value)) {
      value.forEach(visit);
    } else if (value && typeof value === "object") {
      Object.values(value).forEach(visit);
    }
  };
  visit(tables);
  return [...found].sort();
}

/** The path an image is stored under inside the zip, e.g. images/uploads/x.avif. */
export function zipPathFor(url: string, taken: Set<string>): string {
  const pathname = url.startsWith("/")
    ? url.slice(1)
    : new URL(url).pathname.slice(1);
  const base = `images/${decodeURIComponent(pathname)}`;
  let path = base;
  for (let i = 2; taken.has(path); i++) {
    path = base.replace(/(\.[^./]+)?$/, (ext) => `-${i}${ext}`);
  }
  taken.add(path);
  return path;
}
