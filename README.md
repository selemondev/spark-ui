<p align="center">
  <img src="https://api.iconify.design/noto:magic-wand.svg" width="72" alt="Spark UI" />
</p>

<h1 align="center">Spark UI</h1>

<p align="center">
  Animated Vue 3 components you can copy, paste, and ship — built with TypeScript, Tailwind CSS, and <a href="https://motion.vueuse.org/">@vueuse/motion</a>.
</p>

<p align="center">
  <a href="https://spark-ui.vercel.app"><strong>Documentation</strong></a>
  ·
  <a href="https://spark-ui.vercel.app/content/components/animated-beam.html">Components</a>
  ·
  <a href="https://spark-ui.vercel.app/content/guide/getting-started/installation.html">Installation</a>
  ·
  <a href="https://github.com/selemondev/spark-ui/issues">Report a bug</a>
</p>

## Live demos

Every component in the docs is interactive — open a page, tweak the preview, and copy the source. Here are a few highlights:

<p align="center">
  <a href="https://spark-ui.vercel.app/content/components/animated-beam.html"><strong>Animated Beam</strong></a>
  &nbsp;·&nbsp;
  <a href="https://spark-ui.vercel.app/content/components/globe.html"><strong>Globe</strong></a>
  &nbsp;·&nbsp;
  <a href="https://spark-ui.vercel.app/content/components/aurora.html"><strong>Aurora Text</strong></a>
  &nbsp;·&nbsp;
  <a href="https://spark-ui.vercel.app/content/components/meteors.html"><strong>Meteors</strong></a>
  &nbsp;·&nbsp;
  <a href="https://spark-ui.vercel.app/content/components/terminal.html"><strong>Terminal</strong></a>
  &nbsp;·&nbsp;
  <a href="https://spark-ui.vercel.app/content/components/marquee.html"><strong>Marquee</strong></a>
</p>

| Component                                                           | What it does               | Live demo                                                                       |
| ------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------- |
| [Animated Beam](./docs/content/components/animated-beam.md)         | SVG beams between nodes    | [Open →](https://spark-ui.vercel.app/content/components/animated-beam.html)     |
| [Globe](./docs/content/components/globe.md)                         | Interactive 3D-style globe | [Open →](https://spark-ui.vercel.app/content/components/globe.html)             |
| [Aurora Text](./docs/content/components/aurora.md)                  | Gradient aurora typography | [Open →](https://spark-ui.vercel.app/content/components/aurora.html)            |
| [Hero Video Dialog](./docs/content/components/hero-video-dialog.md) | Video reveal in a dialog   | [Open →](https://spark-ui.vercel.app/content/components/hero-video-dialog.html) |
| [Bento Grid](./docs/content/components/bento-grid.md)               | Animated bento layout      | [Open →](https://spark-ui.vercel.app/content/components/bento-grid.html)        |
| [Orbiting Circles](./docs/content/components/orbiting-circles.md)   | Icons orbiting a center    | [Open →](https://spark-ui.vercel.app/content/components/orbiting-circles.html)  |
| [Animated Tooltip](./docs/content/components/animated-tooltip.md)   | Shared-layout tooltips     | [Open →](https://spark-ui.vercel.app/content/components/animated-tooltip.html)  |
| [Resizable Navbar](./docs/content/components/resizable-navbar.md)   | Scroll-aware navigation    | [Open →](https://spark-ui.vercel.app/content/components/resizable-navbar.html)  |

Browse all **26 components** on the [components index](https://spark-ui.vercel.app/content/components/animated-beam.html) (use the sidebar on the docs site).

## Features

- **Copy & paste** — Drop components into any Vue 3 + Tailwind project; no opaque runtime package required.
- **TypeScript-first** — Typed props and patterns that work with `vue-tsc`.
- **Motion-ready** — Animations powered by [@vueuse/motion](https://motion.vueuse.org/) (and compatible with related motion libraries where noted per component).
- **Magic UI lineage** — Officially inspired by [Magic UI](https://magicui.design/), plus pieces from [NuxtHub](https://hub.nuxt.com/), [Syntax UI](https://syntaxui.com/), and community ports.
- **Documented** — Each component page includes a live preview, source tab, and install notes.

## Quick start

1. Read the [installation guide](https://spark-ui.vercel.app/content/guide/getting-started/installation.html) (Vue 3, Tailwind, `@vueuse/motion`).
2. Open the component you want in the docs.
3. Copy the Vue source from the preview into your app and adjust paths or tokens as needed.

Minimal motion setup:

```ts
import { createApp } from "vue";
import { MotionPlugin } from "@vueuse/motion";
import App from "./App.vue";

createApp(App).use(MotionPlugin).mount("#app");
```

## Development

This repo is a pnpm monorepo. Tooling is managed with [Vite+](https://viteplus.dev/) (`vp` CLI).

```bash
pnpm install
vp install          # sync Vite+ toolchain after pull
pnpm docs:dev       # docs at http://localhost:5555
vp check            # format, lint, and typecheck
vp test             # unit tests
pnpm build          # production docs build
```

See [AGENTS.md](./AGENTS.md) for agent-oriented workflow notes after the Vite+ migration.

## All components

|                                                                                                |                                                                                                      |                                                                                                      |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Animated Beam](https://spark-ui.vercel.app/content/components/animated-beam.html)             | [Animated Gradient Text](https://spark-ui.vercel.app/content/components/animated-gradient-text.html) | [Animated List](https://spark-ui.vercel.app/content/components/animated-list.html)                   |
| [Animated Shiny Text](https://spark-ui.vercel.app/content/components/animated-shiny-text.html) | [Animated Tooltip](https://spark-ui.vercel.app/content/components/animated-tooltip.html)             | [Aurora Text](https://spark-ui.vercel.app/content/components/aurora.html)                            |
| [Avatar Circles](https://spark-ui.vercel.app/content/components/avatar-circles.html)           | [Bento Grid](https://spark-ui.vercel.app/content/components/bento-grid.html)                         | [Blur Fade](https://spark-ui.vercel.app/content/components/blur-fade.html)                           |
| [Blur In](https://spark-ui.vercel.app/content/components/blur-in.html)                         | [Dot Pattern](https://spark-ui.vercel.app/content/components/dot-pattern.html)                       | [Globe](https://spark-ui.vercel.app/content/components/globe.html)                                   |
| [Gradual Spacing](https://spark-ui.vercel.app/content/components/gradual-spacing.html)         | [Hero Video Dialog](https://spark-ui.vercel.app/content/components/hero-video-dialog.html)           | [Letter Up](https://spark-ui.vercel.app/content/components/letter-up.html)                           |
| [Marquee](https://spark-ui.vercel.app/content/components/marquee.html)                         | [Meteors](https://spark-ui.vercel.app/content/components/meteors.html)                               | [Orbiting Circles](https://spark-ui.vercel.app/content/components/orbiting-circles.html)             |
| [Particles](https://spark-ui.vercel.app/content/components/particles.html)                     | [Resizable Navbar](https://spark-ui.vercel.app/content/components/resizable-navbar.html)             | [Retro Grid](https://spark-ui.vercel.app/content/components/retro-grid.html)                         |
| [Ripple](https://spark-ui.vercel.app/content/components/ripple.html)                           | [Scroll Progress](https://spark-ui.vercel.app/content/components/scroll-progress.html)               | [Skewed Infinite Scroll](https://spark-ui.vercel.app/content/components/skewed-infinite-scroll.html) |
| [Terminal](https://spark-ui.vercel.app/content/components/terminal.html)                       | [Typing Animation](https://spark-ui.vercel.app/content/components/typing-animation.html)             |                                                                                                      |

## Why Spark UI?

Spark UI fills a gap in the Vue ecosystem: polished, animated marketing and app UI blocks that were easy to find for React but harder to source for Vue. It combines inspiration from [Magic UI](https://magicui.design/), [Aceternity UI](https://ui.aceternity.com/), [NuxtHub](https://hub.nuxt.com/), [Syntax UI](https://syntaxui.com/), and community work into one copy-paste-friendly collection.

Also worth exploring: [Inspira UI](https://inspira-ui.com/).

## Credits

- [Magic UI](https://magicui.design/) — components and inspiration
- [Aceternity UI](https://ui.aceternity.com/) — design inspiration
- [Syntax UI](https://syntaxui.com/) — additional components
- [VitePress](https://vitepress.dev/) — documentation site
- [UnoCSS](https://unocss.dev/) — styling in docs
- [NuxtHub](https://hub.nuxt.com/) — particles component
- [Shadcn Vue](https://www.shadcn-vue.com/) — patterns
- [Shiki](https://shiki.style/) — syntax highlighting

## Contributing

Contributions are welcome. Please read the [Code of Conduct](./CODE_OF_CONDUCT.md) and [Contributing Guide](./CONTRIBUTING.md), then open an issue or pull request on [GitHub](https://github.com/selemondev/spark-ui).

## License

[MIT](./LICENSE) © [Selemondev](https://github.com/selemondev)
