# Border Beam

An animated beam of light which travels along the border of its container.

<demo src="../../src/example/border-beam/demo.vue" srcCode="../../src/spark-ui-demos/border-beam/border-beam.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [border-beam.vue]
<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  /** The class name of the border beam. */
  class?: string;
  /** The size of the border beam. */
  size?: number;
  /** The duration of the border beam animation in seconds. */
  duration?: number;
  /** The delay of the border beam animation in seconds. */
  delay?: number;
  /** The start color of the border beam gradient. */
  colorFrom?: string;
  /** The end color of the border beam gradient. */
  colorTo?: string;
  /** Custom inline styles applied to the beam. */
  style?: CSSProperties;
  /** Whether to reverse the animation direction. */
  reverse?: boolean;
  /** The initial offset position (0-100). */
  initialOffset?: number;
  /** The border width of the beam. */
  borderWidth?: number;
}

const props = withDefaults(defineProps<BorderBeamProps>(), {
  size: 50,
  duration: 6,
  delay: 0,
  colorFrom: "#ffaa40",
  colorTo: "#9c40ff",
  reverse: false,
  initialOffset: 0,
  borderWidth: 1,
});

const containerStyle = computed<CSSProperties>(() => ({
  "--border-beam-width": `${props.borderWidth}px`,
  borderWidth: "var(--border-beam-width)",
  maskImage: "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
  WebkitMaskImage: "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
  maskClip: "padding-box, border-box",
  WebkitMaskClip: "padding-box, border-box",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in, xor",
}));

const beamStyle = computed<CSSProperties>(() => ({
  "--color-from": props.colorFrom,
  "--color-to": props.colorTo,
  "--duration": props.duration,
  "--delay": props.delay,
  "--initial-offset": props.initialOffset,
  width: `${props.size}px`,
  offsetPath: `rect(0 auto auto 0 round ${props.size}px)`,
  animationDelay: "calc((var(--delay) + var(--initial-offset) / 100 * var(--duration)) * -1s)",
  animationDirection: props.reverse ? "reverse" : "normal",
  ...props.style,
}));
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent"
    :style="containerStyle"
  >
    <div
      :class="
        cn(
          'animate-border-beam absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent',
          props.class,
        )
      "
      :style="beamStyle"
    />
  </div>
</template>
```

:::

Add the following keyframes and animation to your `tailwind.config.js` file:

```js {5,6,7,10} [tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "border-beam": {
          to: { "offset-distance": "100%" },
        },
      },
      animation: {
        "border-beam": "border-beam calc(var(--duration) * 1s) infinite linear",
      },
    },
  },
};
```

## Examples

### Multiple Beams

<demo src="../../src/example/border-beam/demo-2.vue" srcCode="../../src/spark-ui-demos/border-beam/music-player.vue" />

### Reverse

<demo src="../../src/example/border-beam/demo-3.vue" srcCode="../../src/spark-ui-demos/border-beam/reverse.vue" />

### Button

<demo src="../../src/example/border-beam/demo-4.vue" srcCode="../../src/spark-ui-demos/border-beam/button.vue" />

## Props

| Prop            | Type            | Default   | Description                               |
| --------------- | --------------- | --------- | ----------------------------------------- |
| `class`         | `string`        | `-`       | Custom class applied to the beam.         |
| `size`          | `number`        | `50`      | Size of the beam.                         |
| `duration`      | `number`        | `6`       | Duration of the animation in seconds.     |
| `delay`         | `number`        | `0`       | Delay before the animation starts.        |
| `colorFrom`     | `string`        | `#ffaa40` | Start color of the beam gradient.         |
| `colorTo`       | `string`        | `#9c40ff` | End color of the beam gradient.           |
| `style`         | `CSSProperties` | `-`       | Custom inline styles applied to the beam. |
| `reverse`       | `boolean`       | `false`   | Whether to reverse the animation.         |
| `initialOffset` | `number`        | `0`       | Initial offset position (0-100).          |
| `borderWidth`   | `number`        | `1`       | Border width of the beam.                 |
