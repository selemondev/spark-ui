<script setup lang="ts">
import DiaTextReveal from "./dia-text-reveal.vue";
</script>

<template>
  <div class="flex min-h-56 items-center justify-center p-8">
    <DiaTextReveal
      class="text-4xl font-bold tracking-tight"
      :colors="['#22d3ee', '#818cf8', '#f472b6', '#34d399']"
      text="Design systems"
    />
  </div>
</template>
