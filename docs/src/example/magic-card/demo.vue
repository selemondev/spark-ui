<script setup lang="ts">
import MagicCard from "./magic-card.vue";
</script>

<template>
  <div class="grid w-full max-w-[680px] gap-4 px-4 sm:grid-cols-2 sm:gap-5 sm:px-6">
    <MagicCard class="rounded-2xl" gradient-color="#9E7AFF" :gradient-opacity="0.2">
      <div class="flex flex-col justify-center gap-2 p-5 sm:min-h-64 sm:gap-3 sm:p-7">
        <span class="text-xs uppercase tracking-widest text-violet-500">Gradient</span>
        <h3 class="text-lg font-semibold sm:text-xl">Follow the light</h3>
        <p class="text-sm text-neutral-500">
          Move your pointer across the card to light up its surface and border.
        </p>
        <button
          type="button"
          class="mt-1 rounded-lg border border-solid border-neutral-300 px-4 py-1.5 dark:border-neutral-700 sm:mt-3 sm:py-2"
        >
          Try the spotlight
        </button>
      </div>
    </MagicCard>
    <MagicCard class="rounded-2xl" mode="orb" :glow-size="240" :glow-blur="35">
      <div class="flex flex-col justify-center gap-2 p-5 sm:min-h-64 sm:gap-3 sm:p-7">
        <span class="text-xs uppercase tracking-widest text-orange-500">Orb</span>
        <h3 class="text-lg font-semibold sm:text-xl">A softer glow</h3>
        <p class="text-sm text-neutral-500">
          The blurred orb follows with a spring and fades when you leave.
        </p>
        <button
          type="button"
          class="mt-1 rounded-lg border border-solid border-neutral-300 px-4 py-1.5 dark:border-neutral-700 sm:mt-3 sm:py-2"
        >
          Try the glow
        </button>
      </div>
    </MagicCard>
  </div>
</template>
