import { $, C } from "./state.js";

export function initShare() {
  const shareBtn = $("#shareBtn");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", async (e) => {
    const b = e.currentTarget;
    const url = location.href.split("?")[0];
    const data = {
      title: document.title,
      text: `${C.couple.bride.first} & ${C.couple.groom.first}-এর বিয়ের নিমন্ত্রণ`,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch (_) {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      const label = b.lastChild;
      const was = label.textContent;
      label.textContent = "Link copied";
      setTimeout(() => (label.textContent = was), 2200);
    } catch (_) {}
  });
}
