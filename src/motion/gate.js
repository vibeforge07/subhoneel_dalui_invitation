import state, { root, $, G, reduced } from "./state.js";

export function initGate() {
  const gate = $("#gate");
  const video = $("#gateVideo");
  const hero = $("#hero");
  const heroImg = $("#heroImg");
  const heroLoop = $("#heroLoop");

  const heroBurst = (n) => {
    if (!hero || !state.fields.hero) return;
    const r = hero.getBoundingClientRect();
    state.fields.hero.burst(r.width / 2, r.height * 0.42, n, true);
  };
  state.heroBurst = heroBurst;

  function finishGate(fromVideo) {
    if (fromVideo && !root.classList.contains("has-hero") && video && heroImg) {
      // no painted stage yet: freeze the video's last frame as the hero background
      try {
        const c = document.createElement("canvas");
        c.width = video.videoWidth;
        c.height = video.videoHeight;
        c.getContext("2d").drawImage(video, 0, 0);
        heroImg.src = c.toDataURL("image/jpeg", 0.92);
        root.classList.add("has-hero");
      } catch (_) {}
    }
    if (gate) gate.classList.add("is-done");
    state.unlock();
    setTimeout(() => gate && gate.remove(), 1600);
  }

  // painted stage: the closed picture opens from the middle onto the lit hall underneath
  function openWithReveal() {
    state.playLoop();
    if (gate) {
      gate.style.setProperty("--o", "-9%");
      gate.classList.add("is-revealing");
    }
    state.lightsOn(0.35, false, 0.4);
    state.heroIntro(1.3, true);
    if (G && gate) {
      G.to(gate, {
        "--o": "62%",
        duration: 2.8,
        delay: 0.35,
        ease: "power2.inOut",
        onComplete: () => gate.remove(),
      });
    }
    setTimeout(() => heroBurst(40), 1400);
    setTimeout(state.unlock, 1800);
  }

  function openWithCurtains() {
    state.playLoop();
    if (gate) gate.classList.add("is-curtains");
    state.lightsOn(0.45);
    state.heroIntro(1.1);
    setTimeout(() => heroBurst(40), 900);
    setTimeout(() => finishGate(false), 2400);
  }

  /* =========================================================
     Background Music ("এলো এলো" - শুভদৃষ্টি)
     ========================================================= */
  const bgMusic = $("#bgMusic");
  const musicBtn = $("#musicBtn");

  function startMusic() {
    if (!bgMusic || state.musicStarted) return;
    state.musicStarted = true;
    bgMusic.volume = 0;
    const playPromise = bgMusic.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          if (musicBtn) {
            musicBtn.classList.add("is-visible", "is-playing");
            musicBtn.classList.remove("is-muted");
          }
          // Smooth volume fade-in
          let vol = 0;
          const targetVol = 0.75;
          const fadeTimer = setInterval(() => {
            vol = Math.min(targetVol, vol + 0.05);
            bgMusic.volume = vol;
            if (vol >= targetVol) clearInterval(fadeTimer);
          }, 80);
        })
        .catch((err) => {
          console.warn("Audio autoplay blocked by browser policy:", err);
          state.musicStarted = false; // Allow user interaction to retry
        });
    }
  }
  state.startMusic = startMusic;

  function toggleMusic() {
    if (!bgMusic) return;
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        state.musicStarted = true;
        if (musicBtn) {
          musicBtn.classList.add("is-playing");
          musicBtn.classList.remove("is-muted");
        }
      });
    } else {
      bgMusic.pause();
      if (musicBtn) {
        musicBtn.classList.remove("is-playing");
        musicBtn.classList.add("is-muted");
      }
    }
  }
  state.toggleMusic = toggleMusic;

  if (musicBtn) {
    musicBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMusic();
    });
  }

  // Backup fallback: first user tap on the document after gate open also triggers music if autoplay blocked
  document.addEventListener(
    "pointerdown",
    () => {
      if (state.opened && !state.musicStarted) startMusic();
    },
    { passive: true }
  );

  function openGate() {
    if (state.opened) return;
    state.opened = true;
    startMusic();
    state.askTilt();
    if (navigator.vibrate) navigator.vibrate(15);
    if (gate) gate.classList.add("is-opening");
    if (state.assets.openingUrl && video && video.getAttribute("src") && video.readyState >= 3 && !reduced) {
      video.currentTime = 0;
      video
        .play()
        .then(() => {
          if (gate) gate.classList.add("is-video");
          state.lightsOn(0, true);
          // the film itself starts as bright as the cover and eases to its own light in 2.6 s
          // (baked into the file, so the browser runs no filter on a full-screen video)
          let done = false;
          const finish = () => {
            if (done) return;
            done = true;
            // the video ends where the hall loop begins: start the loop from its first frame and dissolve into it
            if (heroLoop) heroLoop.currentTime = 0;
            state.playLoop();
            finishGate(true);
            state.heroIntro(0.35);
            setTimeout(() => heroBurst(36), 600);
          };
          video.addEventListener("timeupdate", () => video.duration && video.currentTime >= video.duration - 1.3 && finish());
          video.addEventListener("ended", finish, { once: true });
          setTimeout(finish, (video.duration || 8) * 1000 + 2500);
        })
        .catch(() => (G ? openWithReveal() : openWithCurtains()));
    } else if (state.assets.closed && G && !reduced) openWithReveal();
    else openWithCurtains();
  }
  state.openGate = openGate;

  const openBtn = $("#openBtn");
  if (openBtn) openBtn.addEventListener("click", openGate);
  if (gate) gate.addEventListener("click", (e) => !e.target.closest("#openBtn") && openGate());
}
