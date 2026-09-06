# Line Shadow Text

A text component with a moving diagonal line shadow.

With reduced motion enabled, the text retains a static diagonal line shadow.

<demo src="../../src/example/line-shadow-text/demo.vue" srcCode="../../src/spark-ui-demos/line-shadow-text/line-shadow-text.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [line-shadow-text.vue]
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface LineShadowTextProps {
  class?: string;
  text: string;
  shadowColor?: string;
  as?: keyof HTMLElementTagNameMap;
}

const props = withDefaults(defineProps<LineShadowTextProps>(), {
  shadowColor: "black",
  as: "span",
});

const style = computed(() => ({
  "--shadow-color": props.shadowColor,
}));
</script>

<template>
  <component
    :is="props.as"
    :style="style"
    :data-text="props.text"
    :class="cn('line-shadow-text relative z-0 inline-flex', props.class)"
  >
    {{ props.text }}
  </component>
</template>

<style scoped>
.line-shadow-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0.04em;
  left: 0.04em;
  z-index: -10;
  background-image: linear-gradient(
    45deg,
    transparent 45%,
    var(--shadow-color) 45%,
    var(--shadow-color) 55%,
    transparent 0
  );
  background-size: 0.06em 0.06em;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: line-shadow 15s linear infinite;
}

@keyframes line-shadow {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% -100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .line-shadow-text::after {
    animation: none;
    background-position: 0 0;
  }
}
</style>
```

:::

If you prefer to keep the keyframes in your Tailwind config instead of a scoped `<style>` block, add the following animation to your `tailwind.config.js`. Keep the component's reduced-motion media query so the shadow remains static when requested:

```js [tailwind.config.js]
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        "line-shadow": "line-shadow 15s linear infinite",
      },
      keyframes: {
        "line-shadow": {
          "0%": { "background-position": "0 0" },
          "100%": { "background-position": "100% -100%" },
        },
      },
    },
  },
};
```

## Usage

```vue
<script setup lang="ts">
import LineShadowText from "@/components/spark-ui/line-shadow-text/line-shadow-text.vue";
</script>

<template>
  <LineShadowText text="Fast" shadow-color="black" />
</template>
```

## Props

| Prop          | Type                          | Default   | Description                              |
| ------------- | ----------------------------- | --------- | ---------------------------------------- |
| `text`        | `string`                      | `-`       | The text to display with shadow effect   |
| `shadowColor` | `string`                      | `"black"` | The color of the moving line shadow      |
| `as`          | `keyof HTMLElementTagNameMap` | `"span"`  | The HTML element to render the text as   |
| `class`       | `string`                      | `-`       | Additional classes to merge onto the tag |
