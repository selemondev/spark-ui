<script setup lang="ts">
import DiaTextReveal from "./dia-text-reveal.vue";
</script>

<template>
  <div class="flex min-h-56 items-center justify-center p-8">
    <DiaTextReveal
      class="text-3xl font-bold tracking-tight sm:text-4xl"
      :colors="['#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7']"
      :delay="0.35"
      :duration="2.4"
      text="Made with care"
    />
  </div>
</template>
