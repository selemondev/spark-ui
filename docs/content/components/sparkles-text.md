# Sparkles Text

Add animated stars around text.

<demo src="../../src/example/sparkles-text/demo.vue" srcCode="../../src/spark-ui-demos/sparkles-text/demo.vue" />

## Installation

Install `motion-v`. Copy the files below into `src/components/spark-ui/sparkles-text/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [sparkles-text.vue]
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, type Component } from "vue";
import { motion } from "motion-v";
import { cn } from "@/lib/utils";

interface Sparkle {
  id: number;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

const props = withDefaults(
  defineProps<{
    as?: string | Component;
    className?: string;
    sparklesCount?: number;
    colors?: { first: string; second: string };
  }>(),
  {
    as: "div",
    sparklesCount: 10,
    colors: () => ({ first: "#9E7AFF", second: "#FE8BBB" }),
  },
);

const sparkles = ref<Sparkle[]>([]);
let nextId = 0;
let timer: ReturnType<typeof setInterval> | undefined;
let stopWatching: (() => void) | undefined;

function generateStar(): Sparkle {
  return {
    id: nextId++,
    x: Math.random() * 100 + "%",
    y: Math.random() * 100 + "%",
    color: Math.random() > 0.5 ? props.colors.first : props.colors.second,
    delay: Math.random() * 2,
    scale: Math.random() + 0.3,
    lifespan: Math.random() * 10 + 5,
  };
}

onMounted(() => {
  stopWatching = watch(
    () => [props.sparklesCount, props.colors.first, props.colors.second],
    () => {
      clearInterval(timer);
      sparkles.value = Array.from({ length: props.sparklesCount }, generateStar);
      timer = setInterval(() => {
        sparkles.value = sparkles.value.map((star) =>
          star.lifespan <= 0 ? generateStar() : { ...star, lifespan: star.lifespan - 0.1 },
        );
      }, 100);
    },
    { immediate: true },
  );
});

onUnmounted(() => {
  stopWatching?.();
  clearInterval(timer);
});
</script>

<template>
  <component
    :is="props.as"
    :class="cn('text-6xl font-bold', props.className)"
    :style="{
      '--sparkles-first-color': props.colors.first,
      '--sparkles-second-color': props.colors.second,
    }"
  >
    <span class="relative inline-block">
      <motion.svg
        v-for="sparkle in sparkles"
        :key="sparkle.id"
        class="pointer-events-none absolute z-20"
        :initial="{ opacity: 0, left: sparkle.x, top: sparkle.y }"
        :animate="{ opacity: [0, 1, 0], scale: [0, sparkle.scale, 0], rotate: [75, 120, 150] }"
        :transition="{ duration: 0.8, repeat: Infinity, delay: sparkle.delay }"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        aria-hidden="true"
      >
        <path
          d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
          :fill="sparkle.color"
        />
      </motion.svg>
      <strong><slot /></strong>
    </span>
  </component>
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import SparklesText from "@/components/spark-ui/sparkles-text/sparkles-text.vue";
</script>

<template>
  <SparklesText :sparkles-count="12">Spark UI</SparklesText>
</template>
```

## Props

| Prop            | Type                                | Default                                   | Description                                    |
| --------------- | ----------------------------------- | ----------------------------------------- | ---------------------------------------------- |
| `as`            | `string / Component`                | `"div"`                                   | Root element or Vue component.                 |
| `className`     | `string`                            | None                                      | Extra root classes. Native `class` also works. |
| `sparklesCount` | `number`                            | `10`                                      | Number of visible star elements.               |
| `colors`        | `{ first: string; second: string }` | `{ first: "#9E7AFF", second: "#FE8BBB" }` | Star colors.                                   |
| Default slot    | Content                             | Required                                  | Text or inline content.                        |

## Behavior

Stars fade, scale, and rotate on a repeating 0.8-second animation. Each star receives a random delay, position, size, and lifetime. Expired stars move to new positions.

Stars start after the component mounts, so server output and initial client output match. Changes to the count or either color restart the stars. The component clears its timer when it unmounts. Set `sparklesCount` to `0` to show text without stars.

## Source

Ported from [Magic UI Sparkles Text](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/sparkles-text.tsx).
