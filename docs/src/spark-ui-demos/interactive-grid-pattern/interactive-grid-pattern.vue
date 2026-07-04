<script setup lang="ts">
import InteractiveGridPattern from "../../components/spark-ui/interactive-grid-pattern/interactive-grid-pattern.vue";
import { cn } from "../../lib/utils";
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <div
      class="relative flex h-[450px] w-[300px] flex-col items-center justify-center overflow-hidden rounded-lg border md:w-[500px]"
    >
      <InteractiveGridPattern
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
