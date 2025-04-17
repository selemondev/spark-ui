# Animated Tooltip

A cool tooltip that reveals on hover, follows mouse pointer.

<demo src="../../src/example/animatedToolTip/Demo.vue" srcCode="../../src/spark-ui-demos/animatedToolTip/Demo.vue" />

## Installation

Install the following dependencies

```bash
pnpm add motion-v
```

Copy and paste the following code into your project:

::: code-group

```vue [AnimatedTooltip.vue]
<script setup lang='ts'>
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion-v'
import { ref } from 'vue'
export interface Items {
  id: number
  name: string
  designation: string
  image: string
}
const props = defineProps<{
  items: Items[]
}>()

const hoveredIndex = ref<number | null>(null)
const springConfig = { stiffness: 100, damping: 5 }
const x = useMotionValue(0)
const rotate = useSpring(
  useTransform(x, [-100, 100], [-45, 45]),
  springConfig,
)
// translate the tooltip
const translateX = useSpring(
  useTransform(x, [-100, 100], [-50, 50]),
  springConfig,
)
function handleMouseMove(event: any) {
  const halfWidth = event.target.offsetWidth / 2
  x.set(event.offsetX - halfWidth)
}
</script>

<template>
  <div v-for="(item, idx) in props.items" :key="idx">
    <div
      :key="item.name" class="group relative -mr-4" @mouseenter="() => hoveredIndex = item.id"
      @mouseleave="() => hoveredIndex = null"
    >
      <AnimatePresence mode="popLayout">
        <div v-if="hoveredIndex === item.id">
          <motion.div
            :initial="{
              opacity: 0, y: 20, scale: 0.6,
            }" :animate="{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 10,
              },
            }" :exit="{
              opacity: 0, y: 20, scale: 0.6,
            }" :style="{
              translateX,
              rotate,
              whiteSpace: 'nowrap',
            }"
            class="absolute -top-16 -left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
          >
            <div
              class="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
            />
            <div
              class="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent"
            />
            <div class="relative z-30 text-base font-bold text-white">
              {{ item.name }}
            </div>
            <div class="text-xs text-white">
              {{ item.designation }}
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
      <img
        :src="item.image" :alt="item.name" height="100" width="100" class="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
        @mousemove="handleMouseMove"
      >
    </div>
  </div>
</template>
```

:::

## Props

| Prop  | Type                                                                  | Description                                                                                                                                  | Default |
| ----- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| items | Array<{id: number, name: string, designation: string, image: string}> | An array of objects, each representing an item. Each object in the array should have the following properties: id, name, designation, image. | -       |
