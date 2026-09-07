<script setup lang="ts">
import NoiseTexture from "../../components/spark-ui/noise-texture/noise-texture.vue";
</script>

<template>
  <div
    class="relative flex h-[400px] w-[min(600px,70vw)] items-center justify-center overflow-hidden rounded-lg border bg-neutral-100/80 dark:bg-neutral-950"
  >
    <NoiseTexture class="[mask-image:radial-gradient(420px_circle_at_center,white,transparent)]" />
    <p class="relative z-10 text-3xl font-semibold tracking-tight">A little texture.</p>
  </div>
</template>
