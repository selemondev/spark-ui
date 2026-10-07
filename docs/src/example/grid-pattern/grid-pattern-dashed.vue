<script setup lang="ts">
import { cn } from "../../lib/utils";
import GridPattern from "./grid-pattern.vue";
</script>

<template>
  <div
    class="relative flex h-[450px] max-h-full w-full items-center justify-center overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
  >
    <GridPattern
      :width="30"
      :height="30"
      :x="-1"
      :y="-1"
      stroke-dasharray="4 2"
      :class="cn('[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]')"
    />
  </div>
</template>
