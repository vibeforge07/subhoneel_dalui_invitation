import { ScrollTrigger } from "gsap/ScrollTrigger";
import state, { $, $$, G, reduced, clamp, view, breathe } from "./state.js";
import { setupWeddingCard } from "./weddingCard.js";

export async function initScenes() {
  if (G && !reduced) {
    const mm = G.matchMedia();

    // Triggers made here, before the pinned letter and gallery scenes, sit further down the page than those pins.
    // refreshPriority -1 makes ScrollTrigger measure them after the pins, so their positions include the pin spacing.
    const late = -1;

    // decorations grow in from their corner as the page arrives, then drift slower than the page
    for (const [di, d] of $$(".deco").entries()) {
      if (di && di % 4 === 0) await breathe();
      const sec = d.closest("section");
      const at = d.dataset.deco;
      if (at.startsWith("chand")) {
        G.fromTo(
          d,
          { y: -320, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: sec, start: "top 95%", end: "top 20%", scrub: 1.2, refreshPriority: late },
          }
        );
        continue;
      }
      const turn = { tl: -22, tr: 22, bl: 22, br: -22, l: -16, r: 16 }[at] || 0;
      G.fromTo(
        d,
        { scale: 0.35, rotate: turn, autoAlpha: 0 },
        {
          scale: 1,
          rotate: 0,
          autoAlpha: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: sec, start: "top 92%", end: "top 25%", scrub: 1.2, refreshPriority: late },
        }
      );
      const up = at.startsWith("b") ? 1 : -1;
      G.fromTo(
        d,
        { y: -70 * up },
        {
          y: 90 * up,
          ease: "none",
          scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true, refreshPriority: late },
        }
      );
    }
    await breathe();

    // the night strings unroll from the frieze as the page comes in
    G.fromTo(
      ".strand",
      { clipPath: "inset(0% 0% 100% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        stagger: 0.08,
        scrollTrigger: { trigger: ".night", start: "top 75%", end: "bottom 85%", scrub: 1.2, refreshPriority: late },
      }
    );

    await breathe();
    // section titles rise word by word
    $$(".head").forEach((h) => {
      const tl = G.timeline({ scrollTrigger: { trigger: h, start: "top 84%", refreshPriority: late } });
      tl.from($(".head__kicker", h), { autoAlpha: 0, y: 16, duration: 1, ease: "power3.out" }).from(
        $$(".w__i", h),
        { yPercent: 115, duration: 1.3, ease: "power4.out", stagger: 0.09 },
        0.1
      );
      const line = $(".lotusline", h);
      if (line) tl.from(line, { autoAlpha: 0, scaleX: 0.2, duration: 1.2, ease: "power3.out" }, 0.3);
    });

    await breathe();
    // bells drop in from the top edge
    $$(".bells").forEach((b) =>
      G.from(b, {
        y: -80,
        autoAlpha: 0,
        duration: 1.6,
        ease: "elastic.out(1, 0.55)",
        scrollTrigger: { trigger: b.parentElement, start: "top 75%", refreshPriority: late },
      })
    );

    await breathe();
    // the couple: each arch swings in from deep behind its side of the page
    $$(".person").forEach((p, i) => {
      const arch = $(".arch", p);
      const side = i === 0 ? -1 : 1;
      const st = { trigger: p, start: "top 98%", end: "top 30%", scrub: 1 };
      G.fromTo(
        arch,
        { x: side * 170, z: -520, rotateY: -side * 42, autoAlpha: 0 },
        { x: 0, z: 0, rotateY: 0, autoAlpha: 1, ease: "power2.out", scrollTrigger: st }
      );
      G.fromTo($$(".arch__photo, .arch__empty", arch), { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: st });
      G.from($$(".person__text > *", p), {
        autoAlpha: 0,
        y: 26,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: p, start: "top 45%" },
      });
    });
    G.from(".couple__and > *", {
      autoAlpha: 0,
      scale: 0.5,
      duration: 1.4,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: ".couple__and", start: "top 80%" },
    });

    await breathe();
    // From the first pin on, no more breaks: a pin queues a full re-measure for the next frame, and a break
    // would let it run once per pin. start.js measures everything once, straight after.
    // the envelope: the envelope opens and the wedding card comes out; scrolling turns its pages
    setupWeddingCard(mm);

    // date: the arch rises from lying flat and comes up to face you, while the drapes draw back
    const dateST = { trigger: ".date", start: "top 95%", end: "top 15%", scrub: 1 };
    G.fromTo(
      ".date__arch",
      { rotateX: 32, scale: 0.74, y: 160, z: -280, autoAlpha: 0.25, transformOrigin: "50% 100%" },
      { rotateX: 0, scale: 1, y: 0, z: 0, autoAlpha: 1, ease: "power2.out", scrollTrigger: dateST }
    );
    G.fromTo(".date .side-drape--l", { xPercent: 85 }, { xPercent: 0, ease: "power2.inOut", scrollTrigger: dateST });
    G.fromTo(".date .side-drape--r", { xPercent: -85 }, { xPercent: 0, ease: "power2.inOut", scrollTrigger: dateST });
    G.from(".date .vase", {
      autoAlpha: 0,
      y: 60,
      duration: 1.4,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: ".date__grid", start: "top 85%" },
    });
    G.from([".scratch", ".cal"], {
      autoAlpha: 0,
      y: 50,
      duration: 1.3,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: ".date__grid", start: "top 82%" },
    });
    // countdown tiles drop down like a split-flap board
    G.from(".cd__cell", {
      rotateX: -105,
      transformOrigin: "50% 0%",
      autoAlpha: 0,
      duration: 1.2,
      stagger: 0.13,
      ease: "back.out(1.5)",
      scrollTrigger: { trigger: "#cd", start: "top 82%" },
    });

    // gallery: a curved 3D wall. The frame nearest the middle faces you and comes forward,
    // the others turn away, like walking past them
    const gitems = $$(".gitem");
    const track = $("#galTrack");
    let gpos = null; // each frame's centre, measured from the track's left edge
    let trackOriginLeft = 0;
    const measureGallery = () => {
      if (!track) return;
      trackOriginLeft = track.getBoundingClientRect().left - Number(G.getProperty(track, "x") || 0);
      gpos = gitems.map((g) => {
        const r = g.getBoundingClientRect();
        return r.left + r.width / 2 - track.getBoundingClientRect().left;
      });
    };
    const coverflow = () => {
      if (!track) return;
      const cx = view.w / 2;
      const wide = view.w > 760;
      if (!gpos) measureGallery();
      const t = trackOriginLeft + Number(G.getProperty(track, "x") || 0);
      for (let i = 0; i < gitems.length; i++) {
        const g = gitems[i];
        const d = (t + gpos[i] - cx) / view.w;
        const near = 1 - clamp(Math.abs(d) * 1.9, 0, 1);
        G.set(g, {
          rotateY: clamp(-d * (wide ? 52 : 40), -40, 40),
          z: near * (wide ? 110 : 60) - 50,
          transformPerspective: 1300,
        });
      }
    };
    // the wall slides sideways on scroll across desktop and mobile
    const dist = () => (track ? Math.max(0, track.scrollWidth - innerWidth) : 0);
    if (track) {
      G.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: "#gallery",
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: coverflow,
          onRefresh: () => ((gpos = null), coverflow()),
        },
      });
      coverflow();

      // touch swipe support on mobile: swiping sideways scrolls through the cards
      let touchStartX = 0;
      let touchStartY = 0;
      track.addEventListener(
        "touchstart",
        (e) => {
          if (!e.touches.length) return;
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        },
        { passive: true }
      );
      track.addEventListener(
        "touchmove",
        (e) => {
          if (!e.touches.length) return;
          const dx = touchStartX - e.touches[0].clientX;
          const dy = touchStartY - e.touches[0].clientY;
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6) {
            window.scrollBy({ top: dx * 1.15, behavior: "auto" });
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
          }
        },
        { passive: true }
      );
    }

    // events: the cards are dealt toward you from deep behind, one after another
    $$(".ev").forEach((ev, i) => {
      const k = i % 4;
      G.fromTo(
        ev,
        { z: -760, rotateX: 38, y: 190, autoAlpha: 0, transformOrigin: "50% 100%" },
        {
          z: 0,
          rotateX: 0,
          y: 0,
          autoAlpha: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: ev, start: `top ${102 - k * 5}%`, end: `top ${52 - k * 5}%`, scrub: 1 },
        }
      );
    });

    // wedding night: the line runs down, each diya lights as it is reached
    const tl = $("#timeline");
    if (tl) {
      ScrollTrigger.create({
        trigger: tl,
        start: "top 62%",
        end: "bottom 62%",
        scrub: true,
        onUpdate: (s) => tl.style.setProperty("--fill", s.progress.toFixed(3)),
      });
    }
    state.tlItems.forEach((li, i) => {
      ScrollTrigger.create({
        trigger: li,
        start: "top 62%",
        onEnter: () => li.classList.add("lit"),
        onLeaveBack: () => li.classList.remove("lit"),
      });
      mm.add({ wide: "(min-width: 761px)", narrow: "(max-width: 760px)" }, (ctx) => {
        G.from($(".tl__card", li), {
          autoAlpha: 0,
          x: ctx.conditions.wide ? (i % 2 ? -50 : 50) : 30,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: li, start: "top 80%" },
        });
      });
    });

    // venue
    G.fromTo(
      ".frame--venue",
      { x: -150, z: -480, rotateY: 38, autoAlpha: 0 },
      {
        x: 0,
        z: 0,
        rotateY: 0,
        autoAlpha: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".venue__grid", start: "top 98%", end: "top 35%", scrub: 1 },
      }
    );
    G.from(".venue__info > *", {
      autoAlpha: 0,
      y: 30,
      duration: 1.1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".venue__grid", start: "top 75%" },
    });
    if ($(".dress") && $(".sw")) {
      G.from(".sw", {
        autoAlpha: 0,
        scale: 0.4,
        duration: 1,
        stagger: 0.08,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".dress", start: "top 82%" },
      });
    }

    // closing
    G.from(".closing__text > *", {
      autoAlpha: 0,
      y: 40,
      filter: "blur(6px)",
      duration: 1.4,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".closing", start: "top 60%" },
    });
    // closing: the arch rises to face you, then the picture keeps walking into the hall as you scroll
    G.fromTo(
      ".closing__arch",
      { rotateX: 26, z: -360, y: 120, autoAlpha: 0, transformOrigin: "50% 100%" },
      {
        rotateX: 0,
        z: 0,
        y: 0,
        autoAlpha: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".closing", start: "top 95%", end: "top 25%", scrub: 1 },
      }
    );
    G.fromTo(
      ".closing__arch .arch__photo",
      { scale: 1 },
      {
        scale: 1.34,
        ease: "none",
        scrollTrigger: { trigger: ".closing", start: "top 60%", end: "bottom bottom", scrub: true },
      }
    );
    const closingEl = $(".closing");
    if (closingEl) {
      ScrollTrigger.create({
        trigger: ".closing",
        start: "top 70%",
        once: true,
        onEnter: () => {
          if (state.fields.closing) state.fields.closing.start();
        },
      });
    }
  } else {
    const closingEl = $(".closing");
    if (closingEl) {
      new IntersectionObserver(([e], o) => {
        if (!e.isIntersecting) return;
        if (state.fields.closing) state.fields.closing.start();
        o.disconnect();
      }).observe(closingEl);
    }
    state.tlItems.forEach((li) => li.classList.add("lit"));
  }

  const scrollCue = $(".scroll-cue");
  if (scrollCue) {
    scrollCue.addEventListener("click", (e) => {
      e.preventDefault();
      if (state.lenis) state.lenis.scrollTo("#couple", { duration: 1.6 });
      else {
        const couple = $("#couple");
        if (couple) couple.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}
