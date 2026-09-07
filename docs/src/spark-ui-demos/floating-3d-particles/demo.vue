<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import Floating3DParticles from "../../components/spark-ui/floating-3d-particles/floating-3d-particles.vue";

const { isDark } = useData();
const color = computed(() => (isDark.value ? "#ffffff" : "#000000"));
</script>

<template>
  <div
    class="relative flex h-[500px] w-[min(680px,70vw)] items-center justify-center overflow-hidden rounded-lg border bg-white dark:bg-neutral-950"
  >
    <Floating3DParticles :color="color" />
    <div class="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-5xl">Build something magical</h2>
      <p class="max-w-xl text-base text-neutral-500 dark:text-neutral-400 md:text-lg">
        A particle background with continuous rotation and buoyant drift.
      </p>
      <a
        href="#usage"
        class="inline-flex h-11 items-center gap-2 rounded-lg bg-neutral-950 px-6 font-medium !text-white !no-underline transition-opacity hover:opacity-90 dark:bg-white dark:!text-neutral-950"
      >
        Get Started <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  </div>
</template>
