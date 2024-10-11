# Animated List

A list that animates each item in sequence with a delay. Used to showcase notifications or events on your landing page.

<demo src="../../src/example/animatedList/Demo.vue" srcCode="../../src/spark-ui-demos/animatedList/AnimatedList.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [AnimatedList.vue]
<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { computed, onMounted, ref, useSlots } from 'vue'

const props = withDefaults(defineProps<{
  class?: string
  delay?: number
}>(), {
  delay: 1000,
})

const slots = useSlots()
const index = ref(0)
const slotsArray = ref<any>([])

const itemsToShow = computed(() => {
  return slotsArray.value.slice(0, index.value)
})

async function loadComponents() {
  slotsArray.value = slots.default ? slots.default()[0].children : []

  while (index.value < slotsArray.value.length) {
    index.value++
    await delay(props.delay)
  }
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getInitial(idx: number) {
  return idx === index.value - 1
    ? {
        scale: 0,
        opacity: 0,
      }
    : undefined
}
function getEnter(idx: number) {
  return idx === index.value - 1
    ? {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 250,
          damping: 40,
        },
      }
    : undefined
}

function getLeave() {
  return {
    scale: 0,
    opacity: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 40,
    },
  }
};

onMounted(() => loadComponents())
</script>

<template>
  <div :class="cn('border w-[600px] h-[370px] shadow-lg overflow-auto rounded-lg', $props.class)">
    <transition-group name="list" tag="div" class="flex flex-col-reverse items-center p-2" move-class="move">
      <div
        v-for="(item, idx) in itemsToShow" :key="idx" v-motion :initial="getInitial(idx)"
        :enter="getEnter(idx)" :leave="getLeave()" :class="cn('mx-auto w-full')"
      >
        <component :is="item" />
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.move {
  transition: transform 0.4s ease-out;
}
</style>
```

```vue [Notification.vue]
<script setup lang='ts'>
import { cn } from '@/lib/utils'

const props = defineProps<{
  name: string
  class?: string
  description: string
  icon: string
  color: string
  time: string
}>()

const className = cn(
  'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-3',
  // animation styles
  'transition-all duration-200 ease-in-out hover:scale-[103%]',
  // light styles
  'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
  // dark styles
  'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
)
</script>

<template>
  <figure :class="className">
    <div class="flex flex-row bg-white border rounded-xl shadow-md py-2 items-center px-2 gap-4">
      <div class="flex size-10 items-center justify-center rounded-2xl" :style="{ backgroundColor: props.color }">
        <span class="text-lg">{{ props.icon }}</span>
      </div>
      <div class="flex flex-col overflow-hidden">
        <figcaption class="flex flex-row items-center whitespace-pre text-lg font-medium ">
          <span class="text-sm text-black sm:text-lg">{{ props.name }}</span>
          <span class="mx-1">·</span>
          <span class="text-xs text-gray-500">{{ props.time }}</span>
        </figcaption>
        <p class="text-sm font-normal">
          {{ props.description }}
        </p>
      </div>
    </div>
  </figure>
</template>
```

:::

## Props

| Prop  | Type   | Description                        | Default |
| ----- | ------ | ---------------------------------- | ------- |
| class | string | The class to be applied.           | ""      |
| delay | number | The delay between each item in ms. | 1000    |
