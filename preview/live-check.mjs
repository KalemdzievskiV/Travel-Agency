import { chromium } from "playwright";
import path from "node:path"; import { fileURLToPath } from "node:url";
const OUT = path.dirname(fileURLToPath(import.meta.url));
const base = "https://bookit-liart-nine.vercel.app";
const b = await chromium.launch({ channel:"chrome", headless:true, args:["--no-sandbox","--hide-scrollbars"] });
const p = await (await b.newContext({viewport:{width:1280,height:900}})).newPage();
const resp = await p.goto(base+"/",{waitUntil:"networkidle",timeout:45000});
console.log("home status:", resp.status());
await p.waitForTimeout(800);
const html = await p.content();
console.log("has hero copy:", html.includes("Every journey starts"));
console.log("has a destination (Lake Ohrid):", html.includes("Lake Ohrid"));
await p.screenshot({path:path.join(OUT,"live-home.jpg"),type:"jpeg",quality:78});
// quick check of destinations + trips routes
for (const r of ["/destinations","/trips","/login"]) {
  const res = await p.goto(base+r,{waitUntil:"domcontentloaded",timeout:30000});
  console.log(`${r} -> ${res.status()}`);
}
await b.close();
