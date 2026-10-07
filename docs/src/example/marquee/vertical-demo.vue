<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import Marquee from "./marquee.vue";
import ReviewCard from "./review-card.vue";

const { isDark } = useData();

const topGradient = computed(() => {
  return isDark.value
    ? "pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#000000] to-transparent"
    : "pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white to-transparent";
});

const bottomGradient = computed(() => {
  return isDark.value
    ? "pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#000000] to-transparent"
    : "pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent";
});

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
</script>

<template>
  <div
    class="relative flex size-full flex-row flex-wrap content-start justify-center overflow-hidden"
  >
    <Marquee pause-on-hover vertical class="h-full [--duration:20s]">
      <div v-for="{ img, name, username, body } in firstRow" :key="username">
        <ReviewCard :key="username" :username="username" :img="img" :name="name" :body="body" />
      </div>
    </Marquee>
    <Marquee reverse pause-on-hover vertical class="h-full [--duration:20s]">
      <div v-for="{ img, name, username, body } in secondRow" :key="username">
        <ReviewCard :key="username" :username="username" :img="img" :name="name" :body="body" />
      </div>
    </Marquee>
    <div :class="topGradient" />
    <div :class="bottomGradient" />
  </div>
</template>
