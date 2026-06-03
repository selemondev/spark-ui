/* eslint-disable node/prefer-global/process */
import { fileURLToPath, URL } from "node:url";
import UnoCSS from "unocss/vite";
import { defineConfig, loadEnv } from "vite";

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
      // UnoCSS is typed against root Vite+; VitePress uses Vite 5 here.
    ] as never,
    resolve: {
      alias: {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
