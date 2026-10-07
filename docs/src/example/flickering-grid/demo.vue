<script setup lang="ts">
import FlickeringGrid from "./flickering-grid.vue";
</script>

<template>
  <div class="relative size-full overflow-hidden bg-background">
    <FlickeringGrid
      class="absolute inset-0 z-0 size-full"
      :square-size="4"
      :grid-gap="6"
      color="#6B7280"
      :max-opacity="0.5"
      :flicker-chance="0.1"
    />
  </div>
</template>
