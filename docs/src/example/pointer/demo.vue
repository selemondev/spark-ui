<script setup lang="ts">
import { motion } from "motion-v";
import Pointer from "./pointer.vue";
</script>

<template>
  <div class="grid w-[calc(100%-2rem)] max-w-[560px] gap-4 sm:grid-cols-2">
    <div
      class="relative flex h-48 flex-col overflow-hidden items-center justify-center rounded-xl border border-solid border-neutral-200 p-5 dark:border-neutral-800"
    >
      <h3 class="text-lg font-semibold">Colored pointer</h3>
      <p class="mt-2 text-center text-sm text-neutral-500">Hover inside this card.</p>
      <Pointer contained class="text-blue-500" />
    </div>
    <div
      class="relative flex h-48 flex-col overflow-hidden items-center justify-center rounded-xl border border-solid border-neutral-200 p-5 dark:border-neutral-800"
    >
      <h3 class="text-lg font-semibold">Custom shape</h3>
      <p class="mt-2 text-center text-sm text-neutral-500">Slots can hold animated content.</p>
      <Pointer contained>
        <motion.div
          class="h-7 w-7 rounded-full border-4 border-solid border-violet-500 bg-white"
          :animate="{ scale: [0.8, 1.2, 0.8] }"
          :transition="{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }"
        />
      </Pointer>
    </div>
  </div>
</template>
