/**
 * Rasterises the client's section backdrop boards to WebP.
 *
 * Revision 3.2 replaced the turquoise boards with four grey ones (D1–D4), sent
 * twice over: as 1920×1080 PNGs and as SVGs. The SVGs are the ones to use, but
 * not because they are vectors — they are Affinity exports whose line-work is a
 * dozen-odd PNG tiles placed 1:1 inside an 8000×4500 viewBox. That placement is
 * the point: the artwork's native detail sits at an 8000px scale, four times the
 * PNGs', which is what finally settles the "развлечена" complaint from 3.1.
 *
 * Shipping the SVGs as-is would mean 0.7–1.2 MB apiece of base64 (a third of it
 * pure encoding overhead) for a drawing that is 94% white. Rendered once at
 * 3840×2160 — beyond any band's width on a 2× screen — and encoded lossless,
 * each board comes out at 46–81 KB. Lossless, not quality-95: the ink is
 * #EFEFEF on #FFFFFF, a six-step difference that lossy chroma subsampling turns
 * into visible blocking.
 *
 * The sources live in `brand-source/backgrounds/`, not `public/` — nothing
 * should be able to request the megabyte version by accident.
 *
 * Needs no browser: sharp rasterises these through librsvg, and its output
 * matches headless Chrome's to within 2/255 on every pixel. Run by hand when
 * new artwork lands, not as part of a build:
 *   node scripts/render-backgrounds.mjs
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const SRC = "brand-source/backgrounds";
const OUT = "public/images/background";

/** 2× a 1920px band — past the point where any section can ask for more. */
const WIDTH = 3840;
const HEIGHT = 2160;

const BOARDS = [
  { from: "D1.svg", to: "d1.webp" },
  { from: "D2.svg", to: "d2.webp" },
  { from: "D3.svg", to: "d3.webp" },
  { from: "D4.svg", to: "d4.webp" },
];

for (const { from, to } of BOARDS) {
  const info = await sharp(`${SRC}/${from}`)
    // The boards are drawn on white but exported with a transparent ground;
    // flatten so the WebP carries the canvas rather than leaning on whatever
    // sits behind it.
    .resize(WIDTH, HEIGHT, { fit: "fill" })
    .flatten({ background: "#ffffff" })
    .webp({ lossless: true, effort: 6 })
    .toFile(`${OUT}/${to}`);
  console.log(`${from} → ${to}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
