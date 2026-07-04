<script setup lang="ts">
import GridPattern from "../../components/spark-ui/grid-pattern/grid-pattern.vue";
import { cn } from "../../lib/utils";
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <div
      class="relative flex size-full flex-col items-center justify-center overflow-hidden rounded-lg border border-black/10 dark:border-white/10 h-[450px] w-[300px] md:w-[600px] lg:w-[850px]"
    >
      <GridPattern
        :squares="[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
        ]"
        :class="
          cn(
            '[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12',
          )
        "
      />
    </div>
  </div>
</template>
