<script setup lang="ts">
import HexagonPattern from "./hexagon-pattern.vue";
</script>

<template>
  <div class="relative flex size-full items-center justify-center overflow-hidden rounded-lg p-20">
    <HexagonPattern :radius="40" :x="-1" :y="-1" stroke-dasharray="4 2" />
  </div>
</template>
