# 3D Animated Pin

A gradient pin that animates on hover, perfect for product links.

<demo src="../../src/example/3d-Pin/Demo.vue" srcCode="../../src/spark-ui-demos/3d-Pin/Demo.vue" />

## Installation

Install the following dependencies

```bash
pnpm add motion-v vue-router@latest
```

Copy and paste the following code into your project:

::: code-group

```vue [PinContainer.vue]
<script setup lang='ts'>
import { cn } from '@/lib/utils'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import PinPerspective from './PinPerspective.vue'

const props = defineProps<{
  title?: string
  href?: string
  className?: string
  containerClassName?: string
}>()
const transform = ref(
  'translate(-50%,-50%) rotateX(0deg)'
)

function onMouseEnter() {
  transform.value = 'translate(-50%,-50%) rotateX(40deg) scale(0.8)'
}
function onMouseLeave() {
  transform.value = 'translate(-50%,-50%) rotateX(0deg) scale(1)'
}
</script>

<template>
  <RouterLink
    :to="href || '/'" :class="cn(
      'relative group/pin z-50 cursor-pointer', props.containerClassName)" @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      :style="{
        perspective: '1000px',
        transform: 'rotateX(70deg) translateZ(0deg)',
      }" class="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        :style="{
          transform,
        }" class="absolute left-1/2 p-4 top-1/2  flex justify-start items-start  rounded-2xl  shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
      >
        <div :class="cn('relative z-50', className)">
          <slot />
        </div>
      </div>
    </div>
    <PinPerspective :title="props.title" :href="props.href" />
  </RouterLink>
</template>
```

```vue [PinPerspective.vue]
<script setup lang='ts'>
import { motion } from 'motion-v'
const props = defineProps<{
  title?: string
  href?: string
}>()
</script>

<template>
  <motion.div
    class="pointer-events-none  w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500"
  >
    <div class=" w-full h-full -mt-7 flex-none  inset-0">
      <div class="absolute top-0 inset-x-0  flex justify-center">
        <a
          :href="href" target="_blank"
          class="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 "
        >
          <span class="relative z-20 text-white text-xs font-bold inline-block py-0.5">
            {{ props.title }}
          </span>

          <span
            class="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"
          />
        </a>
      </div>

      <div
        :style="{
          perspective: '1000px',
          transform: 'rotateX(70deg) translateZ(0)',
        }" class="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          :initial="{
            opacity: 0,
            scale: 0,
            x: '-50%',
            y: '-50%',
          }" :animate="{
            opacity: [0, 1, 0.5, 0],
            scale: 1,
            z: 0,
          }" :transition="{
            duration: 6,
            repeat: Infinity,
            delay: 0,
          }" class="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
        />
        <motion.div
          :initial="{
            opacity: 0,
            scale: 0,
            x: '-50%',
            y: '-50%',
          }" :animate="{
            opacity: [0, 1, 0.5, 0],
            scale: 1,
            z: 0,
          }" :transition="{
            duration: 6,
            repeat: Infinity,
            delay: 2,
          }" class="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
        />
        <motion.div
          :initial="{
            opacity: 0,
            scale: 0,
            x: '-50%',
            y: '-50%',
          }" :animate="{
            opacity: [0, 1, 0.5, 0],
            scale: 1,
            z: 0,
          }" :transition="{
            duration: 6,
            repeat: Infinity,
            delay: 4,
          }" class="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
        />
      </div>
      <motion.div
        class="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]"
      />
      <motion.div
        class="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40  "
      />
      <motion.div
        class="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]"
      />
      <motion.div
        class="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40 "
      />
    </div>
  </motion.div>
</template>
```

:::

## Props

| Prop               | Type   | Description                                         | Default |
| ------------------ | ------ | --------------------------------------------------- | ------- |
| className          | string | The class for the component.                        | -       |
| containerClassName | string | The class name of the Container Component.          | -       |
| title              | string | Title that shows up on hover.                       | -       |
| href               | string | Link of the component that you want to redirect to. | -       |
