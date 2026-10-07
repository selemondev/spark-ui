<script setup lang="ts">
import type { CreateTypes } from "canvas-confetti";
import { onBeforeUnmount, ref } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let instance: CreateTypes | null = null;
let frameId = 0;

async function handleClick() {
  const confetti = (await import("canvas-confetti")).default;
  if (!canvasRef.value) return;
  const fire = (instance ??= confetti.create(canvasRef.value, { resize: true }));
  const end = Date.now() + 3 * 1000; // 3 seconds
  const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

  const frame = () => {
    if (Date.now() > end) return;

    fire({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors,
    });
    fire({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors,
    });

    frameId = requestAnimationFrame(frame);
  };

  cancelAnimationFrame(frameId);
  frame();
}

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
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
      Trigger Side Cannons
    </button>
  </div>
</template>
