<script setup lang='ts'>
import HeroParticles from '../../components/spark-ui/particles/Particles.vue'
import HeroBackground from '../../components/spark-ui/particles/ParticlesBackground.vue'
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <div class="relative w-[300px] md:w-[550px] h-[400px]">
      <HeroParticles :accelerate="true" class="absolute top-0" />
      <HeroBackground />
    </div>
  </div>
</template>
