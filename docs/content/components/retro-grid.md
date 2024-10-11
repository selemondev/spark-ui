# Retro Grid

An animated scrolling retro grid effect

<demo src="../../src/example/retroGrid/Demo.vue" srcCode="../../src/spark-ui-demos/retroGrid/retroGrid.vue" />

## Installation

Copy and paste the following code into your project

```vue [RetroGrid.vue]
<script setup lang='ts'>
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  angle?: number
  class?: string
}>(), {
  angle: 65,
})
</script>

<template>
  <div
    :class="cn(
      'selection:pointer-events-none absolute size-full overflow-hidden opacity-50 [perspective:200px]',
      props.class,
    )" :style="{
      '--grid-angle': `${props.angle}deg`,
    }"
  >
    <div class="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
      <div
        :class="cn(
          'animate-grid',

          '[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]',

          '[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]',

          'dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]',
        )"
      />
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-black to-90%" />
  </div>
</template>
```

## Props

## Props

| Prop  | Type   | Description                 | Default |
| ----- | ------ | --------------------------- | ------- |
| class | string | The class for the component | ""      |
| angle | number | The angle of the grid       | 65      |
