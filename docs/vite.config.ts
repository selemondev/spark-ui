/* eslint-disable node/prefer-global/process */
import { fileURLToPath, URL } from "node:url";
import UnoCSS from "unocss/vite";
import { defineConfig, loadEnv } from "vite-plus";
import { vitePostHog } from "vite-plugin-posthog";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    optimizeDeps: {
      exclude: ["vitepress"],
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      UnoCSS(),
      vitePostHog({
        apiKey: process.env.VITE_POSTHOG_API_KEY!,
        hostUrl: process.env.VITE_POSTHOG_API_HOST!,
        config: {
          autocapture: true,
          capture_pageview: true,
        },
      }),
    ],
    resolve: {
      alias: {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
