<script setup lang='ts'>
import HeroVideoDialog from './hero-video-dialog.vue'
</script>

<template>
  <div class="relative max-w-[500px]">
    <HeroVideoDialog
      class="block dark:hidden"
      animation-style="from-center"
      video-src="https://www.youtube.com/embed/9JRT60ESGiI?si=gp4Yt6qE4-qHxOCg"
      thumbnail-src="https://startup-template-sage.vercel.app/hero-light.png"
      thumbnail-alt="Hero Video"
    />
    <HeroVideoDialog
      class="hidden dark:block"
      animation-style="from-center"
      video-src="https://www.youtube.com/embed/9JRT60ESGiI?si=gp4Yt6qE4-qHxOCg"
      thumbnail-src="https://startup-template-sage.vercel.app/hero-dark.png"
      thumbnail-alt="Hero Video"
    />
  </div>
</template>
