import state, { root, $, $$, G, orient, other, reduced } from "./state.js";
import { Petals } from "./petals.js";
import { imageManifest, videoManifest } from "../assetManifest.js";

export function initArtwork() {
  const IMG_EXT = ["webp", "jpg", "jpeg", "png"];
  const found = {};
  const findImage = (name) =>
    found[name] ||
    (found[name] = new Promise((res) => {
      if (imageManifest[name]) return res(imageManifest[name]);
      // the manifest lists every picture in public/assets (README): a name not in it is not there, so no probing
      if (location.protocol !== "file:") return res(null);
      let i = 0;
      const next = () => {
        if (i >= IMG_EXT.length) return res(null);
        const src = `/assets/${name}.${IMG_EXT[i++]}`;
        const im = new Image();
        im.onload = () => res(src);
        im.onerror = next;
        im.src = src;
      };
      next();
    }));
  state.findImage = findImage;

  // probe with a <video> element, so it also works when index.html is opened straight from the folder
  const findVideo = (name) =>
    new Promise((res) => {
      if (videoManifest[name]) return res(videoManifest[name]);
      if (location.protocol !== "file:") return res(null);
      const exts = ["mp4", "webm"];
      let i = 0;
      const next = () => {
        if (i >= exts.length) return res(null);
        const src = `/assets/${name}.${exts[i++]}`;
        const v = document.createElement("video");
        v.muted = true;
        v.preload = "metadata";
        v.onloadedmetadata = () => {
          res(src);
          v.removeAttribute("src");
          v.load();
        };
        v.onerror = next;
        v.src = src;
      };
      next();
    });
  state.findVideo = findVideo;

  // absolute URL: a relative url() inside a custom property resolves against the stylesheet that uses it (css/)
  const setVar = (k, src) => root.style.setProperty(`--img-${k}`, `url("${new URL(src, location.href).href}")`);
  state.setVar = setVar;

  // closed + open stage must come from the same orientation, or the reveal won't line up
  async function pickStage() {
    for (const o of [orient, other]) {
      const [closed, open] = await Promise.all([findImage(`stage-closed-${o}`), findImage(`stage-open-${o}`)]);
      if (closed && open) return { closed, open, o };
    }
    for (const o of [orient, other]) {
      const open = await findImage(`stage-open-${o}`);
      if (open) return { closed: null, open, o };
    }
    return { closed: null, open: null, o: orient };
  }
  state.pickStage = pickStage;

  const heroImg = $("#heroImg");
  const heroLoop = $("#heroLoop");
  const gateImg = $("#gateImg");
  const assets = state.assets;

  const critical = [
    pickStage().then(async (s) => {
      Object.assign(assets, s);
      if (s.closed && gateImg) {
        gateImg.src = s.closed;
        root.classList.add("has-stage-closed");
      }
      if (s.open && heroImg) {
        heroImg.src = s.open;
        root.classList.add("has-hero");
      }
      // living hall: a looping video of the lit stage, same orientation as the stills
      const loop = await findVideo(`hero-${s.o}`);
      if (loop && heroLoop) {
        const poster = await findImage(`hero-${s.o}`);
        if (poster) heroLoop.poster = poster;
        // nothing is fetched yet: the hall video waits until the opening film is in (state.warmUp)
        heroLoop.preload = "none";
        heroLoop.src = loop;
        assets.loop = loop;
        root.classList.add("has-hero-loop");
      }
    }),
    // curtain-opening video; its first frame becomes the cover so the tap starts seamlessly
    (async () => {
      for (const o of [orient, other]) {
        const v = await findVideo(`opening-${o}`);
        if (!v) continue;
        assets.opening = v;
        assets.openingPoster = await findImage(`opening-${o}`);
        // download the whole film behind the loading bar, so it never stalls when the gate opens
        try {
          const r = await fetch(v);
          if (!r.ok) throw new Error(String(r.status));
          assets.openingUrl = URL.createObjectURL(await r.blob());
        } catch {
          assets.openingUrl = null;
        }
        return;
      }
    })(),
    findImage("couple"),
    findImage("frame-gold"),
    document.fonts ? document.fonts.ready : Promise.resolve(),
  ];
  state.critical = critical;

  // after the opening film: fetch the hall video and the music, one thing at a time on slow networks
  state.warmUp = () => {
    if (heroLoop && assets.loop && heroLoop.paused && heroLoop.readyState === 0) {
      heroLoop.preload = "auto";
      heroLoop.load();
    }
    const music = $("#bgMusic");
    if (music && music.paused && music.readyState === 0) {
      music.preload = "auto";
      music.load();
    }
  };

  // garland across a seam: copies side by side, every other one mirrored, so the rope never breaks
  function buildSeam(seam, src) {
    const row = document.createElement("div");
    row.className = "seam__row";
    seam.appendChild(row);
    const probe = new Image();
    probe.onload = () => {
      const ratio = probe.naturalWidth / probe.naturalHeight;
      const fill = () => {
        const per = (row.offsetHeight || 100) * ratio;
        const n = Math.max(1, Math.ceil(seam.offsetWidth / per)) + 2;
        if (row.childElementCount === n) return;
        row.textContent = "";
        for (let i = 0; i < n; i++) {
          const c = new Image();
          c.src = src;
          c.alt = "";
          c.decoding = "async";
          if (i % 2) c.className = "flip";
          row.appendChild(c);
        }
      };
      fill();
      new ResizeObserver(fill).observe(seam);
      if (G && !reduced)
        G.fromTo(
          row,
          { clipPath: "inset(-30% 50% -30% 50%)" },
          {
            clipPath: "inset(-30% 0% -30% 0%)",
            duration: 1.9,
            ease: "power3.inOut",
            scrollTrigger: { trigger: seam, start: "top 92%" },
          }
        );
    };
    probe.src = src;
  }
  state.buildSeam = buildSeam;

  // every <img data-asset>
  const slots = $$("img[data-asset]").map((img) =>
    findImage(img.dataset.asset).then((src) => {
      const seam = img.closest(".seam");
      if (!src) {
        (seam || img).remove();
        return;
      }
      if (seam) {
        img.remove();
        buildSeam(seam, src);
        return;
      }
      img.decoding = "async";
      img.src = src;
      if (img.classList.contains("frame__art")) {
        const fr = img.closest(".frame");
        if (fr) fr.classList.add("has-art");
      } else {
        const holder = img.closest(".ev__media, .frame__photo, .gframe__photo, .arch__inner");
        if (holder) holder.classList.add("has-photo");
      }
    })
  );

  findImage("alpona").then((s) => s && (setVar("alpona", s), root.classList.add("has-alpona")));
  findImage("damask").then((s) => s && (setVar("damask", s), root.classList.add("has-damask")));
  findImage("parchment").then((s) => s && (setVar("parchment", s), root.classList.add("has-parchment")));
  // optional painted art for the wedding card (prompts in IMAGE-PROMPTS.md); drawn versions stand in until then
  ["card-cover", "card-paper", "card-photo-frame"].forEach((n) =>
    findImage(n).then((s) => s && (setVar(n, s), root.classList.add(`has-${n}`)))
  );
  findImage("petal").then((s) => {
    if (!s) return;
    const im = new Image();
    im.onload = () => (Petals.image = im);
    im.src = s;
  });
  state.slotsReady = Promise.all(slots);
}
