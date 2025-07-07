<script setup lang='ts'>
import type { HTMLAttributes } from 'vue'
import { motion, type MotionProps, useScroll } from 'motion-v'
import { cn } from '../../lib/utils'

interface ScrollProgressProps extends Omit<HTMLAttributes, keyof MotionProps> {};

interface Props extends /* @vue-ignore */ ScrollProgressProps {
  className?: string
}

const props = defineProps<Props>()
const { scrollYProgress } = useScroll()
</script>

<template>
  <motion.div
    :class="cn(
      'fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]',
      props.className)" :style="{
        scaleX: scrollYProgress,
      }"
  />
</template>
