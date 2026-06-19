import { chromium } from "playwright";
import path from "node:path"; import { fileURLToPath } from "node:url";
const OUT = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(OUT, "..");
const base = "http://localhost:3000";
const b = await chromium.launch({ channel:"chrome", headless:true, args:["--no-sandbox","--hide-scrollbars"] });
const p = await (await b.newContext({ viewport:{width:1280,height:900} })).newPage();

await p.goto(base+"/login",{waitUntil:"networkidle"});
await p.fill('input[name="email"]','admin@bookit.mk');
await p.fill('input[name="password"]','bookit-admin-2026');
await Promise.all([ p.waitForURL('**/admin',{timeout:20000}), p.click('button:has-text("Sign in")') ]);

// create a destination via the form's own submit button
await p.goto(base+"/admin/destinations/new",{waitUntil:"networkidle"});
await p.fill('input[name="title"]','Kruševo');
await p.fill('input[name="region"]','North Macedonia');
await p.fill('input[name="teaser"]','Europe’s highest town, all mountain air and light.');
await p.fill('textarea[name="intro"]','A test destination created from the admin dashboard.');
await p.fill('input[name="priceFrom"]','€120 / night');
await p.fill('input[name="rating"]','4.6');
await p.fill('input[name="badge"]','Mountain');
await p.fill('input[name="duration"]','2–3 nights');
await p.fill('textarea[name="feelings"]','Freedom\nWonder');
await p.setInputFiles('input[name="image"]', path.join(ROOT,'public/images/mavrovo.jpg'));
await Promise.all([
  p.waitForURL('**/admin/destinations',{timeout:20000}),
  p.click('button:has-text("Create destination")'),
]);
await p.waitForLoadState("networkidle"); await p.waitForTimeout(400);
await p.screenshot({path:path.join(OUT,"crud-admin-list.jpg"),type:"jpeg",quality:75,fullPage:true});
console.log("ADMIN list has Kruševo:", (await p.content()).includes("Kruševo"));

// trip edit shows destination-linking UI
await p.goto(base+"/admin/trips",{waitUntil:"networkidle"});
await p.locator('a:has-text("Edit")').first().click();
await p.waitForLoadState("networkidle"); await p.waitForTimeout(300);
await p.screenshot({path:path.join(OUT,"crud-trip-edit.jpg"),type:"jpeg",quality:75,fullPage:true});

// public site reflects the new destination (revalidated)
await p.goto(base+"/destinations",{waitUntil:"networkidle"}); await p.waitForTimeout(500);
console.log("PUBLIC has Kruševo:", (await p.content()).includes("Kruševo"));
await p.screenshot({path:path.join(OUT,"crud-public-destinations.jpg"),type:"jpeg",quality:72,fullPage:true});
await b.close(); console.log("crud done");
