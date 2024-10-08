<script setup lang='ts'>
import { ref, watch } from 'vue'
import { cn } from '../../../lib/utils'

interface TypingAnimationProps {
  text: string
  duration?: number
  class?: string
}

const props = withDefaults(defineProps<TypingAnimationProps>(), {
  duration: 300,
})

const displayedText = ref('')
const i = ref(0)

function handleTypingEffect(d: number, n: number) {
  const typingEffect = setInterval(() => {
    if (n < props.text.length) {
      displayedText.value = props.text.substring(0, n + 1)
      n = n + 1
    }
    else {
      clearInterval(typingEffect)
    }
  }, d)

  return () => {
    clearInterval(typingEffect)
  }
}

watch(() => [props.duration, i.value], ([d, n]) => {
  handleTypingEffect(d, n)
}, {
  deep: true,
  immediate: true,
})

const className = cn(
  'font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm',
  props.class,
)
</script>

<template>
  <h1 :class="className">
    {{ displayedText ? displayedText : props.text }}
  </h1>
</template>
