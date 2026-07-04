<script setup lang="ts">
import { cn } from "../../lib/utils";
import HexagonPattern from "./hexagon-pattern.vue";
</script>

<template>
  <div
    class="relative flex h-[450px] w-[300px] flex-col items-center justify-center overflow-hidden rounded-lg md:w-[500px]"
  >
    <HexagonPattern
      :hexagons="[
        [1, 1],
        [4, 4],
        [2, 2],
        [3, 4],
        [5, 4],
        [8, 2],
        [6, 3],
        [8, 5],
        [10, 10],
      ]"
      :class="
        cn(
          '[mask-image:radial-gradient(420px_circle_at_center,white,transparent)]',
          'inset-0 skew-y-6',
        )
      "
    />
  </div>
</template>
