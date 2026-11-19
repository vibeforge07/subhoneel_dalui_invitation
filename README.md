# Biyer Card · Rajbari

Animated Bengali wedding invitation, styled like a printed luxury card: maroon damask pages, cream cusped arches with carved gold frames, hanging bells, velvet drapes, embossed card stock. React + Vite, with GSAP, ScrollTrigger and Lenis for the motion.

```
index.html              page head (meta, link previews, favicons, fonts) + #root
src/main.jsx            mounts <App />
src/App.jsx             the sections in page order, then starts the motion once
src/components/         one component per part: Gate, Hero, Couple, LetterScene, DateSection, Countdown,
                        Gallery, Events, Night, Venue, Closing, plus SvgDefs, Cursor, TapFx, MusicButton, Loader
src/motion/             everything that moves, run in a fixed order by start.js
                        (words, artwork, petals, smooth, hero, gate, loader, everywhere, scenes, weddingCard,
                        scratch, countdown, share; shared values in state.js)
src/config.js           names, dates, card text, venue, events, timeline, gallery. Edit this for a new couple
src/ornaments.js        cusped arches, bells and card corners, drawn to fit their box
src/styles/style.css    all styling (desktop, phone, and the lighter .is-lite phone block at the end)
src/assetManifest.js    which pictures and videos exist in public/assets
public/assets/          cleaned images (webp), videos (mp4), music, icons
_originals/             raw files from the image and video tools (not in git, not deployed)
```

Run: `npm i`, then `npm run dev`. Add `?skip` to the address to skip the opening while working.
Build: `npm run build` (output in `dist/`), check it with `npm run preview`. Vercel: framework preset Vite, output `dist`.

Pictures: put the file in `public/assets/` with the name from IMAGE-PROMPTS.md and add it to `src/assetManifest.js`. A picture that is missing falls back to a drawn version (CSS curtains and stage, monogram in the frames, icons on the event cards). `emboss.webp` is generated from `damask.webp`.

WhatsApp link picture: after changing `couple.webp` or the names/date in `src/config.js`, run `npm run og`. It writes `public/assets/og-preview.jpg` (1200x630: the couple in the gold arch in the middle square, which WhatsApp crops for its small thumbnail; শুভ বিবাহ on the left, names and date on the right) using installed Chrome or Edge (`CHROME_PATH` if elsewhere). The build turns the link into a full address: on Vercel by itself, elsewhere set `SITE_URL=https://your-site`. A new picture gets a new `?v=` stamp, so WhatsApp does not show its old cached copy.

Interaction: a tap anywhere (after the invite is opened) bursts petals and gold sparks with a ripple; petals drift over every page and get blown by fast scrolling; bells swing with scroll speed or a tap near them; corner roses grow in and drift with scroll and pointer; frames tilt toward the pointer; pages fly in with 3D moves (arches swing in, event cards are dealt from depth, a printed wedding card slides out of the envelope and turns its pages as you scroll, a two-page spread on desktop and one page on phone, with white alpona turning behind it, the gallery is a curved coverflow wall).

The RSVP section is not built. It goes between `Venue` and `Closing` in `src/App.jsx`.
