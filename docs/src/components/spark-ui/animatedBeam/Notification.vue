<script setup lang='ts'>
import { cn } from '../../../lib/utils'

const props = defineProps(['name', 'description', 'icon', 'color', 'time'])

const className = cn(
  'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-2',
  // animation styles
  'transition-all duration-200 ease-in-out hover:scale-[103%]',
  // light styles
  'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
  // dark styles
  'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
)
</script>

<template>
  <figure :class="className">
    <div class="flex flex-row border rounded-xl items-center px-2 gap-4">
      <div class="flex size-10 items-center justify-center rounded-2xl" :style="{ backgroundColor: props.color }">
        <span class="text-lg">{{ props.icon }}</span>
      </div>
      <div class="flex flex-col space-y-1 overflow-hidden">
        <div class="flex flex-row items-center whitespace-pre text-lg font-medium ">
          <span class="text-sm text-black dark:text-white font-semibold sm:text-lg">{{ props.name }}</span>
          <span class="mx-1">·</span>
          <span class="text-xs text-gray-500 dark:text-gray-200">{{ props.time }}</span>
        </div>
        <p class="text-sm font-normal dark:text-white">
          {{ props.description }}
        </p>
      </div>
    </div>
  </figure>
</template>
