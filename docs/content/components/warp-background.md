# Warp Background

A perspective grid sends colored beams behind your content.

<demo src="../../src/example/warp-background/demo.vue" srcCode="../../src/spark-ui-demos/warp-background/demo.vue" />

## Installation

Copy the component files below into `src/components/spark-ui/warp-background/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [warp-background.vue]
<script setup lang="ts">
import { motion } from "motion-v";
import { onMounted, shallowRef, watch } from "vue";
import { cn } from "@/lib/utils";

interface WarpBackgroundProps {
  className?: string;
  perspective?: number;
  beamsPerSide?: number;
  beamSize?: number;
  beamDelayMax?: number;
  beamDelayMin?: number;
  beamDuration?: number;
  gridColor?: string;
}
interface Beam {
  x: number;
  delay: number;
  hue: number;
  aspectRatio: number;
}

const props = withDefaults(defineProps<WarpBackgroundProps>(), {
  perspective: 100,
  beamsPerSide: 3,
  beamSize: 5,
  beamDelayMax: 3,
  beamDelayMin: 0,
  beamDuration: 3,
  gridColor: "hsl(var(--border))",
});
const sides = ["top", "bottom", "left", "right"] as const;
const beams = shallowRef<Beam[][]>(sides.map(() => []));
let mounted = false;

function generateBeams() {
  if (!mounted) return;
  const cellsPerSide = Math.floor(100 / props.beamSize);
  const step = cellsPerSide / props.beamsPerSide;
  beams.value = sides.map(() =>
    Array.from({ length: props.beamsPerSide }, (_, index) => ({
      x: Math.floor(index * step),
      delay: Math.random() * (props.beamDelayMax - props.beamDelayMin) + props.beamDelayMin,
      hue: Math.floor(Math.random() * 360),
      aspectRatio: Math.floor(Math.random() * 10) + 1,
    })),
  );
}

onMounted(() => {
  mounted = true;
  generateBeams();
});
watch(
  () => [props.beamsPerSide, props.beamSize, props.beamDelayMax, props.beamDelayMin],
  generateBeams,
);
</script>

<template>
  <div :class="cn('relative rounded border p-20', props.className)">
    <div
      class="warp-scene pointer-events-none absolute inset-0 size-full overflow-hidden"
      aria-hidden="true"
      :style="{
        '--perspective': `${props.perspective}px`,
        '--grid-color': props.gridColor,
        '--beam-size': `${props.beamSize}%`,
      }"
    >
      <div
        v-for="(side, sideIndex) in sides"
        :key="side"
        :class="['warp-side', `warp-side--${side}`]"
      >
        <motion.div
          v-for="(beam, index) in beams[sideIndex]"
          :key="`${side}-${index}-${beam.delay}`"
          class="absolute top-0"
          :style="{
            left: `${beam.x * props.beamSize}%`,
            width: `${props.beamSize}%`,
            aspectRatio: `1 / ${beam.aspectRatio}`,
            background: `linear-gradient(hsl(${beam.hue} 80% 60%), transparent)`,
          }"
          :initial="{ y: '100cqmax', x: '-50%' }"
          :animate="{ y: '-100%', x: '-50%' }"
          :transition="{
            duration: props.beamDuration,
            delay: beam.delay,
            repeat: Infinity,
            ease: 'linear',
          }"
        />
      </div>
    </div>
    <div class="relative"><slot /></div>
  </div>
</template>

<style scoped>
.warp-scene {
  container-type: size;
  clip-path: inset(0);
  perspective: var(--perspective);
  transform-style: preserve-3d;
}
.warp-side {
  position: absolute;
  container-type: inline-size;
  height: 100cqmax;
  width: 100cqi;
  transform-origin: 50% 0%;
  transform: rotateX(-90deg);
  transform-style: preserve-3d;
  background:
    linear-gradient(var(--grid-color) 0 1px, transparent 1px var(--beam-size)) 50% -0.5px /
      var(--beam-size) var(--beam-size),
    linear-gradient(90deg, var(--grid-color) 0 1px, transparent 1px var(--beam-size)) 50% 50% /
      var(--beam-size) var(--beam-size);
}
.warp-side--top {
  top: 0;
  z-index: 20;
}
.warp-side--bottom {
  top: 100%;
}
.warp-side--left {
  top: 0;
  left: 0;
  width: 100cqh;
  transform-origin: 0% 0%;
  transform: rotate(90deg) rotateX(-90deg);
}
.warp-side--right {
  top: 0;
  right: 0;
  width: 100cqh;
  transform-origin: 100% 0%;
  transform: rotate(-90deg) rotateX(-90deg);
}
</style>
```

:::

## Usage

```vue
<script setup lang="ts">
import WarpBackground from "@/components/spark-ui/warp-background/warp-background.vue";
</script>

<template>
  <WarpBackground :beams-per-side="4" :beam-duration="4" grid-color="rgba(128, 128, 128, 0.2)">
    <div class="rounded-lg border bg-white p-6 dark:bg-neutral-950">Warp Background</div>
  </WarpBackground>
</template>
```

## Props

| Prop           | Type     | Default                | Description                                            |
| -------------- | -------- | ---------------------- | ------------------------------------------------------ |
| `className`    | `string` | —                      | Extra classes for the root. Native `class` also works. |
| `perspective`  | `number` | `100`                  | Distance from the viewer to the grid in pixels.        |
| `beamsPerSide` | `number` | `3`                    | Number of beams on each of the four sides.             |
| `beamSize`     | `number` | `5`                    | Width of each beam and grid cell as a percentage.      |
| `beamDelayMax` | `number` | `3`                    | Maximum initial delay in seconds.                      |
| `beamDelayMin` | `number` | `0`                    | Minimum initial delay in seconds.                      |
| `beamDuration` | `number` | `3`                    | Duration of each beam pass in seconds.                 |
| `gridColor`    | `string` | `"hsl(var(--border))"` | CSS color for the grid lines.                          |

## Behavior

The default slot holds the content. Standard HTML attributes pass to the root element.

Install `motion-v` before you use this component. The component keeps the grid styles in scoped CSS, so no Tailwind plugin or global animation is required.

The default grid color wraps the Spark UI HSL border token. Pass a complete CSS color if your project uses a different token format.

Beams start after mounting to keep server rendering stable. Each side has its own random beam colors, lengths, and delays.

Changes to the beam count, size, or delay range create new beams. Perspective, grid color, and duration update while mounted.

Use a positive beam size and duration, a nonnegative integer beam count, and a delay maximum at least as large as its minimum. Motion animations stop when their elements unmount.

## Source

This component is a Vue port of [Magic UI Warp Background](https://magicui.design/docs/components/warp-background).
The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/warp-background.tsx) defines the original behavior.
