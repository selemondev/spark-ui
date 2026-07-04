<script setup lang="ts">
import LightRays from "./light-rays.vue";
</script>

<template>
  <div
    class="relative h-[400px] w-[300px] md:w-[500px] overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
  >
    <div
      class="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <span
        class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-800/60 dark:text-slate-200/60"
      >
        Ambient glow
      </span>
      <h1 class="text-4xl font-bold md:text-5xl text-slate-900 dark:text-slate-50">Light Rays</h1>
      <p class="max-w-md text-sm md:text-base text-slate-800/80 dark:text-slate-200/80">
        Drop this component into any container and it will fill the space with softly animated light
        rays shining from above.
      </p>
    </div>
    <LightRays />
  </div>
</template>
