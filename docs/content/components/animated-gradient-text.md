# Animated Gradient Text

An animated gradient background which transitions between colors for text.

<demo src="../../src/example/animatedGradientText/Demo.vue" srcCode="../../src/spark-ui-demos/animatedGradientText/AnimatedGradientText.vue" />

## Installation

Copy and past the following code into your project:

```vue [AnimatedGradientText.vue]
<script setup lang='ts'>
import { cn } from '../../../lib/utils'

interface AnimatedGradientText {
  class?: string
}

const props = defineProps<AnimatedGradientText>()

const className = cn(
  'group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40',
  props.class,
)
</script>

<template>
  <div :class="className">
    <div
      class="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]"
    />

    <slot />
  </div>
</template>
```

Update your `tailwind.config.js` file:

```js {5,6,7,8,9,10,11,12,13,14} [tailwind.config.js]
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        gradient: 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          to: {
            backgroundPosition: 'var(--bg-size) 0',
          },
        },
      },
    },
  },
}
```

## Props

| Prop  | Type   | Description              | Default |
| ----- | ------ | ------------------------ | ------- |
| class | string | The class to be applied. |         |
