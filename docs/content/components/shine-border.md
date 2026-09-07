# Shine Border

An animated border with one color or several colors.

<demo src="../../src/example/shine-border/demo.vue" srcCode="../../src/spark-ui-demos/shine-border/demo.vue" />

## Installation

Copy the component files below into `src/components/spark-ui/shine-border/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [shine-border.vue]
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface ShineBorderProps {
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
  className?: string;
}

const props = withDefaults(defineProps<ShineBorderProps>(), {
  borderWidth: 1,
  duration: 14,
  shineColor: "#000000",
});

const borderStyle = computed(() => ({
  "--border-width": `${props.borderWidth}px`,
  "--duration": `${props.duration}s`,
  backgroundImage: `radial-gradient(transparent, transparent, ${Array.isArray(props.shineColor) ? props.shineColor.join(",") : props.shineColor}, transparent, transparent)`,
}));
</script>

<template>
  <div
    aria-hidden="true"
    :class="
      cn(
        'shine-border pointer-events-none absolute inset-0 h-full w-full rounded-[inherit] will-change-[background-position]',
        props.className,
      )
    "
    :style="borderStyle"
  />
</template>

<style scoped>
.shine-border {
  padding: var(--border-width);
  background-size: 300% 300%;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

@media (prefers-reduced-motion: no-preference) {
  .shine-border {
    animation: shine var(--duration) infinite linear;
  }
}

@keyframes shine {
  0%,
  100% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
}
</style>
```

:::

## Usage

```vue
<script setup lang="ts">
import ShineBorder from "@/components/spark-ui/shine-border/shine-border.vue";
</script>

<template>
  <div class="relative rounded-xl p-8">
    <ShineBorder :shine-color="['#A07CFE', '#FE8FB5', '#FFBE7B']" :border-width="2" />
    <p>Your content stays interactive.</p>
  </div>
</template>
```

## Props

| Prop          | Type                 | Default     | Description                                    |
| ------------- | -------------------- | ----------- | ---------------------------------------------- |
| `borderWidth` | `number`             | `1`         | The border width in pixels.                    |
| `duration`    | `number`             | `14`        | The animation duration in seconds.             |
| `shineColor`  | `string \| string[]` | `"#000000"` | One CSS color or an array of CSS colors.       |
| `className`   | `string`             | None        | Extra classes for the border.                  |
| `style`       | Vue style value      | None        | Extra styles that override the default styles. |

## Behavior

Place the border inside a parent with `position: relative` and a border radius.
The border fills its parent and inherits its rounded corners.
Place content next to the border, not inside it. This decorative component has no content slot.

The border does not receive pointer events, so links, inputs, and buttons remain interactive.
Changes to the colors, width, and duration update while mounted.
The animation stops when the user requests reduced motion. The border stays visible.

Native `div` attributes, Vue `class`, and Vue `style` pass to the border.
The demo form only shows a local message. It does not send credentials.

## Source

This component is a Vue port of [Magic UI Shine Border](https://magicui.design/docs/components/shine-border).
The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/shine-border.tsx) defines the original behavior.
