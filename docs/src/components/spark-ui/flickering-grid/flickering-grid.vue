<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { cn } from "../../../lib/utils";

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

const setupCanvas = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
): GridParams => {
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
    const newWidth = props.width || container.clientWidth;
    const newHeight = props.height || container.clientHeight;
    canvasSize.value = { width: newWidth, height: newHeight };
    gridParams = setupCanvas(canvas, newWidth, newHeight);
  };

  updateCanvasSize();

  const animate = (time: number) => {
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
      const wasInView = isInView;
      isInView = entry.isIntersecting;
      if (isInView && !wasInView) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    },
    { threshold: 0 },
  );
  intersectionObserver.observe(canvas);
});

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
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
