<script setup lang="ts">
import { onMounted, onUnmounted, ref, useId, watch } from "vue";
import { cn } from "../../lib/utils";

interface Square {
  id: number;
  pos: [number, number];
  iteration: number;
}

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  class?: string;
}

const props = withDefaults(defineProps<AnimatedGridPatternProps>(), {
  width: 40,
  height: 40,
  x: -1,
  y: -1,
  strokeDasharray: 0,
  numSquares: 50,
  maxOpacity: 0.5,
  duration: 4,
  repeatDelay: 0.5,
});

const id = `pattern-${useId()}`;

const containerRef = ref<SVGSVGElement | null>(null);
const dimensions = ref({ width: 0, height: 0 });
const squares = ref<Square[]>([]);
const animations = new Map<
  number,
  { node: SVGRectElement; square: Square; animation: Animation }
>();

function cancelAnimations() {
  for (const { animation } of animations.values()) {
    animation.onfinish = null;
    animation.cancel();
  }
  animations.clear();
}

function getPos(): [number, number] {
  return [
    Math.floor((Math.random() * dimensions.value.width) / props.width),
    Math.floor((Math.random() * dimensions.value.height) / props.height),
  ];
}

function generateSquares(count: number): Square[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    pos: getPos(),
    iteration: 0,
  }));
}

function updateSquarePosition(squareId: number) {
  const current = squares.value[squareId];
  if (!current || current.id !== squareId) {
    return;
  }
  squares.value[squareId] = {
    ...current,
    pos: getPos(),
    iteration: current.iteration + 1,
  };
}

watch(
  () =>
    [
      dimensions.value.width,
      dimensions.value.height,
      props.numSquares,
      props.width,
      props.height,
      props.duration,
      props.repeatDelay,
      props.maxOpacity,
    ] as const,
  ([width, height]) => {
    cancelAnimations();
    if (width && height) {
      squares.value = generateSquares(props.numSquares);
    }
  },
);

function animateRect(el: unknown, square: Square, index: number) {
  const node = el as (SVGRectElement & { animate?: SVGRectElement["animate"] }) | null;
  const existing = animations.get(square.id);
  if (existing?.node === node && existing.square === square) return;
  // A removed generation's ref must not cancel its replacement.
  if (existing && (node || existing.square === square)) {
    existing.animation.onfinish = null;
    existing.animation.cancel();
    animations.delete(square.id);
  }
  if (!node || typeof node.animate !== "function" || squares.value[square.id] !== square) return;

  const duration = Math.max(0, props.duration);
  const repeatDelay = Math.max(0, props.repeatDelay);
  const total = duration * 2 + repeatDelay;
  if (total === 0) return;
  const forward = duration / total;
  const hold = (duration + repeatDelay) / total;

  const animation = node.animate(
    [
      { opacity: 0, offset: 0 },
      { opacity: props.maxOpacity, offset: forward },
      { opacity: props.maxOpacity, offset: hold },
      { opacity: 0, offset: 1 },
    ],
    {
      duration: total * 1000,
      delay: index * 100,
      easing: "ease-out",
      fill: "forwards",
    },
  );

  animations.set(square.id, { node, square, animation });
  animation.onfinish = () => {
    if (animations.get(square.id)?.animation !== animation || squares.value[square.id] !== square)
      return;
    animation.onfinish = null;
    animation.cancel();
    animations.delete(square.id);
    updateSquarePosition(square.id);
  };
}

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  const element = containerRef.value;
  if (!element || typeof ResizeObserver === "undefined") {
    return;
  }

  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const nextWidth = entry.contentRect.width;
      const nextHeight = entry.contentRect.height;
      if (dimensions.value.width !== nextWidth || dimensions.value.height !== nextHeight) {
        dimensions.value = { width: nextWidth, height: nextHeight };
      }
    }
  });

  resizeObserver.observe(element);
});

onUnmounted(() => {
  cancelAnimations();
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});
</script>

<template>
  <svg
    ref="containerRef"
    aria-hidden="true"
    :class="
      cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30',
        props.class,
      )
    "
  >
    <defs>
      <pattern
        :id="id"
        :width="props.width"
        :height="props.height"
        patternUnits="userSpaceOnUse"
        :x="props.x"
        :y="props.y"
      >
        <path
          :d="`M.5 ${props.height}V.5H${props.width}`"
          fill="none"
          :stroke-dasharray="props.strokeDasharray"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${id})`" />
    <svg :x="props.x" :y="props.y" class="overflow-visible">
      <rect
        v-for="(square, index) in squares"
        :key="`${square.id}-${square.iteration}`"
        :ref="(el) => animateRect(el, square, index)"
        :width="props.width - 1"
        :height="props.height - 1"
        :x="square.pos[0] * props.width + 1"
        :y="square.pos[1] * props.height + 1"
        fill="currentColor"
        stroke-width="0"
        :style="{ opacity: 0 }"
      />
    </svg>
  </svg>
</template>
