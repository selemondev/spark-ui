<script setup lang="ts">
import type { CreateTypes } from "canvas-confetti";
import { onBeforeUnmount, ref } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let instance: CreateTypes | null = null;
let interval: number | undefined;

async function handleClick() {
  const confetti = (await import("canvas-confetti")).default;
  if (!canvasRef.value) return;
  const fire = (instance ??= confetti.create(canvasRef.value, { resize: true }));
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  window.clearInterval(interval);
  interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return window.clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    fire({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    fire({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}

onBeforeUnmount(() => {
  window.clearInterval(interval);
  instance?.reset();
});
</script>

<template>
  <div class="relative flex size-full min-h-[400px] items-center justify-center">
    <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 size-full" />
    <button
      class="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-neutral-900/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
      @click="handleClick"
    >
      Trigger Fireworks
    </button>
  </div>
</template>
