<script setup lang='ts'>
import { cn } from '../../lib/utils'

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
const array = new Uint32Array(1)
globalThis.crypto.getRandomValues(array)
const id = `pattern-${array[0]}`
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
