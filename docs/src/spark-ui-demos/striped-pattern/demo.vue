<script setup lang="ts">
import StripedPattern from "../../components/spark-ui/striped-pattern/striped-pattern.vue";
</script>

<template>
  <div
    class="relative flex h-[400px] w-[min(600px,70vw)] items-center justify-center overflow-hidden rounded-lg border"
  >
    <StripedPattern
      class="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
    />
  </div>
</template>
