<script setup lang="ts">
import FlickeringGrid from "../../components/spark-ui/flickering-grid/flickering-grid.vue";
</script>

<template>
  <div
    class="relative size-[600px] max-w-full overflow-hidden rounded-lg border bg-background"
  >
    <FlickeringGrid
      class="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
      :square-size="4"
      :grid-gap="6"
      color="#60A5FA"
      :max-opacity="0.5"
      :flicker-chance="0.1"
      :height="800"
      :width="800"
    />
  </div>
</template>
