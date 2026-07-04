<script setup lang="ts">
import { cn } from "../../lib/utils";
import InteractiveGridPattern from "./interactive-grid-pattern.vue";
</script>

<template>
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
</template>
