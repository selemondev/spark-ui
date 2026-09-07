# Word Rotate

Move words into and out of view in a repeating sequence.

<demo src="../../src/example/word-rotate/demo.vue" srcCode="../../src/spark-ui-demos/word-rotate/demo.vue" />

## Installation

Install the animation dependency with `pnpm add motion-v`.

Copy the component into `src/components/spark-ui/word-rotate/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [word-rotate.vue]
<script setup lang="ts">
import { AnimatePresence, motion, type Options } from "motion-v";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: Options;
  className?: string;
}
const props = withDefaults(defineProps<WordRotateProps>(), {
  duration: 2500,
  motionProps: () => ({
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  }),
});
const index = ref(0);
const word = computed(() => props.words[index.value] ?? "");
let interval: ReturnType<typeof setInterval> | undefined;
let mounted = false;

function start() {
  clearInterval(interval);
  if (props.words.length < 2) return;
  interval = setInterval(() => {
    index.value = (index.value + 1) % props.words.length;
  }, props.duration);
}
onMounted(() => {
  mounted = true;
  start();
});
watch(
  () => props.words,
  () => {
    index.value = 0;
    if (mounted) start();
  },
  { deep: true },
);
watch(
  () => props.duration,
  () => {
    if (mounted) start();
  },
);
onBeforeUnmount(() => {
  mounted = false;
  clearInterval(interval);
});
</script>

<template>
  <div class="overflow-hidden py-2">
    <span class="sr-only">{{ props.words.join(", ") }}</span>
    <AnimatePresence mode="wait">
      <motion.h1
        v-if="props.words.length"
        :key="word"
        :class="cn(props.className)"
        v-bind="props.motionProps"
        aria-hidden="true"
      >
        {{ word }}
      </motion.h1>
    </AnimatePresence>
  </div>
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import WordRotate from "@/components/spark-ui/word-rotate/word-rotate.vue";
</script>

<template>
  <WordRotate :words="['Word', 'Rotate']" :duration="2500" class-name="text-4xl font-bold" />
</template>
```

## Behavior

The word changes every 2,500 milliseconds by default. The outgoing word finishes its exit before the next word enters.

The default transition moves words down and fades them over 0.25 seconds. `motionProps` replaces the full default animation configuration. Use motion-v options instead of React motion props.

An empty list renders no animated word. A single word enters once and stays visible. Changes to `words` restart the sequence.

Screen readers receive the complete list once, separate from the animated heading. The interval stops when the component unmounts.

## Props

| Prop          | Type                      | Default                    | Description                                 |
| ------------- | ------------------------- | -------------------------- | ------------------------------------------- |
| `words`       | `string[]`                | Required                   | Words to show in order.                     |
| `duration`    | `number`                  | `2500`                     | Time between word changes, in milliseconds. |
| `motionProps` | `Options` from `motion-v` | Fade and vertical movement | Animation configuration for the heading.    |
| `className`   | `string`                  | `undefined`                | Classes for the animated heading.           |

## Source

Ported from [Magic UI Word Rotate](https://magicui.design/docs/components/word-rotate).
