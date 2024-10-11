<script setup lang='ts'>
import BlurFade from '../../components/spark-ui/blurFade/BlurFade.vue'
</script>

<template>
  <div class="grid place-items-center min-h-screen">
    <div class="flex flex-col space-y-2">
      <BlurFade in-view :delay="250">
        <span class="text-[45px] font-bold tracking-tighter dark:text-white leading-1">
          Hello World 👋
        </span>
      </BlurFade>
      <BlurFade in-view :delay="350 * 2">
        <span class="font-[500] text-[20px] dark:text-white tracking-tighter">
          Nice to meet you ✨
        </span>
      </BlurFade>
    </div>
  </div>
</template>
