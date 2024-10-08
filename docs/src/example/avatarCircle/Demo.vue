<script setup lang='ts'>
import AvatarCircles from './AvatarCircles.vue'

const avatarUrls = [
  'https://github.com/selemondev.png',
  'https://avatars.githubusercontent.com/u/20110627',
  'https://avatars.githubusercontent.com/u/106103625',
  'https://avatars.githubusercontent.com/u/59228569',
]
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <AvatarCircles :num-people="99" :avatar-urls="avatarUrls" />
  </div>
</template>
