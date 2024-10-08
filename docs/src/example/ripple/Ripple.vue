<script setup lang='ts'>
import { cn } from '../../lib/utils'

interface RippleProps {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
  class?: string
};

const props = withDefaults(defineProps<RippleProps>(), {
  mainCircleSize: 210,
  mainCircleOpacity: 0.24,
  numCircles: 8,
})
</script>

<template>
  <div
    :class="cn(
      'absolute inset-0 bg-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]',
      props.class,
    )"
  >
    <div v-for="(_, i) in Array.from({ length: props.numCircles })" :key="i">
      <div
        :key="i" class="absolute animate-ripple rounded-full bg-[#0000]/25 dark:bg-[#fff]/25 shadow-xl"
        :style="{
          width: `${props.mainCircleSize + i * 70}px`,
          height: `${props.mainCircleSize + i * 70}px`,
          opacity: props.mainCircleOpacity - i * 0.03,
          animationDelay: `${i * 0.06}s`,
          borderStyle: i === props.numCircles - 1 ? 'dashed' : 'solid',
          borderWidth: '1px',
          borderColor: `hsl(var(--foreground), ${5 + i * 5 / 100})`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
        }"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes Ripple {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }

  50% {
    transform: translate(-50%, -50%) scale(0.9);
  }
}

.animate-ripple {
  animation: Ripple var(--duration, 2s) ease-in-out calc(var(--i, 0) * 0.2s) infinite;
}
</style>
