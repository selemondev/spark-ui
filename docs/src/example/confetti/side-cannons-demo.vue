<script setup lang="ts">
async function handleClick() {
  const confetti = (await import("canvas-confetti")).default;
  const end = Date.now() + 3 * 1000; // 3 seconds
  const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

  const frame = () => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors,
    });

    requestAnimationFrame(frame);
  };

  frame();
}
</script>

<template>
  <div class="relative">
    <button
      class="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-neutral-900/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
      @click="handleClick"
    >
      Trigger Side Cannons
    </button>
  </div>
</template>
