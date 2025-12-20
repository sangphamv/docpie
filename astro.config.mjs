// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { modifiedTime, readingTime } from "./src/lib/utils/remarks.mjs";
import { SITE } from "./src/lib/config";
import keystatic from "@keystatic/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";
import pagefind from "astro-pagefind";
import robotsTxt from "astro-robots-txt";

const { RUN_KEYSTATIC } = loadEnv(import.meta.env.MODE, process.cwd(), "");

// Only add Keystatic in development mode
const integrations = [mdx(), sitemap(), pagefind(), robotsTxt({
  policy: [{ userAgent: "*", allow: "/" }],
  sitemap: `${SITE.url}/sitemap-index.xml`,
  host: SITE.url,
})];

// Only add Keystatic and React if explicitly enabled
if (RUN_KEYSTATIC === "true" && import.meta.env.DEV) {
  integrations.push(react());
  integrations.push(keystatic());
}

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  base: SITE.basePath,
  output: 'static',
  prerender: {
    crawlLinks: true,
    routes: ['/', '404'],
  },
  markdown: {
    remarkPlugins: [readingTime, modifiedTime],
    shikiConfig: {
      theme: "rose-pine-moon",
    },
  },
  image: {
    responsiveStyles: true,
    breakpoints: [640, 1024],
  },
  integrations,
  vite: {
    plugins: [tailwindcss()],
  },
});
