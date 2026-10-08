<script setup lang="ts">
import type { CreateTypes } from "canvas-confetti";
import { onBeforeUnmount, ref } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let instance: CreateTypes | null = null;

async function handleClick() {
  const confetti = (await import("canvas-confetti")).default;
  if (!canvasRef.value) return;
  const fire = (instance ??= confetti.create(canvasRef.value, { resize: true }));
  const scalar = 2;
  const unicorn = confetti.shapeFromText({ text: "🦄", scalar });

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0,
    decay: 0.96,
    startVelocity: 20,
    shapes: [unicorn],
    scalar,
  };

  const shoot = () => {
    fire({ ...defaults, particleCount: 30 });
    fire({ ...defaults, particleCount: 5 });
    fire({
      ...defaults,
      particleCount: 15,
      scalar: scalar / 2,
      shapes: ["circle"],
    });
  };

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

onBeforeUnmount(() => instance?.reset());
</script>

<template>
  <div class="relative flex size-full min-h-[400px] items-center justify-center">
    <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 size-full" />
    <button
      class="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-neutral-900/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
      @click="handleClick"
    >
      Trigger Emoji
    </button>
  </div>
</template>
