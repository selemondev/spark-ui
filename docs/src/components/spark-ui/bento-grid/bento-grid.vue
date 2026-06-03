<script setup lang='ts'>
import { cn } from '../../../lib/utils'

const props = defineProps<{
  class?: string
}>()
const classStyle = cn(
  'grid w-full auto-rows-[22rem] grid-cols-3 gap-4',
  props.class,
)
</script>

<template>
  <div :class="classStyle">
    <slot />
  </div>
</template>
