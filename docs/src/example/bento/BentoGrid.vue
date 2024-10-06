<script setup lang='ts'>
import { cn } from '../../lib/utils'

const props = defineProps<{
  className: string
}>()
const classStyle = cn(
  'grid w-full grid-cols-1 lg:grid-cols-2 gap-4',
  props.className,
)
</script>

<template>
  <div :class="classStyle">
    <slot />
  </div>
</template>
