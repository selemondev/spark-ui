---
layout: doc
---

# Installation

Follow the procedures below to install and configure your dependencies.

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

Install `Tailwindcss` and its peer dependencies:

::: code-group

```sh [npm]
npm install -D tailwindcss postcss autoprefixer
```

```sh [yarn]
yarn add -D tailwindcss postcss autoprefixer
```

```sh [pnpm]
pnpm add -D tailwindcss postcss autoprefixer
```

```sh [bun]
bun add -D tailwindcss postcss autoprefixer
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

### Install @vueuse/motion

Install the [@vueuse/motion](https://motion.vueuse.org/) library by running the command below in your terminal:

::: code-group

```sh [npm]
npm install @vueuse/motion
```

```sh [yarn]
yarn add @vueuse/motion
```

```sh [pnpm]
pnpm add @vueuse/motion
```

```sh [bun]
bun add @vueuse/motion
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

Install `clsx` and `tailwind-merge` by running the command below in your terminal:

::: code-group

```sh [npm]
npm install clsx tailwind-merge
```

```sh [yarn]
yarn add clsx tailwind-merge
```

```sh [pnpm]
pnpm add clsx tailwind-merge
```

```sh [bun]
bun add clsx tailwind-merge
```

:::

Then, in your `./src/lib/utils.ts` file, configure it as shown below:

```ts [utils.ts]
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Nuxt 3

#### Create a new Nuxt 3 project

Start by creating a new Nuxt 3 project by running the command below in your terminal:

```sh [npm]
npx nuxi@latest init <your-project-name>
```

#### Tailwind

Install the `@nuxtjs/tailwindcss` module by running the command below in your terminal:

::: code-group

```sh [nuxt]
npx nuxi@latest module add tailwindcss
```

```sh [npm]
npm install -D @nuxtjs/tailwindcss
```

```sh [yarn]
yarn add -D @nuxtjs/tailwindcss
```

```sh [pnpm]
pnpm i -D @nuxtjs/tailwindcss
```

```sh [bun]
bun add -D @nuxtjs/tailwindcss
```

:::

If the `modules` array is not populated with the `@nuxtjs/tailwindcss` module, go ahead and add it as shown below:

```sh {2} [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss']
})

```

Generate the `tailwind.config.js` file by running the command below:

```sh
npx tailwindcss init
```

The add the `@tailwind` directives for each of Tailwind’s layers to your `./assets/css/tailwind.css` file.

```css[tailwind.css]
@tailwind base;
@tailwind components;
@tailwind utilities;
```

then add the following into your `nuxt.config.ts` file:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: { // [!code focus]
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }], // [!code focus]
    configPath: 'tailwind.config', // [!code focus]
    exposeConfig: { // [!code focus]
      level: 2 // [!code focus]
    }, // [!code focus]
    config: {}, // [!code focus]
    viewer: true, // [!code focus]
  } // [!code focus]
})
```

### Install @vueuse/motion

Install the [@vueuse/motion](https://motion.vueuse.org/) library by running the command below in your terminal:

::: code-group

```sh [nuxt]
npx nuxi@latest module add @vueuse/motion
```

```sh [npm]
npm install @vueuse/motion
```

```sh [yarn]
yarn add @vueuse/motion
```

```sh [pnpm]
pnpm add @vueuse/motion
```

```sh [bun]
bun add @vueuse/motion
```

:::

Then, add the module to the modules array as shown below:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt'], // [!code focus]
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  }
})
```

### Install Clsx and Tailwind Merge

Install `clsx` and `tailwind-merge` by running the command below in your terminal:

::: code-group

```sh [npm]
npm install clsx tailwind-merge
```

```sh [yarn]
yarn add clsx tailwind-merge
```

```sh [pnpm]
pnpm add clsx tailwind-merge
```

```sh [bun]
bun add clsx tailwind-merge
```

:::

Then, in your `./lib/utils.ts` file, configure it as shown below:

```ts [utils.ts]
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Next step

You can now go ahead and start building your web application :partying_face:.
