<script setup lang="ts">
import MorphingText from "./morphing-text.vue";

const texts = ["Hello", "Morphing", "Text", "Animation", "Vue", "Smooth", "Transition"];
</script>

<template>
  <div class="flex min-h-48 w-[min(600px,70vw)] items-center justify-center">
    <MorphingText :texts="texts" class-name="text-4xl sm:text-6xl lg:text-7xl" />
  </div>
</template>
