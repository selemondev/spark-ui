<script setup lang="ts">
import { cn } from "../../lib/utils";
import GridPattern from "./grid-pattern.vue";
</script>

<template>
  <div
    class="relative flex size-full items-center justify-center overflow-hidden rounded-lg border border-black/10 dark:border-white/10 h-[450px] w-[300px] md:w-[600px] lg:w-[850px] p-20"
  >
    <GridPattern
      :width="20"
      :height="20"
      :x="-1"
      :y="-1"
      :class="
        cn('[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]')
      "
    />
  </div>
</template>
