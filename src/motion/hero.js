import state, { root, $, $$, G, C, orient, lite, fine, clamp, reduced, view } from "./state.js";

export function initHero() {
  const hero = $("#hero");
  const scene = $("#heroScene");
  const heroFrame = $("#heroFrame");
  const glowBox = $("#heroGlows");
  const heroImg = $("#heroImg");
  const heroLoop = $("#heroLoop");

  // chandelier glows sit on the chandeliers of the picture, wherever object-fit: cover crops it
  function placeGlows() {
    if (!glowBox || !heroImg) return;
    const cfg = C.glows[state.assets.o || orient] || [];
    if (glowBox.childElementCount !== cfg.length) {
      glowBox.textContent = "";
      cfg.forEach((_, i) => {
        const s = document.createElement("span");
        s.style.setProperty("--dl", `${i * 0.7}s`);
        glowBox.appendChild(s);
      });
    }
    const W = glowBox.clientWidth,
      H = glowBox.clientHeight;
    const iw = heroImg.naturalWidth || W,
      ih = heroImg.naturalHeight || H;
    const sc = Math.max(W / iw, H / ih);
    const dw = iw * sc,
      dh = ih * sc,
      ox = (W - dw) / 2,
      oy = (H - dh) / 2;
    [...glowBox.children].forEach((s, i) => {
      const g = cfg[i];
      s.style.left = `${ox + g.x * dw}px`;
      s.style.top = `${oy + g.y * dh}px`;
      s.style.width = s.style.height = `${g.r * dw}px`;
    });
  }
  state.placeGlows = placeGlows;
  addEventListener("resize", placeGlows);

  function lightsOn(delay, instant, from = 0.16) {
    placeGlows();
    root.classList.add("is-lit");
    if (!glowBox) return;
    const glows = [...glowBox.children];
    const peak = root.classList.contains("has-hero") ? 0.5 : 1;
    if (!G || instant) {
      glows.forEach((g) => (g.style.opacity = peak));
      return;
    }
    G.fromTo(
      scene,
      { filter: `brightness(${from}) saturate(0.6)` },
      { filter: "brightness(1) saturate(1)", duration: 2.4, delay, ease: "power2.inOut", clearProps: "filter" }
    );
    G.fromTo(
      glows,
      { opacity: 0 },
      {
        keyframes: { opacity: [0, peak, peak * 0.25, peak] },
        duration: 1,
        delay: delay + 0.25,
        stagger: { each: 0.32, from: "center" },
        ease: "none",
      }
    );
  }
  state.lightsOn = lightsOn;

  const heroBits = [".hero__top", ".hero__parent", ".hero__amp", ".scroll-cue"];
  if (G) {
    G.set(heroBits, { autoAlpha: 0, y: 18 });
    G.set(".name .ch", { autoAlpha: 0, y: 46, rotateX: -60, filter: "blur(8px)" });
    if (heroFrame) G.set(heroFrame, { clipPath: "inset(100% -15% -15% -15%)" });
  }

  function heroIntro(delay, fromReveal) {
    if (state.fields.hero) state.fields.hero.start();
    if (!G) return;
    state.layoutFoil();
    const tl = G.timeline({ delay });
    if (!fromReveal) tl.fromTo(scene, { scale: 1.07 }, { scale: 1, duration: 2.8, ease: "power3.out" }, 0);
    tl.to(".hero__top", { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.2)
      .to(heroFrame, { clipPath: "inset(-15% -15% -15% -15%)", duration: 1.7, ease: "power4.inOut" }, 0.3)
      .from($$(".frame__photo img, .frame__empty", heroFrame), { scale: 1.18, duration: 2.4, ease: "power3.out" }, 0.3)
      .to(
        ".name .ch",
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power3.out",
          stagger: 0.055,
          clearProps: "filter,transform",
        },
        0.8
      )
      .to([".hero__parent", ".hero__amp"], { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, 1.5)
      .to(".scroll-cue", { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" }, 1.7)
      .add(() => heroFrame && G.set(heroFrame, { clearProps: "clipPath" }));
  }
  state.heroIntro = heroIntro;

  // layers drift against the pointer / phone tilt; the light and the gold follow it
  const target = { x: 0.5, y: 0.46 };
  const now = { x: 0.5, y: 0.46 };
  const depthLayers = hero ? $$("[data-depth]", hero).map((n) => ({ n, d: parseFloat(n.dataset.depth) })) : [];

  const playLoop = () => {
    if (state.assets.loop && !reduced && heroLoop) heroLoop.play().catch(() => {});
  };
  state.playLoop = playLoop;

  // the hall video only runs while the hero is on screen
  if (hero) {
    new IntersectionObserver(([e]) => {
      state.heroOn = e.isIntersecting;
      if (state.assets.loop && state.opened && heroLoop) {
        state.heroOn ? playLoop() : heroLoop.pause();
      }
    }).observe(hero);

    hero.addEventListener(
      "pointermove",
      (e) => {
        target.x = e.clientX / innerWidth;
        target.y = e.clientY / innerHeight;
        const r = hero.getBoundingClientRect();
        if (state.fields.hero) state.fields.hero.pointer(e.clientX - r.left, e.clientY - r.top);
      },
      { passive: true }
    );
  }

  let tilt = false;
  const onTilt = (e) => {
    if (e.gamma == null) return;
    tilt = true;
    target.x = 0.5 + clamp(e.gamma / 35, -1, 1) * 0.5;
    target.y = 0.46 + clamp((e.beta - 50) / 35, -1, 1) * 0.4;
  };
  const askTilt = () => {
    const D = window.DeviceOrientationEvent;
    if (!D || fine) return;
    if (typeof D.requestPermission === "function")
      D.requestPermission()
        .then((s) => s === "granted" && addEventListener("deviceorientation", onTilt))
        .catch(() => {});
    else addEventListener("deviceorientation", onTilt);
  };
  state.askTilt = askTilt;

  // Every frame only moves layers with translate, which the GPU does without repainting.
  // The gold shine on the names (a repaint) follows only a real mouse, and only while it moves.
  const spot = $("#heroSpot");
  const glow = $("#heroGlow");
  const sizeSpot = () => hero && hero.style.setProperty("--R", `${(Math.hypot(innerWidth, innerHeight) / 2).toFixed(0)}px`);
  sizeSpot();
  addEventListener("resize", sizeSpot);
  let lastFoil = { x: -1, y: -1 };
  const tick = (time) => {
    if (!state.heroOn || !hero) return;
    if (!fine && !tilt) {
      // no mouse, no gyro: let the light wander slowly so the gold still catches it
      const t = (typeof time === "number" ? time : performance.now() / 1000) * 0.35;
      target.x = 0.5 + Math.sin(t) * 0.32;
      target.y = 0.42 + Math.cos(t * 0.7) * 0.12;
    }
    const dx = target.x - now.x,
      dy = target.y - now.y;
    if (Math.abs(dx) < 0.0004 && Math.abs(dy) < 0.0004) return; // settled: nothing to do
    now.x += dx * 0.07;
    now.y += dy * 0.07;
    const ox = now.x - 0.5,
      oy = now.y - 0.46;
    const lx = now.x * view.w,
      ly = now.y * view.h;
    const at = `${lx.toFixed(1)}px ${ly.toFixed(1)}px`;
    if (spot) spot.style.translate = at;
    if (glow) glow.style.translate = at;
    for (const l of depthLayers)
      l.n.style.translate = `${(-ox * l.d * view.w).toFixed(2)}px ${(-oy * l.d * view.h).toFixed(2)}px`;
    if (fine && (Math.abs(lx - lastFoil.x) > 2 || Math.abs(ly - lastFoil.y) > 2)) {
      lastFoil = { x: lx, y: ly };
      const rects = state.names.map((n) => n.getBoundingClientRect());
      state.names.forEach((n, i) => {
        n.style.setProperty("--fx", `${(lx - rects[i].left).toFixed(1)}px`);
        n.style.setProperty("--fy", `${(ly - rects[i].top).toFixed(1)}px`);
      });
    }
  };
  if (G) G.ticker.add(tick);
  else
    (function loop(t) {
      tick(t / 1000);
      requestAnimationFrame(loop);
    })(0);

  addEventListener("resize", () => state.layoutFoil());
}
