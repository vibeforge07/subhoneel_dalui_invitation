import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initWords } from "./words.js";
import { initPetals } from "./petals.js";
import { initArtwork } from "./artwork.js";
import { initSmooth } from "./smooth.js";
import { initHero } from "./hero.js";
import { initGate } from "./gate.js";
import { initLoader } from "./loader.js";
import { initEverywhere } from "./everywhere.js";
import { initScenes } from "./scenes.js";
import { initScratch } from "./scratch.js";
import { initCountdown } from "./countdown.js";
import { initShare } from "./share.js";
import state, { breathe, whenReady } from "./state.js";

gsap.registerPlugin(ScrollTrigger);
// no automatic re-measure on DOMContentLoaded / load: the scroll scenes are built later and measured once (startSite)
ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,resize" });
if (typeof window !== "undefined") {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
}

// Each step hands control back to the browser before the next one, so nothing freezes for seconds on a phone.
// The loader and the gate only need the first group. The scroll scenes (dozens of ScrollTriggers, each one
// measuring the page) are built after the gate is showing, while the guest reads it, and then the page is
// measured once for all of them.
const run = async (steps) => {
  for (const [name, init] of steps) {
    const t = performance.now();
    await init();
    performance.measure(`init:${name}`, { start: t, end: performance.now() });
    await breathe();
  }
};

export async function startSite() {
  await run([
    // words builds the event cards and gallery frames (with their photo slots); artwork, in the same step,
    // then fills every slot and starts the downloads before the first page render
    ["words + artwork", () => (initWords(), initArtwork())],
    ["petals", initPetals],
    ["smooth", initSmooth],
    ["hero", initHero],
    ["gate", initGate],
    ["loader", initLoader],
    ["everywhere", initEverywhere],
    ["countdown", initCountdown],
    ["share", initShare],
  ]);
  await whenReady;
  await breathe();
  // scenes, scratch card and the measuring pass run back to back: a pin queues a full re-measure for the
  // next frame, and refreshing before that frame replaces it, so the page is measured once for everything
  const t = performance.now();
  await initScenes();
  initScratch();
  await state.slotsReady;
  ScrollTrigger.refresh();
  performance.measure("init:scenes+refresh", { start: t, end: performance.now() });
  state.scenesReady = true;
}
