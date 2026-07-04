<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import LineShadowText from "./line-shadow-text.vue";

const { isDark } = useData();

const shadowColor = computed(() => (isDark.value ? "white" : "black"));
</script>

<template>
  <h1
    class="text-5xl leading-none font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl text-black dark:text-white"
  >
    Ship
    <LineShadowText class="italic" text="Fast" :shadow-color="shadowColor" />
  </h1>
</template>
