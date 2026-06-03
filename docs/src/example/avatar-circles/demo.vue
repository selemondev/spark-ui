<script setup lang='ts'>
import AvatarCircles from './avatar-circles.vue'

const avatarUrls = [
  'https://github.com/selemondev.png',
  'https://avatars.githubusercontent.com/u/16860528',
  'https://github.com/atinux.png',
  'https://github.com/danielroe.png',
]
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <AvatarCircles :num-people="99" :avatar-urls="avatarUrls" />
  </div>
</template>
