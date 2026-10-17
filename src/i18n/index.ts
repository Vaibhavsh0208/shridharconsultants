import { en } from "./en";
import { hi } from "./hi";

export type Lang = "en" | "hi";
export type Content = typeof en;

const content: Record<Lang, Content> = { en, hi };

export const languages: Lang[] = ["en", "hi"];
export const otherLang = (lang: Lang): Lang => (lang === "en" ? "hi" : "en");

export function getContent(lang: Lang): Content {
  return content[lang];
}

// "/about" -> "/about/" for English and "/hi/about/" for Hindi. Always ends in a slash,
// because that is the form each page's canonical URL uses (links to the other form
// would cost an extra redirect).
export function localePath(path: string, lang: Lang): string {
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return lang === "en" ? withSlash : `/hi${withSlash}`;
}

// "/hi/about/" -> "/about/" (the English version of whatever page we are on)
export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/hi(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}
