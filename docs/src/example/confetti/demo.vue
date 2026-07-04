<script setup lang="ts">
import { ref } from "vue";
import Confetti from "./confetti.vue";

const confettiRef = ref<InstanceType<typeof Confetti> | null>(null);
</script>

<template>
  <div
    class="relative flex h-[440px] w-full max-w-[500px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-white dark:bg-black"
  >
    <span
      class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"
    >
      Confetti
    </span>

    <Confetti
      ref="confettiRef"
      class="absolute left-0 top-0 z-0 size-full"
      @mouseenter="confettiRef?.fire({})"
    />
  </div>
</template>
