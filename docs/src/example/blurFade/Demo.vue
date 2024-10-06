<script setup lang='ts'>
import BlurFade from './BlurFade.vue'
</script>

<template>
  <div class="flex flex-col space-y-2">
    <BlurFade :delay="250">
      <span class="text-[35px] font-bold tracking-tighter dark:text-white leading-1">
        Hello World 👋
      </span>
    </BlurFade>
    <BlurFade :delay="350 * 2">
      <span class="font-[500] text-[18px] dark:text-white tracking-tighter">
        Nice to meet you ✨
      </span>
    </BlurFade>
  </div>
</template>
