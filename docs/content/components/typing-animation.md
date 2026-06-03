# Typing Animation

Characters appearing in typed animation

<demo src="../../src/example/typing-animation/demo.vue" srcCode="../../src/spark-ui-demos/typing-animation/typing-animation.vue" />

## Installation

Copy and paste the following code into your project:

```vue [typing-animation.vue]
<script setup lang='ts'>
import { ref, watch } from 'vue'
import { cn } from '@/lib/utils'

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
  'font-sans text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm dark:text-white',
  props.class,
)
</script>

<template>
  <h1 :class="className">
    {{ displayedText ? displayedText : props.text }}
  </h1>
</template>
```

## Props

| Prop     | Type   | Description                                     | Default |
| -------- | ------ | ----------------------------------------------- | ------- |
| class    | string | The class for the component                     | ""      |
| duration | number | The duration to wait in between each char type. | 300     |
| text     | string | Text to animate.                                | ""      |
