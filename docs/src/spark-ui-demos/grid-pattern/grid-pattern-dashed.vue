<script setup lang="ts">
import GridPattern from "../../components/spark-ui/grid-pattern/grid-pattern.vue";
import { cn } from "../../lib/utils";
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <div
      class="relative flex size-full items-center justify-center overflow-hidden rounded-lg border border-black/10 dark:border-white/10 h-[450px] w-[300px] md:w-[600px] lg:w-[850px] p-20"
    >
      <GridPattern
        :width="30"
        :height="30"
        :x="-1"
        :y="-1"
        stroke-dasharray="4 2"
        :class="
          cn('[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]')
        "
      />
    </div>
  </div>
</template>
