<script setup lang='ts'>
import LetterUp from './letter-up.vue'
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <LetterUp words="Staggered Letter Pull Up" :delay="50" class="text-black dark:text-white" />
  </div>
</template>
