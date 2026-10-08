<script setup lang="ts">
import HeroBackground from "../../components/spark-ui/particles/particles-background.vue";
import HeroParticles from "../../components/spark-ui/particles/particles.vue";
</script>

<template>
  <div class="relative h-[450px] w-full overflow-hidden">
    <HeroParticles :accelerate="true" class="absolute top-0" />
    <HeroBackground />
  </div>
</template>
