<script setup lang="ts">
import Globe from "./globe.vue";
</script>

<template>
  <div
    class="relative flex aspect-[3/4] max-h-full w-full max-w-lg justify-center overflow-hidden px-4 pt-8 sm:aspect-[8/7] sm:pt-10"
  >
    <span
      class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 sm:text-8xl"
    >
      Globe
    </span>
    <Globe class="top-24 sm:top-36" />
    <div
      class="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]"
    />
  </div>
</template>
