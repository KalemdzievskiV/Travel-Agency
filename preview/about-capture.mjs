// Captures the new About section: full-page desktop + 375px mobile shots for
// each page, plus the desktop mega-menu open. Drives system Chrome via Playwright.
// Usage: node preview/about-capture.mjs   (dev server must be on :3000)
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const OUT = path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE || "http://localhost:3000";

const launch = {
  channel: "chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"],
};

const pages = [
  ["about", "/about"],
  ["5-reasons", "/about/5-reasons"],
  ["why-not-diy", "/about/why-not-diy"],
  ["how-it-works", "/about/how-it-works"],
  ["team", "/about/team"],
  ["testimonials", "/about/testimonials"],
];

async function settle(page, url) {
  await page.goto(BASE + url, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  // Reveals are once:true scroll-triggered. Playwright's fullPage capture renders
  // beyond the viewport WITHOUT scrolling, so step through the page first to fire
  // every IntersectionObserver; the reveals then stay visible at scroll 0.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    const max = document.body.scrollHeight;
    for (let y = 0; y <= max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
}

const browser = await chromium.launch(launch);

// Desktop
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (const [name, url] of pages) {
  const page = await desktop.newPage();
  await settle(page, url);
  await page.screenshot({ path: path.join(OUT, `about-${name}-desktop.jpg`), fullPage: true, quality: 80, type: "jpeg" });
  await page.close();
  console.log("desktop", name, "ok");
}

// Mega-menu open (hover the About nav item) — needs a scrolled, solid header on a non-home page
{
  const page = await desktop.newPage();
  await page.goto(BASE + "/about", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.hover(".wf-megamenu");
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, "about-megamenu-desktop.jpg"), quality: 82, type: "jpeg", clip: { x: 0, y: 0, width: 1440, height: 460 } });
  await page.close();
  console.log("megamenu ok");
}
await desktop.close();

// Mobile 375
const mobile = await browser.newContext({ viewport: { width: 375, height: 760 }, deviceScaleFactor: 2 });
for (const [name, url] of pages) {
  const page = await mobile.newPage();
  await settle(page, url);
  // horizontal-scroll check
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  await page.screenshot({ path: path.join(OUT, `about-${name}-mobile.jpg`), fullPage: true, quality: 78, type: "jpeg" });
  await page.close();
  console.log("mobile", name, overflow ? "OVERFLOW!" : "ok (no h-scroll)");
}

// Mobile mega-menu (open hamburger + About accordion)
{
  const page = await mobile.newPage();
  await page.goto(BASE + "/about", { waitUntil: "networkidle" });
  await page.click(".wf-nav-toggle");
  await page.waitForTimeout(300);
  await page.click(".wf-mobile-about__toggle");
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, "about-megamenu-mobile.jpg"), quality: 82, type: "jpeg" });
  await page.close();
  console.log("mobile megamenu ok");
}
await mobile.close();

await browser.close();
console.log("done");
