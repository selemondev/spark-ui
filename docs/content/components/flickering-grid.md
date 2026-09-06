# Flickering Grid

A canvas-based flickering grid background, fully customizable with size, gap, color, opacity and flicker rate.

<demo src="../../src/example/flickering-grid/demo.vue" srcCode="../../src/spark-ui-demos/flickering-grid/flickering-grid.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [flickering-grid.vue]
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { cn } from "@/lib/utils";

interface FlickeringGridProps {
  class?: string;
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  maxOpacity?: number;
}

const props = withDefaults(defineProps<FlickeringGridProps>(), {
  squareSize: 4,
  gridGap: 6,
  flickerChance: 0.3,
  color: "rgb(0, 0, 0)",
  maxOpacity: 0.3,
});

const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const canvasSize = ref({ width: 0, height: 0 });

const memoizedColor = computed(() => {
  const toRGBA = (color: string) => {
    if (typeof window === "undefined") {
      return "rgba(0, 0, 0,";
    }
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "rgba(255, 0, 0,";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
    return `rgba(${r}, ${g}, ${b},`;
  };
  return toRGBA(props.color);
});

interface GridParams {
  cols: number;
  rows: number;
  squares: Float32Array;
  dpr: number;
}

let isInView = false;
let animationFrameId: number | null = null;
let resizeObserver: ResizeObserver | null = null;
let intersectionObserver: IntersectionObserver | null = null;
let gridParams: GridParams | null = null;
let lastTime = 0;

const setupCanvas = (canvas: HTMLCanvasElement, width: number, height: number): GridParams => {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const cols = Math.ceil(width / (props.squareSize + props.gridGap));
  const rows = Math.ceil(height / (props.squareSize + props.gridGap));

  const squares = new Float32Array(cols * rows);
  for (let i = 0; i < squares.length; i++) {
    squares[i] = Math.random() * props.maxOpacity;
  }

  return { cols, rows, squares, dpr };
};

const updateSquares = (squares: Float32Array, deltaTime: number) => {
  for (let i = 0; i < squares.length; i++) {
    if (Math.random() < props.flickerChance * deltaTime) {
      squares[i] = Math.random() * props.maxOpacity;
    }
  }
};

const drawGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cols: number,
  rows: number,
  squares: Float32Array,
  dpr: number,
) => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "transparent";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const opacity = squares[i * rows + j];
      ctx.fillStyle = `${memoizedColor.value}${opacity})`;
      ctx.fillRect(
        i * (props.squareSize + props.gridGap) * dpr,
        j * (props.squareSize + props.gridGap) * dpr,
        props.squareSize * dpr,
        props.squareSize * dpr,
      );
    }
  }
};

onMounted(() => {
  const canvas = canvasRef.value;
  const container = containerRef.value;
  const ctx = canvas?.getContext("2d") ?? null;

  if (!canvas || !container || !ctx) return;

  const updateCanvasSize = () => {
    const newWidth = props.width ?? container.clientWidth;
    const newHeight = props.height ?? container.clientHeight;
    canvasSize.value = { width: newWidth, height: newHeight };
    gridParams = setupCanvas(canvas, newWidth, newHeight);
    drawGrid(
      ctx,
      canvas.width,
      canvas.height,
      gridParams.cols,
      gridParams.rows,
      gridParams.squares,
      gridParams.dpr,
    );
  };

  updateCanvasSize();
  watch(() => [props.squareSize, props.gridGap, props.width, props.height], updateCanvasSize);

  const animate = (time: number) => {
    animationFrameId = null;
    if (!isInView || !gridParams) return;

    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;

    updateSquares(gridParams.squares, deltaTime);
    drawGrid(
      ctx,
      canvas.width,
      canvas.height,
      gridParams.cols,
      gridParams.rows,
      gridParams.squares,
      gridParams.dpr,
    );
    animationFrameId = requestAnimationFrame(animate);
  };

  resizeObserver = new ResizeObserver(() => {
    updateCanvasSize();
  });
  resizeObserver.observe(container);

  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      isInView = entry.isIntersecting;
      if (isInView && animationFrameId === null) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      } else if (!isInView && animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    },
    { threshold: 0 },
  );
  intersectionObserver.observe(canvas);
});

onUnmounted(() => {
  isInView = false;
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  if (intersectionObserver) {
    intersectionObserver.disconnect();
  }
});
</script>

<template>
  <div ref="containerRef" :class="cn('h-full w-full', props.class)">
    <canvas
      ref="canvasRef"
      class="pointer-events-none"
      :style="{
        width: `${canvasSize.width}px`,
        height: `${canvasSize.height}px`,
      }"
    />
  </div>
</template>
```

:::

## Examples

### Rounded

<demo src="../../src/example/flickering-grid/rounded-demo.vue" srcCode="../../src/spark-ui-demos/flickering-grid/rounded-demo.vue" />

## Props

| Prop            | Type     | Default          | Description                              |
| --------------- | -------- | ---------------- | ---------------------------------------- |
| `class`         | `string` | `-`              | Additional CSS classes for the container |
| `squareSize`    | `number` | `4`              | Size of each square in the grid          |
| `gridGap`       | `number` | `6`              | Gap between squares in the grid          |
| `flickerChance` | `number` | `0.3`            | Probability of a square flickering       |
| `color`         | `string` | `"rgb(0, 0, 0)"` | Color of the squares                     |
| `width`         | `number` | `-`              | Width of the canvas                      |
| `height`        | `number` | `-`              | Height of the canvas                     |
| `maxOpacity`    | `number` | `0.3`            | Maximum opacity of the squares           |

Changes to `squareSize`, `gridGap`, `width`, or `height` rebuild the canvas grid without remounting. Omitted dimensions follow the container; explicit `0` dimensions remain zero. Animation pauses outside the viewport and resumes with a single frame loop.
