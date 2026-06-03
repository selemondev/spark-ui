import type { EnhanceAppContext } from "vitepress";
import { MotionPlugin } from "@vueuse/motion";
import Theme from "vitepress/theme";
import { h, watch } from "vue";
import DemoBlock from "../components/demo-block";
import HomeLayout from "./HomeLayout.vue";
import { initWebMCP } from "./webmcp";
import "virtual:group-icons.css";
import "./overrides.css";
import "./rainbow.css";
import "./style.css";
import "./tailwind.css";
import "uno.css";

let homePageStyle: HTMLStyleElement | undefined;
export default {
  extend: Theme,
  Layout: () => {
    return h(HomeLayout, null, {});
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    app.component("Demo", DemoBlock);
    app.use(MotionPlugin);
    if (typeof window === "undefined") return;

    // Initialize WebMCP for AI agent integration
    initWebMCP();

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === "/"),
      { immediate: true },
    );
  },
};

function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return;

    homePageStyle = document.createElement("style");
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`;
    document.body.appendChild(homePageStyle);
  } else {
    if (!homePageStyle) return;

    homePageStyle.remove();
    homePageStyle = undefined;
  }
}
