<script setup lang='ts'>
import HeroBackground from './particles-background.vue'
import HeroParticles from './particles.vue'
</script>

<template>
  <div class="relative w-[300px] md:w-[500px] h-[400px]">
    <HeroParticles :accelerate="true" class="absolute top-0" />
    <HeroBackground />
  </div>
</template>
