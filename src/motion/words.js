import { ScrollTrigger } from "gsap/ScrollTrigger";
import state, { C, root, $, $$, G, lite, esc, mapsLink, enc, Ornaments } from "./state.js";

export function initWords() {
  if (lite) root.classList.add("is-lite");
  if (G) ScrollTrigger.config({ ignoreMobileResize: true });

  root.classList.add("is-locked");
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  scrollTo(0, 0);

  const get = (p) => p.split(".").reduce((o, k) => (o == null ? o : o[k]), C);
  $$("[data-k]").forEach((n) => {
    const v = get(n.dataset.k);
    if (v != null) n.textContent = v;
  });
  document.title = `${C.couple.bride.first} & ${C.couple.groom.first} · শুভ বিবাহ`;

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  const [ia, ir] = C.couple.initials.map(esc);
  const monogram = `<svg viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <circle cx="60" cy="60" r="51" fill="none" stroke="currentColor" stroke-width=".6" opacity=".7"/>
      <text x="39" y="74" text-anchor="middle" font-family="Cinzel, serif" font-weight="600" font-size="40" fill="currentColor">${ia}</text>
      <text x="81" y="74" text-anchor="middle" font-family="Cinzel, serif" font-weight="600" font-size="40" fill="currentColor">${ir}</text>
      <path d="M60 50l4.5 7-4.5 7-4.5-7z" fill="currentColor"/>
      <path d="M60 30v10M60 74v16" stroke="currentColor" stroke-width=".8" opacity=".7"/>
    </svg>`;
  $$("[data-mono]").forEach((n) => (n.innerHTML = monogram));

  // the wedding card's pages. They are built once here and moved into leaves by the card scene
  // (paired two to a leaf on desktop, one per leaf on phones).
  const K = C.card;
  const corners = ["tl", "tr", "bl", "br"]
    .map((c) => `<svg class="cp__c cp__c--${c}"><use href="#corner"/></svg>`)
    .join("");
  const family = (s) =>
    `<p class="cp__kicker">${esc(s.title)}</p>` +
    `<svg class="cp__flourish"><use href="#flourish"/></svg>` +
    `<p class="cp__greet">${esc(C.letter.greeting)}</p>` +
    s.body.map((p) => `<p class="cp__body">${esc(p)}</p>`).join("") +
    `<p class="cp__sign">${esc(C.letter.sign)}<b>${esc(s.from)}</b><span>${esc(s.place)}</span></p>`;
  const W0 = C.wedding;
  const pageHTML = {
    cover:
      `<div class="cp__band"></div>` +
      `<svg class="cp__fly"><use href="#butterfly"/></svg>` +
      `<p class="cp__inv">শ্রী শ্রী প্রজাপতয়ে নমঃ</p>` +
      `<p class="cp__big foil">শুভ বিবাহ</p>` +
      `<svg class="cp__flourish"><use href="#flourish"/></svg>` +
      `<p class="cp__names">${esc(K.bride)}<i>ও</i>${esc(K.groom)}</p>` +
      `<p class="cp__date">${esc(W0.short)}</p>`,
    mantra:
      `<svg class="cp__lotus"><use href="#lotusline"/></svg>` +
      `<p class="cp__kicker">শুভ পরিণয়ের মন্ত্র</p>` +
      `<div class="cp__mantra">${K.mantra.map((l) => `<p>${esc(l)}</p>`).join("")}</div>` +
      `<svg class="cp__flourish"><use href="#flourish"/></svg>` +
      `<p class="cp__meaning">${esc(K.mantraMeaning).replace(/\n/g, "<br>")}</p>` +
      `<svg class="cp__fly cp__fly--sm"><use href="#butterfly"/></svg>`,
    photo:
      `<p class="cp__kicker">শুভ পরিণয়</p>` +
      `<figure class="cp__photo"><img data-asset="couple" alt="${esc(K.bride)} ও ${esc(K.groom)}" loading="lazy" decoding="async"></figure>` +
      `<p class="cp__pair">${esc(K.bride)}<i>&amp;</i>${esc(K.groom)}</p>` +
      `<svg class="cp__flourish"><use href="#flourish"/></svg>`,
    bride: family(K.brideSide),
    groom: family(K.groomSide),
    day:
      `<p class="cp__kicker">শুভ দিন</p>` +
      `<svg class="cp__flourish"><use href="#flourish"/></svg>` +
      `<p class="cp__day">${esc(W0.bnDay)}</p>` +
      `<p class="cp__dayBig">${esc(W0.bnDate)}<span>${esc(W0.bnYear)}</span></p>` +
      (W0.banglaDate ? `<p class="cp__bdate">${esc(W0.banglaDate)}</p>` : "") +
      `<p class="cp__lagna">${esc(W0.bnLagna)}</p>` +
      `<svg class="cp__lotus cp__lotus--sm"><use href="#lotusline"/></svg>` +
      `<p class="cp__venue">${esc(C.venue.name)}<span>${esc(C.venue.address)}</span></p>` +
      `<p class="cp__come">আসবেন কিন্তু</p>`,
    families:
      `<svg class="cp__fly"><use href="#butterfly"/></svg>` +
      `<p class="cp__kicker">শুভেচ্ছান্তে</p>` +
      `<p class="cp__fam">${esc(C.families)}</p>` +
      `<svg class="cp__flourish"><use href="#flourish"/></svg>` +
      `<p class="cp__date">${esc(W0.short)}</p>`,
  };
  const cardPages = {};
  for (const [k, html] of Object.entries(pageHTML)) {
    cardPages[k] = el(
      "div",
      `cp cp--${k}`,
      `<div class="cp__frame"></div>${corners}<div class="cp__in">${html}</div>`
    );
  }
  state.cardPages = cardPages;

  // park them in the book until the scene arranges them, so the image loader below finds the couple photo
  const leavesBox = $("#bookLeaves");
  if (leavesBox) {
    Object.values(cardPages).forEach((p) => leavesBox.appendChild(p));
  }

  // calendar card
  (function calendar() {
    const W = C.wedding;
    const grid = $("#calGrid");
    if (!grid) return;
    ["S", "M", "T", "W", "T", "F", "S"].forEach((d) => grid.appendChild(el("span", "cal__wd", d)));
    const first = new Date(W.year, W.monthIndex, 1).getDay();
    const days = new Date(W.year, W.monthIndex + 1, 0).getDate();
    const prevDays = new Date(W.year, W.monthIndex, 0).getDate();
    for (let i = first - 1; i >= 0; i--) grid.appendChild(el("span", "cal__d is-off", String(prevDays - i)));
    for (let d = 1; d <= days; d++) {
      const s = el("span", "cal__d" + (d === W.day ? " is-day" : ""), String(d));
      if (d === W.day)
        s.insertAdjacentHTML(
          "beforeend",
          `<svg viewBox="0 0 60 44" aria-hidden="true"><path pathLength="1" d="M33 4C17 3 4 11 5 23c1 12 16 18 29 17c13-1 23-8 22-19C55 10 44 4 30 5c-6 .4-11 2-14 4"/></svg>`
        );
      grid.appendChild(s);
    }
    const tail = (7 - ((first + days) % 7)) % 7;
    for (let d = 1; d <= tail; d++) grid.appendChild(el("span", "cal__d is-off", String(d)));
  })();

  // gallery frames
  const galTrack = $("#galTrack");
  if (galTrack) {
    C.gallery.forEach((g) => {
      galTrack.appendChild(
        el(
          "figure",
          `gitem gitem--${esc(g.shape)}`,
          `<div class="plight" aria-hidden="true"><i></i></div>
           <div class="gframe"><div class="gframe__mat"><div class="gframe__photo">
             <img data-asset="${esc(g.img)}" alt="${esc(g.place)}" loading="lazy" decoding="async">
             <div class="gframe__empty"><b>${esc(g.place)}</b></div>
           </div></div></div>
           <figcaption class="plaque"><b>${esc(g.place)}</b><span>${esc(g.caption)}</span></figcaption>`
        )
      );
    });
  }

  // event cards: arched windows with the event picture on top
  const eventGrid = $("#eventGrid");
  if (eventGrid) {
    C.events.forEach((e) => {
      eventGrid.appendChild(
        el(
          "article",
          "ev",
          `<div class="arch arch--card" data-arch data-lobes="2" data-spring=".46">
             <div class="arch__inner">
               <div class="ev__media"><img data-asset="${esc(e.img)}" alt="${esc(e.en)}" loading="lazy" decoding="async">
                 <div class="ev__empty"><svg aria-hidden="true"><use href="#i-${esc(e.icon)}"/></svg></div></div>
               <div class="ev__body">
                 <h3 class="ev__bn">${esc(e.bn)}</h3><p class="ev__en">${esc(e.en)}</p>
                 <p class="ev__when">${esc(e.when)}</p><p class="ev__where">${esc(e.where)}</p>
                 <p class="ev__note">${esc(e.note)}</p>
                 <a class="btn btn--line" href="${mapsLink(e.mapQuery)}" target="_blank" rel="noopener"><svg><use href="#i-pin"/></svg>Directions</a>
               </div>
             </div>
           </div>`
        )
      );
    });
  }

  // wedding night
  const tl = $("#timeline");
  const tlItems = C.night.map((n) => {
    const li = el(
      "li",
      "tl__item",
      `<span class="tl__time">${esc(n.time)}</span>
       <span class="tl__node"><span class="tl__glow"></span><svg class="tl__diya"><use href="#diya"/></svg><span class="tl__flame"></span></span>
       <div class="tl__card"><h3 class="foil">${esc(n.title)}</h3><p class="tl__bn">${esc(n.bn)}</p><p>${esc(n.note)}</p></div>`
    );
    if (tl) tl.appendChild(li);
    return li;
  });
  state.tlItems = tlItems;

  const swatchesEl = $("#swatches");
  if (swatchesEl && C.dress && C.dress.swatches) {
    C.dress.swatches.forEach((s) =>
      swatchesEl.appendChild(el("div", "sw", `<i style="--c:${esc(s.hex)}"></i><span>${esc(s.name)}</span>`))
    );
  }

  const mapFrame = $("#mapFrame");
  if (mapFrame) mapFrame.src = `https://maps.google.com/maps?q=${enc(C.venue.mapQuery)}&z=14&output=embed`;
  const mapBtn = $("#mapBtn");
  if (mapBtn) mapBtn.href = mapsLink(C.venue.mapQuery);
  const calBtn = $("#calBtn");
  if (calBtn) {
    calBtn.href = (() => {
      const f = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
      const W = C.wedding;
      return (
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${enc(`${C.couple.bride.first} & ${C.couple.groom.first}'s wedding`)}` +
        `&dates=${f(W.startISO)}/${f(W.endISO)}&details=${enc(`Lagna ${W.lagna}`)}&location=${enc(`${C.venue.name}, ${C.venue.address}`)}`
      );
    })();
  }

  // big names: one span per letter, gold that follows the light
  const names = $$(".name[data-split]");
  names.forEach((n) => {
    const text = n.textContent;
    n.setAttribute("aria-label", text);
    n.textContent = "";
    [...text].forEach((ch) => n.appendChild(el("span", "ch", ch === " " ? "&nbsp;" : esc(ch))));
  });
  state.names = names;

  // read every size first, then write: mixing them makes the browser recompute styles per letter
  const layoutFoil = () => {
    const m = names.map((n) => ({
      n,
      w: n.offsetWidth,
      h: n.offsetHeight,
      chs: $$(".ch", n).map((c) => [c, c.offsetLeft, c.offsetTop]),
    }));
    m.forEach(({ n, w, h, chs }) => {
      n.style.setProperty("--W", `${w}px`);
      n.style.setProperty("--H", `${h}px`);
      chs.forEach(([c, x, y]) => {
        c.style.setProperty("--ox", `${x}px`);
        c.style.setProperty("--oy", `${y}px`);
      });
    });
  };
  state.layoutFoil = layoutFoil;

  // section titles: one span per word
  $$("[data-words]").forEach((h) => {
    h.innerHTML = h.textContent
      .trim()
      .split(/\s+/)
      .map((w) => `<span class="w"><span class="w__i">${esc(w)}</span></span>`)
      .join(" ");
  });

  // arches, bells, card corners
  Ornaments.mount();
}
