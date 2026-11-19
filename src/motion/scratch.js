import state, { $, clamp } from "./state.js";

export function initScratch() {
  const sec = $("#date");
  const card = $(".scratch__card");
  const cv = $("#scratchCover");
  if (!sec || !card || !cv) return;

  const ctx = cv.getContext("2d");
  let w = 0,
    h = 0,
    down = false,
    last = null,
    moves = 0,
    revealed = false,
    touched = false;

  function paint() {
    const r = card.getBoundingClientRect();
    if (!r.width) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = card.offsetWidth;
    h = card.offsetHeight;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const g = ctx.createLinearGradient(0, 0, w, h);
    [
      ["0", "#7d5a20"],
      [".18", "#e9cd88"],
      [".36", "#b4873c"],
      [".5", "#fff0c2"],
      [".64", "#b4873c"],
      [".82", "#e2c27a"],
      ["1", "#6e4d19"],
    ].forEach(([o, c]) => g.addColorStop(+o, c));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // brushed metal grain
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < w * h * 0.012; i++) {
      ctx.fillStyle = rnd() > 0.5 ? "rgba(255,248,220,.18)" : "rgba(70,45,10,.14)";
      ctx.fillRect(rnd() * w, rnd() * h, 1 + rnd() * 1.5, 1);
    }
    ctx.strokeStyle = "rgba(90,60,15,.55)";
    ctx.lineWidth = 1;
    ctx.strokeRect(14.5, 14.5, w - 29, h - 29);
    ctx.strokeStyle = "rgba(255,245,210,.6)";
    ctx.strokeRect(15.5, 15.5, w - 31, h - 31);
    const fs = clamp(w * 0.055, 15, 26);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `600 ${fs}px Cinzel, serif`;
    if ("letterSpacing" in ctx) ctx.letterSpacing = `${(fs * 0.35).toFixed(1)}px`;
    const line = (text, y) => {
      ctx.fillStyle = "rgba(255,248,220,.7)";
      ctx.fillText(text, w / 2 - 1, y - 1);
      ctx.fillStyle = "rgba(80,52,12,.8)";
      ctx.fillText(text, w / 2 + 1, y + 1);
      ctx.fillStyle = "#a57a32";
      ctx.fillText(text, w / 2, y);
    };
    line("SCRATCH", h / 2 - fs * 0.8);
    ctx.font = `500 ${fs * 0.62}px Cinzel, serif`;
    line("TO SEE THE DAY", h / 2 + fs * 0.7);
  }

  const repaint = () => !revealed && !touched && paint();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(repaint);
  new ResizeObserver(repaint).observe(card);

  const pos = (e) => {
    const r = cv.getBoundingClientRect();
    return [((e.clientX - r.left) * w) / r.width, ((e.clientY - r.top) * h) / r.height];
  };

  const stroke = (a, b) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(34, w * 0.1);
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0] + 0.01, b[1]);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
  };

  const check = () => {
    const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
    let clear = 0,
      total = 0;
    for (let i = 3; i < d.length; i += 4 * 29) {
      total++;
      if (d[i] < 40) clear++;
    }
    if (clear / total > 0.5) reveal();
  };

  function reveal() {
    if (revealed) return;
    revealed = true;
    sec.classList.add("revealed");
    if (navigator.vibrate) navigator.vibrate([16, 40, 16]);
    const s = sec.getBoundingClientRect();
    const r = card.getBoundingClientRect();
    if (state.fields.date) {
      state.fields.date.burst(r.left - s.left + r.width / 2, r.top - s.top + r.height / 2, 44, true);
    }
  }

  cv.addEventListener("pointerdown", (e) => {
    if (revealed) return;
    down = touched = true;
    last = pos(e);
    try {
      cv.setPointerCapture(e.pointerId);
    } catch (_) {}
    stroke(last, last);
  });

  cv.addEventListener("pointermove", (e) => {
    if (!down || revealed) return;
    const p = pos(e);
    stroke(last, p);
    last = p;
    if (++moves % 5 === 0) check();
  });

  const up = () => {
    if (!down) return;
    down = false;
    check();
  };

  cv.addEventListener("pointerup", up);
  cv.addEventListener("pointercancel", up);
}
