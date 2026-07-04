# Interactive Grid Pattern

An interactive background grid pattern made with SVGs, fully customizable using Tailwind CSS.

<demo src="../../src/example/interactive-grid-pattern/demo.vue" srcCode="../../src/spark-ui-demos/interactive-grid-pattern/interactive-grid-pattern.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [interactive-grid-pattern.vue]
<script setup lang="ts">
import { ref } from "vue";
import { cn } from "@/lib/utils";

interface InteractiveGridPatternProps {
  width?: number;
  height?: number;
  squares?: [number, number];
  class?: string;
  squaresClassName?: string;
}

const props = withDefaults(defineProps<InteractiveGridPatternProps>(), {
  width: 40,
  height: 40,
  squares: () => [24, 24],
});

const hoveredSquare = ref<number | null>(null);
</script>

<template>
  <svg
    :width="width * squares[0]"
    :height="height * squares[1]"
    :class="cn('absolute inset-0 h-full w-full border border-gray-400/30', props.class)"
  >
    <rect
      v-for="(_, index) in squares[0] * squares[1]"
      :key="index"
      :x="(index % squares[0]) * width"
      :y="Math.floor(index / squares[0]) * height"
      :width="width"
      :height="height"
      :class="
        cn(
          'interactive-grid-square stroke-gray-400/30',
          hoveredSquare === index ? 'fill-gray-300/30' : 'fill-transparent',
          squaresClassName,
        )
      "
      @mouseenter="hoveredSquare = index"
      @mouseleave="hoveredSquare = null"
    />
  </svg>
</template>

<style scoped>
.interactive-grid-square {
  transition: all 1000ms ease-in-out;
}
.interactive-grid-square:hover {
  transition-duration: 100ms;
}
</style>
```

:::

## Examples

### Colorful

<demo src="../../src/example/interactive-grid-pattern/colorful-demo.vue" srcCode="../../src/spark-ui-demos/interactive-grid-pattern/colorful-interactive-grid-pattern.vue" />

## Props

| Prop               | Type               | Default    | Description                                                                                     |
| ------------------ | ------------------ | ---------- | ----------------------------------------------------------------------------------------------- |
| `width`            | `number`           | `40`       | Width of each square in the grid.                                                               |
| `height`           | `number`           | `40`       | Height of each square in the grid.                                                              |
| `squares`          | `[number, number]` | `[24, 24]` | Number of squares in the grid. First number is horizontal squares, second is vertical squares. |
| `class`            | `string`           | `-`        | Class name applied to the grid container.                                                       |
| `squaresClassName` | `string`           | `-`        | Class name applied to individual squares in the grid.                                           |
