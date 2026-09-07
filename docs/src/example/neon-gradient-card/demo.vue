<script setup lang="ts">
import { ref } from "vue";
import NeonGradientCard from "./neon-gradient-card.vue";

const alternate = ref(false);
</script>

<template>
  <div class="w-[min(380px,70vw)] py-12">
    <NeonGradientCard
      class="text-center"
      :neon-colors="
        alternate
          ? { firstColor: '#7928CA', secondColor: '#FFBE7B' }
          : { firstColor: '#ff00aa', secondColor: '#00FFF1' }
      "
    >
      <span
        class="relative z-10 block whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-3xl font-bold leading-none tracking-tighter text-transparent md:text-5xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
      >
        Neon Gradient Card
      </span>
      <button
        type="button"
        class="mt-6 rounded-md border border-neutral-300 px-4 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:text-white"
        @click="alternate = !alternate"
      >
        Change colors
      </button>
    </NeonGradientCard>
  </div>
</template>
