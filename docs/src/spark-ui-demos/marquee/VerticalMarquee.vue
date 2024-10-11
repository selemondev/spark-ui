<script setup lang='ts'>
import Marquee from '../../components/spark-ui/marquee/Marquee.vue'
import ReviewCard from './ReviewCard.vue'

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
  <div class="relative flex h-[400px] w-[300px] lg:w-[800px] flex-row items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
    <Marquee pause-on-hover vertical class-name="[--duration:20s]">
      <div v-for="{ img, name, username, body } in firstRow" :key="username">
        <ReviewCard :key="username" :username="username" :img="img" :name="name" :body="body" />
      </div>
    </Marquee>
    <Marquee reverse pause-on-hover vertical class-name="[--duration:20s]">
      <div v-for="{ img, name, username, body } in secondRow" :key="username">
        <ReviewCard :key="username" :username="username" :img="img" :name="name" :body="body" />
      </div>
    </Marquee>
    <div class="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background" />
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background" />
  </div>
</template>
