<script setup lang="ts">
import { motion } from "motion-v";
import { onMounted, shallowRef, watch } from "vue";
import { cn } from "../../lib/utils";

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
