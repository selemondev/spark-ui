<script setup lang="ts">
import Lens from "./lens.vue";

const image =
  "https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
</script>

<template>
  <div
    class="relative w-[300px] md:w-[420px] overflow-hidden rounded-xl border border-black/10 bg-white text-black shadow-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white"
  >
    <div class="p-4">
      <Lens :zoom-factor="2" :lens-size="150" :is-static="false" aria-label="Zoom Area">
        <img :src="image" alt="image placeholder" width="500" height="500" class="h-40 w-full object-cover" />
      </Lens>
    </div>
    <div class="px-6 pb-2">
      <h3 class="text-2xl font-semibold">Your next camp</h3>
      <p class="text-sm text-black/60 dark:text-white/60">
        See our latest and best camp destinations all across the five continents of the globe.
      </p>
    </div>
    <div class="flex space-x-4 px-6 pb-6 pt-2">
      <button
        class="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
      >
        Let's go
      </button>
      <button
        class="rounded-md bg-black/10 px-4 py-2 text-sm font-medium text-black dark:bg-white/10 dark:text-white"
      >
        Another time
      </button>
    </div>
  </div>
</template>
