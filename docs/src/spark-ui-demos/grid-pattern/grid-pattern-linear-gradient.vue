<script setup lang="ts">
import GridPattern from "../../components/spark-ui/grid-pattern/grid-pattern.vue";
import { cn } from "../../lib/utils";
</script>

<template>
  <div
    class="relative flex h-[450px] max-h-full w-full items-center justify-center overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
  >
    <GridPattern
      :width="20"
      :height="20"
      :x="-1"
      :y="-1"
      :class="cn('[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]')"
    />
  </div>
</template>
