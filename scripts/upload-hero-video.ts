/**
 * Uploads the home-page hero film to Vercel Blob and prints the URL to put in
 * NEXT_PUBLIC_HERO_VIDEO_URL.
 *
 *   npm run upload:hero                     # uploads public/videos/intro-hero.mp4
 *   npm run upload:hero -- path/to/cut.mp4  # or any other file
 *
 * Needs BLOB_READ_WRITE_TOKEN in .env.local (Vercel → Storage → Blob → Tokens).
 * The film deliberately stays out of git, so this is how a new cut reaches the
 * live site: upload, then update the env var in Vercel and redeploy.
 */
import { createReadStream, statSync } from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";

const DEFAULT_FILE = "public/videos/intro-hero.mp4";

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error(
      "BLOB_READ_WRITE_TOKEN is not set.\n" +
        "Get one from Vercel → Storage → Blob → Tokens, add it to .env.local, and re-run.",
    );
    process.exit(1);
  }

  const file = path.resolve(process.argv[2] ?? DEFAULT_FILE);

  let size: number;
  try {
    size = statSync(file).size;
  } catch {
    console.error(`No file at ${file}`);
    process.exit(1);
  }

  // Version the blob key so a new cut never silently replaces the live one —
  // the old URL keeps working until the env var is switched over.
  const stamp = new Date().toISOString().slice(0, 10);
  const key = `videos/${path.basename(file, path.extname(file))}-${stamp}${path.extname(file)}`;

  console.log(`Uploading ${file} (${(size / 1024 / 1024).toFixed(1)} MB) → ${key}`);

  const blob = await put(key, createReadStream(file), {
    access: "public",
    token,
    contentType: "video/mp4",
    multipart: true, // required past ~100MB, and more resilient below it
  });

  console.log("\nDone. Set this in Vercel → Settings → Environment Variables:\n");
  console.log(`  NEXT_PUBLIC_HERO_VIDEO_URL=${blob.url}\n`);
}

main().catch((err) => {
  console.error("Upload failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
