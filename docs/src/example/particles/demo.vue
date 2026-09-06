<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import HeroBackground from "./particles-background.vue";
import HeroParticles from "./particles.vue";

const { isDark } = useData();
const color = computed(() => (isDark.value ? "#00DC82" : "red"));
</script>

<template>
  <div class="relative w-[300px] md:w-[500px] h-[400px]">
    <HeroParticles :accelerate="true" :color="color" class="absolute top-0" />
    <HeroBackground :color="color" />
  </div>
</template>
