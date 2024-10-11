# Animated Beam

An animated beam of light which travels along a path. Useful for showcasing the "integration" features of a website.

<demo src="../../src/example/animatedBeam/Demo.vue" srcCode="../../src/spark-ui-demos/animatedBeam/AnimatedBeam.vue" />

## Installation

Copy and past the following code into your project:

::: code-group

```vue [AnimatedBeam.vue]
<script setup lang="ts">
import { onMounted, onUnmounted, ref, useId, watch } from 'vue'

const props = withDefaults(defineProps<{
  containerRef: any
  fromRef: any
  toRef: any
  className?: string
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
  width?: number
  height?: number
}>(), {
  curvature: 0,
  reverse: false,
  duration: Math.random() * 3 + 4,
  delay: 3,
  pathColor: 'gray',
  pathWidth: 2,
  pathOpacity: 0.2,
  gradientStartColor: '#ffaa40',
  gradientStopColor: '#9c40ff',
  startXOffset: 0,
  startYOffset: 0,
  endXOffset: 0,
  endYOffset: 0,
})

const id = `pattern-${useId()}`

const initial = {
  x1: '10%',
  x2: '0%',
  y1: '0%',
  y2: '0%',
}
const svgDimensions = ref({ width: 0, height: 0 })
const pathD = ref('')
function updatePath() {
  if (
    props.containerRef
    && props.fromRef?.circleRef
    && props.toRef?.circleRef
  ) {
    const containerRect = props.containerRef?.getBoundingClientRect()
    const rectA = props.fromRef?.circleRef?.getBoundingClientRect()
    const rectB = props.toRef?.circleRef?.getBoundingClientRect()

    const svgWidth = containerRect?.width
    const svgHeight = containerRect?.height
    svgDimensions.value.width = svgWidth
    svgDimensions.value.height = svgHeight

    const startX = rectA.left - containerRect.left + rectA.width / 2 + props.startXOffset
    const startY = rectA.top - containerRect.top + rectA.height / 2 + props.startYOffset
    const endX = rectB.left - containerRect.left + rectB.width / 2 + props.endXOffset
    const endY = rectB.top - containerRect.top + rectB.height / 2 + props.endYOffset

    const controlY = startY - props.curvature
    const d = `M ${startX},${startY} Q ${(startX + endX) / 2
    },${controlY} ${endX},${endY}`
    pathD.value = d
  }
}

const controller = new AbortController()

onMounted(() => {
  window.addEventListener('resize', updatePath, {
    signal: controller.signal,
  })
})

onUnmounted(() => {
  controller.abort()
})

watch(props, (_) => {
  updatePath()
}, { deep: true })
</script>

<template>
  <svg
    :width="svgDimensions?.width" :height="svgDimensions?.height" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute left-0 top-0 transform-gpu stroke-2" :class="[
      props.className,
    ]" :viewBox="`0 0 ${svgDimensions?.width} ${svgDimensions?.height}`"
  >
    <path
      :d="pathD" :stroke="pathColor" fill="none" :stroke-width="pathWidth" :stroke-opacity="pathOpacity"
      stroke-linecap="round"
    />
    <path :d="pathD" :stroke="`url(#${id}`" fill="none" stroke-linecap="round" />
    <defs>
      <linearGradient
        :id="id" v-motion :initial="{
          opacity: 0,
          x: props.reverse ? ['100%', '0%'] : ['0%', '100%'],
        }" :enter="{
          opacity: 1,
          x: props.reverse ? ['100%', '0%'] : ['0%', '100%'],
          transition: {
            duration: 1600,
            type: 'keyframes',
            easings: [0.16, 1, 0.3, 1],
            repeat: Infinity,
          },
        }" gradientUnits="userSpaceOnUse" :x1="initial.x1" :x2="initial.x2" :y1="initial.y1"
        :y2="initial.y2"
      >
        <stop :stop-color="props.gradientStartColor" stop-opacity="0" />
        <stop :stop-color="props.gradientStartColor" />
        <stop offset="32.5%" :stop-color="props.gradientStopColor" />
        <stop offset="100%" :stop-color="props.gradientStopColor" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>
```

```vue [Circle.vue]
<script setup lang='ts'>
import { ref } from 'vue'

const circleRef = ref()

defineExpose({
  circleRef,
})
</script>

<template>
  <div
    ref="circleRef"
    class="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
  >
    <slot />
  </div>
</template>
```

:::

## Examples

### Animated Beam Uni-Directional

<demo src="../../src/example/animatedBeam/AnimatedBeamUniDirectional.vue" srcCode="../../src/spark-ui-demos/animatedBeam/AnimatedBeamUniDirectional.vue" />

### Animated Beam Bi-Directional

<demo src="../../src/example/animatedBeam/AnimatedBeamBiDirectional.vue" srcCode="../../src/spark-ui-demos/animatedBeam/AnimatedBeamBiDirectional.vue" />

### Animated Beam Multiple Inputs

<demo src="../../src/example/animatedBeam/AnimatedBeamMultipleInputs.vue" srcCode="../../src/spark-ui-demos/animatedBeam/AnimatedBeamMultipleInputs.vue" />

### Animated Beam Multiple Outputs

<demo src="../../src/example/animatedBeam/Demo.vue" srcCode="../../src/spark-ui-demos/animatedBeam/AnimatedBeam.vue" />

## Props

### Animated Beam

| Prop               | Type    | Description                                              | Default   |
| ------------------ | ------- | -------------------------------------------------------- | --------- |
| className          | string  | The class name for the component.                        | -         |
| containerRef       | ref     | The container ref.                                       | -         |
| fromRef            | ref     | The ref of the element from which the beam should start. | -         |
| toRef              | ref     | The ref of the element to which the beam should end.     | -         |
| curvature          | number  | The curvature of the beam.                               | 0         |
| reverse            | boolean | Whether the beam should be reversed.                     | false     |
| duration           | number  | The duration of the beam.                                | 5         |
| delay              | number  | The delay of the beam.                                   | 0         |
| pathColor          | string  | The color of the beam.                                   | "gray"    |
| pathWidth          | number  | The width of the beam.                                   | 2         |
| pathOpacity        | number  | The opacity of the beam.                                 | 0.2       |
| gradientStartColor | string  | The start color of the gradient.                         | "#ffaa40" |
| gradientStopColor  | string  | The stop color of the gradient.                          | "#9c40ff" |
| startXOffset       | number  | The start x offset of the beam.                          | 0         |
| startYOffset       | number  | The start y offset of the beam.                          | 0         |
| endXOffset         | number  | The end x offset of the beam.                            | 0         |
| endYOffset         | number  | The end y offset of the beam.                            | 0         |
