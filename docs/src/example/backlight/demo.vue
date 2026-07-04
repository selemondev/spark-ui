<script setup lang="ts">
import Backlight from "./backlight.vue";
</script>

<template>
  <Backlight :blur="40" class="w-full">
    <iframe
      class="mx-auto aspect-video w-full max-w-lg"
      src="https://www.youtube.com/embed/9CJLtzzUphU"
      title="Gradient Loop Background"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
        web-share;
      "
      referrerpolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </Backlight>
</template>
