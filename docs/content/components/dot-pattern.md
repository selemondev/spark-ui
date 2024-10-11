# Dot pattern

A background dot pattern made with SVGs, fully customizable using Tailwind CSS.

<demo src="../../src/example/dotPattern/Demo.vue" srcCode="../../src/spark-ui-demos/dotPattern/DotPattern.vue" />

## Installation

Copy and paste the following code into your project:

```vue [DotPattern.vue]
<script setup lang='ts'>
import { cn } from '@/lib/utils'
import { useId } from 'vue'

interface DotPatternProps {
  width?: any
  height?: any
  x?: any
  y?: any
  cx?: any
  cy?: any
  cr?: any
  className?: string
  [key: string]: any
}
const props = withDefaults(defineProps<DotPatternProps>(), {
  width: 16,
  height: 16,
  x: 0,
  y: 0,
  cx: 1,
  cy: 1,
  cr: 1,
})

const id = `pattern-${useId()}`
</script>

<template>
  <svg
    aria-hidden="true" :class="cn(
      'pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80',
      props.className,
    )" v-bind="props"
  >
    <defs>
      <pattern
        :id="id" :width="props.width" :height="props.height" patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse" :x="props.x" :y="props.y"
      >
        <circle id="pattern-circle" :cx="props.cx" :cy="props.cy" :r="props.cr" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" strokeWidth="0" :fill="`url(#${id})`" />
  </svg>
</template>
```

## Examples

#### Linear Gradient

<demo src="../../src/example/dotPattern/DotPatternLinearGradient.vue" srcCode="../../src/spark-ui-demos/dotPattern/DotPatternLinearGradient.vue" />

## Props

| Prop   | Type   | Description               | Default |
| ------ | ------ | ------------------------- | ------- |
| width  | any    | Width of the dot pattern  | 16      |
| height | any    | Height of the dot pattern | 16      |
| x      | any    | X position of the dot     | 0       |
| y      | any    | Y position of the dot     | 0       |
| cx     | any    | X position of the circle  | 1       |
| cy     | any    | Y position of the circle  | 1       |
| cr     | any    | Radius of the circle      | 1       |
| class  | string | Class of the dot pattern  | -       |
