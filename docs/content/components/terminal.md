# Terminal

An implementation of the MacOS terminal. Useful for showcasing a command line interface.

<demo src="../../src/example/terminal/Demo.vue" srcCode="../../src/spark-ui-demos/terminal/Demo.vue" />

## Installation

Install the following dependencies

```bash
pnpm add motion-v
```

Copy and paste the following code into your project:

::: code-group

```vue [AnimatedSpan.vue]
<script setup lang='ts'>
import type { MotionProps } from 'motion-v'
import { motion } from 'motion-v'
import { cn } from '@/lib/utils'
interface AnimatedSpanProps extends MotionProps {
  delay?: number
  className?: string
};
const props = withDefaults(defineProps<AnimatedSpanProps>(), {
  delay: 0
})
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: -5 }" :animate="{
      opacity: 1, y: 0,
    }" :transition="{
      duration: 0.3, delay: props.delay / 1000,
    }" :class="cn(
      'grid text-sm font-normal tracking-tight', props.className,
    )"
  >
    <slot />
  </motion.div>
</template>
```

```vue [Terminal.vue]
<script setup lang='ts'>
import { cn } from '@/lib/utils'
interface TerminalProps {
  className?: string
};
const props = defineProps<TerminalProps>()
</script>

<template>
  <div
    :class="cn(
      'z-0 min-h-[300px] w-full max-w-lg rounded-xl border border-gray-300 bg-background',
      props.className,
    )"
  >
    <div class="flex flex-col gap-y-2 border-b border-gray-300 p-4">
      <div class="flex flex-row gap-x-2">
        <div class="h-2 w-2 rounded-full bg-red-500" />
        <div class="h-2 w-2 rounded-full bg-yellow-500" />
        <div class="h-2 w-2 rounded-full bg-green-500" />
      </div>
    </div>
    <pre class="px-4 h-auto">
        <code class="grid gap-y-1">
            <slot />
        </code>
      </pre>
  </div>
</template>
```

```vue [TypingAnimation.vue]
<script setup lang="ts">
import type { MotionProps } from 'motion-v'
import { motion } from 'motion-v'
import { nextTick, ref, useSlots, watch } from 'vue'
import { cn } from '@/lib/utils'

interface TypingAnimationProps extends MotionProps {
  className?: string
  duration?: number
  delay?: number
}

const props = withDefaults(defineProps<TypingAnimationProps>(), {
  duration: 60,
  delay: 0
})

const MotionComponent = motion.create('span', {
  forwardMotionProps: true
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
  { immediate: true }
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
  }
)
</script>

<template>
  <MotionComponent

    :class="cn('text-sm font-normal tracking-tight', props.className)"
  >
    {{ displayedText }}
  </MotionComponent>
</template>
```

:::

## Props

### Terminal

| Prop        | Type   | Description                  | Default |
| ----------- | ------ | ---------------------------- | ------- |
| `className` | string | The class for the component. | -       |

### AnimatedSpan

| Prop        | Type   | Description                                        | Default |
| ----------- | ------ | -------------------------------------------------- | ------- |
| `delay`     | number | Delay in milliseconds before the animation starts. | 0       |
| `className` | string | The class for the component.                       | -       |

### TypingAnimation

| Prop        | Type   | Description                                        | Default |
| ----------- | ------ | -------------------------------------------------- | ------- |
| `delay`     | number | Delay in milliseconds before the animation starts. | 0       |
| `className` | string | The class for the component.                       | -       |
| `duration`  | number | Duration in milliseconds for each character typed. | 100     |
