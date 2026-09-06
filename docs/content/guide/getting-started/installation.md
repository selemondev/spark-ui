---
layout: doc
---

# Installation

Follow the procedures below to install and configure your dependencies. Use **Vue 3.5 or newer**: components use APIs such as `useId` introduced in Vue 3.5. These instructions target **Tailwind CSS 3** and **VueUse Motion 2**, including Nuxt projects. Components using Motion for Vue declare their separate `motion-v` dependency on their installation pages.

## Vue 3

### Create a new Vue 3 project

Start by creating a new Vue 3 project by running the command below in your terminal:

::: code-group

```sh [npm]
npm create vue@latest
```

```sh [yarn]
yarn dlx create-vue@latest
```

```sh [pnpm]
pnpm create vue@latest
```

```sh [bun]
bun create vue@latest
```

:::

This command will install and execute `create-vue`, the official Vue project scaffolding tool. Select your preferred options from the prompts.

### Tailwind

These components use Tailwind CSS 3 configuration and directives. Install the compatible major version rather than Tailwind CSS 4:

::: code-group

```sh [npm]
npm install -D tailwindcss@3 postcss autoprefixer
```

```sh [yarn]
yarn add -D tailwindcss@3 postcss autoprefixer
```

```sh [pnpm]
pnpm add -D tailwindcss@3 postcss autoprefixer
```

```sh [bun]
bun add -D tailwindcss@3 postcss autoprefixer
```

:::

Then generate your `tailwind.config.js` and `postcss.config.js` files by running the command below:

```sh
npx tailwindcss init -p
```

Configure your template paths by adding the following to your `tailwind.config.js` file:

::: code-group

```js{4,5} [tailwind.config.js]
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

:::

Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/assets/css/tailwind.css` file.

```css[tailwind.css]
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Complete the shared [semantic color setup](#semantic-colors) below before copying components.

### Install @vueuse/motion

Install the [@vueuse/motion](https://motion.vueuse.org/) library by running the command below in your terminal:

::: code-group

```sh [npm]
npm install @vueuse/motion@2
```

```sh [yarn]
yarn add @vueuse/motion@2
```

```sh [pnpm]
pnpm add @vueuse/motion@2
```

```sh [bun]
bun add @vueuse/motion@2
```

:::

Then configure it in your `main.ts` or `main.js` file as shown below:

::: code-group

```ts{4,6} [main.ts]
import { createApp } from "vue";
import "./assets/css/tailwind.css";
import App from "./App.vue";
import { MotionPlugin } from '@vueuse/motion'
const app = createApp(App)
app.use(MotionPlugin)
app.mount("#app");
```

:::

### Install Clsx and Tailwind Merge

Install `clsx` and `tailwind-merge` 2, which supports Tailwind CSS 3:

::: code-group

```sh [npm]
npm install clsx tailwind-merge@2
```

```sh [yarn]
yarn add clsx tailwind-merge@2
```

```sh [pnpm]
pnpm add clsx tailwind-merge@2
```

```sh [bun]
bun add clsx tailwind-merge@2
```

:::

Then, in your `./src/lib/utils.ts` file, configure it as shown below:

```ts [utils.ts]
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Component snippets use `@/lib/utils`. Keep the scaffold's `@` alias pointing to `src`, and save each component's Installation files together in `src/components/spark-ui/<component>/`, preserving the documented filenames. Then copy a preview's source as usage code: component imports use `@/components/spark-ui/<component>/<file>.vue`. The preview source is not the component implementation. Adjust imports if you choose a different destination.

## Nuxt 3

#### Create a new Nuxt 3 project

Start by creating a new Nuxt 3 project by running the command below in your terminal:

```sh [npm]
npm create nuxt@latest my-nuxt-app -- -t v3
```

The `v3` template explicitly selects Nuxt 3 rather than the latest major's different directory layout. See the [Nuxt 3 installation guide](https://nuxt.com/docs/3.x/getting-started/installation).

#### Tailwind

Install the Tailwind CSS 3-compatible `@nuxtjs/tailwindcss` 6 module by running the command below in your terminal:

::: code-group

```sh [npm]
npm install -D @nuxtjs/tailwindcss@6 tailwindcss@3
```

```sh [yarn]
yarn add -D @nuxtjs/tailwindcss@6 tailwindcss@3
```

```sh [pnpm]
pnpm i -D @nuxtjs/tailwindcss@6 tailwindcss@3
```

```sh [bun]
bun add -D @nuxtjs/tailwindcss@6 tailwindcss@3
```

:::

Register the installed module in `nuxt.config.ts`:

```ts {2} [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
});
```

Generate the `tailwind.config.js` file by running the command below:

```sh
npx tailwindcss init
```

Then add the `@tailwind` directives for each of Tailwind’s layers to your `./assets/css/tailwind.css` file.

```css[tailwind.css]
@tailwind base;
@tailwind components;
@tailwind utilities;
```

then add the following into your `nuxt.config.ts` file:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    // [!code focus]
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }], // [!code focus]
    configPath: "tailwind.config", // [!code focus]
    exposeConfig: {
      // [!code focus]
      level: 2, // [!code focus]
    }, // [!code focus]
    config: {}, // [!code focus]
    viewer: true, // [!code focus]
  }, // [!code focus]
});
```

### Install @vueuse/motion

Install the [@vueuse/motion](https://motion.vueuse.org/) library by running the command below in your terminal:

::: code-group

```sh [npm]
npm install @vueuse/motion@2
```

```sh [yarn]
yarn add @vueuse/motion@2
```

```sh [pnpm]
pnpm add @vueuse/motion@2
```

```sh [bun]
bun add @vueuse/motion@2
```

:::

Then, add the module to the modules array as shown below:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/motion/nuxt"], // [!code focus]
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },
});
```

### Install Clsx and Tailwind Merge

Install `clsx` and `tailwind-merge` 2, which supports the Tailwind CSS 3 setup above:

::: code-group

```sh [npm]
npm install clsx tailwind-merge@2
```

```sh [yarn]
yarn add clsx tailwind-merge@2
```

```sh [pnpm]
pnpm add clsx tailwind-merge@2
```

```sh [bun]
bun add clsx tailwind-merge@2
```

:::

Then, in your `./lib/utils.ts` file, configure it as shown below:

```ts [utils.ts]
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

For Nuxt 3, `@/lib/utils` resolves to `lib/utils.ts` in your source directory (the project root by default). Save Installation files in `components/spark-ui/<component>/` before copying the preview usage. Imports use `@/components/spark-ui/<component>/<file>.vue`; adjust them if you use a custom source directory or destination.

## Semantic colors

Some components use semantic classes such as `bg-background`, `text-primary-foreground`, `bg-card`, and `bg-border`. Merge these mappings into `theme.extend.colors` in your existing `tailwind.config.js`; keep your content paths and any component-specific animation configuration. For Nuxt, use the same mappings in the configuration loaded by `@nuxtjs/tailwindcss`.

```js [tailwind.config.js]
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
      },
    },
  },
};
```

Add the following after the Tailwind directives in your global stylesheet (`src/assets/css/tailwind.css` for Vue, `assets/css/tailwind.css` for Nuxt). The background and foreground values match the existing Ripple example. The remaining tokens are deliberately neutral fallbacks based on that pair, not a separate theme: customize them for your app, especially destructive states and muted surfaces. Values are HSL channels without an `hsl()` wrapper. If your app already defines these tokens, retain its palette instead.

```css [tailwind.css]
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }

  :root,
  .dark {
    --border: var(--foreground);
    --input: var(--foreground);
    --ring: var(--foreground);
    --primary: var(--foreground);
    --primary-foreground: var(--background);
    --secondary: var(--background);
    --secondary-foreground: var(--foreground);
    --destructive: var(--foreground);
    --destructive-foreground: var(--background);
    --muted: var(--background);
    --muted-foreground: var(--foreground);
    --accent: var(--background);
    --accent-foreground: var(--foreground);
    --popover: var(--background);
    --popover-foreground: var(--foreground);
    --card: var(--background);
    --card-foreground: var(--foreground);
  }
}
```

Toggle the `dark` class on your document's root element to switch modes. Component pages also list their own dependencies, helper files, and animation prerequisites; merge those additions rather than replacing this shared configuration.

## Next step

You can now go ahead and start building your web application :partying_face:.
