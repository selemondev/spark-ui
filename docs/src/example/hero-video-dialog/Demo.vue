<script setup lang='ts'>
import HeroVideoDialog from './HeroVideoDialog.vue'
</script>

<template>
  <div class="relative max-w-[500px]">
    <HeroVideoDialog
      class="block dark:hidden"
      animation-style="from-center"
      video-src="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
      thumbnail-src="https://startup-template-sage.vercel.app/hero-light.png"
      thumbnail-alt="Hero Video"
    />
    <HeroVideoDialog
      class="hidden dark:block"
      animation-style="from-center"
      video-src="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
      thumbnail-src="https://startup-template-sage.vercel.app/hero-dark.png"
      thumbnail-alt="Hero Video"
    />
  </div>
</template>
