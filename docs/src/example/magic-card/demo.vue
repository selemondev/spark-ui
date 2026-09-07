<script setup lang="ts">
import MagicCard from "./magic-card.vue";
</script>

<template>
  <div class="grid w-[min(680px,75vw)] gap-5 sm:grid-cols-2">
    <MagicCard class="rounded-2xl" gradient-color="#9E7AFF" :gradient-opacity="0.2">
      <div class="flex min-h-64 flex-col justify-center gap-3 p-7">
        <span class="text-xs uppercase tracking-widest text-violet-500">Gradient</span>
        <h3 class="text-xl font-semibold">Follow the light</h3>
        <p class="text-sm text-neutral-500">
          Move your pointer across the card to light up its surface and border.
        </p>
        <button
          type="button"
          class="mt-3 rounded-lg border border-solid border-neutral-300 px-4 py-2 dark:border-neutral-700"
        >
          Try the spotlight
        </button>
      </div>
    </MagicCard>
    <MagicCard class="rounded-2xl" mode="orb" :glow-size="240" :glow-blur="35">
      <div class="flex min-h-64 flex-col justify-center gap-3 p-7">
        <span class="text-xs uppercase tracking-widest text-orange-500">Orb</span>
        <h3 class="text-xl font-semibold">A softer glow</h3>
        <p class="text-sm text-neutral-500">
          The blurred orb follows with a spring and fades when you leave.
        </p>
        <button
          type="button"
          class="mt-3 rounded-lg border border-solid border-neutral-300 px-4 py-2 dark:border-neutral-700"
        >
          Try the glow
        </button>
      </div>
    </MagicCard>
  </div>
</template>
