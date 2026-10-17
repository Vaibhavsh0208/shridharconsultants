// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Needed for absolute URLs
  site: "https://shridharconsultants.in",
  // Every page lives at /name/, which is also what the canonical tags say
  trailingSlash: "always",
});
