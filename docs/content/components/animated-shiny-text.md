# Animated Shiny Text

A light glare effect which pans across text making it appear as if it is shimmering.

<demo src="../../src/example/animatedShinyText/Demo.vue" srcCode="../../src/spark-ui-demos/animatedShinyText/AnimatedShinyText.vue" />

## Installation

Copy and paste the following code into your project:

```vue [AnimatedShinyText.vue]
<script setup lang='ts'>
import { cn } from '@/lib/utils'

interface AnimatedShinyTextProps {
  class?: string
  shimmerWidth?: number
}

const props = withDefaults(defineProps<AnimatedShinyTextProps>(), {
  shimmerWidth: 100
})

const className = cn(
  'mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70',

  // Shimmer effect
  'animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',

  // Shimmer gradient
  'bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent  dark:via-white/80',

  props.class,
)
</script>

<template>
  <p :style="{ '--shimmer-width': `${props.shimmerWidth}px` }" :class="className">
    <slot />
  </p>
</template>
```

Add the following animations to your `tailwind.config.js` file:

```js {4,5,6,7,8,9,10,11,12,13,14,15,16} [tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      animation: {
        'shiny-text': 'shiny-text 8s infinite',
      },
      keyframes: {
        'shiny-text': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shimmer-width)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shimmer-width)) 0',
          },
        },
      },
    },
  },
}
```

## Props

| Prop         | Type   | Description                         | Default |
| ------------ | ------ | ----------------------------------- | ------- |
| class        | string | The class to be applied.            | ""      |
| shimmerWidth | number | The width of the shimmer in pixels. | 100     |
