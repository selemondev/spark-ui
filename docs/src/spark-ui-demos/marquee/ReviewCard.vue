<script setup lang='ts'>
import { cn } from '../../lib/utils'

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
