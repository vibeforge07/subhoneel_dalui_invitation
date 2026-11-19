import state, { $, $$, G, clamp } from "./state.js";

export function setupWeddingCard(mm) {
  const stage = $("#envStage");
  const pin = $(".letter-scene__pin");
  const book = $("#book");
  const leavesBox = $("#bookLeaves");
  if (!stage || !pin || !book || !leavesBox) return;

  const PW = 300; // one page, in envelope units (the envelope is 640 x 430)
  const PH = 420;
  const fit = () => {
    const f = clamp(Math.min((innerWidth - 32) / 640, (innerHeight - 380) / 430), 0.42, 1.15);
    stage.style.setProperty("--fit", f.toFixed(3));
    return f;
  };
  fit();
  addEventListener("resize", fit);
  // how far the envelope's centre sits from the middle of the screen
  const offCentre = () => stage.offsetTop + stage.offsetHeight / 2 - pin.offsetHeight / 2;

  // pages into leaves. Desktop: a leaf carries a right page on its front and the next left page on its back.
  // Phone: one page per leaf, plain card stock on the back, so every page gets the whole screen.
  const ORDER_WIDE = [
    ["cover", "mantra"],
    ["photo", "bride"],
    ["groom", "day"],
  ];
  const ORDER_NARROW = [["cover"], ["mantra"], ["photo"], ["bride"], ["groom"]];
  const build = (wide) => {
    const cardPages = state.cardPages;
    Object.values(cardPages).forEach((p) => p.remove());
    leavesBox.innerHTML = "";
    const order = wide ? ORDER_WIDE : ORDER_NARROW;
    const leaves = order.map(([front, back], i) => {
      const leaf = document.createElement("div");
      leaf.className = "leaf";
      const f = document.createElement("div");
      f.className = "leaf__face leaf__face--front";
      const b = document.createElement("div");
      b.className = "leaf__face leaf__face--back";
      f.appendChild(cardPages[front]);
      if (back) b.appendChild(cardPages[back]);
      else {
        const bl = document.createElement("div");
        bl.className = "cp cp--blank";
        bl.innerHTML = `<div class="cp__frame"></div>`;
        b.appendChild(bl);
      }
      leaf.append(f, b);
      leaf.style.zIndex = String(order.length - i + 1);
      leavesBox.appendChild(leaf);
      return leaf;
    });
    const base = document.createElement("div");
    base.className = "leaf leaf--base";
    const bf = document.createElement("div");
    bf.className = "leaf__face leaf__face--front";
    bf.appendChild(cardPages[wide ? "families" : "day"]);
    base.appendChild(bf);
    base.style.zIndex = "0";
    leavesBox.appendChild(base);
    book.classList.toggle("book--wide", wide);
    return leaves;
  };

  const scene = (wide) => {
    const leaves = build(wide);
    const f = () => fit();
    // the card's size once it is out and facing you
    const S = () =>
      wide
        ? clamp(Math.min((0.8 * innerHeight) / (PH * f()), (0.86 * innerWidth) / (2 * PW * f())), 0.5, 3)
        : clamp(Math.min((0.74 * innerHeight) / (PH * f()), (0.88 * innerWidth) / (PW * f())), 0.5, 4);
    G.set(book, { rotate: -90, x: 0, y: 0, scale: 1, autoAlpha: 1, rotateX: 0 });
    G.set(leaves, { rotateY: 0, z: 0, autoAlpha: 1, "--sh": 0 });

    // scroll length follows the timeline: about 0.42 screens per second of it
    // (the estimate covers the first measure, before the turns below are added)
    let tl = null;
    const spin = G.timeline({ repeat: -1, paused: true })
      .to(".alpona--l .alpona__art", { rotate: 360, duration: 120, ease: "none" }, 0)
      .to(".alpona--r .alpona__art", { rotate: -360, duration: 120, ease: "none" }, 0);
    const units = () => (tl && tl.duration() > 5 ? tl.duration() : wide ? 11.6 : 15.9);
    tl = G.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: "#letter",
        start: "top top",
        end: () => `+=${Math.round(units() * innerHeight * 0.42)}`,
        scrub: 0.9,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: (st) => spin.paused(!st.isActive),
      },
    });
    tl.to("#envSeal", { scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 0)
      .to("#envFlap", { rotateX: 180, duration: 1.1, ease: "power2.inOut" }, 0.25)
      .set("#envFlap", { zIndex: 1 }, 0.8)
      // the card slides out lying on its side...
      .to(book, { y: -290, duration: 1.4, ease: "power2.out" }, 1.25)
      .to("#letter .head", { autoAlpha: 0, y: -40, duration: 0.8 }, 1.5)
      .to([".env__back", ".env__front", "#envFlap"], { y: 560, autoAlpha: 0, duration: 1.2, ease: "power2.in" }, 2.45)
      // ...then stands up, comes to the middle and grows to face you
      .to(book, { rotate: 0, y: () => -offCentre() / f(), scale: S, duration: 1.5, ease: "power2.inOut" }, 2.6)
      .to({}, { duration: 0.45 });

    leaves.forEach((leaf, i) => {
      const t = tl.duration();
      const turn = 1.3;
      tl.set(leaf, { zIndex: 100 }, t)
        .to(leaf, { rotateY: -180, duration: turn, ease: "power1.inOut" }, t)
        // the page lifts off the stack while it turns, and the light falls across it
        .to(leaf, { z: 40, "--sh": 1, duration: turn / 2, ease: "power1.out" }, t)
        .to(leaf, { z: 0, "--sh": 0, duration: turn / 2, ease: "power1.in" }, t + turn / 2)
        .set(leaf, { zIndex: 10 + i }, t + turn);
      // desktop: the opening cover slides the book over, so the open spread sits in the middle
      if (wide && i === 0) tl.to(book, { x: () => (PW / 2) * S(), duration: turn, ease: "power1.inOut" }, t);
      // phone: a turned page leaves the screen
      if (!wide) tl.to(leaf, { autoAlpha: 0, duration: turn * 0.3 }, t + turn * 0.7);
      // a few petals fall from the spine as each page goes over (only when scrolling forward)
      tl.call(
        () => {
          if (tl.scrollTrigger && tl.scrollTrigger.direction < 0) return;
          const bw = PW * f() * S();
          const bh = PH * f() * S();
          const bx = innerWidth / 2 - bw / 2 + (wide ? (PW / 2) * S() : 0);
          const by = innerHeight / 2 - bh / 2;
          if (state.tapfx) state.tapfx.burst(bx, by + bh * 0.22, 9, false);
        },
        null,
        t + turn * 0.5
      );
      tl.to({}, { duration: 0.85 });
    });

    // read to the end: the card tips back and sinks away, and the next page follows straight on
    tl.to("#letterHint", { autoAlpha: 0, duration: 0.4 })
      .to(book, { rotateX: 48, y: "+=520", autoAlpha: 0, duration: 1.1, ease: "power2.in" }, "<");
    // the white alpona behind the card blooms in as the card faces you, turns with the pages, and goes with it
    const end = tl.duration();
    tl.fromTo(".alpona", { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power2.out" }, 2.4)
      .fromTo(".alpona--l", { rotate: -40 }, { rotate: 80, duration: end }, 0)
      .fromTo(".alpona--r", { rotate: 40 }, { rotate: -80, duration: end }, 0)
      .to(".alpona", { autoAlpha: 0, scale: 0.85, duration: 1.1, ease: "power2.in" }, end - 1.1);
    return () => (spin.kill(), G.set([book, ...leaves, ".alpona", ".alpona__art"], { clearProps: "all" }));
  };
  mm.add("(min-width: 761px)", () => scene(true));
  mm.add("(max-width: 760px)", () => scene(false));
}
