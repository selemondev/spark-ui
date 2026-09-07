# Scroll Based Velocity

Repeat content in moving rows that respond to page scroll speed and direction.

<demo src="../../src/example/scroll-based-velocity/demo.vue" srcCode="../../src/spark-ui-demos/scroll-based-velocity/demo.vue" />

## Installation

Install the animation package:

```bash
npm install motion-v
```

Copy all three files into `src/components/spark-ui/scroll-based-velocity/`.

::: code-group

```vue [scroll-based-velocity.vue]
<script setup lang="ts">
import { provide } from "vue";
import { scrollVelocityKey, useScrollVelocity } from "./scroll-velocity";

defineProps<{ className?: string }>();
provide(scrollVelocityKey, useScrollVelocity());
</script>

<template>
  <div class="relative w-full" :class="className"><slot /></div>
</template>
```

```vue [scroll-velocity-row.vue]
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
```

```ts [scroll-velocity.ts]
import { useScroll, useSpring, useTransform, useVelocity } from "motion-v";
import type { MotionValue } from "motion-v";
import type { InjectionKey } from "vue";

export const scrollVelocityKey: InjectionKey<MotionValue<number>> = Symbol("scroll-velocity");

export function useScrollVelocity() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  return useTransform(smoothVelocity, (value) => {
    const sign = value < 0 ? -1 : 1;
    return sign * Math.min(5, (Math.abs(value) / 1000) * 5);
  });
}
```

:::

## Usage

```vue
<script setup lang="ts">
import ScrollVelocityContainer from "@/components/spark-ui/scroll-based-velocity/scroll-based-velocity.vue";
import ScrollVelocityRow from "@/components/spark-ui/scroll-based-velocity/scroll-velocity-row.vue";
</script>

<template>
  <ScrollVelocityContainer class="text-5xl font-bold">
    <ScrollVelocityRow :base-velocity="20" :direction="1">
      <span class="px-4">Velocity Scroll</span>
    </ScrollVelocityRow>
    <ScrollVelocityRow :base-velocity="20" :direction="-1">
      <span class="px-4">Velocity Scroll</span>
    </ScrollVelocityRow>
  </ScrollVelocityContainer>
</template>
```

## Props

The container accepts `className` and standard HTML attributes. Its default slot holds the rows.

| Row prop           | Type      | Default | Description                                                            |
| ------------------ | --------- | ------- | ---------------------------------------------------------------------- |
| `baseVelocity`     | `number`  | `5`     | Percentage of one content copy that moves each second.                 |
| `direction`        | `1 \| -1` | `1`     | Base direction. Positive values move left. Negative values move right. |
| `scrollReactivity` | `boolean` | `true`  | Uses page scroll speed and direction.                                  |
| `className`        | `string`  | Unset   | Extra row classes.                                                     |

## Behavior

The row repeats its default slot to cover the available width. Text, images, and other HTML content can fill the slot. Add spacing inside the slot for a gap between copies.

The container shares one scroll measurement across its rows. Rows also work without a container. Resize observers measure content after size changes, including image and font loading.

Page scrolling increases speed by up to six times the base speed. Scrolling upward reverses each row relative to its base direction. The row keeps its last direction when scrolling stops.

The direction values match the upstream implementation. Its documentation labels the positive direction differently. Setting `scrollReactivity` to `false` restores the base direction and disables scroll effects.

Rows pause movement outside the viewport and while the page is hidden. Reduced motion keeps the base speed but removes scroll acceleration, as in the upstream source. Set `baseVelocity` to `0` to stop movement.

Only the first content copy is available to screen readers and keyboard focus. Observers, event listeners, and animation updates stop when the component is removed. The text demo requires no external media.

## Source

Ported from [Magic UI Scroll Based Velocity](https://magicui.design/docs/components/scroll-based-velocity). The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/scroll-based-velocity.tsx) uses React and Motion.
