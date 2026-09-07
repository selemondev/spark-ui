# Staggered Letter Pull Up Animation

Staggered letter pull up text animation.

<demo src="../../src/example/letter-up/demo.vue" srcCode="../../src/spark-ui-demos/letter-up/letter-up.vue" />

## Installation

Install `@vueuse/motion` and register its `MotionPlugin` on your Vue app as shown in the [installation guide](/content/guide/getting-started/installation). These components use the `v-motion` directive.

Copy the component files below into `src/components/spark-ui/letter-up/`. Utility imports use `@/lib/utils`.

```vue [letter-up.vue]
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface LetterPullupProps {
  class?: string;
  words: string;
  delay?: number;
}

const props = defineProps<LetterPullupProps>();

const letters = computed(() => props.words.split(""));

const pullupVariant = {
  initial: { y: 100, opacity: 0 },
  enter: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * (props.delay ?? 50),
    },
  }),
};

const className = computed(() =>
  cn(
    "font-display text-center text-4xl font-bold tracking-[-0.02em] text-black dark:text-white drop-shadow-sm md:text-4xl md:leading-[5rem]",
    props.class,
  ),
);
</script>

<template>
  <h1 class="flex justify-center">
    <span class="sr-only">{{ props.words }}</span>
    <span aria-hidden="true" v-for="(letter, index) in letters" :key="index">
      <span
        class="inline-block"
        v-motion
        :initial="pullupVariant.initial"
        :enter="pullupVariant.enter(index)"
        :class="className"
      >
        <span v-if="letter === ' '">&nbsp;</span>
        <span v-else>{{ letter }}</span>
      </span>
    </span>
  </h1>
</template>
```

## Usage

```vue
<script setup lang="ts">
import LetterUp from "@/components/spark-ui/letter-up/letter-up.vue";
</script>

<template>
  <LetterUp words="Staggered Letter Pull Up" :delay="50" />
</template>
```

## Behavior

`words` and `class` update while mounted. The heading exposes the complete text to screen readers. Each letter starts 50 milliseconds after the previous letter. Set `delay` to `0` to start all letters together.

## Props

| Prop  | Type   | Description                                             | Default  |
| ----- | ------ | ------------------------------------------------------- | -------- |
| class | string | The class to be applied to the component                |          |
| words | string | Text to animate                                         | Required |
| delay | number | Delay each letter's animation by this many milliseconds | 50       |
