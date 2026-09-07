# Noise Texture

An SVG noise layer adds a grain texture behind your content.

<demo src="../../src/example/noise-texture/demo.vue" srcCode="../../src/spark-ui-demos/noise-texture/demo.vue" />

## Installation

Copy the component files below into `src/components/spark-ui/noise-texture/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [noise-texture.vue]
<script setup lang="ts">
import { useId } from "vue";
import { cn } from "@/lib/utils";

interface NoiseTextureProps {
  className?: string;
  frequency?: number;
  octaves?: number;
  slope?: number;
  noiseOpacity?: number;
}

const props = withDefaults(defineProps<NoiseTextureProps>(), {
  frequency: 0.4,
  octaves: 6,
  slope: 0.15,
  noiseOpacity: 0.6,
});
const filterId = `noise-${useId()}`;
</script>

<template>
  <svg
    aria-hidden="true"
    :class="
      cn(
        'pointer-events-none absolute inset-0 z-0 size-full select-none opacity-50 dark:opacity-[0.75]',
        props.className,
      )
    "
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter :id="filterId">
      <feTurbulence
        type="fractalNoise"
        :baseFrequency="props.frequency"
        :numOctaves="props.octaves"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncR type="linear" :slope="props.slope" />
        <feFuncG type="linear" :slope="props.slope" />
        <feFuncB type="linear" :slope="props.slope" />
      </feComponentTransfer>
    </filter>
    <rect width="100%" height="100%" :filter="`url(#${filterId})`" :opacity="props.noiseOpacity" />
  </svg>
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import NoiseTexture from "@/components/spark-ui/noise-texture/noise-texture.vue";
</script>

<template>
  <div class="relative h-64 overflow-hidden rounded-lg border">
    <NoiseTexture :frequency="0.4" :noise-opacity="0.6" />
    <p class="relative z-10">Content above the texture</p>
  </div>
</template>
```

## Props

| Prop           | Type     | Default | Description                                           |
| -------------- | -------- | ------- | ----------------------------------------------------- |
| `className`    | `string` | —       | Extra classes for the SVG. Native `class` also works. |
| `frequency`    | `number` | `0.4`   | Noise frequency. Higher values produce finer grain.   |
| `octaves`      | `number` | `6`     | Number of noise layers that add smaller details.      |
| `slope`        | `number` | `0.15`  | Contrast for each color channel after desaturation.   |
| `noiseOpacity` | `number` | `0.6`   | Opacity of the noise rectangle.                       |

## Behavior

Place the component inside a positioned container, such as a `relative` element. The SVG fills that container and ignores pointer input.

All noise props update while the component is mounted. Each instance uses a unique filter ID that also works with server rendering.

The root SVG adds opacity of `0.5` in light mode and `0.75` in dark mode. This opacity combines with `noiseOpacity`.

Standard SVG attributes pass to the root element. Put content in a sibling with `relative z-10` to display it above the texture.

## Source

This component is a Vue port of [Magic UI Noise Texture](https://magicui.design/docs/components/noise-texture).
The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/noise-texture.tsx) defines the original behavior.
