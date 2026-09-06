<script setup lang="ts">
import LineShadowText from "../../components/spark-ui/line-shadow-text/line-shadow-text.vue";
</script>

<template>
  <h1
    class="text-5xl leading-none font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl text-black dark:text-white [--line-shadow-color:black] dark:[--line-shadow-color:white]"
  >
    Ship
    <LineShadowText class="italic" text="Fast" shadow-color="var(--line-shadow-color)" />
  </h1>
</template>
