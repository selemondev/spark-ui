<script setup lang='ts'>
import Meteors from '../../components/spark-ui/meteors/Meteors.vue'
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <div
      class="relative flex h-[450px] w-[300px] md:w-[500px] flex-col items-center justify-center overflow-hidden rounded-lg"
      border
    >
      <div class="absolute top-10 inset-x-0">
        <Meteors :number="30" />
      </div>
      <span
        class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent"
      >
        Meteors
      </span>
    </div>
  </div>
</template>
