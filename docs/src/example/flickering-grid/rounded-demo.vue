<script setup lang="ts">
import FlickeringGrid from "./flickering-grid.vue";
</script>

<template>
  <div class="relative size-full overflow-hidden bg-background">
    <FlickeringGrid
      class="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
      :square-size="4"
      :grid-gap="6"
      color="#60A5FA"
      :max-opacity="0.5"
      :flicker-chance="0.1"
    />
  </div>
</template>
