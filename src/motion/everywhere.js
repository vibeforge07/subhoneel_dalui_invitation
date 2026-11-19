import state, { $, $$, G, lite, fine, reduced, clamp, view } from "./state.js";
import { Petals } from "./petals.js";

export function initEverywhere() {
  const tapfxCanvas = $("#tapfx");
  const tapfx = tapfxCanvas
    ? new Petals(tapfxCanvas, lite ? 4 : 9, { small: true, maxDpr: lite ? 1 : 1.5 })
    : null;
  state.tapfx = tapfx;

  const bellSets = $$(".bells").map((el) => ({
    el,
    a: 0,
    v: 0,
    shown: 0,
    on: false,
    dir: el.classList.contains("bells--r") ? -1 : 1,
  }));
  state.bellSets = bellSets;

  const bellIO = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        const b = bellSets.find((x) => x.el === e.target);
        if (b) b.on = e.isIntersecting;
      }),
    { rootMargin: "100px" }
  );
  bellSets.forEach((b) => bellIO.observe(b.el));

  document.addEventListener("click", (e) => {
    if (!state.opened || e.target.closest("#scratchCover, .gate")) return;
    if (tapfx) {
      tapfx.burst(e.clientX, e.clientY, 14, true);
      tapfx.ring(e.clientX, e.clientY);
    }
    // a tap near the bells sets them swinging
    for (const b of bellSets) {
      const r = b.el.getBoundingClientRect();
      if (
        e.clientX > r.left - 50 &&
        e.clientX < r.right + 50 &&
        e.clientY > r.top - 20 &&
        e.clientY < r.bottom + 50
      )
        b.v += (e.clientX < r.left + r.width / 2 ? 1 : -1) * 240;
    }
  });

  const decos = $$(".deco").map((el) => ({
    el,
    d: parseFloat(el.dataset.depth || "0.03"),
    on: false,
  }));
  state.decos = decos;

  const decoIO = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        const o = decos.find((x) => x.el === e.target);
        if (o) o.on = e.isIntersecting;
      }),
    { rootMargin: "200px" }
  );
  decos.forEach((o) => decoIO.observe(o.el));

  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  if (fine)
    addEventListener(
      "pointermove",
      (e) => {
        ptr.tx = e.clientX / innerWidth - 0.5;
        ptr.ty = e.clientY / innerHeight - 0.5;
      },
      { passive: true }
    );

  // the scroll position comes from the scroll event, not from reading scrollY in the frame loop:
  // that read, right after GSAP has written its styles, makes Chrome lay the whole page out every frame
  let sy = scrollY;
  addEventListener("scroll", () => (sy = scrollY), { passive: true });
  let lastY = sy;
  let vel = 0; // smoothed scroll speed, px/s
  const everywhere = (time, dtMs) => {
    const dt = Math.min(0.05, Math.max(0.001, (dtMs || 16) / 1000));
    const v = (sy - lastY) / dt;
    lastY = sy;
    vel += (clamp(v, -6000, 6000) - vel) * 0.18;
    // petals get carried by the scroll, so they feel like they hang in real depth
    if (tapfx) {
      if (state.unlocked && !tapfx.want) tapfx.start();
      tapfx.wind = clamp(-vel * 0.32, -900, 900);
      tapfx.paused = state.heroOn;
    }
    // bells: a damped spring pushed by the scroll speed
    for (const b of bellSets) {
      if (!b.on) continue;
      b.v += (-b.a * 70 - b.v * 5 + clamp(vel, -4000, 4000) * 0.35 * b.dir) * dt;
      b.a = clamp(b.a + b.v * dt, -14, 14);
      if (Math.abs(b.a - b.shown) > 0.05) b.el.style.rotate = `${(b.shown = b.a).toFixed(2)}deg`;
    }
    // decorations drift against the pointer, nearer ones more
    if (fine) {
      ptr.x += (ptr.tx - ptr.x) * 0.06;
      ptr.y += (ptr.ty - ptr.y) * 0.06;
      for (const o of decos)
        if (o.on)
          o.el.style.translate = `${(-ptr.x * o.d * view.w).toFixed(1)}px ${(-ptr.y * o.d * view.h).toFixed(1)}px`;
    }
  };
  state.everywhere = everywhere;

  if (G && !reduced) G.ticker.add(everywhere);

  // photo frames and cards lean toward the pointer
  if (fine && !reduced)
    $$(".arch--photo, .frame--venue, .ev").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        el.style.rotate = `${(-dy).toFixed(3)} ${dx.toFixed(3)} 0 ${(Math.hypot(dx, dy) * 16).toFixed(2)}deg`;
      });
      el.addEventListener("pointerleave", () => (el.style.rotate = ""));
    });
}
