<script setup lang="ts">
import Ripple from "../../components/spark-ui/ripple/ripple.vue";
</script>

<template>
  <div class="grid size-full place-items-center">
    <div
      class="relative flex size-full flex-col items-center justify-center overflow-hidden bg-background"
    >
      <p
        class="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white dark:text-white"
      >
        Ripple
      </p>
      <Ripple />
    </div>
  </div>
</template>
