<script setup lang="ts">
import SmoothCursor from "../../components/spark-ui/smooth-cursor/smooth-cursor.vue";
</script>

<template>
  <div
    class="relative flex h-80 w-[min(580px,75vw)] flex-col items-center justify-center overflow-hidden rounded-2xl border border-solid border-neutral-200 bg-gradient-to-br from-violet-100 to-sky-100 p-8 text-center dark:border-neutral-800 dark:from-violet-950 dark:to-slate-950"
  >
    <h3 class="text-2xl font-semibold">Move your mouse here</h3>
    <p class="mt-3 max-w-xs text-sm text-neutral-500">
      Turn, circle, and pause to see the cursor follow with a spring.
    </p>
    <p class="mt-6 text-xs text-neutral-500">
      The effect stays inside this area. Touch input keeps its normal behavior.
    </p>
    <SmoothCursor scope="parent" />
  </div>
</template>
