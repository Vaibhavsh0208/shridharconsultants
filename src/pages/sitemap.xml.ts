import type { APIRoute } from "astro";
import { site } from "../config/site";

// Served at /sitemap.xml, the address the old site already advertised in robots.txt.
// It is built from the files in src/pages, so a new page is listed without editing this.

// "./about.astro" -> "/about/", "./index.astro" -> "/", "./hi/faq.astro" -> "/hi/faq/"
const routes = Object.keys(import.meta.glob("./**/*.astro"))
  .map((file) =>
    file
      .replace(/^\.\//, "")
      .replace(/\.astro$/, "")
      .replace(/(^|\/)index$/, ""),
  )
  .filter((route) => route !== "404" && route !== "hi/404")
  .map((route) => (route === "" ? "/" : `/${route}/`));

const isHindi = (path: string) => path.startsWith("/hi/");
const hindiOf = (path: string) => (path === "/" ? "/hi/" : `/hi${path}`);
const englishPages = routes.filter((path) => !isHindi(path)).sort();
const url = (path: string) => `${site.url}${path}`;

// Each page is listed in both languages, and each entry points at both versions
const entries = englishPages.flatMap((en) => {
  const hi = hindiOf(en);
  if (!routes.includes(hi)) return [`  <url><loc>${url(en)}</loc></url>`];
  const alternates = [
    `<xhtml:link rel="alternate" hreflang="en" href="${url(en)}"/>`,
    `<xhtml:link rel="alternate" hreflang="hi" href="${url(hi)}"/>`,
    `<xhtml:link rel="alternate" hreflang="x-default" href="${url(en)}"/>`,
  ].join("");
  return [en, hi].map((path) => `  <url><loc>${url(path)}</loc>${alternates}</url>`);
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;

export const GET: APIRoute = () =>
  new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
