# Blur Fade

Blur fade in and out animation. Used to smoothly fade in and out content.

<demo src="../../src/example/blurFade/Demo.vue" srcCode="../../src/spark-ui-demos/blurFade/BlurFade.vue" />

## Installation

Copy and paste the following code into your project:

```vue [BlurFade.vue]
<script setup lang='ts'>
interface BlurFadeProps {
  class?: string
  variant?: {
    hidden: { y: number }
    visible: { y: number }
    enter: { y: number }
  }
  duration?: number
  delay?: number
  yOffset?: number
  inView?: boolean
  blur?: string
  inViewMargin?: string
};

const props = withDefaults(defineProps<BlurFadeProps>(), {
  duration: 0.4,
  delay: 500,
  yOffset: 6,
  inView: false,
  inViewMargin: '-50px',
  blur: '6px',
})
const defaultVariants = {
  hidden: { y: props.yOffset, opacity: 0, filter: `blur(${props.blur})` },
  visible: {
    y: -props.yOffset,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: 0.04 + props.delay,
      duration: 500,
      ease: 'easeIn',
    },
  },
  enter: {
    y: -props.yOffset,
    opacity: 1,
    transition: {
      delay: 0.04 + props.delay,
      duration: 500,
      ease: 'easeIn',
    },
    filter: 'blur(0px)',
  },
}

const combinedVariants = props.variant || defaultVariants
</script>

<template>
  <div
    v-motion :initial="combinedVariants.hidden" :visible="props.inView ? combinedVariants.visible : undefined"
    :enter="!props.inView ? combinedVariants.enter : undefined" :class="props.class"
  >
    <slot />
  </div>
</template>
```

## Props

| Prop         | Type       | Description                                            | Default |
| ------------ | ---------- | ------------------------------------------------------ | ------- |
| class        | string     | The class name to be applied to the component          |         |
| variant      | object     | Custom animation variants for motion component         |         |
| duration     | number     | Duration (seconds) for the animation                   | 0.4     |
| delay        | number     | Delay (seconds) before the animation starts            | 0       |
| yOffset      | number     | Vertical offset for the animation                      | 6       |
| inView       | boolean    | Whether to trigger animation when component is in view | false   |
| inViewMargin | MarginType | Margin for triggering the in-view animation            | "-50px" |
| blur         | string     | Amount of blur to apply during the animation           | "6px"   |
