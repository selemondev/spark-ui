# Highlighter

A text highlighter that mimics the effect of a human-drawn marker stroke.

<demo src="../../src/example/highlighter/demo.vue" srcCode="../../src/spark-ui-demos/highlighter/highlighter.vue" />

## Installation

Install the following dependency:

::: code-group

```bash [npm]
npm install rough-notation
```

```bash [pnpm]
pnpm add rough-notation
```

```bash [yarn]
yarn add rough-notation
```

```bash [bun]
bun add rough-notation
```

:::

Copy and paste the following code into your project:

::: code-group

```vue [highlighter.vue]
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";
import { cn } from "@/lib/utils";

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface HighlighterProps {
  class?: string;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
}

const props = withDefaults(defineProps<HighlighterProps>(), {
  action: "highlight",
  color: "#ffd1dc",
  strokeWidth: 1.5,
  animationDuration: 600,
  iterations: 2,
  padding: 2,
  multiline: true,
  isView: false,
});

const elementRef = ref<HTMLSpanElement | null>(null);
const shouldShow = ref(false);

let annotation: RoughAnnotation | null = null;
let resizeObserver: ResizeObserver | null = null;
let intersectionObserver: IntersectionObserver | null = null;

function clearAnnotation() {
  annotation?.remove();
  annotation = null;
  resizeObserver?.disconnect();
  resizeObserver = null;
}

function draw() {
  const element = elementRef.value;
  if (!shouldShow.value || !element) return;

  clearAnnotation();

  const currentAnnotation = annotate(element, {
    type: props.action,
    color: props.color,
    strokeWidth: props.strokeWidth,
    animationDuration: props.animationDuration,
    iterations: props.iterations,
    padding: props.padding,
    multiline: props.multiline,
  });

  annotation = currentAnnotation;
  currentAnnotation.show();

  resizeObserver = new ResizeObserver(() => {
    currentAnnotation.hide();
    currentAnnotation.show();
  });
  resizeObserver.observe(element);
  resizeObserver.observe(document.body);
}

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  if (!props.isView) {
    shouldShow.value = true;
    return;
  }

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        shouldShow.value = true;
        intersectionObserver?.disconnect();
        intersectionObserver = null;
      }
    },
    { rootMargin: "-10%" },
  );
  intersectionObserver.observe(element);
});

watch(
  [
    shouldShow,
    () => props.action,
    () => props.color,
    () => props.strokeWidth,
    () => props.animationDuration,
    () => props.iterations,
    () => props.padding,
    () => props.multiline,
  ],
  () => draw(),
  { flush: "post" },
);

onBeforeUnmount(() => {
  clearAnnotation();
  intersectionObserver?.disconnect();
  intersectionObserver = null;
});
</script>

<template>
  <span
    ref="elementRef"
    :class="cn('relative inline-block bg-transparent', props.class)"
  >
    <slot />
  </span>
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import Highlighter from "@/components/spark-ui/highlighter/highlighter.vue";
</script>

<template>
  <p>
    The
    <Highlighter action="underline" color="#FF9800">
      Spark UI Highlighter
    </Highlighter>
    makes important
    <Highlighter action="highlight" color="#87CEFA">
      text stand out
    </Highlighter>
    effortlessly.
  </p>
</template>
```

## Props

| Prop                | Type                                                                                                | Default       | Description                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------- |
| `action`            | `"highlight" \| "underline" \| "box" \| "circle" \| "strike-through" \| "crossed-off" \| "bracket"` | `"highlight"` | The type of annotation effect to apply.                                       |
| `color`             | `string`                                                                                            | `"#ffd1dc"`   | The color of the annotation.                                                  |
| `strokeWidth`       | `number`                                                                                            | `1.5`         | The width of the annotation stroke (in px).                                   |
| `animationDuration` | `number`                                                                                            | `600`         | Duration of the animation in milliseconds.                                   |
| `iterations`        | `number`                                                                                            | `2`           | Number of times to draw the annotation (adds a sketchy effect when > 1).      |
| `padding`           | `number`                                                                                            | `2`           | Padding between the element and the annotation (in px).                       |
| `multiline`         | `boolean`                                                                                           | `true`        | Whether to annotate across multiple lines or treat content as a single line.  |
| `isView`            | `boolean`                                                                                           | `false`       | Controls whether the animation starts only when the element enters viewport.  |
| `class`             | `string`                                                                                            | `undefined`   | Additional classes to merge onto the wrapper element.                         |

## Slots

| Slot      | Description                                |
| --------- | ------------------------------------------ |
| `default` | The content to be highlighted/annotated.   |
