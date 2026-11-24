// npm run og
// Builds public/assets/og-preview.jpg (1200x630), the picture WhatsApp / Facebook show above the link,
// from the couple photo (public/assets/couple.*) and the names and date in src/config.js.
// Needs Chrome or Edge installed; set CHROME_PATH if it is somewhere unusual.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import INVITE from "../src/config.js";
import { archPath } from "../src/ornaments.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = path.join(root, "public", "assets");
const find = (name) => ["webp", "jpg", "jpeg", "png"].map((e) => path.join(assets, `${name}.${e}`)).find((f) => fs.existsSync(f));

// a close-up reads better in a small link thumbnail, so scripts/og-photo.jpg wins over the card photo
const closeUp = path.join(root, "scripts", "og-photo.jpg");
const photo = fs.existsSync(closeUp) ? closeUp : find("couple");
if (!photo) throw new Error("public/assets/couple.(webp|jpg|png) not found");
const damask = find("damask");

const browserPath =
  process.env.CHROME_PATH ||
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find((p) => fs.existsSync(p));
if (!browserPath) throw new Error("No Chrome or Edge found. Set CHROME_PATH to the browser executable.");

const C = INVITE;
const W = 1200, H = 630;
// WhatsApp often shows the link picture as a small SQUARE thumbnail cut from the middle of this
// 1200x630 image (x 285 to 915). So the couple sits whole inside that middle square, and the
// words only live in the two side columns, which show when the big preview is used.
const SAFE_L = (W - H) / 2, SAFE_R = SAFE_L + H; // 285 .. 915
const AW = 360, AH = 500, AX = (W - AW) / 2, AY = 104; // the photo, in the site's own cusped arch
const COL = 228; // width of each side column
const arch = archPath(AW, AH, { lobes: 3 });
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const url = (f) => pathToFileURL(f).href;
const [dd, mm, yy] = C.wedding.short.split(/\s*·\s*/);

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Cormorant+Garamond:ital,wght@1,500&family=Noto+Serif+Bengali:wght@700&family=Tiro+Bangla&display=block" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: ${W}px; height: ${H}px; overflow: hidden; position: relative;
    background: radial-gradient(ellipse 60% 95% at 50% 48%, #6b1120, #3a0610 64%, #1c0308); }
  .damask { position: absolute; inset: 0; ${damask ? `background: url("${url(damask)}") center / 520px auto;` : ""} opacity: .16; mix-blend-mode: soft-light; }
  .edge { position: absolute; inset: 18px; border: 1.5px solid rgba(224,189,114,.75); }
  .edge::before { content: ""; position: absolute; inset: 7px; border: 1px solid rgba(224,189,114,.35); }
  .glow { position: absolute; left: ${W / 2 - 340}px; top: ${AY + AH / 2 - 340}px; width: 680px; height: 680px;
    background: radial-gradient(circle, rgba(240,200,120,.24), transparent 62%); }
  svg.arch { position: absolute; left: ${AX - 40}px; top: ${AY - 60}px; overflow: visible; filter: drop-shadow(0 16px 26px rgba(0,0,0,.55)); }
  .col { position: absolute; top: 40px; bottom: 40px; width: ${COL}px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  .col--l { left: ${(SAFE_L - COL) / 2 + 8}px; }
  .col--r { right: ${(W - SAFE_R - COL) / 2 + 8}px; }
  .fit { white-space: nowrap; }
  .inv { font-family: "Tiro Bangla", serif; font-size: 22px; line-height: 1.5; color: #f6e3a8; opacity: .92; }
  .title { margin-top: 6px; font-family: "Noto Serif Bengali", serif; font-weight: 700; font-size: 96px; line-height: 1.3;
    background: linear-gradient(105deg, #8a6326 0%, #f6e3a8 24%, #c0964a 42%, #fff4d6 54%, #b4873c 70%, #e9cd88 86%, #7d5a20 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    filter: drop-shadow(0 3px 1px rgba(40,10,0,.6)) drop-shadow(0 12px 22px rgba(0,0,0,.55)); }
  .name { font-family: "Cinzel", serif; font-weight: 600; font-size: 46px; line-height: 1.15; letter-spacing: .04em; color: #f3dca0; text-shadow: 0 3px 14px rgba(0,0,0,.7); }
  .amp { font-family: "Cormorant Garamond", serif; font-style: italic; font-weight: 500; font-size: 46px; line-height: 1.1; color: #e0bd72; }
  .rule { margin: 20px 0 16px; width: 190px; height: 14px; position: relative; }
  .rule::before, .rule::after { content: ""; position: absolute; top: 6px; width: 80px; height: 1px; background: linear-gradient(90deg, transparent, #e0bd72); }
  .rule::before { left: 0; } .rule::after { right: 0; transform: scaleX(-1); }
  .rule b { position: absolute; left: 50%; top: 2px; width: 10px; height: 10px; margin-left: -5px; background: #e0bd72; transform: rotate(45deg); }
  .date { font-family: "Cinzel", serif; font-weight: 500; font-size: 30px; letter-spacing: .1em; color: #f6e3a8; }
  .city { margin-top: 6px; font-family: "Cinzel", serif; font-weight: 500; font-size: 20px; letter-spacing: .3em; color: #e0bd72; }
</style></head><body>
<div class="damask"></div><div class="edge"></div><div class="glow"></div>
<svg class="arch" width="${AW + 80}" height="${AH + 100}" viewBox="-40 -60 ${AW + 80} ${AH + 100}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8a6326"/><stop offset=".25" stop-color="#f6e3a8"/><stop offset=".45" stop-color="#c0964a"/>
      <stop offset=".6" stop-color="#fff4d6"/><stop offset=".8" stop-color="#b4873c"/><stop offset="1" stop-color="#7d5a20"/>
    </linearGradient>
    <clipPath id="c"><path d="${arch}"/></clipPath>
  </defs>
  <image href="${url(photo)}" x="-30" y="-10" width="${AW + 60}" height="${AH + 20}" preserveAspectRatio="xMidYMin slice" clip-path="url(#c)"/>
  <path d="${arch}" fill="none" stroke="#3a2105" stroke-width="17"/>
  <path d="${arch}" fill="none" stroke="url(#g)" stroke-width="13"/>
  <path d="${arch}" fill="none" stroke="#5e0f1d" stroke-width="5"/>
  <path d="${arch}" fill="none" stroke="url(#g)" stroke-width="2"/>
  <g transform="translate(${AW / 2} -6)">
    <path d="M0 -44 C7 -30 12 -14 0 0 C-12 -14 -7 -30 0 -44Z" fill="url(#g)" stroke="#3a2105"/>
    <circle cy="-52" r="6" fill="url(#g)" stroke="#3a2105"/>
  </g>
</svg>
<div class="col col--l">
  <p class="inv">শ্রী শ্রী<br>প্রজাপতয়ে নমঃ</p>
  <h1 class="title fit">শুভ</h1>
  <h1 class="title fit" style="margin-top:-18px">বিবাহ</h1>
</div>
<div class="col col--r">
  <p class="name fit">${esc(C.couple.bride.first)}</p>
  <p class="amp">&amp;</p>
  <p class="name fit">${esc(C.couple.groom.first)}</p>
  <div class="rule"><b></b></div>
  <p class="date fit">${esc([dd, mm, yy].filter(Boolean).join(" · "))}</p>
  <p class="city fit">${esc(C.wedding.city.toUpperCase())}</p>
</div>
<script>
  // long names or dates shrink to fit their column, so nothing ever spills into the photo square
  document.fonts.ready.then(() => {
    document.querySelectorAll(".fit").forEach((el) => {
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > ${COL} && size > 14) el.style.fontSize = (size -= 1) + "px";
    });
    document.body.dataset.fitted = "1";
  });
</script>
</body></html>`;

const tmp = path.join(root, "scripts", ".og.html");
fs.writeFileSync(tmp, html);
const browser = await puppeteer.launch({ executablePath: browserPath, headless: true, args: ["--allow-file-access-from-files"] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => document.body.dataset.fitted === "1");
  const out = path.join(assets, "og-preview.jpg");
  await page.screenshot({ path: out, type: "jpeg", quality: 86 });
  console.log(`wrote ${path.relative(root, out)} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
} finally {
  await browser.close();
  fs.rmSync(tmp, { force: true });
}
