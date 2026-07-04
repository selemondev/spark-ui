<script setup lang="ts">
import DottedMap from "./dotted-map.vue";
</script>

<template>
  <div class="relative h-[440px] w-full max-w-[500px] overflow-hidden rounded-lg border">
    <DottedMap :dot-radius="0.1" />
  </div>
</template>
