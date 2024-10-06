<script setup lang='ts'>
import RetroGrid from './retroGrid.vue'
</script>

<template>
  <div
    class="relative flex h-[400px] w-[200px] lg:w-[600px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background"
  >
    <span
      class="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent"
    >
      Retro Grid
    </span>

    <RetroGrid />
  </div>
</template>
