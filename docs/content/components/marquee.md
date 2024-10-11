# Marquee

A customizable scrolling component that loops its content horizontally or vertically, with configurable direction, hover pause, and repeat options.

<demo src="../../src/example/marquee/Demo.vue" srcCode="../../src/spark-ui-demos/marquee/Marquee.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [Marquee.vue]
<script setup lang='ts'>
import { cn } from '@/lib/utils'

interface MarqueeProps {
  class?: string
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
  repeat?: number
  [key: string]: any
};

const props = withDefaults(defineProps<MarqueeProps>(), {
  pauseOnHover: false,
  vertical: false,
  repeat: 4,
})

const className = cn(
  'flex shrink-0 justify-around [gap:var(--gap)]',
  {
    'animate-marquee-vertical flex-col': props.vertical,
    'animate-marquee flex-row': !props.vertical,
    'animate-marquee-reverse': props.reverse,
    'group-hover:[animation-play-state:paused]': props.pauseOnHover,
  },
)
</script>

<template>
  <div
    v-bind="props" :class="cn('group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
                              {
                                'flex-row': !props.vertical,
                                'flex-col': props.vertical,
                              },
                              props.class,
    )"
  >
    <div v-for="i in Array(props.repeat).fill(0)" :key="i">
      <div :key="i" :class="className">
        <slot />
      </div>
    </div>
  </div>
</template>
```

```vue [ReviewCard.vue]
<script setup lang='ts'>
import { cn } from '@/lib/utils'

const props = defineProps<{
  img: string
  name: string
  username: string
  body: string
}>()
</script>

<template>
  <div
    :class="cn(
      'relative w-64 cursor-pointer overflow-hidden h-36 flex flex-col space-y-1 rounded-xl px-4',
      '  border-gray-950/[.1] bg-gray-950/[.01] border-parent hover:bg-gray-950/[.05]',
    )"
  >
    <div class="flex items-center space-x-2">
      <img class="rounded-full" width="32" height="32" :src="props.img">
      <p class="flex flex-col space-y-1">
        <span class="text-sm font-medium dark:text-white">
          {{ props.name }}
        </span>
        <span class="text-xs font-medium dark:text-white/40">
          {{ props.username }}
        </span>
      </p>
    </div>

    <div>
      <span leading-none class="text-sm font-medium  dark:text-white/40">
        {{ props.body }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.border-parent {
  border: 1px solid #ecedee;
}
</style>
```

:::

Add the following animations to your `tailwind.config.js` file:

```js {4,5,6,7,8,9,10,11,12,13,14,15,16,17} [tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      animation: {
        'marquee': 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
      keyframes: {
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
    },
  },
}
```

## Examples

#### Vertical Marquee

<demo src="../../src/example/marquee/VerticalDemo.vue" srcCode="../../src/spark-ui-demos/marquee/VerticalMarquee.vue" />

#### 3D Marquee

<demo src="../../src/example/marquee/3DDemo.vue" srcCode="../../src/spark-ui-demos/marquee/3DMarquee.vue" />

## Props

| Prop         | Type    | Default | Description                                                                  |
| ------------ | ------- | ------- | ---------------------------------------------------------------------------- |
| class        | string  |         | The class to apply to the component.                                         |
| reverse      | boolean | false   | Whether or not to reverse the direction of the marquee.                      |
| pauseOnHover | boolean | false   | Whether or not to pause the marquee when the user hovers over the component. |
| vertical     | boolean | false   | Whether or not to display the marquee vertically.                            |
| repeat       | number  | 1       | The number of times to repeat the content.                                   |
