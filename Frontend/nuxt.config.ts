import { defineNuxtConfig } from "nuxt/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],

  vite: {
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "AgriLink",
          short_name: "AgriLink",
          start_url: "/",
          scope: "/",
          display: "standalone",
          background_color: "#ffffff",
          theme_color: "#ffffff",
          icons: [
            {
              src: "/icons/android-icon-144x144.png",
              sizes: "144x144",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "/icons/android-icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any maskable",
            },
            {
              src: "/icons/512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
          screenshots: [
            {
              src: "/screenshots/screenshot1.png",
              sizes: "1080x1920",
              type: "image/png",
              form_factor: "wide",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
          navigateFallback: "https://agri-link-start-up-code-base.vercel.app/",
          navigateFallbackDenylist: [/^\/nuxt\//, /\/api\//],
        },
        includeAssets: [
          "favicon.ico",
          "robots.txt",
          "apple-touch-icon.png",
          "mask-icon.svg",
        ],
        srcDir: "public",
      }),
    ],
  },

  app: {
    head: {
      link: [{ rel: "manifest", href: "/manifest.json" }],
    },
  },
});
