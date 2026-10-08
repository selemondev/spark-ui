<script setup lang="ts">
import StripedPattern from "./striped-pattern.vue";
</script>

<template>
  <div class="relative flex size-full items-center justify-center overflow-hidden">
    <StripedPattern
      class="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
    />
  </div>
</template>
