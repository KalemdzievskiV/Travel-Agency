// Captures the pinned 5-reasons scroller: a frame at each step (desktop) + the
// mobile stacked fallback. Drives system Chrome via Playwright.
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const OUT = path.dirname(fileURLToPath(import.meta.url));
const URL = (process.env.BASE || "http://localhost:3000") + "/about/5-reasons";

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"],
});

// Desktop — step through 5 reasons
const ctx = await browser.newContext({ viewport: { width: 1440, height: 860 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(1200); // let picsum images load

const N = 5;
const stepPx = await page.evaluate(() => window.innerHeight);
for (let i = 0; i < N; i++) {
  // Scroll into the middle of each reason's slice.
  const y = Math.round((i + 0.5) * stepPx);
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(1100);
  await page.screenshot({ path: path.join(OUT, `reasons-step-${i + 1}.jpg`), quality: 82, type: "jpeg" });
  console.log("desktop step", i + 1, "ok");
}
await ctx.close();

// Mobile — stacked fallback, full page + overflow check
const m = await browser.newContext({ viewport: { width: 375, height: 760 }, deviceScaleFactor: 2 });
const mp = await m.newPage();
await mp.goto(URL, { waitUntil: "networkidle" });
await mp.evaluate(() => document.fonts && document.fonts.ready);
await mp.waitForTimeout(1200);
const overflow = await mp.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
await mp.screenshot({ path: path.join(OUT, "reasons-mobile.jpg"), fullPage: true, quality: 78, type: "jpeg" });
console.log("mobile", overflow ? "OVERFLOW!" : "ok (no h-scroll)");
await m.close();

await browser.close();
console.log("done");
