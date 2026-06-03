<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue'
import { cn } from '../../../lib/utils'

interface MeteorsProps {
  number?: number
}

const props = withDefaults(defineProps<MeteorsProps>(), {
  number: 20,
})

const meteorStyles = ref()

const getRandomPosition = (max: number) => `${Math.floor(Math.random() * max)}px`
const getRandomDelay = () => `${(Math.random() * 1 + 0.2).toFixed(2)}s`
const getRandomDuration = () => `${Math.floor(Math.random() * 8 + 2)}s`

function generateMeteorStyles(count: number) {
  meteorStyles.value = Array.from({ length: count }, () => ({
    top: -5,
    left: getRandomPosition(window.innerWidth),
    animationDelay: getRandomDelay(),
    animationDuration: getRandomDuration(),
  }))
}

onMounted(() => generateMeteorStyles(props.number))

watch(() => props.number, (val) => {
  generateMeteorStyles(val)
})
</script>

<template>
  <div v-for="(style, index) in meteorStyles" :key="index" class="absolute">
    <span
      :key="index" :class="cn(
        'pointer-events-none absolute left-1/2 top-1/2 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]',
      )" :style="style"
    >
      <div
        class="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent"
      />
    </span>
  </div>
</template>
