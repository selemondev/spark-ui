# Progressive Blur

Blur scrollable content near the top, bottom, or both edges.

<demo src="../../src/example/progressive-blur/demo.vue" srcCode="../../src/spark-ui-demos/progressive-blur/demo.vue" />

## Installation

Copy the file below into `src/components/spark-ui/progressive-blur/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [progressive-blur.vue]
<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  class?: string;
  height?: string;
  position?: "top" | "bottom" | "both";
  blurLevels?: number[];
}
const props = withDefaults(defineProps<ProgressiveBlurProps>(), {
  height: "30%",
  position: "bottom",
  blurLevels: () => [0.5, 1, 2, 4, 8, 16, 32, 64],
});
const edges = computed(() =>
  props.position === "both" ? (["top", "bottom"] as const) : [props.position],
);
const layers = computed(() => {
  const count = props.blurLevels.length;
  return props.blurLevels.map((blur, index) => {
    const step = 100 / count;
    const stops =
      index === count - 1
        ? `transparent ${index * step}%, black 100%`
        : `transparent ${index * step}%, black ${(index + 1) * step}%, black ${(index + 2) * step}%, transparent ${(index + 3) * step}%`;
    return { blur, stops, zIndex: index + 1 };
  });
});
function layerStyle(
  layer: { blur: number; stops: string; zIndex: number },
  edge: string,
): CSSProperties {
  const mask = `linear-gradient(to ${edge}, ${layer.stops})`;
  return {
    zIndex: layer.zIndex,
    backdropFilter: `blur(${layer.blur}px)`,
    WebkitBackdropFilter: `blur(${layer.blur}px)`,
    maskImage: mask,
    WebkitMaskImage: mask,
  };
}
</script>

<template>
  <div
    :class="
      cn(
        'pointer-events-none absolute inset-x-0 z-10',
        props.class,
        position === 'top' ? 'top-0' : position === 'bottom' ? 'bottom-0' : 'inset-y-0',
      )
    "
    :style="{ height: position === 'both' ? '100%' : height }"
  >
    <div
      v-for="edge in edges"
      :key="edge"
      aria-hidden="true"
      class="absolute inset-x-0"
      :class="edge === 'top' ? 'top-0' : 'bottom-0'"
      :style="{ height: position === 'both' ? height : '100%' }"
    >
      <div
        v-for="(layer, index) in layers"
        :key="index"
        class="absolute inset-0"
        :style="layerStyle(layer, edge)"
      />
    </div>
    <div v-if="$slots.default" class="relative" :style="{ zIndex: blurLevels.length + 1 }">
      <slot />
    </div>
  </div>
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import ProgressiveBlur from "@/components/spark-ui/progressive-blur/progressive-blur.vue";
</script>

<template>
  <div class="relative overflow-hidden rounded-xl">
    <div class="h-80 overflow-y-auto">
      <div v-for="item in 20" :key="item" class="p-6">Item {{ item }}</div>
    </div>
    <ProgressiveBlur position="both" height="30%" :blur-levels="[1, 2, 4, 8, 16]" />
  </div>
</template>
```

## Behavior

Place the component beside the scrollable element inside a positioned wrapper. This keeps the blur fixed at the visible edges while the content scrolls.

Each layer applies a backdrop filter, a blur of content behind it. A mask controls where each layer appears. The mask spacing follows the number of entries in `blurLevels`.

Top mode increases the blur toward the top. Bottom mode increases it toward the bottom. Both mode uses separate top and bottom effects with `height` for each edge. The center stays clear unless those regions overlap.

The array supports any number of layers. One entry creates one gradual blur. An empty array disables the blur. Use nonnegative pixel values, ordered from the lightest blur to the strongest blur.

The default slot replaces the documented upstream `children` prop and appears above the layers. The overlay does not block pointer input. `class` replaces `className`. No timers, listeners, or global CSS are required.

## Props

| Prop         | Type                          | Default                         | Description                                      |
| ------------ | ----------------------------- | ------------------------------- | ------------------------------------------------ |
| `class`      | `string`                      | —                               | Classes for the overlay.                         |
| `height`     | `string`                      | `"30%"`                         | The height of each blurred edge as a CSS length. |
| `position`   | `"top" \| "bottom" \| "both"` | `"bottom"`                      | The edges that receive blur.                     |
| `blurLevels` | `number[]`                    | `[0.5, 1, 2, 4, 8, 16, 32, 64]` | The blur radius of each layer in pixels.         |

## Source

Ported from [Magic UI Progressive Blur](https://magicui.design/docs/components/progressive-blur). The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/progressive-blur.tsx) uses the MIT license.
