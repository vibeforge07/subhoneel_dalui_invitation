import { ScrollTrigger } from "gsap/ScrollTrigger";
import state, { $, G, C, reduced } from "./state.js";

export function initCountdown() {
  const target = new Date(C.wedding.startISO).getTime();
  const out = {
    d: $('[data-cd="d"]'),
    h: $('[data-cd="h"]'),
    m: $('[data-cd="m"]'),
    s: $('[data-cd="s"]'),
  };
  if (!out.d || !out.h || !out.m || !out.s) return;

  const pad = (n) => String(Math.max(0, Math.floor(n))).padStart(2, "0");
  const parts = () => {
    let left = Math.max(0, target - Date.now());
    const d = Math.floor(left / 864e5);
    left -= d * 864e5;
    const h = Math.floor(left / 36e5);
    left -= h * 36e5;
    const m = Math.floor(left / 6e4);
    left -= m * 6e4;
    return { d, h, m, s: Math.floor(left / 1e3) };
  };
  const prev = {};
  // flip = turn the changed numbers over like a split-flap clock
  const show = (v, flip) =>
    Object.keys(out).forEach((k) => {
      const s = pad(v[k]);
      if (s === prev[k]) return;
      prev[k] = s;
      out[k].textContent = s;
      if (flip && G && !reduced)
        G.fromTo(
          out[k],
          { rotateX: -92, transformPerspective: 500, transformOrigin: "50% 60%" },
          { rotateX: 0, duration: 0.55, ease: "back.out(2.2)" }
        );
    });

  let ticking = false;
  const start = () => {
    if (ticking) return;
    ticking = true;
    setInterval(() => show(parts(), true), 1000);
  };

  if (G && !reduced) {
    const proxy = { d: 0, h: 0, m: 0, s: 0 };
    show(proxy);
    ScrollTrigger.create({
      trigger: "#cd",
      start: "top 80%",
      once: true,
      onEnter: () =>
        G.to(proxy, {
          ...parts(),
          duration: 2,
          ease: "power3.out",
          onUpdate: () => show(proxy),
          onComplete: start,
        }),
    });
  } else {
    show(parts());
    start();
  }
}
