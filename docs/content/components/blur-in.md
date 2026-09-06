# Blur In

An animated text component that blurs in the text.

<demo src="../../src/example/blur-in/demo.vue" srcCode="../../src/spark-ui-demos/blur-in/blur-in.vue" />

## Installation

This component uses the `v-motion` directive from `@vueuse/motion`; register `MotionPlugin` as described in [Getting Started](../guide/getting-started/installation.md).

Copy the following files into `src/components/spark-ui/blur-in/`:

```vue [blur-in.vue]
<script setup lang="ts">
import { computed, reactive } from "vue";
import { cn } from "@/lib/utils";

interface BlurIntProps {
  word: string;
  class?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}

const props = withDefaults(defineProps<BlurIntProps>(), {
  duration: 500,
});

const defaultVariants = computed(() => ({
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      duration: props.duration,
    },
  },
}));

const combinedVariants = computed(() => props.variant ?? defaultVariants.value);
// Keep the binding stable because the motion directive captures it on creation.
const motionVariants = reactive({
  initial: computed(() => combinedVariants.value.hidden),
  visible: computed(() => combinedVariants.value.visible),
});
const className = computed(() =>
  cn(
    "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
    props.class,
  ),
);
</script>

<template>
  <h1 v-motion="motionVariants" :class="className">
    {{ props.word }}
  </h1>
</template>
```

## Props

| Prop     | Type   | Description                                    | Default                                                                                      |
| -------- | ------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------- |
| class    | string | The class to be applied to the component       |                                                                                              |
| duration | number | Duration in milliseconds for the animation     | 500                                                                                          |
| word     | string | The word to be animated                        |                                                                                              |
| variant  | object | Custom animation variants for motion component | `hidden: { filter: "blur(10px)", opacity: 0 }, visible: { filter: "blur(0px)", opacity: 1 }` |

Changes to `duration`, `class`, or a replacement `variant` are reactive. Custom variants replace the defaults and supply their own transitions.
