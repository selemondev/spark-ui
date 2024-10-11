# Staggered Letter Pull Up Animation

Staggered letter pull up text animation.

<demo src="../../src/example/letterUp/Demo.vue" srcCode="../../src/spark-ui-demos/letterUp/LetterUp.vue" />

## Installation

Copy and paste the following code into your project:

```vue [LetterPullUp.vue]
<script setup lang='ts'>
import { cn } from '../../../lib/utils'

interface LetterPullupProps {
  class?: string
  words: string
  delay?: number
}

const props = defineProps<LetterPullupProps>()

const letters = props.words.split('')

const pullupVariant = {
  initial: { y: 100, opacity: 0 },
  enter: (i: any) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * (props.delay ? props.delay : 0.05),
    },
  }),
}

const className = cn(
  'font-sans text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm md:text-4xl md:leading-[5rem]',
  props.class,
)
</script>

<template>
  <div class="flex justify-center">
    <div v-for="(letter, index) in letters" :key="letter">
      <h1 v-motion :initial="pullupVariant.initial" :enter="pullupVariant.enter(index)" :class="className">
        <span v-if="letter === ' ' ">&nbsp;</span>
        <span v-else>{{ letter }}</span>
      </h1>
    </div>
  </div>
</template>
```

## Props

| Prop  | Type   | Description                                             | Default                    |
| ----- | ------ | ------------------------------------------------------- | -------------------------- |
| class | string | The class to be applied to the component                |                            |
| words | string | Text to animate                                         | "Staggered Letter Pull Up" |
| delay | number | Delay each letter's animation by this many milliseconds | 50                         |
