# Hero Video Dialog

A hero video dialog component.

<demo src="../../src/example/hero-video-dialog/Demo.vue" srcCode="../../src/spark-ui-demos/hero-video-dialog/Demo.vue" />

## Installation

Install the following dependencies

```bash
pnpm add motion-v @lucide/vue
```

Copy and paste the following code into your project:

::: code-group

```vue [HeroVideoDialog.vue]
<script setup lang='ts'>
import { Play, XIcon } from '@lucide/vue'
import { AnimatePresence, motion } from 'motion-v'
import { ref } from 'vue'
import { cn } from '@/lib/utils'
type AnimationStyle =
  | 'from-bottom'
  | 'from-center'
  | 'from-top'
  | 'from-left'
  | 'from-right'
  | 'fade'
  | 'top-in-bottom-out'
  | 'left-in-right-out'

interface HeroVideoProps {
  animationStyle?: AnimationStyle
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt?: string
  className?: string
}
const props = withDefaults(defineProps<HeroVideoProps>(), {
  animationStyle: 'from-center',
  thumbnailAlt: 'Video thumbnail',
})
const animationVariants = {
  'from-bottom': {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  'from-center': {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  'from-top': {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
  },
  'from-left': {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  'from-right': {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
  'fade': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'top-in-bottom-out': {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  'left-in-right-out': {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
}
const isVideoOpen = ref(false)
const selectedAnimation = animationVariants[props.animationStyle]
</script>

<template>
  <div :class="cn('relative', props.className)">
    <div class="group relative cursor-pointer" @click="isVideoOpen = true">
      <img
        :src="thumbnailSrc" :alt="thumbnailAlt" width="1920" height="1080"
        class="w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
      >
      <div
        class="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100"
      >
        <div class="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md">
          <div
            class="relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]"
          >
            <Play
              class="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
              :style="{
                filter:
                  'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
              }
              "
            />
          </div>
        </div>
      </div>
    </div>
    <AnimatePresence>
      <div v-if="isVideoOpen">
        <motion.div
          :initial="{
            opacity: 0,
          }" :animate="{
            opacity: 1,
          }" :exit="{
            opacity: 0,
          }" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md" @click="isVideoOpen = false"
        >
          <motion.div
            v-bind="selectedAnimation" :transition="{
              type: 'spring', damping: 30, stiffness: 300,
            }" class="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
          >
            <motion.button
              class="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black"
            >
              <XIcon class="size-5" />
            </motion.button>
            <div class="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white">
              <iframe
                :src="videoSrc" class="size-full rounded-2xl" allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  </div>
</template>
```

:::

## Props

| Prop             | Type   | Description                      | Default           |
| ---------------- | ------ | -------------------------------- | ----------------- |
| `animationStyle` | string | Animation style for the dialog   | "from-center"     |
| `videoSrc`       | string | URL of the video to be played    | -                 |
| `thumbnailSrc`   | string | URL of the thumbnail image       | -                 |
| `thumbnailAlt`   | string | Alt text for the thumbnail image | "Video thumbnail" |

## Animation Styles

The `animationStyle` prop accepts the following values:

- `from-bottom`: Dialog enters from the bottom and exits to the bottom
- `from-center`: Dialog scales up from the center and scales down to the center
- `from-top`: Dialog enters from the top and exits to the top
- `from-left`: Dialog enters from the left and exits to the left
- `from-right`: Dialog enters from the right and exits to the right
- `fade`: Dialog fades in and out
- `top-in-bottom-out`: Dialog enters from the top and exits to the bottom
- `left-in-right-out`: Dialog enters from the left and exits to the right

## Note

If using a YouTube video, make sure to use the `embed` version of the video URL.
