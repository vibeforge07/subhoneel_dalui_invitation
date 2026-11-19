import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import state, { root, $, $$, G, fine, reduced } from "./state.js";

export function initSmooth() {
  // marks each full re-measure, so a profile shows how often the page is measured
  let rt = 0;
  ScrollTrigger.addEventListener("refreshInit", () => (rt = performance.now()));
  ScrollTrigger.addEventListener("refresh", () => performance.measure("scrolltrigger:refresh", { start: rt, end: performance.now() }));
  let lenis = null;
  if (G && fine && !reduced && Lenis) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    G.ticker.add((t) => lenis.raf(t * 1000));
    G.ticker.lagSmoothing(0);
    lenis.stop();
  }
  state.lenis = lenis;

  let unlocked = false;
  const unlock = () => {
    if (unlocked) return;
    unlocked = true;
    state.unlocked = true;
    root.classList.remove("is-locked");
    if (state.lenis) state.lenis.start();
    // no ScrollTrigger.refresh() here: the lock never changed the layout, and a refresh now would
    // stall the opening animation on a phone for about a second
  };
  state.unlock = unlock;

  if (G && fine) {
    root.classList.add("has-cursor");
    const cur = $(".cursor");
    const dot = $(".cursor__dot");
    const ring = $(".cursor__ring");
    if (cur && dot && ring) {
      const dx = G.quickTo(dot, "x", { duration: 0.08 }),
        dy = G.quickTo(dot, "y", { duration: 0.08 });
      const rx = G.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" }),
        ry = G.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });
      addEventListener(
        "pointermove",
        (e) => {
          dx(e.clientX);
          dy(e.clientY);
          rx(e.clientX);
          ry(e.clientY);
        },
        { passive: true }
      );
      document.addEventListener("pointerover", (e) => {
        const t = e.target;
        cur.classList.toggle("is-hover", !!t.closest("a, button, .ev"));
        cur.classList.toggle("is-scratch", !!t.closest("#scratchCover"));
      });
      // buttons lean towards the cursor
      $$(".gate__btn, .btn").forEach((b) => {
        b.addEventListener("pointermove", (e) => {
          const r = b.getBoundingClientRect();
          G.to(b, {
            x: (e.clientX - r.left - r.width / 2) * 0.25,
            y: (e.clientY - r.top - r.height / 2) * 0.35,
            duration: 0.5,
            ease: "power3.out",
          });
        });
        b.addEventListener("pointerleave", () =>
          G.to(b, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" })
        );
      });
    }
  }
}
