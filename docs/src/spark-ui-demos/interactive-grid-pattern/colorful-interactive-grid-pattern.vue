<script setup lang="ts">
import InteractiveGridPattern from "../../components/spark-ui/interactive-grid-pattern/interactive-grid-pattern.vue";
import { cn } from "../../lib/utils";
</script>

<template>
  <div
    class="relative flex h-[450px] max-h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border"
  >
    <InteractiveGridPattern
      :width="20"
      :height="20"
      :squares="[80, 80]"
      :class="cn('[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]')"
      squares-class-name="hover:fill-blue-500"
    />
  </div>
</template>
