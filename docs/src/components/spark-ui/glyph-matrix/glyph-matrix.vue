<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { cn } from "../../../lib/utils";

interface GlyphMatrixProps {
  /** Classes applied to the canvas element */
  class?: string;
  /** Characters to randomly pick from */
  glyphs?: string;
  /** Cell size in px (also font size) */
  cellSize?: number;
  /** Probability (0-1) a cell mutates each tick */
  mutationRate?: number;
  /** Tick interval in ms */
  interval?: number;
  /** Fade out toward bottom (0 = no fade) */
  fadeBottom?: number;
  /** Glyph color (any CSS color). Pass a theme-aware value from the consumer. */
  color?: string;
}

const props = withDefaults(defineProps<GlyphMatrixProps>(), {
  glyphs: "01·•+*/\\<>=",
  cellSize: 14,
  mutationRate: 0.04,
  interval: 90,
  fadeBottom: 0.6,
  color: "#6B7280",
});

const canvasRef = ref<HTMLCanvasElement | null>(null);

// Current glyph color as RGBA (a in 0-1). Kept in a ref so a color change
// (e.g. theme toggle) recolors the next frame without restarting the
// animation. Defaults to #6B7280.
const rgba = ref({ r: 107, g: 114, b: 128, a: 1 });

// Resolve the CSS color string to RGBA (handles hex, rgb, hsl, oklch, ...).
const resolveColor = (color: string) => {
  if (typeof document === "undefined") return;
  const probe = document.createElement("canvas");
  probe.width = 1;
  probe.height = 1;
  const probeCtx = probe.getContext("2d");
  if (!probeCtx) return;
  // Seed with the default so an invalid color falls back to it: the 2d
  // context keeps the previous fillStyle when assigned an invalid value
  // instead of silently turning black.
  probeCtx.fillStyle = "#6B7280";
  probeCtx.fillStyle = color;
  probeCtx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = probeCtx.getImageData(0, 0, 1, 1).data;
  rgba.value = { r, g, b, a: a / 255 };
};

let raf = 0;
let ro: ResizeObserver | null = null;
let stopped = false;

onMounted(() => {
  resolveColor(props.color);

  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let cols = 0;
  let rows = 0;
  let cells: string[] = [];
  let alphas: number[] = [];
  let last = 0;

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const { clientWidth: w, clientHeight: h } = canvas;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.ceil(w / props.cellSize);
    rows = Math.ceil(h / props.cellSize);

    cells = Array.from(
      { length: cols * rows },
      () => props.glyphs[Math.floor(Math.random() * props.glyphs.length)],
    );
    alphas = Array.from({ length: cols * rows }, () => 0.05 + Math.random() * 0.35);
  };

  const draw = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    ctx.clearRect(0, 0, w, h);

    ctx.font = `${props.cellSize - 2}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.textBaseline = "top";

    const { r, g, b, a: colorAlpha } = rgba.value;
    for (let y = 0; y < rows; y++) {
      const fade = props.fadeBottom > 0 ? 1 - (y / rows) * props.fadeBottom : 1;
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        const a = alphas[i] * fade * colorAlpha;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.fillText(cells[i], x * props.cellSize, y * props.cellSize);
      }
    }
  };

  const tick = (t: number) => {
    if (stopped) return;

    if (t - last >= props.interval) {
      last = t;

      const total = cols * rows;
      const mutations = Math.max(1, Math.floor(total * props.mutationRate));

      for (let n = 0; n < mutations; n++) {
        const i = Math.floor(Math.random() * total);
        cells[i] = props.glyphs[Math.floor(Math.random() * props.glyphs.length)];
        alphas[i] = 0.05 + Math.random() * 0.45;
      }

      draw();
    }

    raf = requestAnimationFrame(tick);
  };

  resize();
  draw();
  raf = requestAnimationFrame(tick);

  ro = new ResizeObserver(() => {
    resize();
    draw();
  });
  ro.observe(canvas);
});

// Recolor the next frame when the color prop changes (e.g. theme toggle)
// without restarting the animation.
watch(
  () => props.color,
  (color) => resolveColor(color),
);

onBeforeUnmount(() => {
  stopped = true;
  cancelAnimationFrame(raf);
  ro?.disconnect();
});
</script>

<template>
  <canvas
    ref="canvasRef"
    :class="cn('pointer-events-none', props.class)"
    style="width: 100%; height: 100%; display: block"
    aria-hidden="true"
  />
</template>
