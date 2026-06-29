// Records a slow scroll-through of /about to verify the parallax + statement
// reveal motion, and captures a mid-statement frame. Drives system Chrome.
// Usage: node preview/about-motion.mjs   (dev server on :3000)
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const OUT = path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE || "http://localhost:3000";

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"],
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 860 },
  recordVideo: { dir: OUT, size: { width: 1440, height: 860 } },
});
const page = await ctx.newPage();
await page.goto(BASE + "/about", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(600);

// Eased slow scroll to the bottom (so parallax + scrub reveals play).
await page.evaluate(async () => {
  const max = document.body.scrollHeight - window.innerHeight;
  const start = performance.now();
  const dur = 7000;
  const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
  await new Promise((res) => {
    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      window.scrollTo(0, max * ease(t));
      if (t < 1) requestAnimationFrame(frame);
      else res();
    }
    requestAnimationFrame(frame);
  });
});
await page.waitForTimeout(500);

// Capture a frame with the purpose statement fully revealed: position the ink
// band so it has scrolled past its reveal range.
const band = await page.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find((s) =>
    /move people through/i.test(s.textContent || "")
  );
  if (!el) return null;
  const top = el.getBoundingClientRect().top + window.scrollY;
  return top;
});
if (band != null) {
  // Scroll so the band centre sits in the upper viewport (past 0.55 end offset).
  await page.evaluate((top) => window.scrollTo(0, top - 40), band);
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(OUT, "about-purpose-revealed.jpg"),
    quality: 85,
    type: "jpeg",
  });
}

await page.close();
const video = await page.video();
const vpath = video ? await video.path() : null;
await ctx.close();
await browser.close();

if (vpath) {
  const dest = path.join(OUT, "about-scroll.webm");
  const { renameSync } = await import("node:fs");
  renameSync(vpath, dest);
  console.log("video:", dest);
}
console.log("done");
