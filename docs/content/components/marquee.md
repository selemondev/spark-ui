# Marquee

A customizable scrolling component that loops its content horizontally or vertically, with configurable direction, hover pause, and repeat options.

<demo src="../../src/example/marquee/demo.vue" srcCode="../../src/spark-ui-demos/marquee/marquee.vue" />

## Installation

Copy the component files below into `src/components/spark-ui/marquee/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [marquee.vue]
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  class?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  pauseOnHover: false,
  vertical: false,
  repeat: 4,
});

const className = computed(() =>
  cn("flex shrink-0 justify-around [gap:var(--gap)]", {
    "animate-marquee-vertical flex-col": props.vertical,
    "animate-marquee flex-row": !props.vertical,
    "[animation-direction:reverse]": props.reverse,
    "group-hover:[animation-play-state:paused]": props.pauseOnHover,
  }),
);
</script>

<template>
  <div
    v-bind="props"
    :class="
      cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        {
          'flex-row': !props.vertical,
          'flex-col': props.vertical,
        },
        props.class,
      )
    "
  >
    <div
      v-for="i in props.repeat"
      :key="i"
      :class="className"
      :aria-hidden="i > 1 ? true : undefined"
      :inert="i > 1"
    >
      <slot />
    </div>
  </div>
</template>
```

```vue [review-card.vue]
<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{
  img: string;
  name: string;
  username: string;
  body: string;
}>();
</script>

<template>
  <div
    :class="
      cn(
        'relative w-64 cursor-pointer overflow-hidden h-36 flex flex-col space-y-1 rounded-xl px-4',
        '  border-gray-950/[.1] bg-gray-950/[.01] border-parent hover:bg-gray-950/[.05]',
      )
    "
  >
    <div class="flex items-center space-x-2">
      <img class="rounded-full" width="32" height="32" :src="props.img" />
      <p class="flex flex-col space-y-1">
        <span class="text-sm font-medium dark:text-white">
          {{ props.name }}
        </span>
        <span class="text-xs font-medium dark:text-white/40">
          {{ props.username }}
        </span>
      </p>
    </div>

    <div>
      <span leading-none class="text-sm font-medium  dark:text-white/40">
        {{ props.body }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.border-parent {
  border: 1px solid #ecedee;
}
</style>
```

:::

Add the following animations to your `tailwind.config.js` file:

```js {4,5,6,7,8,9,10,11,12,13,14,15,16,17} [tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
};
```

## Examples

#### Vertical Marquee

<demo src="../../src/example/marquee/vertical-demo.vue" srcCode="../../src/spark-ui-demos/marquee/vertical-marquee.vue" />

#### 3D Marquee

<demo src="../../src/example/marquee/3d-demo.vue" srcCode="../../src/spark-ui-demos/marquee/3d-marquee.vue" />

## Behavior

Direction, orientation, and hover pause update while mounted. Tracks do not shrink, and only the first track is exposed to assistive technology or keyboard focus; later visual repetitions are inert. Repeated slots are still rendered, so prefer static content without document-global IDs or side effects.

## Props

| Prop         | Type    | Default | Description                                                                  |
| ------------ | ------- | ------- | ---------------------------------------------------------------------------- |
| class        | string  |         | The class to apply to the component.                                         |
| reverse      | boolean | false   | Whether or not to reverse the direction of the marquee.                      |
| pauseOnHover | boolean | false   | Whether or not to pause the marquee when the user hovers over the component. |
| vertical     | boolean | false   | Whether or not to display the marquee vertically.                            |
| repeat       | number  | 4       | The number of times to repeat the content.                                   |
