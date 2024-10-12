# Globe

An autorotating, interactive, and highly performant globe made using WebGL.

<demo src="../../src/example/globe/Demo.vue" srcCode="../../src/spark-ui-demos/globe/Globe.vue" />

## Installation

Install the following dependencies into your project:

::: code-group

```sh [npm]
npm install cobe
```

```sh [yarn]
yarn add cobe
```

```sh [pnpm]
pnpm add cobe
```

```sh [bun]
bun add cobe
```

:::

::: code-group

```sh [npm]
npm install vue-use-spring
```

```sh [yarn]
yarn add vue-use-spring
```

```sh [pnpm]
pnpm add vue-use-spring
```

```sh [bun]
bun add vue-use-spring
```

:::

Then copy and paste the following code into your project:

```vue [Globe.vue]
<script setup lang="ts">
import createGlobe from 'cobe'
import { onMounted, ref } from 'vue'
import { useSpring } from 'vue-use-spring'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const pointerInteracting = ref<number | null>(null)
const pointerInteractionMovement = ref(0)
const phi = ref(0)

const api = useSpring(
  { r: 0 },
  {
    mass: 1,
    tension: 280,
    friction: 40,
    precision: 0.001,
  },
)

onMounted(() => {
  createGlobe(canvasRef.value!, {
    devicePixelRatio: 2,
    width: 1000,
    height: 1000,
    phi: 0,
    theta: 0,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.1, 0.8, 1],
    glowColor: [1, 1, 1],
    markers: [
      // longitude latitude
      { location: [37.7595, -122.4367], size: 0.03 },
      { location: [40.7128, -74.006], size: 0.1 },
    ],
    onRender: (state) => {
      // This prevents rotation while dragging
      if (!pointerInteracting.value) {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        phi.value += 0.005
      }
      state.phi = phi.value + api.r
    },
  })
  canvasRef.value!.style.opacity = '1'
})

function handlePointerDown(e: PointerEvent) {
  pointerInteracting.value = e.clientX - pointerInteractionMovement.value
  canvasRef.value!.style.cursor = 'grabbing'
}

function handlePointerUp(_: PointerEvent) {
  pointerInteracting.value = null
  canvasRef.value!.style.cursor = 'grab'
}

function handlePointerOut(_: PointerEvent) {
  pointerInteracting.value = null
  canvasRef.value!.style.cursor = 'grab'
}

function handleMouseMove(e: MouseEvent) {
  if (pointerInteracting.value !== null) {
    const delta = e.clientX - pointerInteracting.value
    pointerInteractionMovement.value = delta
    api.r = delta / 200
  }
}

function handleTouchMove(e: TouchEvent) {
  if (pointerInteracting.value !== null && e.touches[0]) {
    const delta = e.touches[0].clientX - pointerInteracting.value
    pointerInteractionMovement.value = delta
    api.r = delta / 100
  }
}
</script>

<template>
  <div class="absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px] top-44">
    <canvas
      ref="canvasRef"
      class="w-[500px] h-[500px] cursor-grab opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
      width="1000"
      height="1000"
      @pointerdown="handlePointerDown"
      @pointerup="handlePointerUp"
      @pointerout="handlePointerOut"
      @mousemove="handleMouseMove"
      @touchmove="handleTouchMove"
    />
  </div>
</template>
```

## Credits

This component is built on top of [Cobe](https://cobe.vercel.app/) and [Vue Use Spring](https://github.com/posva/vue-use-spring).
