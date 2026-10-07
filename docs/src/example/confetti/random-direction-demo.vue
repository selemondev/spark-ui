<script setup lang="ts">
import { computed, ref } from "vue";
import ConfettiButton from "./confetti-button.vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const options = computed(() => ({
  canvas: canvasRef.value ?? undefined,
  get angle() {
    return Math.random() * 360;
  },
}));
</script>

<template>
  <div class="relative flex size-full min-h-[400px] items-center justify-center">
    <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 size-full" />
    <ConfettiButton :options="options">Random Confetti 🎉</ConfettiButton>
  </div>
</template>
