# Comic Text

Comic text animation that looks like a comic book text.

<demo src="../../src/example/comic-text/demo.vue" srcCode="../../src/spark-ui-demos/comic-text/comic-text.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [comic-text.vue]
<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface ComicTextProps {
  class?: string;
  style?: CSSProperties;
  fontSize?: number;
}

const props = withDefaults(defineProps<ComicTextProps>(), {
  fontSize: 5,
});

const dotColor = "#EF4444";
const backgroundColor = "#FACC15";

const comicStyle = computed<CSSProperties>(() => ({
  fontSize: `${props.fontSize}rem`,
  fontFamily: "'Bangers', 'Comic Sans MS', 'Impact', sans-serif",
  fontWeight: "900",
  WebkitTextStroke: `${props.fontSize * 0.35}px #000000`,
  transform: "skewX(-10deg)",
  textTransform: "uppercase",
  filter: `
    drop-shadow(5px 5px 0px #000000)
    drop-shadow(3px 3px 0px ${dotColor})
  `,
  backgroundColor,
  backgroundImage: `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 0)`,
  backgroundSize: "8px 8px",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  ...props.style,
}));
</script>

<template>
  <div :class="cn('animate-comic-text text-center select-none', props.class)" :style="comicStyle">
    <slot />
  </div>
</template>
```

:::

Add the following animation to your `tailwind.config.js` file:

```js {5,6,7,8,9,10,11,12,13,14,15,16,17} [tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "comic-text": {
          from: {
            opacity: "0",
            transform: "skewX(-10deg) scale(0.8) rotate(-2deg)",
          },
          to: {
            opacity: "1",
            transform: "skewX(-10deg) scale(1) rotate(0deg)",
          },
        },
      },
      animation: {
        "comic-text": "comic-text 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
      },
    },
  },
};
```

## Usage

```vue
<script setup lang="ts">
import ComicText from "@/components/ui/comic-text.vue";
</script>

<template>
  <ComicText :font-size="5">BOOM!</ComicText>
</template>
```

## Props

| Prop       | Type            | Default | Description                                    |
| ---------- | --------------- | ------- | ---------------------------------------------- |
| `class`    | `string`        | `-`     | The class name to be applied to the component. |
| `fontSize` | `number`        | `5`     | The font size of the text (in rem).            |
| `style`    | `CSSProperties` | `-`     | Additional inline styles for the text.         |

## Slots

| Slot      | Description               |
| --------- | ------------------------- |
| `default` | The text to be displayed. |
