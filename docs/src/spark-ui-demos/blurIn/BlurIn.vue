<script setup lang='ts'>
import { cn } from '../../lib/utils'

interface BlurIntProps {
  word: string
  class?: string
  variant?: {
    hidden: { filter: string, opacity: number }
    visible: { filter: string, opacity: number }
  }
  duration?: number
};

const props = withDefaults(defineProps<BlurIntProps>(), {
  duration: 500,
})

const defaultVariants = {
  hidden: { filter: 'blur(10px)', opacity: 0 },
  visible: {
    filter: 'blur(0px)',
    opacity: 1,
    transition: {
      duration: props.duration,
    },
  },
}

const combinedVariants = props.variant || defaultVariants
const className = cn(
  'font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]',
  props.class,
)
</script>

<template>
  <h1 v-motion :initial="combinedVariants.hidden" :visible="combinedVariants.visible" :class="className">
    {{ props.word }}
  </h1>
</template>
