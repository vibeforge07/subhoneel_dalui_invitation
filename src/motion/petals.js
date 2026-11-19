import state, { $$, reduced, lite, clamp } from "./state.js";

const SPRITES = [
  ["#dc3d52", "#7a0b1b"],
  ["#c4233a", "#5a0713"],
  ["#e35a6d", "#8c1323"],
  ["#b51a2f", "#4c050f"],
].map(([a, b]) => {
  const c = document.createElement("canvas");
  c.width = 44;
  c.height = 50;
  const x = c.getContext("2d");
  x.translate(22, 25);
  const g = x.createRadialGradient(-5, -7, 2, 0, 0, 26);
  g.addColorStop(0, a);
  g.addColorStop(1, b);
  x.fillStyle = g;
  x.beginPath();
  x.moveTo(0, 23);
  x.bezierCurveTo(-21, 11, -20, -17, -7, -22);
  x.quadraticCurveTo(0, -16, 7, -22);
  x.bezierCurveTo(20, -17, 21, 11, 0, 23);
  x.fill();
  return c;
});

export class Petals {
  static image = null;

  constructor(canvas, ambient, o = {}) {
    this.c = canvas;
    this.x = canvas.getContext("2d");
    this.p = [];
    this.ambient = ambient;
    this.small = !!o.small; // petals at mixed depths (smaller = further away)
    this.maxDpr = o.maxDpr || 2;
    this.paused = false; // no new ambient petals; the ones in the air finish falling
    this.wind = 0; // extra vertical speed in px/s (negative = upwards), set from the scroll speed
    this.want = false;
    this.visible = false;
    this.raf = 0;
    this.t = 0;
    this.px = -999;
    this.py = -999;
    this.pt = 0;
    this.resize();
    new ResizeObserver(() => this.resize()).observe(canvas);
    new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting;
      if (this.visible) this.run();
    }).observe(canvas);
  }

  resize() {
    const r = this.c.getBoundingClientRect();
    this.dpr = Math.min(devicePixelRatio || 1, this.maxDpr);
    this.w = r.width;
    this.h = r.height;
    this.c.width = Math.round(r.width * this.dpr);
    this.c.height = Math.round(r.height * this.dpr);
  }

  pointer(x, y) {
    this.px = x;
    this.py = y;
    this.pt = performance.now();
  }

  make(x, y, vx, vy, burst) {
    const depth = this.small && !burst ? 0.45 + Math.random() * 0.75 : 1;
    return {
      x,
      y,
      vx,
      vy,
      burst,
      depth,
      size: (12 + Math.random() * 14) * depth,
      sprite: SPRITES[(Math.random() * SPRITES.length) | 0],
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 2.4,
      ph: Math.random() * 6,
      vf: 1.4 + Math.random() * 2.4,
      sway: 14 + Math.random() * 26,
      sf: 0.6 + Math.random() * 1.2,
      term: 36 + Math.random() * 42,
      age: 0,
      life: burst ? 5 + Math.random() * 3 : Infinity,
    };
  }

  start() {
    if (reduced || this.want) return;
    this.want = true;
    for (let i = 0; i < this.ambient * 0.5; i++)
      this.p.push(this.make(Math.random() * this.w, Math.random() * this.h * 0.7, 0, 30, false));
    this.run();
  }

  burst(x, y, n, gold) {
    if (reduced) return;
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.7;
      const sp = 180 + Math.random() * 440;
      this.p.push(this.make(x, y, Math.cos(a) * sp, Math.sin(a) * sp, true));
    }
    if (gold)
      for (let i = 0; i < 46; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 60 + Math.random() * 320;
        this.p.push({
          spark: true,
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 120,
          age: 0,
          life: 1.3 + Math.random() * 1.5,
          size: 1.5 + Math.random() * 3,
        });
      }
    this.run();
  }

  ring(x, y) {
    if (reduced) return;
    this.p.push({ ring: true, x, y, age: 0, life: 0.95 });
    this.run();
  }

  run() {
    if (this.raf) return;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      this.step(dt);
      const busy = this.p.some((p) => p.burst || p.spark || p.ring);
      const keep = (this.visible && (this.want || this.p.length)) || busy;
      this.raf = keep ? requestAnimationFrame(loop) : 0;
      if (!this.raf) this.x.clearRect(0, 0, this.c.width, this.c.height);
    };
    this.raf = requestAnimationFrame(loop);
  }

  step(dt) {
    this.t += dt;
    const { x, w, h, dpr } = this;
    if (this.want && this.visible && !this.paused) {
      const falling = this.p.reduce((n, p) => n + (p.burst || p.spark || p.ring ? 0 : 1), 0);
      // when a fast scroll blows the petals upwards, new ones come in from below
      if (falling < this.ambient && Math.random() < dt * 3)
        this.p.push(this.make(Math.random() * w, this.wind < -60 ? h + 30 : -30, 0, 30, false));
    }
    const near = performance.now() - this.pt < 1200;
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.clearRect(0, 0, this.c.width, this.c.height);
    const img = Petals.image;
    const keep = [];
    for (const p of this.p) {
      p.age += dt;
      if (p.ring) {
        const k = p.age / p.life;
        if (k >= 1) continue;
        const e = 1 - Math.pow(1 - k, 3);
        x.setTransform(dpr, 0, 0, dpr, p.x * dpr, p.y * dpr);
        x.globalAlpha = (1 - k) * 0.85;
        x.strokeStyle = "#f6dd94";
        x.lineWidth = 2.2 * (1 - k) + 0.4;
        x.beginPath();
        x.arc(0, 0, 8 + 74 * e, 0, Math.PI * 2);
        x.stroke();
        x.globalAlpha = (1 - k) * 0.35;
        x.beginPath();
        x.arc(0, 0, 4 + 44 * e, 0, Math.PI * 2);
        x.stroke();
        keep.push(p);
        continue;
      }
      if (p.spark) {
        p.vy += 260 * dt;
        p.vx *= Math.pow(0.2, dt);
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const a = clamp(1 - p.age / p.life, 0, 1) * (0.6 + 0.4 * Math.sin(p.age * 30));
        if (a <= 0) continue;
        x.setTransform(dpr, 0, 0, dpr, p.x * dpr, p.y * dpr);
        x.globalAlpha = a;
        x.fillStyle = "#f6dd94";
        const s = p.size;
        x.beginPath();
        x.moveTo(0, -s * 2);
        x.quadraticCurveTo(0, 0, s * 2, 0);
        x.quadraticCurveTo(0, 0, 0, s * 2);
        x.quadraticCurveTo(0, 0, -s * 2, 0);
        x.quadraticCurveTo(0, 0, 0, -s * 2);
        x.fill();
        keep.push(p);
        continue;
      }
      if (p.burst) {
        p.vy = Math.min(p.vy + 520 * dt, p.term);
        p.vx *= Math.pow(0.25, dt);
      } else {
        p.vy = p.term;
        p.vx *= Math.pow(0.12, dt);
      }
      if (near) {
        const dx = p.x - this.px,
          dy = p.y - this.py;
        const d = Math.hypot(dx, dy);
        if (d < 150 && d > 0.1) {
          const f = (1 - d / 150) * 1400 * dt;
          p.vx += (dx / d) * f;
          p.y += (dy / d) * f * 0.03;
          p.vr += (dx > 0 ? 1 : -1) * f * 0.004;
        }
      }
      p.x += (p.vx + Math.sin(this.t * p.sf + p.ph) * p.sway) * dt;
      p.y += (p.vy + (p.burst ? 0 : this.wind * p.depth)) * dt;
      p.rot += p.vr * dt * (1 + Math.abs(this.wind) / 400);
      if (p.y > h + 40 || p.y < -70 || (p.burst && p.age > p.life) || p.x < -80 || p.x > w + 80) continue;
      const fade = p.burst
        ? clamp((p.life - p.age) / 1.2, 0, 1)
        : clamp((h - p.y) / 90, 0, 1) * clamp((p.y + 30) / 60, 0, 1);
      const flip = Math.cos(this.t * p.vf + p.ph);
      x.setTransform(dpr, 0, 0, dpr, p.x * dpr, p.y * dpr);
      x.rotate(p.rot);
      x.scale(0.25 + 0.75 * Math.abs(flip), 1);
      x.globalAlpha = 0.95 * fade * (this.small && !p.burst ? 0.45 + 0.45 * p.depth : 1);
      if (img) {
        const s = p.size * 1.3;
        x.drawImage(img, -s / 2, -s / 2, s, s);
      } else {
        const s = p.size / 22;
        x.drawImage(p.sprite, -22 * s, -25 * s, 44 * s, 50 * s);
      }
      keep.push(p);
    }
    x.globalAlpha = 1;
    this.p = keep;
  }
}

export function initPetals() {
  state.Petals = Petals;
  const fields = {};
  $$("canvas[data-petals]").forEach((c) => {
    const kind = c.dataset.petals;
    fields[kind] = new Petals(c, kind === "date" ? 0 : lite ? 8 : 22, { maxDpr: lite ? 1.25 : 2 });
  });
  state.fields = fields;
}
