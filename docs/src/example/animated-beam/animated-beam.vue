<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useId, watch } from "vue";

const props = withDefaults(
  defineProps<{
    containerRef: HTMLElement | undefined;
    fromRef: any;
    toRef: any;
    class?: string;
    curvature?: number;
    reverse?: boolean;
    pathColor?: string;
    pathWidth?: number;
    pathOpacity?: number;
    gradientStartColor?: string;
    gradientStopColor?: string;
    delay?: number;
    duration?: number;
    startXOffset?: number;
    startYOffset?: number;
    endXOffset?: number;
    endYOffset?: number;
    width?: number;
    height?: number;
  }>(),
  {
    curvature: 0,
    reverse: false,
    duration: Math.random() * 3 + 4,
    delay: 3,
    pathColor: "gray",
    pathWidth: 2,
    pathOpacity: 0.2,
    gradientStartColor: "#ffaa40",
    gradientStopColor: "#9c40ff",
    startXOffset: 0,
    startYOffset: 0,
    endXOffset: 0,
    endYOffset: 0,
  },
);

const id = `pattern-${useId()}`;

// Keyframe values for the animated gradient. We animate the gradient's own
// x1/x2 attributes via native SVG (SMIL) `<animate>` elements instead of a CSS
// transform. WebKit (Safari and Chrome on iOS) does not move an SVG gradient
// via CSS transforms, which is why the beam was invisible there.
const gradientCoordinates = computed(() =>
  props.reverse ? { x1: "90%;-10%", x2: "100%;0%" } : { x1: "10%;110%", x2: "0%;100%" },
);

const svgDimensions = ref({ width: 0, height: 0 });
const pathD = ref("");
function updatePath() {
  if (props.containerRef && props.fromRef?.circleRef && props.toRef?.circleRef) {
    const containerRect = props.containerRef?.getBoundingClientRect();
    const rectA = props.fromRef?.circleRef?.getBoundingClientRect();
    const rectB = props.toRef?.circleRef?.getBoundingClientRect();

    const svgWidth = containerRect?.width;
    const svgHeight = containerRect?.height;
    svgDimensions.value.width = svgWidth;
    svgDimensions.value.height = svgHeight;

    const startX = rectA.left - containerRect.left + rectA.width / 2 + props.startXOffset;
    const startY = rectA.top - containerRect.top + rectA.height / 2 + props.startYOffset;
    const endX = rectB.left - containerRect.left + rectB.width / 2 + props.endXOffset;
    const endY = rectB.top - containerRect.top + rectB.height / 2 + props.endYOffset;

    const controlY = startY - props.curvature;
    const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;
    pathD.value = d;
  }
}

const controller = new AbortController();
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  window.addEventListener("resize", updatePath, {
    signal: controller.signal,
  });

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(updatePath);
    watch(
      () => props.containerRef,
      (container) => {
        resizeObserver?.disconnect();
        if (container) resizeObserver?.observe(container);
        updatePath();
      },
      { immediate: true, flush: "post" },
    );
  }

  // Compute the initial path once the DOM has been laid out.
  nextTick(updatePath);
});

onUnmounted(() => {
  controller.abort();
  resizeObserver?.disconnect();
});

watch(
  props,
  (_) => {
    updatePath();
  },
  { deep: true, flush: "post" },
);
</script>

<template>
  <svg
    :width="svgDimensions?.width"
    :height="svgDimensions?.height"
    xmlns="http://www.w3.org/2000/svg"
    class="pointer-events-none absolute left-0 top-0 transform-gpu stroke-2"
    :class="[props.class]"
    :viewBox="`0 0 ${svgDimensions?.width} ${svgDimensions?.height}`"
  >
    <path
      :d="pathD"
      :stroke="pathColor"
      fill="none"
      :stroke-width="pathWidth"
      :stroke-opacity="pathOpacity"
      stroke-linecap="round"
    />
    <path :d="pathD" :stroke="`url(#${id})`" fill="none" stroke-linecap="round" />
    <defs>
      <linearGradient :id="id" gradientUnits="userSpaceOnUse" x1="0%" x2="0%" y1="0%" y2="0%">
        <animate
          attributeName="x1"
          :values="gradientCoordinates.x1"
          :dur="`${duration}s`"
          :begin="`${delay}s`"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.16 1 0.3 1"
        />
        <animate
          attributeName="x2"
          :values="gradientCoordinates.x2"
          :dur="`${duration}s`"
          :begin="`${delay}s`"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.16 1 0.3 1"
        />
        <stop :stop-color="props.gradientStartColor" stop-opacity="0" />
        <stop :stop-color="props.gradientStartColor" />
        <stop offset="32.5%" :stop-color="props.gradientStopColor" />
        <stop offset="100%" :stop-color="props.gradientStopColor" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>
