---
layout: doc
---

# Installation

Follow the procedures below to install and configure your dependencies.

## Vue 3

### Create a new Vue 3 project

- Start by creating a new Vue 3 project by running the command below in your terminal:

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

- Install `Tailwindcss` and its peer dependencies:

::: code-group

```sh [npm]
npm install -D tailwindcss postcss autoprefixer
```

```sh [yarn]
yarn add vitepress-plugin-group-icons
```

```sh [pnpm]
pnpm add vitepress-plugin-group-icons
```

```sh [bun]
bun add vitepress-plugin-group-icons
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

Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/assets/css/index.css` file as well as the base layer.

::: code-group

```css[index.css]
@tailwind base;
@tailwind components;
@tailwind utilities;
```

:::

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
import "./assets/css/index.css";
import App from "./App.vue";
import { MotionPlugin } from '@vueuse/motion'
const app = createApp(App)
app.use(MotionPlugin)
app.mount("#app");
```

:::
