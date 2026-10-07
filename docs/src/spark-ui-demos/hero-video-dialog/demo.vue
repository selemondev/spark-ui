<script setup lang="ts">
import { ref } from "vue";
import HeroVideoDialog from "../../components/spark-ui/hero-video-dialog/hero-video-dialog.vue";

const area = ref<HTMLElement | null>(null);
</script>

<template>
  <div
    ref="area"
    class="relative flex size-full min-h-[400px] items-center justify-center overflow-hidden"
  >
    <div class="w-[calc(100%-2rem)] max-w-[500px]">
      <HeroVideoDialog
        class="block dark:hidden"
        animation-style="from-center"
        :container="area"
        video-src="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnail-src="https://startup-template-sage.vercel.app/hero-light.png"
        thumbnail-alt="Hero Video"
      />
      <HeroVideoDialog
        class="hidden dark:block"
        animation-style="from-center"
        :container="area"
        video-src="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnail-src="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnail-alt="Hero Video"
      />
    </div>
  </div>
</template>
