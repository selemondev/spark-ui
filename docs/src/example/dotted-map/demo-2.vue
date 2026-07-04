<script setup lang="ts">
import DottedMap from "./dotted-map.vue";
</script>

<template>
  <div class="relative h-[500px] w-full overflow-hidden rounded-lg border">
    <DottedMap :dot-radius="0.1" />
  </div>
</template>
