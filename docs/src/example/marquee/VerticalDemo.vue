<script setup lang='ts'>
import { useData } from 'vitepress'
import { computed } from 'vue'
import Marquee from './Marquee.vue'
import ReviewCard from './ReviewCard.vue'

const { isDark } = useData()

const leftGradient = computed(() => {
  return isDark.value
    ? 'pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#000000] to-transparent'
    : 'pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white to-transparent'
})

const rightGradient = computed(() => {
  return isDark.value
    ? 'pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#000000] to-transparent'
    : 'pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent'
})

const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: 'I\'ve never seen anything like this before. It\'s amazing. I love it.',
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'Jill',
    username: '@jill',
    body: 'I don\'t know what to say. I\'m speechless. This is amazing.',
    img: 'https://avatar.vercel.sh/jill',
  },
  {
    name: 'John',
    username: '@john',
    body: 'I\'m at a loss for words. This is amazing. I love it.',
    img: 'https://avatar.vercel.sh/john',
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)
</script>

<template>
  <div
    class="relative flex h-[400px] w-[300px] lg:w-[550px] flex-row items-center justify-center overflow-hidden rounded-lg"
  >
    <Marquee pause-on-hover vertical class="[--duration:20s]">
      <div v-for="{ img, name, username, body } in firstRow" :key="username">
        <ReviewCard :key="username" :username="username" :img="img" :name="name" :body="body" />
      </div>
    </Marquee>
    <Marquee reverse vertical class="[--duration:20s]">
      <div v-for="{ img, name, username, body } in secondRow" :key="username">
        <ReviewCard :key="username" :username="username" :img="img" :name="name" :body="body" />
      </div>
    </Marquee>
    <div :class="rightGradient" />
    <div :class="leftGradient" />
  </div>
</template>
