<script setup lang='ts'>
import Nitro from '../../components/icons/Nitro.vue'
import Nuxt from '../../components/icons/Nuxt.vue'
import ViteIcon from '../../components/icons/ViteIcon.vue'
import Vitest from '../../components/icons/Vitest.vue'
import Vue from '../../components/icons/Vue.vue'
import OrbitingCircles from '../../components/spark-ui/orbitingCircles/OrbitingCircles.vue'
</script>

<template>
  <div class="relative flex h-[500px] w-[300px] md:w-[600px] flex-col items-center justify-center overflow-hidden">
    <span
      class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black"
    >
      Circle
    </span>

    <OrbitingCircles class="size-[30px] border-none bg-transparent" :duration="20" :delay="10" :radius="70">
      <Nuxt />
    </OrbitingCircles>

    <OrbitingCircles class="size-[30px] border-none bg-transparent" :duration="20" :delay="10" :radius="100" reverse>
      <Nitro />
    </OrbitingCircles>

    <OrbitingCircles class="size-[50px]" :radius="190" :duration="20" reverse>
      <ViteIcon />
    </OrbitingCircles>

    <OrbitingCircles class="size-[50px]" :radius="145" :duration="20">
      <Vitest />
    </OrbitingCircles>

    <OrbitingCircles class="size-[30px] border-none bg-transparent" :duration="40" :delay="10" :radius="45" reverse>
      <Vue />
    </OrbitingCircles>
  </div>
</template>
