<script setup lang='ts'>
import Ripple from '../../components/spark-ui/ripple/Ripple.vue'
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <div
      class="relative flex h-[500px] w-full max-w-lg flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
    >
      <p class="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white dark:text-white">
        Ripple
      </p>
      <Ripple />
    </div>
  </div>
</template>
