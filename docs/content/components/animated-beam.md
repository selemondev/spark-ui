# Animated Beam

An animated beam of light which travels along a path. Useful for showcasing the "integration" features of a website.

<demo src="../../src/example/animated-beam/demo.vue" srcCode="../../src/spark-ui-demos/animated-beam/animated-beam.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [animated-beam.vue]
<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useId, watch } from "vue";

const props = withDefaults(
  defineProps<{
    containerRef: any;
    fromRef: any;
    toRef: any;
    className?: string;
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

  // Observe the container so the path is recalculated once its layout settles.
  // On iOS Safari/Chrome the container's dimensions are often 0 on the first
  // tick, so relying on the window "resize" event alone leaves the SVG sized
  // at 0x0 and nothing renders.
  if (typeof ResizeObserver !== "undefined" && props.containerRef) {
    resizeObserver = new ResizeObserver(() => updatePath());
    resizeObserver.observe(props.containerRef);
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
  { deep: true },
);
</script>

<template>
  <svg
    :width="svgDimensions?.width"
    :height="svgDimensions?.height"
    xmlns="http://www.w3.org/2000/svg"
    class="pointer-events-none absolute left-0 top-0 transform-gpu stroke-2"
    :class="[props.className]"
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
```

```vue [circle.vue]
<script setup lang="ts">
import { ref } from "vue";

const circleRef = ref();

defineExpose({
  circleRef,
});
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

### Example icons

The preview usage imports the following optional framework logos from `@/components/icons/`. To reproduce those examples, save each helper below in `src/components/icons/` (or `components/icons/` in Nuxt 3). The beam itself only requires `animated-beam.vue` and `circle.vue`; you can replace the logos with your own slot content.

::: code-group

```vue [angular.vue]
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128">
    <linearGradient
      id="deviconAngular0"
      x1="14.704"
      x2="110.985"
      y1="46.27"
      y2="92.024"
      gradientTransform="matrix(1 0 0 -1 0 130)"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stop-color="#e40035" />
      <stop offset=".24" stop-color="#f60a48" />
      <stop offset=".352" stop-color="#f20755" />
      <stop offset=".494" stop-color="#dc087d" />
      <stop offset=".745" stop-color="#9717e7" />
      <stop offset="1" stop-color="#6c00f5" />
    </linearGradient>
    <path
      fill="url(#deviconAngular0)"
      d="m124.5 21.3l-4.4 68.6L78.3 0zm-29 88.7L64 128l-31.5-18l6.4-15.5h50.3zM64 34.1l16.5 40.2h-33zM7.9 89.9L3.5 21.3L49.7 0z"
    />
    <linearGradient
      id="deviconAngular1"
      x1="28.733"
      x2="91.742"
      y1="117.071"
      y2="45.195"
      gradientTransform="matrix(1 0 0 -1 0 130)"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stop-color="#ff31d9" />
      <stop offset="1" stop-color="#ff5be1" stop-opacity="0" />
    </linearGradient>
    <path
      fill="url(#deviconAngular1)"
      d="m124.5 21.3l-4.4 68.6L78.3 0zm-29 88.7L64 128l-31.5-18l6.4-15.5h50.3zM64 34.1l16.5 40.2h-33zM7.9 89.9L3.5 21.3L49.7 0z"
    />
  </svg>
</template>
```

```vue [astro.vue]
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="22.39" height="32" viewBox="0 0 256 366">
    <path
      d="M182.022 9.147c2.982 3.702 4.502 8.697 7.543 18.687L256 246.074a276.5 276.5 0 0 0-79.426-26.891L133.318 73.008a5.63 5.63 0 0 0-10.802.017L79.784 219.11A276.5 276.5 0 0 0 0 246.04L66.76 27.783c3.051-9.972 4.577-14.959 7.559-18.654a24.54 24.54 0 0 1 9.946-7.358C88.67 0 93.885 0 104.314 0h47.683c10.443 0 15.664 0 20.074 1.774a24.55 24.55 0 0 1 9.95 7.373"
    />
    <path
      fill="#FF5D01"
      d="M189.972 256.46c-10.952 9.364-32.812 15.751-57.992 15.751c-30.904 0-56.807-9.621-63.68-22.56c-2.458 7.415-3.009 15.903-3.009 21.324c0 0-1.619 26.623 16.898 45.14c0-9.615 7.795-17.41 17.41-17.41c16.48 0 16.46 14.378 16.446 26.043l-.001 1.041c0 17.705 10.82 32.883 26.21 39.28a35.7 35.7 0 0 1-3.588-15.647c0-16.886 9.913-23.173 21.435-30.48c9.167-5.814 19.353-12.274 26.372-25.232a47.6 47.6 0 0 0 5.742-22.735c0-5.06-.786-9.938-2.243-14.516"
    />
  </svg>
</template>
```

```vue [nuxt.vue]
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="48.77" height="32" viewBox="0 0 256 168">
    <path
      fill="#00DC82"
      d="M143.618 167.029h95.166c3.023 0 5.992-.771 8.61-2.237a16.96 16.96 0 0 0 6.302-6.115a16.3 16.3 0 0 0 2.304-8.352c0-2.932-.799-5.811-2.312-8.35L189.778 34.6a16.97 16.97 0 0 0-6.301-6.113a17.6 17.6 0 0 0-8.608-2.238c-3.023 0-5.991.772-8.609 2.238a16.96 16.96 0 0 0-6.3 6.113l-16.342 27.473l-31.95-53.724a17 17 0 0 0-6.304-6.112A17.64 17.64 0 0 0 96.754 0c-3.022 0-5.992.772-8.61 2.237a17 17 0 0 0-6.303 6.112L2.31 141.975a16.3 16.3 0 0 0-2.31 8.35c0 2.932.793 5.813 2.304 8.352a16.96 16.96 0 0 0 6.302 6.115a17.6 17.6 0 0 0 8.61 2.237h59.737c23.669 0 41.123-10.084 53.134-29.758l29.159-48.983l15.618-26.215l46.874 78.742h-62.492zm-67.64-26.24l-41.688-.01L96.782 35.796l31.181 52.492l-20.877 35.084c-7.976 12.765-17.037 17.416-31.107 17.416"
    />
  </svg>
</template>
```

```vue [qwik.vue]
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="30.12" height="32" viewBox="0 0 256 272">
    <path
      fill="#18B6F6"
      d="m224.803 271.548l-48.76-48.483l-.744.107v-.532L71.606 120.252l25.55-24.667l-15.01-86.12l-71.222 88.247c-12.136 12.226-14.372 32.109-5.642 46.781l44.5 73.788c6.813 11.376 19.163 18.18 32.47 18.074l22.038-.213z"
    />
    <path
      fill="#AC7EF4"
      d="m251.414 96.01l-9.795-18.075l-5.11-9.25l-2.023-3.615l-.212.213l-26.829-46.463C200.738 7.125 188.176-.105 174.55 0l-23.527.639l-70.158.213c-13.307.106-25.444 7.123-32.151 18.5l-42.69 84.632L82.353 9.25l100.073 109.937l-17.779 17.968l10.646 86.015l.107-.213v.213h-.213l.213.212l8.304 8.081l40.348 39.445c1.704 1.595 4.472-.318 3.3-2.339l-24.911-49.014l43.436-80.273l1.383-1.595c.533-.638 1.065-1.276 1.491-1.914c8.517-11.589 9.688-27.112 2.662-39.764"
    />
    <path
      fill="#FFF"
      d="M182.746 118.763L82.353 9.358l14.266 85.695l-25.55 24.773L175.08 223.065l-9.368-85.696z"
    />
  </svg>
</template>
```

```vue [react.vue]
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128">
    <g fill="none" stroke="#61DAFB" stroke-width="5">
      <ellipse cx="64" cy="64" rx="59" ry="23" />
      <ellipse cx="64" cy="64" rx="59" ry="23" transform="rotate(60 64 64)" />
      <ellipse cx="64" cy="64" rx="59" ry="23" transform="rotate(120 64 64)" />
    </g>
    <circle cx="64" cy="64" r="11.4" fill="#61DAFB" />
  </svg>
</template>
```

```vue [svelte.vue]
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <path
      fill="#ff3e00"
      d="M26.47 5.7a8.973 8.973 0 0 0-11.793-2.454L7.96 7.4a7.46 7.46 0 0 0-3.481 5.009a7.7 7.7 0 0 0 .8 5.058a7.4 7.4 0 0 0-1.151 2.8a7.8 7.8 0 0 0 1.4 6.028a8.977 8.977 0 0 0 11.794 2.458L24.04 24.6a7.47 7.47 0 0 0 3.481-5.009a7.67 7.67 0 0 0-.8-5.062a7.35 7.35 0 0 0 1.152-2.8A7.8 7.8 0 0 0 26.47 5.7"
    />
    <path
      fill="#fff"
      d="M14.022 26.64A5.41 5.41 0 0 1 8.3 24.581a4.68 4.68 0 0 1-.848-3.625a4 4 0 0 1 .159-.61l.127-.375l.344.238a8.8 8.8 0 0 0 2.628 1.274l.245.073l-.025.237a1.44 1.44 0 0 0 .271.968a1.63 1.63 0 0 0 1.743.636a1.5 1.5 0 0 0 .411-.175l6.7-4.154a1.37 1.37 0 0 0 .633-.909a1.4 1.4 0 0 0-.244-1.091a1.63 1.63 0 0 0-1.726-.622a1.5 1.5 0 0 0-.413.176l-2.572 1.584a5 5 0 0 1-1.364.582a5.415 5.415 0 0 1-5.727-2.06a4.68 4.68 0 0 1-.831-3.628A4.5 4.5 0 0 1 9.9 10.09l6.708-4.154a5 5 0 0 1 1.364-.581A5.41 5.41 0 0 1 23.7 7.414a4.68 4.68 0 0 1 .848 3.625a4 4 0 0 1-.159.61l-.127.375l-.344-.237a8.7 8.7 0 0 0-2.628-1.274l-.245-.074l.025-.237a1.44 1.44 0 0 0-.272-.968a1.63 1.63 0 0 0-1.725-.622a1.5 1.5 0 0 0-.411.176l-6.722 4.14a1.35 1.35 0 0 0-.631.908a1.4 1.4 0 0 0 .244 1.092a1.63 1.63 0 0 0 1.726.621a1.5 1.5 0 0 0 .413-.175l2.562-1.585a4.9 4.9 0 0 1 1.364-.581a5.42 5.42 0 0 1 5.728 2.059a4.68 4.68 0 0 1 .843 3.625a4.5 4.5 0 0 1-2.089 3.013l-6.707 4.154a4.9 4.9 0 0 1-1.364.581"
    />
  </svg>
</template>
```

```vue [vite-icon.vue]
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="31.88" height="32" viewBox="0 0 256 257">
    <defs>
      <linearGradient id="logosVitejs0" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%">
        <stop offset="0%" stop-color="#41D1FF" />
        <stop offset="100%" stop-color="#BD34FE" />
      </linearGradient>
      <linearGradient id="logosVitejs1" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%">
        <stop offset="0%" stop-color="#FFEA83" />
        <stop offset="8.333%" stop-color="#FFDD35" />
        <stop offset="100%" stop-color="#FFA800" />
      </linearGradient>
    </defs>
    <path
      fill="url(#logosVitejs0)"
      d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.5 6.5 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62"
    />
    <path
      fill="url(#logosVitejs1)"
      d="M185.432.063L96.44 17.501a3.27 3.27 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113"
    />
  </svg>
</template>
```

```vue [vue.vue]
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128">
    <path
      fill="none"
      d="m0 8.934l49.854.158l14.167 24.47l14.432-24.47L128 8.935l-63.834 110.14zm126.98.637l-24.36.02l-38.476 66.053L25.691 9.592L.942 9.572l63.211 107.89zm-25.149-.008l-22.745.168l-15.053 24.647L49.216 9.73l-22.794-.168l37.731 64.476zm-75.834-.17l23.002.009m-23.002-.01l23.002.01"
    />
    <path
      fill="#35495e"
      d="m25.997 9.393l23.002.009L64.035 34.36L79.018 9.404L102 9.398L64.15 75.053z"
    />
    <path
      fill="#41b883"
      d="m.91 9.569l25.067-.172l38.15 65.659L101.98 9.401l25.11.026l-62.966 108.06z"
    />
  </svg>
</template>
```

:::

## Examples

### Animated Beam Uni-Directional

<demo src="../../src/example/animated-beam/animated-beam-uni-directional.vue" srcCode="../../src/spark-ui-demos/animated-beam/animated-beam-uni-directional.vue" />

### Animated Beam Bi-Directional

<demo src="../../src/example/animated-beam/animated-beam-bi-directional.vue" srcCode="../../src/spark-ui-demos/animated-beam/animated-beam-bi-directional.vue" />

### Animated Beam Multiple Inputs

<demo src="../../src/example/animated-beam/animated-beam-multiple-inputs.vue" srcCode="../../src/spark-ui-demos/animated-beam/animated-beam-multiple-inputs.vue" />

### Animated Beam Multiple Outputs

<demo src="../../src/example/animated-beam/demo.vue" srcCode="../../src/spark-ui-demos/animated-beam/animated-beam.vue" />

## Props

### Animated Beam

| Prop               | Type    | Description                                              | Default   |
| ------------------ | ------- | -------------------------------------------------------- | --------- |
| class              | string  | The class for the component.                             | -         |
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
