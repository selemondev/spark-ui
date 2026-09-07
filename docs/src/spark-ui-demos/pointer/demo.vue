<script setup lang="ts">
import { motion } from "motion-v";
import Pointer from "../../components/spark-ui/pointer/pointer.vue";
</script>

<template>
  <div class="grid w-[min(620px,75vw)] gap-4 sm:grid-cols-2">
    <div
      class="flex h-48 flex-col items-center justify-center rounded-xl border border-solid border-neutral-200 p-5 dark:border-neutral-800"
    >
      <h3 class="text-lg font-semibold">Colored pointer</h3>
      <p class="mt-2 text-center text-sm text-neutral-500">Hover inside this card.</p>
      <Pointer class="text-blue-500" />
    </div>
    <div
      class="flex h-48 flex-col items-center justify-center rounded-xl border border-solid border-neutral-200 p-5 dark:border-neutral-800"
    >
      <h3 class="text-lg font-semibold">Custom shape</h3>
      <p class="mt-2 text-center text-sm text-neutral-500">Slots can hold animated content.</p>
      <Pointer>
        <motion.div
          class="h-7 w-7 rounded-full border-4 border-solid border-violet-500 bg-white"
          :animate="{ scale: [0.8, 1.2, 0.8] }"
          :transition="{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }"
        />
      </Pointer>
    </div>
  </div>
</template>
