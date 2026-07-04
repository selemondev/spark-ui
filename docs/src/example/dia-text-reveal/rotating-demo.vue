<script setup lang="ts">
import DiaTextReveal from "./dia-text-reveal.vue";
</script>

<template>
  <div class="text-foreground flex min-h-64 items-center justify-center p-8">
    <h1 class="text-center text-3xl font-semibold tracking-tight md:text-4xl">
      Learn to
      <DiaTextReveal
        repeat
        :repeat-delay="1.2"
        :text="['build faster', 'ship smarter', 'scale easier']"
      />
    </h1>
  </div>
</template>
