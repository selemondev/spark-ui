<script setup lang='ts'>
import Ripple from './Ripple.vue'
</script>

<template>
  <div
    class="relative flex h-[450px] w-[280px] md:w-[500px] lg:w-[550px] flex-col items-center justify-center overflow-hidden rounded-lg"
  >
    <p class="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
      Ripple
    </p>
    <Ripple />
  </div>
</template>
