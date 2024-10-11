<script setup lang='ts'>
import { useData } from 'vitepress'
import { computed } from 'vue'
import Marquee from './Marquee.vue'

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

const logos = [
  {
    name: 'Microsoft',
    img: 'https://picsum.photos/id/1/200/300',
  },
  {
    name: 'Apple',
    img: 'https://picsum.photos/id/2/200/300',
  },
  {
    name: 'Google',
    img: 'https://picsum.photos/id/3/200/300',
  },
  {
    name: 'Facebook',
    img: 'https://picsum.photos/id/4/200/300',
  },
  {
    name: 'LinkedIn',
    img: 'https://picsum.photos/id/5/200/300',
  },
  {
    name: 'Twitter',
    img: 'https://picsum.photos/id/6/200/300',
  },
]
</script>

<template>
  <div
    class="relative flex h-[400px] w-[300px] lg:w-[550px] flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border bg-background px-20 [perspective:300px]"
  >
    <div class="flex flex-row gap-4">
      <Marquee
        vertical class="h-96 justify-center overflow-hidden [--duration:60s] [--gap:1rem]" :style="{
          transform: 'translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)',
        }
        "
      >
        <div v-for="(logo, index) in logos" :key="index">
          <img
            :key="index" :src="logo.img" :alt="logo.name"
            class="mx-auto h-full w-3/4 cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
          >
        </div>
      </Marquee>
    </div>
    <div :class="rightGradient" />
    <div :class="leftGradient" />
  </div>
</template>
