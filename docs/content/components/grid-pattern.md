# Grid Pattern

A background grid pattern made with SVGs, fully customizable using Tailwind CSS.

<demo src="../../src/example/grid-pattern/demo.vue" srcCode="../../src/spark-ui-demos/grid-pattern/grid-pattern.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [grid-pattern.vue]
<script setup lang="ts">
import { useId } from "vue";
import { cn } from "@/lib/utils";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: Array<[x: number, y: number]>;
  strokeDasharray?: string;
  class?: string;
  [key: string]: any;
}

const props = withDefaults(defineProps<GridPatternProps>(), {
  width: 40,
  height: 40,
  x: -1,
  y: -1,
  strokeDasharray: "0",
});

const id = `grid-pattern-${useId()}`;
</script>

<template>
  <svg
    aria-hidden="true"
    :class="
      cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30',
        props.class,
      )
    "
  >
    <defs>
      <pattern
        :id="id"
        :width="props.width"
        :height="props.height"
        patternUnits="userSpaceOnUse"
        :x="props.x"
        :y="props.y"
      >
        <path
          :d="`M.5 ${props.height}V.5H${props.width}`"
          fill="none"
          :stroke-dasharray="props.strokeDasharray"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" stroke-width="0" :fill="`url(#${id})`" />
    <svg v-if="props.squares" :x="props.x" :y="props.y" class="overflow-visible">
      <rect
        v-for="[squareX, squareY] in props.squares"
        :key="`${squareX}-${squareY}`"
        stroke-width="0"
        :width="props.width - 1"
        :height="props.height - 1"
        :x="squareX * props.width + 1"
        :y="squareY * props.height + 1"
      />
    </svg>
  </svg>
</template>
```

:::

## Examples

### Linear Gradient

<demo src="../../src/example/grid-pattern/grid-pattern-linear-gradient.vue" srcCode="../../src/spark-ui-demos/grid-pattern/grid-pattern-linear-gradient.vue" />

### Dashed Stroke

<demo src="../../src/example/grid-pattern/grid-pattern-dashed.vue" srcCode="../../src/spark-ui-demos/grid-pattern/grid-pattern-dashed.vue" />

## Props

| Prop              | Type                          | Default | Description                                   |
| ----------------- | ----------------------------- | ------- | --------------------------------------------- |
| `width`           | `number`                      | `40`    | Width of the pattern                          |
| `height`          | `number`                      | `40`    | Height of the pattern                         |
| `x`               | `number`                      | `-1`    | X offset of the pattern                       |
| `y`               | `number`                      | `-1`    | Y offset of the pattern                       |
| `squares`         | `Array<[x: number, y: number]>` | `-`     | X Y coordinates of filled squares as 2D array |
| `strokeDasharray` | `string`                      | `0`     | Stroke dash array for the pattern             |
| `class`           | `string`                      | `-`     | Additional classes for the pattern            |
