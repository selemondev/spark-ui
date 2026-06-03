<script setup lang='ts'>
import { cn } from '../../lib/utils'

interface AnimatedShinyTextProps {
  class?: string
  shimmerWidth?: number
}

const props = withDefaults(defineProps<AnimatedShinyTextProps>(), {
  shimmerWidth: 100,
})

const className = cn(
  'mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70',

  // Shimmer effect
  'animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',

  // Shimmer gradient
  'bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent  dark:via-white/80',

  props.class,
)
</script>

<template>
  <p :style="{ '--shimmer-width': `${props.shimmerWidth}px` }" :class="className">
    <slot />
  </p>
</template>

<style scoped>
@keyframes shimmer {
  0%,
  90%,
  100% {
    background-position: calc(-100% - var(--shimmer-width)) 0;
  }
  30%,
  60% {
    background-position: calc(100% + var(--shimmer-width)) 0;
  }
}

.animate-shimmer {
  animation: shimmer 8s infinite;
}
</style>
