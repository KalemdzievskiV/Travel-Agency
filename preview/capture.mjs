// Captures the bookit home page: desktop + mobile screenshots and a
// scroll-through video. Drives the system Google Chrome via Playwright.
// Usage: node preview/capture.mjs  (server must be running on :3000)
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const OUT = path.dirname(fileURLToPath(import.meta.url));
const URL = process.env.URL || "http://localhost:3000/";

const launch = {
  channel: "chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"],
};

async function settle(page) {
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  // Give fonts + background images a beat to paint.
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(1200);
}

async function easedScroll(page, ms = 6000) {
  await page.evaluate(async (duration) => {
    const max = document.body.scrollHeight - window.innerHeight;
    const start = performance.now();
    const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    await new Promise((resolve) => {
      function frame(now) {
        const t = Math.min(1, (now - start) / duration);
        window.scrollTo(0, max * ease(t));
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }, ms);
}

(async () => {
  const browser = await chromium.launch(launch);

  // ── Desktop stills ──────────────────────────────────────────
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const dp = await desktop.newPage();
  await settle(dp);
  await dp.screenshot({ path: path.join(OUT, "home-desktop-hero.png") });
  await dp.screenshot({ path: path.join(OUT, "home-desktop-full.png"), fullPage: true });
  await desktop.close();

  // ── Mobile stills (iPhone-ish) ──────────────────────────────
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const mp = await mobile.newPage();
  await settle(mp);
  await mp.screenshot({ path: path.join(OUT, "home-mobile-hero.png") });
  await mp.screenshot({ path: path.join(OUT, "home-mobile-full.png"), fullPage: true });
  await mobile.close();

  // ── Desktop scroll-through video ────────────────────────────
  const vid = await browser.newContext({
    viewport: { width: 1440, height: 810 },
    deviceScaleFactor: 1,
    recordVideo: { dir: OUT, size: { width: 1440, height: 810 } },
  });
  const vp = await vid.newPage();
  await settle(vp);
  await vp.waitForTimeout(1200); // hold on the hero
  await easedScroll(vp, 6500);
  await vp.waitForTimeout(800);
  const video = vp.video();
  await vid.close(); // flush video
  if (video) {
    const raw = await video.path();
    const fs = await import("node:fs/promises");
    await fs.rename(raw, path.join(OUT, "home-walkthrough.webm"));
  }

  await browser.close();
  console.log("done");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
