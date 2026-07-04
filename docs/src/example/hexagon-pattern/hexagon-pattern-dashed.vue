<script setup lang="ts">
import HexagonPattern from "./hexagon-pattern.vue";
</script>

<template>
  <div
    class="relative flex h-[450px] w-[300px] items-center justify-center overflow-hidden rounded-lg p-20 md:w-[500px]"
  >
    <HexagonPattern :radius="40" :x="-1" :y="-1" stroke-dasharray="4 2" />
  </div>
</template>
