# Glare Hover

A diagonal light glare on hover using a `::before` gradient, CSS variables, and background-position animation—no extra global keyframes required.

<demo src="../../src/example/glare-hover/demo.vue" srcCode="../../src/spark-ui-demos/glare-hover/glare-hover.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [glare-hover.vue]
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface GlareHoverProps {
  class?: string;
  width?: string;
  height?: string;
  background?: string;
  color?: string;
  opacity?: number;
  angle?: number;
  size?: number;
  duration?: number;
  playOnce?: boolean;
}

const props = withDefaults(defineProps<GlareHoverProps>(), {
  background: "#000",
  color: "#ffffff",
  opacity: 0.5,
  angle: -45,
  size: 250,
  duration: 650,
  playOnce: false,
});

function parseHEX(color: string, opacity: number): string {
  const hex = color.replace("#", "");
  const parse = (h: string) => Number.parseInt(h, 16);
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return `rgba(${parse(hex.slice(0, 2))},${parse(hex.slice(2, 4))},${parse(hex.slice(4, 6))},${opacity})`;
  }
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    return `rgba(${parse(hex[0] + hex[0])},${parse(hex[1] + hex[1])},${parse(hex[2] + hex[2])},${opacity})`;
  }
  return color;
}

const rgba = computed(() => parseHEX(props.color, props.opacity));

const cssVars = computed(() => ({
  "--gh-angle": `${props.angle}deg`,
  "--gh-duration": `${props.duration}ms`,
  "--gh-size": `${props.size}%`,
  "--gh-rgba": rgba.value,
  background: props.background,
  ...(props.width !== undefined ? { width: props.width } : {}),
  ...(props.height !== undefined ? { height: props.height } : {}),
}));

const rootClass = computed(() =>
  cn(
    "relative grid w-fit h-fit cursor-pointer place-items-center overflow-hidden bg-transparent",
    // BEFORE ELEMENT
    "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-no-repeat before:content-['']",
    // GRADIENT
    "before:[background-image:linear-gradient(var(--gh-angle),transparent_60%,var(--gh-rgba)_70%,transparent,transparent_100%)]",
    // SIZE + POSITION
    "before:[background-size:var(--gh-size)_var(--gh-size),100%_100%]",
    "before:[background-position:-100%_-100%,0_0]",
    // TRANSITION
    !props.playOnce &&
      "before:transition-[background-position] before:duration-[var(--gh-duration)] before:ease-in-out",
    props.playOnce &&
      "before:transition-none hover:before:transition-[background-position] hover:before:duration-[var(--gh-duration)]",
    // HOVER EFFECT
    "hover:before:[background-position:100%_100%,0_0]",
    props.class,
  ),
);
</script>

<template>
  <div :class="rootClass" :style="cssVars">
    <slot />
  </div>
</template>
```

:::

## Usage

The effect is implemented with a `::before` pseudo-element: a `linear-gradient` tile moves from one corner to the opposite on hover. Color is parsed from hex (`#rgb` or `#rrggbb`) into `rgba` for the glare band.

```vue
<script setup lang="ts">
import GlareHover from "@/components/spark-ui/glare-hover/glare-hover.vue";
</script>

<template>
  <GlareHover class="rounded-lg">
    <div>Hover to see the glare sweep</div>
  </GlareHover>
</template>
```

## Examples

### CTA

<demo src="../../src/example/glare-hover/cta-demo.vue" srcCode="../../src/spark-ui-demos/glare-hover/cta-demo.vue" />

### Alerts

<demo src="../../src/example/glare-hover/alert-demo.vue" srcCode="../../src/spark-ui-demos/glare-hover/alert-demo.vue" />

## Props

| Prop       | Type    | Default     | Description                                                          |
| ---------- | ------- | ----------- | ------------------------------------------------------------------- |
| class      | string  |             | Classes on the root `div` (use `rounded-*`, `overflow-hidden`, etc.). |
| background | string  | `"#000"`    | Root background color.                                              |
| color      | string  | `"#ffffff"` | Glare highlight (hex `#rgb` / `#rrggbb`).                           |
| opacity    | number  | `0.5`       | Alpha for the parsed glare color.                                   |
| angle      | number  | `-45`       | Gradient angle in degrees (`--gh-angle`).                           |
| size       | number  | `250`       | Glare tile size in `%` (`--gh-size`).                               |
| duration   | number  | `650`       | Transition duration in ms (`--gh-duration`).                        |
| playOnce   | boolean | `false`     | If `true`, animation runs on hover only (no transition until hover). |
| width      | string  |             | Optional `width` on the root `style`.                              |
| height     | string  |             | Optional `height` on the root `style`.                             |

## Slots

| Slot    | Description                    |
| ------- | ----------------------------- |
| default | Content inside the wrapper.   |
