# Striped Pattern

An SVG pattern fills a container with diagonal lines.

<demo src="../../src/example/striped-pattern/demo.vue" srcCode="../../src/spark-ui-demos/striped-pattern/demo.vue" />

## Installation

Copy the component files below into `src/components/spark-ui/striped-pattern/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [striped-pattern.vue]
<script setup lang="ts">
import { computed, useId } from "vue";
import { cn } from "@/lib/utils";

interface StripedPatternProps {
  className?: string;
  direction?: "left" | "right";
  width?: number | string;
  height?: number | string;
  x?: number;
  y?: number;
}

const props = withDefaults(defineProps<StripedPatternProps>(), {
  direction: "left",
  width: 10,
  height: 10,
  x: -1,
  y: -1,
});
const id = `stripes-${useId()}`;
const w = computed(() => Number(props.width));
const h = computed(() => Number(props.height));
</script>

<template>
  <svg
    aria-hidden="true"
    :class="
      cn('pointer-events-none absolute inset-0 z-10 h-full w-full stroke-[0.5]', props.className)
    "
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        :id="id"
        :width="w"
        :height="h"
        :x="props.x"
        :y="props.y"
        patternUnits="userSpaceOnUse"
      >
        <template v-if="props.direction === 'left'">
          <line x1="0" :y1="h" :x2="w" y2="0" stroke="currentColor" />
          <line :x1="-w" :y1="h" x2="0" y2="0" stroke="currentColor" />
          <line :x1="w" :y1="h" :x2="w * 2" y2="0" stroke="currentColor" />
        </template>
        <template v-else>
          <line x1="0" y1="0" :x2="w" :y2="h" stroke="currentColor" />
          <line :x1="-w" y1="0" x2="0" :y2="h" stroke="currentColor" />
          <line :x1="w" y1="0" :x2="w * 2" :y2="h" stroke="currentColor" />
        </template>
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${id})`" />
  </svg>
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import StripedPattern from "@/components/spark-ui/striped-pattern/striped-pattern.vue";
</script>

<template>
  <div class="relative h-64 overflow-hidden rounded-lg border">
    <StripedPattern
      direction="right"
      :width="20"
      :height="20"
      class="text-blue-500 [stroke-dasharray:8,4]"
    />
  </div>
</template>
```

## Props

| Prop        | Type                | Default  | Description                                           |
| ----------- | ------------------- | -------- | ----------------------------------------------------- |
| `className` | `string`            | —        | Extra classes for the SVG. Native `class` also works. |
| `direction` | `"left" \| "right"` | `"left"` | Direction of the diagonal lines.                      |
| `width`     | `number \| string`  | `10`     | Width of one pattern tile in pixels.                  |
| `height`    | `number \| string`  | `10`     | Height of one pattern tile in pixels.                 |
| `x`         | `number`            | `-1`     | Horizontal offset of the pattern in pixels.           |
| `y`         | `number`            | `-1`     | Vertical offset of the pattern in pixels.             |

## Behavior

Place the component inside a positioned container. The SVG fills its container and ignores pointer input.

The lines use `currentColor`, which follows the CSS text color. Use `text-*`, `stroke-*`, and `[stroke-dasharray:8,4]` classes to change the lines.

The pattern updates when its props change. Each instance uses a unique pattern ID that also works with server rendering.

The tile defaults match the upstream source at 10 pixels. The `x` and `y` props apply the pattern offsets described in the upstream documentation.

Standard SVG attributes pass to the root element. No animation or global CSS is required.

## Source

This component is a Vue port of [Magic UI Striped Pattern](https://magicui.design/docs/components/striped-pattern).
The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/striped-pattern.tsx) defines the original behavior.
