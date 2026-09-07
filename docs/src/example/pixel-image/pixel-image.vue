<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

interface Grid {
  rows: number;
  cols: number;
}
interface PixelImageProps {
  src: string;
  alt?: string;
  grid?: "6x4" | "8x8" | "8x3" | "4x6" | "3x8";
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number;
  maxAnimationDelay?: number;
  colorRevealDelay?: number;
}
const props = withDefaults(defineProps<PixelImageProps>(), {
  alt: "",
  grid: "6x4",
  grayscaleAnimation: true,
  pixelFadeInDuration: 1000,
  maxAnimationDelay: 1200,
  colorRevealDelay: 1300,
});
const grids: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};
const dimensions = computed(() => {
  const custom = props.customGrid;
  return custom && [custom.rows, custom.cols].every((n) => Number.isInteger(n) && n >= 1 && n <= 16)
    ? custom
    : grids[props.grid];
});
const visible = ref(false);
const showColor = ref(false);
const delays = ref<number[]>([]);
const image = ref<HTMLImageElement>();
let frame: number | undefined;
let colorTimer: ReturnType<typeof setTimeout> | undefined;
let mounted = false;
const pieces = computed(() => {
  const { rows, cols } = dimensions.value;
  return Array.from({ length: rows * cols }, (_, index) => {
    const x = ((index % cols) * 100) / cols;
    const y = (Math.floor(index / cols) * 100) / rows;
    return {
      clipPath: `polygon(${x}% ${y}%, ${x + 100 / cols}% ${y}%, ${x + 100 / cols}% ${y + 100 / rows}%, ${x}% ${y + 100 / rows}%)`,
      transitionDelay: `${delays.value[index] ?? 0}ms`,
      transitionDuration: `${props.pixelFadeInDuration}ms`,
    };
  });
});
function clearAnimation() {
  if (frame !== undefined) cancelAnimationFrame(frame);
  if (colorTimer !== undefined) clearTimeout(colorTimer);
}
function reveal() {
  if (!mounted || !image.value?.complete || !image.value.naturalWidth) return;
  clearAnimation();
  delays.value = pieces.value.map(() => Math.random() * props.maxAnimationDelay);
  frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(() => {
      visible.value = true;
    });
  });
  colorTimer = setTimeout(() => {
    showColor.value = true;
  }, props.colorRevealDelay);
}
watch(
  () => props.src,
  () => {
    clearAnimation();
    visible.value = false;
    showColor.value = false;
  },
);
onMounted(() => {
  mounted = true;
  reveal();
});
onBeforeUnmount(() => {
  mounted = false;
  clearAnimation();
});
</script>

<template>
  <div class="relative aspect-square w-72 select-none overflow-hidden rounded-[2.5rem] md:w-96">
    <img
      ref="image"
      :key="src"
      :src="src"
      :alt="alt"
      class="absolute inset-0 h-full w-full object-cover opacity-0"
      :draggable="false"
      @load="reveal"
    />
    <div
      v-for="(piece, index) in pieces"
      :key="index"
      aria-hidden="true"
      class="absolute inset-0 transition-opacity ease-out"
      :class="visible ? 'opacity-100' : 'opacity-0'"
      :style="piece"
    >
      <img
        :src="src"
        alt=""
        class="h-full w-full object-cover"
        :draggable="false"
        :style="{
          filter: grayscaleAnimation && !showColor ? 'grayscale(1)' : 'grayscale(0)',
          transition: grayscaleAnimation
            ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : 'none',
        }"
      />
    </div>
  </div>
</template>
