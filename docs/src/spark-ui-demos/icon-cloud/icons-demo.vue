<script setup lang="ts">
import IconCloud from "../../components/spark-ui/icon-cloud/icon-cloud.vue";

const svgIcons = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="#42b883"/></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M50 6 94 88H6Z" fill="#3178c6"/></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect x="8" y="8" width="84" height="84" rx="16" fill="#f7df1e"/></svg>',
];
</script>

<template>
  <div
    class="bg-background relative flex h-[400px] w-[300px] md:w-[500px] items-center justify-center overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
  >
    <IconCloud :icons="svgIcons" />
  </div>
</template>
