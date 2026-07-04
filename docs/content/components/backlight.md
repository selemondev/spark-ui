# Backlight

A backlight glow effect for videos, images, and SVGs.

<demo src="../../src/example/backlight/demo.vue" srcCode="../../src/spark-ui-demos/backlight/backlight.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [backlight.vue]
<script setup lang="ts">
import { useId } from "vue";
import { cn } from "@/lib/utils";

interface BacklightProps {
  class?: string;
  blur?: number;
}

const props = withDefaults(defineProps<BacklightProps>(), {
  blur: 20,
});

const id = useId();
</script>

<template>
  <div :class="cn(props.class)">
    <svg width="0" height="0" aria-hidden="true">
      <filter :id="id" y="-50%" x="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" :stdDeviation="props.blur" result="blurred" />
        <feColorMatrix type="saturate" in="blurred" values="4" />
        <feComposite in="SourceGraphic" operator="over" />
      </filter>
    </svg>

    <div :style="{ filter: `url(#${id})` }">
      <slot />
    </div>
  </div>
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import Backlight from "@/components/spark-ui/backlight/backlight.vue";
</script>

<template>
  <Backlight>
    <img src="https://some-url/image.png" />
  </Backlight>
</template>
```

## Examples

### Image

<demo src="../../src/example/backlight/image-demo.vue" srcCode="../../src/spark-ui-demos/backlight/backlight-image.vue" />

### SVG

<demo src="../../src/example/backlight/svg-demo.vue" srcCode="../../src/spark-ui-demos/backlight/backlight-svg.vue" />

## Props

| Prop  | Type   | Default | Description                                      |
| ----- | ------ | ------- | ------------------------------------------------ |
| class | string | -       | Additional class names for the wrapper div.      |
| blur  | number | 20      | The blur intensity of the backlight glow effect. |

## Slots

| Slot    | Description                                                        |
| ------- | ------------------------------------------------------------------ |
| default | The video, image, or SVG element to apply the backlight effect to. |
