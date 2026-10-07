<script setup lang="ts">
import DottedMap from "./dotted-map.vue";
</script>

<template>
  <div
    class="relative h-[420px] w-[calc(100%-2rem)] max-w-[500px] overflow-hidden rounded-lg border"
  >
    <DottedMap :dot-radius="0.1" />
  </div>
</template>
