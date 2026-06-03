<script setup lang="ts">
import type { MotionProps } from 'motion-v'
import { motion } from 'motion-v'
import { nextTick, ref, useSlots, watch } from 'vue'
import { cn } from '../../lib/utils'

interface TypingAnimationProps extends MotionProps {
  className?: string
  duration?: number
  delay?: number
}

const props = withDefaults(defineProps<TypingAnimationProps>(), {
  duration: 60,
  delay: 0,
})

const MotionComponent = motion.create('span', {
  forwardMotionProps: true,
})

const displayedText = ref('')
const started = ref(false)
const slots = useSlots()

watch(
  () => props.delay,
  (val) => {
    const startTimeout = setTimeout(() => {
      started.value = true
    }, val)
    return () => clearTimeout(startTimeout)
  },
  { immediate: true },
)

watch(
  () => [props.duration, started.value],
  async () => {
    if (!started.value)
      return

    await nextTick()

    const slotContent = slots.default?.()?.[0]?.children ?? ''
    if (typeof slotContent !== 'string')
      return

    let i = 0
    displayedText.value = ''
    const typingEffect = setInterval(() => {
      if (i < slotContent.length) {
        displayedText.value = slotContent.substring(0, i + 1)
        i++
      }
      else {
        clearInterval(typingEffect)
      }
    }, props.duration)

    return () => clearInterval(typingEffect)
  },
)
</script>

<template>
  <MotionComponent
    :class="cn('text-sm font-normal tracking-tight', props.className)"
  >
    {{ displayedText }}
  </MotionComponent>
</template>
