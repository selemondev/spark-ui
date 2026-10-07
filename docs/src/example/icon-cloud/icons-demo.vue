<script setup lang="ts">
import IconCloud from "./icon-cloud.vue";
import { svgIcons } from "./icons";
</script>

<template>
  <div
    class="bg-background relative flex h-[400px] max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-[500px] items-center justify-center overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
  >
    <IconCloud :icons="svgIcons" />
  </div>
</template>
