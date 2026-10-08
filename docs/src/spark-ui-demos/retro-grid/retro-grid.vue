<script setup lang="ts">
import RetroGrid from "../../components/spark-ui/retro-grid/retro-grid.vue";
</script>

<template>
  <div class="grid size-full place-items-center">
    <div
      class="relative flex size-full flex-col items-center justify-center overflow-hidden bg-background"
    >
      <span
        class="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent"
      >
        Retro Grid
      </span>

      <RetroGrid />
    </div>
  </div>
</template>
