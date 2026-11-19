# Convert Biyer Card (red rose) to React, with no visible change

You are converting this site from plain HTML + CSS + JS (GSAP, ScrollTrigger, Lenis from a CDN) to a **React + Vite** app, in this same folder.

**The one rule: the finished React site must look and move exactly like the current site.** Every section, picture, word, colour, font size, scroll scene, pin, 3D move, petal, bell swing, curtain opening, scratch card, countdown flip and page turn stays the same. Same timings, same easings, same scroll lengths, same order. You are moving code into components, not redesigning, simplifying or "improving" any animation. If something is unclear, keep the old behaviour.

Read this whole file before you start. Work through the phases in order and stop at each **CHECKPOINT** to compare with the old site.

---

## 0. What the site is today (read these files first)

| File | What it holds | Lines |
| --- | --- | --- |
| `index.html` | All markup: SVG `<defs>` and `<symbol>`s, cursor, tap canvas, music button + `<audio>`, loader, gate, hero, 9 sections inside `<main>` | ~555 |
| `css/style.css` | All styling, desktop + phone (`@media (max-width: 760px)`) + `.is-lite` phone block at the end | ~1157 |
| `js/config.js` | `window.INVITE`: every name, date, text, event, gallery item, venue. The only file a family edits | ~180 |
| `js/ornaments.js` | `window.Ornaments`: draws cusped arches, bell strings and card edges into their boxes, redraws on resize | ~173 |
| `js/main.js` | Everything that moves, in numbered blocks 1 to 11 (see the comments `/* ===== N. ... */`) | ~1510 |
| `assets/` | Pictures (webp), videos (mp4), music (`bgm.mp3`), icons. `assets/_raw/` and `assets/raw_videos/` are originals, not in git | |

`main.js` blocks, in the order they run (this order matters, keep it):

1. Words and lists from config (fills `[data-k]`, builds the wedding-card pages, calendar, gallery, events, night list, splits names into letters)
2. Artwork: `findImage()` / `findVideo()` probe `assets/<name>.webp|.jpg|.jpeg|.png`, fill every `img[data-asset]`, set `--img-*` CSS variables and `has-*` classes on `<html>`
3. Petals canvas (`class Petals`)
4. Lenis smooth scroll (desktop only) + custom cursor
5. Hero: lights, parallax layers, golden names, hall video loop, gyro tilt
6. Gate (cover, tap to open, curtain video), music
7. Loader; 7b. "Everywhere": tap bursts, petals in the wind, bells on a spring, decorations following the pointer
8. Scroll scenes (`gsap.matchMedia`): decorations, strands, headings, bells, couple arches, **the envelope + wedding card pinned scene**, date arch + drapes, countdown flip-in, **gallery pinned coverflow**, event cards, night timeline, venue, closing
9. Gold scratch card (canvas)
10. Countdown
11. Share button

---

## 1. Rules (do not break these)

**Allowed to create or change**

| Path | Notes |
| --- | --- |
| `package.json`, `vite.config.js`, new root `index.html` (Vite entry) | Vite + React setup |
| `src/**` | All new React code |
| `public/assets/**` | `git mv assets public/assets` (keep every file name) |
| `public/favicon.ico` | move the root `favicon.ico` here |
| `legacy/**` | the old `index.html`, `css/`, `js/` moved here **only for side-by-side comparison**; deleted in Phase 5 |
| `README.md`, `.gitignore` | update run/deploy instructions, ignore `node_modules` and `dist` |

**Off limits**

- Do not change any number in an animation: durations, delays, eases, `start`/`end`, `scrub`, `pin`, `refreshPriority`, `stagger`, sizes, colours, z-indexes.
- Do not rewrite `style.css` into CSS modules, Tailwind, styled-components or inline styles. Import it once, globally, as it is. The only edit allowed in it is the asset path change in Phase 1.
- Do not replace GSAP with Framer Motion, React Spring, CSS transitions or anything else. Do not add CSS `transition`s or `@keyframes` that are not already there.
- Do not change text, copy, or the config values.
- Do not touch `assets/_raw/` or `assets/raw_videos/` (they stay out of git).
- Do not add music, sounds, analytics, or new libraries beyond the list below.
- Do not use React `<StrictMode>` (it runs effects twice and doubles every ScrollTrigger and canvas loop).

**Packages (exact versions)**

```
npm create vite@latest . -- --template react   (or set it up by hand if the folder is not empty)
npm i react@18.3.1 react-dom@18.3.1 gsap@3.13.0 @gsap/react@2.1.2 lenis@1.1.13
npm i -D vite@5.4.11 @vitejs/plugin-react@4.3.4
```

Same GSAP and Lenis versions as the CDN today, so the motion is identical.

---

## 2. Target structure

```
index.html                 Vite entry: the old <head> (meta, OG, favicons, Google Fonts link) + <div id="root"> + <script type="module" src="/src/main.jsx">
src/
  main.jsx                 createRoot(...).render(<App />)   (no StrictMode)
  App.jsx                  renders the components below in the old order, then starts the motion (see 4)
  styles/style.css         the old css/style.css, imported once in main.jsx
  config.js                export default INVITE  (the old window.INVITE object, unchanged; also set window.INVITE = INVITE)
  ornaments.js             the old ornaments.js as a module: export { archPath, mount }
  components/
    SvgDefs.jsx            the hidden <svg> with gradients, filters and every <symbol> (copy as is, JSX attribute names)
    Cursor.jsx  TapFx.jsx  MusicButton.jsx (+ <audio id="bgMusic">)  Loader.jsx  Gate.jsx
    Hero.jsx  Couple.jsx  LetterScene.jsx  DateSection.jsx  Countdown.jsx
    Gallery.jsx  Events.jsx  Night.jsx  Venue.jsx  Closing.jsx
  motion/
    words.js  artwork.js  petals.js  smooth.js  hero.js  gate.js  loader.js  everywhere.js
    scenes.js  weddingCard.js  scratch.js  countdown.js  share.js
    start.js               calls the modules above in the same order main.js runs them, passes shared state between them
public/
  assets/                  every picture, video, mp3, icon (same names)
  favicon.ico
```

---

## 3. Phase 1: markup into components (no motion yet)

1. `git checkout -b react-conversion`. Move the old files: `git mv index.html legacy/index.html`, `git mv css legacy/css`, `git mv js legacy/js`, `git mv assets public/assets`, `git mv favicon.ico public/favicon.ico`.
2. Set up Vite + React with the packages above.
3. New root `index.html`: copy the whole old `<head>` (title, meta, Open Graph, Twitter card, favicons, Google Fonts `<link>`s). Asset links become absolute: `href="/assets/favicon.svg"`. No `<script>` CDN tags.
4. `src/styles/style.css` = `legacy/css/style.css` with one change: every `url("../assets/` becomes `url("/assets/`. Nothing else.
5. Split the old `<body>` into the components listed in section 2, **copying the markup exactly**: same tags, same classes, same ids, same `data-*` attributes, same order, same `aria-*`. Convert only what JSX needs: `class` → `className`, `for` → `htmlFor`, `stroke-width` → `strokeWidth`, `xlink:href`/`href` on `<use>` stays `href`, inline `style="object-position: 50% 60%"` → `style={{ objectPosition: "50% 60%" }}`, self-close void tags.
6. **Containers the motion code fills must stay empty in JSX.** Render them as empty elements and never put React children inside them. React must not re-render them after mount. These are:
   - `#bookLeaves` (wedding-card pages and leaves, rebuilt by `weddingCard.js` when the screen crosses 760 px)
   - every `[data-arch]` arch frame SVG, `.bells[data-bells]`, `.card-edge` (drawn by `ornaments.js`)
   - the seam garlands, hero glows (`#heroGlows`), calendar grid, gallery track items, event cards, night timeline items, every list built in block 1 of `main.js`
   - `img[data-asset]` `src` (set by `artwork.js`, not by React)
   - every `<canvas>` (`#tapfx`, `.petals`, `#scratchCover`)

   Simplest safe way: keep block 1 of `main.js` as it is (it builds these from the config with `innerHTML`), so the DOM ends up byte-for-byte the same. Do not turn these lists into `.map()` JSX unless the output DOM is identical and nothing animates them after; when unsure, keep the JS builder.
7. `[data-k]` text: keep the attribute and let `words.js` fill it as today. That keeps the result identical.
8. `App.jsx` renders, in this order: `SvgDefs, Cursor, TapFx, MusicButton (+audio), Loader, Gate, <main>` with `Hero, Couple, LetterScene, DateSection, Countdown, Gallery, Events, Night, Venue, Closing` inside it.

**CHECKPOINT 1.** With motion not started yet, the page shows the static layout. Compare the DOM: in both sites run `document.querySelectorAll('*').length`, and check that every id from the old `index.html` exists in the new one. Fix any missing class, id or attribute before going on.

---

## 4. Phase 2: motion, ported, not rewritten

The safest way to keep every animation identical is to keep `main.js`'s code and its run order, split into modules, and start it once after React has mounted the DOM.

1. In each `src/motion/*.js`, paste the matching block of `legacy/js/main.js` **verbatim**. Change only the plumbing:
   - `window.gsap` / `window.ScrollTrigger` / `window.Lenis` → `import gsap from "gsap"; import { ScrollTrigger } from "gsap/ScrollTrigger"; import Lenis from "lenis";` and `gsap.registerPlugin(ScrollTrigger)` once in `start.js`.
   - `window.INVITE` → `import C from "../config"`. `window.Ornaments` → `import * as Ornaments from "../ornaments"`.
   - Shared variables that blocks use across each other (`root`, `G`, `C`, `reduced`, `fine`, `lite`, `clamp`, `el`, `esc`, `$`, `$$`, `findImage`, `setVar`, `cardPages`, `fields`, `tapfx`, `lenis`, `unlock`, `heroOn`, `opened`, `heroBurst`, `playLoop`, `askTilt`, `lightsOn`, `heroIntro` and the rest) live in one shared object or module (`motion/state.js`) so every block sees the same value, exactly like the one closure in `main.js` today. Keep the names.
   - Asset paths: `findImage` builds `assets/<name>.<ext>`; make it `/assets/<name>.<ext>`. Same for `findVideo` and `#bgMusic` (`/assets/bgm.mp3`).
2. `start.js` exports `startSite()` which runs the blocks in the original order: 1 words, 2 artwork, 3 petals, 4 smooth + cursor, 5 hero, 6 gate + music, 7 loader, 7b everywhere, 8 scenes (inside the same `gsap.matchMedia()`), 9 scratch, 10 countdown, 11 share.
3. In `App.jsx`:

   ```jsx
   import { useRef } from "react";
   import { useGSAP } from "@gsap/react";
   import { startSite } from "./motion/start";
   export default function App() {
     const scope = useRef(null);
     useGSAP(() => { startSite(); }, { scope });   // runs once, after every component is in the DOM
     return <div ref={scope}>{/* components in order */}</div>;
   }
   ```

   If wrapping in a `<div>` changes any layout, the `ref` can sit on a fragment-free element that already exists or `useGSAP` can run without `scope`; check that `html`/`body` styles still match.
4. Keep the ScrollTrigger order exactly as in `main.js`. Triggers created before the two pinned scenes use `refreshPriority: -1` (`late`). Do not move any trigger creation into individual components' own `useEffect`s: that changes the creation order, and the pins (envelope/card, gallery) will start at the wrong scroll positions.
5. Keep `ScrollTrigger.config({ ignoreMobileResize: true })`, the `lite` flag and `html.is-lite` class, the `is-locked` class until the gate opens, `history.scrollRestoration = "manual"` and `scrollTo(0, 0)` at start.
6. Nothing in the components may call `setState` during scrolling. The site has no React state that changes while you scroll; motion writes straight to the DOM, as today. (The music button may use state for on/off only.)

**CHECKPOINT 2: side by side.** Serve the old site (`npx serve legacy -l 5231` from the repo root, or `python -m http.server 5231` inside `legacy/` after copying `public/assets` next to it) and the new one (`npm run dev`). Open both at 1440x900, 1096x685 and 375x812 and compare at the same moments:

- loader → gate (curtain video plays, "Open the invitation" button)
- tap open → hero (lights come on, golden names, hall loop video, petals)
- couple arches swing in
- envelope: seal pops, flap opens, the card slides out sideways, stands up, faces you; each page turn with petals; desktop two-page spread centred, phone one page at a time; the card tips back and away; the white alpona turns behind it
- date arch rises, drapes draw back, scratch card works, calendar, bells swing on scroll and on tap
- countdown tiles drop and flip every second
- gallery wall pins and slides sideways as a coverflow; phone swipe works
- event cards are dealt from depth; night strands unroll, diyas light one by one
- venue frame swings in; closing arch rises, photo zooms, closing petals, share button
- the custom cursor and button lean on desktop; tap anywhere bursts petals + ring; Lenis smooth wheel on desktop only

Scroll positions must match: in both, after load run `ScrollTrigger.getAll().map(s => [s.trigger?.id || s.trigger?.className, Math.round(s.start), Math.round(s.end)])`. The lists must be the same length with the same numbers (±2 px).

---

## 5. Phase 3: build and deploy

- `npm run build` must finish with no errors; `npm run preview` must show the same site as `npm run dev`.
- `vite.config.js`: `base: "/"`. Static assets come from `public/`.
- Vercel: framework preset Vite, build `npm run build`, output `dist`.

**CHECKPOINT 3.** Run Checkpoint 2 again against `npm run preview`.

---

## 6. Phase 4: the actual speed fixes (React alone does not remove the lag)

React renders the same DOM, CSS and GSAP as today, so on its own it will scroll the same. The stutter comes from what the phone has to paint. Do these; **none of them changes how anything looks or moves**:

1. **Alpona**: `public/assets/alpona.png` is 2048x2048, 5.2 MB, and it is used as a turning CSS mask twice. Make a 1024x1024 grayscale `alpona.webp` (white on black, quality ~80, should be well under 200 KB) and delete the png. `findImage` already prefers `.webp`.
2. **No 404 probing**: `findImage`/`findVideo` try `.webp`, `.jpg`, `.jpeg`, `.png` one after another, which fires ~100 failed requests on load. Replace the probing with a fixed manifest (`src/assetManifest.js`, `{ couple: "/assets/couple.webp", ... }`) generated from the files in `public/assets`, and fall back exactly as before when a name is missing.
3. **Images sized for the screen**: add `loading="lazy"` and `decoding="async"` to every `img[data-asset]` below the hero; keep the hero and gate images eager.
4. **Videos**: hero loop and gate videos keep `muted playsinline`; the hero loop keeps `preload="none"` and only plays while the hero is on screen (already so). Use the `-tall` files on portrait screens only (already so).
5. **Canvases and loops stop when off screen**: the petal canvases already stop via IntersectionObserver; make sure the hero `tick`, the bells spring and `everywhere` do no DOM writes while their section is off screen (bells already do this).
6. **`will-change`** only on elements that move continuously (alpona art, gallery track, hero layers). Do not add it everywhere.
7. Keep the `.is-lite` CSS block at the end of `style.css` as it is.

**CHECKPOINT 4.** Chrome DevTools → Performance, CPU 4x slowdown, device toolbar 375x812: record a scroll from the top to the closing section. Long frames (red) should be rare and short; nothing in the envelope/card scene should take longer than ~16 ms per frame on a desktop CPU without throttling.

---

## 7. Phase 5: finish

1. Delete `legacy/` once Checkpoints 2 to 4 pass.
2. Update `README.md`: `npm i`, `npm run dev`, `npm run build`, where to edit text (`src/config.js`), where pictures go (`public/assets/`), image names still listed in `IMAGE-PROMPTS.md`.
3. Commit in logical steps (setup, components, motion, speed fixes, cleanup), each message ending with what changed. Push the `react-conversion` branch. Do not merge into `main` or deploy until Arpon has looked at it.

**Done means:** the React site at every checkpoint above looks and moves the same as the old one on desktop and phone, `npm run build` passes, and scrolling the card scene on a phone is smooth.
