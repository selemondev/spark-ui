<script setup lang="ts">
import WarpBackground from "./warp-background.vue";
</script>

<template>
  <WarpBackground
    class-name="w-[min(640px,70vw)] px-6 py-20 sm:px-16"
    grid-color="hsl(var(--border) / 0.15)"
  >
    <div
      class="mx-auto w-full max-w-80 rounded-xl border bg-white p-4 shadow-sm dark:bg-neutral-950"
    >
      <p class="font-semibold">Congratulations on Your Promotion!</p>
      <p class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Your hard work and dedication have paid off. We are thrilled to see you take this next step
        in your career. Keep up the fantastic work!
      </p>
    </div>
  </WarpBackground>
</template>
