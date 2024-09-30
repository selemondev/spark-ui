<script setup lang='ts'>
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: string
}>()

const className = cn(
  'mx-auto max-w-[120rem] px-8',
  props.class,
)
</script>

<template>
  <div :class="className">
    <slot />
  </div>
</template>
