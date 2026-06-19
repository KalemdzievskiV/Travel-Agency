import { chromium } from "playwright";
import path from "node:path"; import { fileURLToPath } from "node:url";
const OUT = path.dirname(fileURLToPath(import.meta.url));
const URL = "http://localhost:3000/";
const b = await chromium.launch({ channel:"chrome", headless:true, args:["--no-sandbox","--hide-scrollbars"] });
async function shot(ctx, name, full){ const p=await ctx.newPage(); await p.goto(URL,{waitUntil:"networkidle",timeout:60000}); await p.evaluate(()=>document.fonts&&document.fonts.ready); await p.waitForTimeout(1000); await p.screenshot({path:path.join(OUT,name),type:"jpeg",quality:72,fullPage:!!full}); await ctx.close(); }
await shot(await b.newContext({viewport:{width:1440,height:900}}), "view-desktop-hero.jpg", false);
await shot(await b.newContext({viewport:{width:1440,height:900}}), "view-desktop-full.jpg", true);
await shot(await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}), "view-mobile-full.jpg", true);
await b.close(); console.log("light done");
