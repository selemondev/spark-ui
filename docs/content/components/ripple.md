# Ripple

An animated ripple effect typically used behind elements to emphasize them.

<demo src="../../src/example/ripple/Demo.vue" srcCode="../../src/spark-ui-demos/ripple/Ripple.vue" />

## Installation

Copy and paste the following code into your project:

```vue [Ripple.vue]
<script setup lang='ts'>
import { cn } from '@/lib/utils'

interface RippleProps {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
  class?: string
};

const props = withDefaults(defineProps<RippleProps>(), {
  mainCircleSize: 210,
  mainCircleOpacity: 0.24,
  numCircles: 8,
})
</script>

<template>
  <div
    :class="cn(
      'absolute inset-0 bg-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]',
      props.class,
    )"
  >
    <div v-for="(_, i) in Array.from({ length: props.numCircles })" :key="i">
      <div
        :key="i" :class="`absolute animate-ripple rounded-full bg-foreground/25 shadow-xl border [--i:${i}]`"
        :style="{
          width: `${props.mainCircleSize + i * 70}px`,
          height: `${props.mainCircleSize + i * 70}px`,
          opacity: props.mainCircleOpacity - i * 0.03,
          animationDelay: `${i * 0.06}s`,
          borderStyle: i === props.numCircles - 1 ? 'dashed' : 'solid',
          borderWidth: '1px',
          borderColor: `hsl(var(--foreground), ${5 + i * 5 / 100})`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
        }"
      />
    </div>
  </div>
</template>
```

Add the following code to your `./src/assets/css/tailwind.css` file:

```css [tailwind.css]
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}
```

Then, add the following colors and animations to your `tailwind.config.js` file:

```js {4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19} [tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      animation: {
        ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
      },
      keyframes: {
        ripple: {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(0.9)',
          },
        },
      },
    },
  },
}
```

## Props

| Prop              | Type   | Default | Description                            |
| ----------------- | ------ | ------- | -------------------------------------- |
| mainCircleSize    | number | 210     | The size of the main circle in pixels  |
| mainCircleOpacity | number | 0.24    | The opacity of the main circle         |
| numCircles        | number | 8       | The number of ripple circles to render |
