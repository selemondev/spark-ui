<script setup lang="ts">
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion-v";
import { inject, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { scrollVelocityKey, useScrollVelocity } from "./scroll-velocity";

interface ScrollVelocityRowProps {
  baseVelocity?: number;
  direction?: 1 | -1;
  scrollReactivity?: boolean;
  className?: string;
}
const props = withDefaults(defineProps<ScrollVelocityRowProps>(), {
  baseVelocity: 5,
  direction: 1,
  scrollReactivity: true,
});
const velocityFactor = inject(scrollVelocityKey, null) ?? useScrollVelocity();
const container = ref<HTMLDivElement>();
const block = ref<HTMLDivElement>();
const numCopies = ref(1);
const baseX = useMotionValue(0);
const unitWidth = useMotionValue(0);
let currentDirection = props.direction;
let inView = true;
let pageVisible = true;
let reducedMotion = false;
let mounted = false;
let resizeObserver: ResizeObserver | undefined;
let intersectionObserver: IntersectionObserver | undefined;
let mediaQuery: MediaQueryList | undefined;
function measure() {
  const width = block.value?.scrollWidth ?? 0;
  unitWidth.set(width);
  numCopies.value =
    width > 0 ? Math.max(3, Math.ceil((container.value?.offsetWidth ?? 0) / width) + 2) : 1;
}
function updateVisibility() {
  pageVisible = document.visibilityState === "visible";
}
function updateReducedMotion() {
  reducedMotion = mediaQuery?.matches ?? false;
}
watch(
  () => [props.direction, props.scrollReactivity],
  () => {
    currentDirection = props.direction;
  },
);
onMounted(() => {
  mounted = true;
  measure();
  resizeObserver = new ResizeObserver(measure);
  if (container.value) resizeObserver.observe(container.value);
  if (block.value) resizeObserver.observe(block.value);
  intersectionObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
  });
  if (container.value) intersectionObserver.observe(container.value);
  document.addEventListener("visibilitychange", updateVisibility);
  updateVisibility();
  mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", updateReducedMotion);
  updateReducedMotion();
});
onBeforeUnmount(() => {
  mounted = false;
  resizeObserver?.disconnect();
  intersectionObserver?.disconnect();
  document.removeEventListener("visibilitychange", updateVisibility);
  mediaQuery?.removeEventListener("change", updateReducedMotion);
});
const x = useTransform(() => {
  const width = unitWidth.get() || 1;
  const offset = baseX.get();
  return `${-(((offset % width) + width) % width)}px`;
});
useAnimationFrame((_, delta) => {
  if (!mounted || !inView || !pageVisible) return;
  const factor = props.scrollReactivity ? velocityFactor.get() : 0;
  const magnitude = Math.min(5, Math.abs(factor));
  const multiplier = reducedMotion ? 1 : 1 + magnitude;
  if (magnitude > 0.1) currentDirection = (props.direction * (factor >= 0 ? 1 : -1)) as 1 | -1;
  const width = unitWidth.get();
  if (width <= 0) return;
  const movement =
    (((currentDirection * width * props.baseVelocity) / 100) * multiplier * delta) / 1000;
  baseX.set(baseX.get() + movement);
});
</script>

<template>
  <div ref="container" class="w-full overflow-hidden whitespace-nowrap" :class="className">
    <motion.div
      class="inline-flex transform-gpu select-none items-center will-change-transform"
      :style="{ x }"
    >
      <div ref="block" class="inline-flex shrink-0 items-center"><slot /></div>
      <div
        v-for="copy in numCopies - 1"
        :key="copy"
        aria-hidden="true"
        inert
        class="inline-flex shrink-0 items-center"
      >
        <slot />
      </div>
    </motion.div>
  </div>
</template>
