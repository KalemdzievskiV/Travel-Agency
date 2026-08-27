/**
 * Vectorises the section backdrop boards in `public/images/background/`.
 *
 * The client supplies these as 1366×768 PNGs — a laptop screen's worth of
 * pixels, where the set before them was 2048px wide — and then asked why the
 * white sections looked soft. At 1366px a board is upscaled on any desktop
 * page and doubled again on a 2× screen, and no amount of CSS fixes that.
 *
 * The drawings are smooth, flat-colour curves with no fine detail, which is
 * the one case where tracing is not a compromise: the SVG carries the same
 * geometry, rasterises at whatever size the band asks for, and comes out
 * roughly five times smaller than the PNG.
 *
 * `threshold` is the midpoint between a board's ink luminance and white, so
 * the traced stroke lands on the source's true edge rather than inside or
 * outside it. Measured as ink coverage weighted by distance from white, each
 * board's stroke weight comes out within 3% of the PNG's. If a new board
 * arrives in a new colour, read its ink off the file and set the threshold to
 * (ink luminance + 255) / 2 rather than guessing.
 *
 * Needs potrace, which is not a project dependency — this runs by hand when
 * new artwork lands, not as part of a build:
 *   npm install --no-save potrace
 *   node scripts/trace-backgrounds.mjs
 *
 * Re-trace rather than hand-editing the SVGs; the PNGs stay in the repo as the
 * source. If the client ever sends the real vector artwork, drop it in over
 * these and delete this step.
 */
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const potrace = require("potrace");

const DIR = "public/images/background";

/** ink: the board's stroke colour. threshold: (ink luminance + 255) / 2. */
const BOARDS = [
  { n: 1, ink: "#D4EAEE", threshold: 242 },
  { n: 2, ink: "#EDF6E1", threshold: 248 },
  { n: 3, ink: "#D4EAEE", threshold: 242 },
  { n: 4, ink: "#D4EAEE", threshold: 242 },
];

for (const board of BOARDS) {
  const svg = await new Promise((resolve, reject) =>
    potrace.trace(
      `${DIR}/${board.n}.png`,
      {
        threshold: board.threshold,
        color: board.ink,
        // Transparent, not white: the sections paint --wf-cream underneath, and
        // an opaque board would white out anything else they layer.
        background: "transparent",
        turdSize: 4, // drop specks left by the PNG's compression
        alphaMax: 1, // every curve here is smooth — no corners to preserve
        optCurve: true,
        optTolerance: 0.2,
      },
      (err, out) => (err ? reject(err) : resolve(out)),
    ),
  );

  writeFileSync(`${DIR}/${board.n}.svg`, svg);
  console.log(`${board.n}.svg — ${(svg.length / 1024).toFixed(1)}KB`);
}
