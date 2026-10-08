/* eslint-disable node/prefer-global/process */
import { fileURLToPath, URL } from "node:url";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import UnoCSS from "unocss/vite";
import { defineConfig, loadEnv } from "vite";
import { postcssIsolateStyles } from "vitepress";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: fileURLToPath(new URL("./tailwind.config.js", import.meta.url)),
          }),
          autoprefixer(),
          // Keep VitePress prose styles (`.vp-doc h1`, `.vp-doc p`, …) out of `.vp-raw` demo areas.
          postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] }),
        ],
      },
    },
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
      // UnoCSS is typed against root Vite+; VitePress uses Vite 5 here.
    ] as never,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
