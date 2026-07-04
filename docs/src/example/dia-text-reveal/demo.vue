<script setup lang="ts">
import DiaTextReveal from "./dia-text-reveal.vue";
</script>

<template>
  <div class="flex min-h-64 items-center justify-center p-8">
    <DiaTextReveal
      class="text-4xl font-bold tracking-tight"
      text="Magic UI"
      :colors="['#A97CF8', '#F38CB8', '#FDCC92']"
    />
  </div>
</template>
