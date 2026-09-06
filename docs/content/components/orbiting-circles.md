# Orbiting Circles

A collection of circles which move in orbit along a circular path.

<demo src="../../src/example/orbiting-circles/demo.vue" srcCode="../../src/spark-ui-demos/orbiting-circles/orbiting-circles.vue" />

## Installation

Copy the component files below into `src/components/spark-ui/orbiting-circles/`. Utility imports use `@/lib/utils`.

```vue [orbiting-circles.vue]
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface OrbitingCirclesProps {
  class?: string;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}

const props = withDefaults(defineProps<OrbitingCirclesProps>(), {
  duration: 20,
  delay: 10,
  radius: 50,
  path: true,
});

const className = computed(() =>
  cn(
    "absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full border bg-none [animation-delay:calc(var(--delay)*1000ms)]",
    props.class,
    { "[animation-direction:reverse]": props.reverse },
  ),
);
</script>

<template>
  <div v-if="props.path">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      class="pointer-events-none absolute inset-0 size-full"
    >
      <circle
        class="stroke-black/10 stroke-1 dark:stroke-white/10"
        cx="50%"
        cy="50%"
        :r="radius"
        fill="none"
      />
    </svg>
  </div>

  <div
    :style="{
      '--duration': props.duration,
      '--radius': props.radius,
      '--delay': -props.delay,
    }"
    :class="className"
  >
    <slot />
  </div>
</template>
```

Add the following animations to your `tailwind.config.js` file:

```js{4,5,6,7,8,9,10,11,12,13,14,15,16,17,18} [tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      animation: {
        orbit: "orbit calc(var(--duration)*1s) linear infinite",
      },
      keyframes: {
        orbit: {
          "0%": {
            transform:
              "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
      },
    },
  },
};
```

## Usage

```vue
<script setup lang="ts">
import OrbitingCircles from "@/components/spark-ui/orbiting-circles/orbiting-circles.vue";
</script>

<template>
  <div class="relative flex h-80 items-center justify-center overflow-hidden">
    <OrbitingCircles class="size-8" :radius="80" reverse>
      <svg viewBox="0 0 24 24" class="size-6" aria-hidden="true" fill="currentColor">
        <path d="m12 3 9 18H3Z" />
      </svg>
    </OrbitingCircles>
  </div>
</template>
```

## Behavior

`reverse` and `class` update while mounted. Reverse uses the CSS `animation-direction` property; no separate reverse keyframes are required.

## Props

| Prop     | Type    | Description                                      | Default |
| -------- | ------- | ------------------------------------------------ | ------- |
| class    | string  | The class for the component                      | ""      |
| reverse  | boolean | If true, the animation plays in reverse          | false   |
| duration | number  | The duration of the animation in seconds         | 20      |
| delay    | number  | The delay before the animation starts in seconds | 10      |
| radius   | number  | The radius of the orbit in pixels                | 50      |
