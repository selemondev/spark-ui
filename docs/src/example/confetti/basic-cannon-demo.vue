<script setup lang="ts">
import { ref } from "vue";
import ConfettiButton from "./confetti-button.vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
</script>

<template>
  <div class="relative flex size-full min-h-[400px] items-center justify-center">
    <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 size-full" />
    <ConfettiButton :options="{ canvas: canvasRef ?? undefined }">Confetti 🎉</ConfettiButton>
  </div>
</template>
