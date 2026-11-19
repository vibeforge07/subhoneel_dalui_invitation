import fs from "node:fs";
import crypto from "node:crypto";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// WhatsApp and Facebook only show the link picture when og:image is a full https:// address.
// On Vercel the production domain comes from Vercel itself; elsewhere set SITE_URL (https://your-site.com).
// The ?v= stamp changes whenever the picture changes, so WhatsApp fetches the new one instead of its cached copy.
function linkPreview() {
  const site = (
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "")
  ).replace(/\/$/, "");
  return {
    name: "link-preview",
    transformIndexHtml(html) {
      const file = "public/assets/og-preview.jpg";
      const v = fs.existsSync(file) ? crypto.createHash("md5").update(fs.readFileSync(file)).digest("hex").slice(0, 8) : "1";
      html = html.replaceAll('content="/assets/og-preview.jpg"', `content="${site}/assets/og-preview.jpg?v=${v}"`);
      if (site) html = html.replace('<meta property="og:type"', `<meta property="og:url" content="${site}/">\n  <meta property="og:type"`);
      return html;
    },
  };
}

export default defineConfig({
  plugins: [react(), linkPreview()],
  base: "/",
});
