# Icon Cloud

An interactive 3D tag cloud that renders icons or images onto a rotating canvas sphere.

<demo src="../../src/example/icon-cloud/demo.vue" srcCode="../../src/spark-ui-demos/icon-cloud/icon-cloud.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [icon-cloud.vue]
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from "vue";
import { cn } from "@/lib/utils";

interface IconCloudProps {
  class?: string;
  /** Array of image URLs to render in the cloud. */
  images?: string[];
  /** Array of raw SVG strings to render in the cloud. */
  icons?: string[];
}

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

const props = defineProps<IconCloudProps>();

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const canvasRef = ref<HTMLCanvasElement | null>(null);

const iconPositions = shallowRef<Icon[]>([]);
const isDragging = ref(false);
const lastMousePos = { x: 0, y: 0 };
const mousePos = { x: 0, y: 0 };

let targetRotation:
  | {
      x: number;
      y: number;
      startX: number;
      startY: number;
      distance: number;
      startTime: number;
      duration: number;
    }
  | null = null;

let animationFrame = 0;
const rotation = { x: 0, y: 0 };
let iconCanvases: HTMLCanvasElement[] = [];
let imagesLoaded: boolean[] = [];

function buildIconCanvases() {
  if (typeof document === "undefined") return;

  const items = props.icons ?? props.images ?? [];
  imagesLoaded = new Array(items.length).fill(false);

  iconCanvases = items.map((item, index) => {
    const offscreen = document.createElement("canvas");
    offscreen.width = 40;
    offscreen.height = 40;
    const offCtx = offscreen.getContext("2d");

    if (offCtx) {
      if (props.images) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = item;
        img.onload = () => {
          offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
          offCtx.beginPath();
          offCtx.arc(20, 20, 20, 0, Math.PI * 2);
          offCtx.closePath();
          offCtx.clip();
          offCtx.drawImage(img, 0, 0, 40, 40);
          imagesLoaded[index] = true;
        };
      } else {
        offCtx.scale(0.4, 0.4);
        const img = new Image();
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(item)));
        img.onload = () => {
          offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
          offCtx.drawImage(img, 0, 0);
          imagesLoaded[index] = true;
        };
      }
    }
    return offscreen;
  });
}

function buildPositions() {
  const items = props.icons ?? props.images ?? [];
  const newIcons: Icon[] = [];
  const numIcons = items.length || 20;

  const offset = 2 / numIcons;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < numIcons; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;

    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;

    newIcons.push({
      x: x * 100,
      y: y * 100,
      z: z * 100,
      scale: 1,
      opacity: 1,
      id: i,
    });
  }
  iconPositions.value = newIcons;
}

function handleMouseDown(e: MouseEvent) {
  const canvas = canvasRef.value;
  const rect = canvas?.getBoundingClientRect();
  if (!rect || !canvas) return;

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  for (const icon of iconPositions.value) {
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);

    const rotatedX = icon.x * cosY - icon.z * sinY;
    const rotatedZ = icon.x * sinY + icon.z * cosY;
    const rotatedY = icon.y * cosX + rotatedZ * sinX;

    const screenX = canvas.width / 2 + rotatedX;
    const screenY = canvas.height / 2 + rotatedY;

    const scale = (rotatedZ + 200) / 300;
    const radius = 20 * scale;
    const dx = x - screenX;
    const dy = y - screenY;

    if (dx * dx + dy * dy < radius * radius) {
      const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z));
      const targetY = Math.atan2(icon.x, icon.z);

      const currentX = rotation.x;
      const currentY = rotation.y;
      const distance = Math.sqrt(
        Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2),
      );

      const duration = Math.min(2000, Math.max(800, distance * 1000));

      targetRotation = {
        x: targetX,
        y: targetY,
        startX: currentX,
        startY: currentY,
        distance,
        startTime: performance.now(),
        duration,
      };
      return;
    }
  }

  isDragging.value = true;
  lastMousePos.x = e.clientX;
  lastMousePos.y = e.clientY;
}

function handleMouseMove(e: MouseEvent) {
  const canvas = canvasRef.value;
  const rect = canvas?.getBoundingClientRect();
  if (rect) {
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;
  }

  if (isDragging.value) {
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    rotation.x += deltaY * 0.002;
    rotation.y += deltaX * 0.002;

    lastMousePos.x = e.clientX;
    lastMousePos.y = e.clientY;
  }
}

function handleMouseUp() {
  isDragging.value = false;
}

function animate() {
  const canvas = canvasRef.value;
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
  const dx = mousePos.x - centerX;
  const dy = mousePos.y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const speed = 0.003 + (distance / maxDistance) * 0.01;

  if (targetRotation) {
    const elapsed = performance.now() - targetRotation.startTime;
    const progress = Math.min(1, elapsed / targetRotation.duration);
    const easedProgress = easeOutCubic(progress);

    rotation.x = targetRotation.startX + (targetRotation.x - targetRotation.startX) * easedProgress;
    rotation.y = targetRotation.startY + (targetRotation.y - targetRotation.startY) * easedProgress;

    if (progress >= 1) {
      targetRotation = null;
    }
  } else if (!isDragging.value) {
    rotation.x += (dy / canvas.height) * speed;
    rotation.y += (dx / canvas.width) * speed;
  }

  const hasContent = Boolean(props.icons || props.images);

  iconPositions.value.forEach((icon, index) => {
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);

    const rotatedX = icon.x * cosY - icon.z * sinY;
    const rotatedZ = icon.x * sinY + icon.z * cosY;
    const rotatedY = icon.y * cosX + rotatedZ * sinX;

    const scale = (rotatedZ + 200) / 300;
    const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200));

    ctx.save();
    ctx.translate(canvas.width / 2 + rotatedX, canvas.height / 2 + rotatedY);
    ctx.scale(scale, scale);
    ctx.globalAlpha = opacity;

    if (hasContent) {
      if (iconCanvases[index] && imagesLoaded[index]) {
        ctx.drawImage(iconCanvases[index], -20, -20, 40, 40);
      }
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#4444ff";
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "16px Arial";
      ctx.fillText(`${icon.id + 1}`, 0, 0);
    }

    ctx.restore();
  });

  animationFrame = requestAnimationFrame(animate);
}

onMounted(() => {
  buildIconCanvases();
  buildPositions();
  animate();
});

watch(
  () => [props.icons, props.images],
  () => {
    buildIconCanvases();
    buildPositions();
  },
);

onBeforeUnmount(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame);
});
</script>

<template>
  <canvas
    ref="canvasRef"
    :width="400"
    :height="400"
    :class="cn('rounded-lg', props.class)"
    aria-label="Interactive 3D Icon Cloud"
    role="img"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  />
</template>
```

:::

## Examples

### With Images

<demo src="../../src/example/icon-cloud/images-demo.vue" srcCode="../../src/spark-ui-demos/icon-cloud/images-demo.vue" />

### With SVG Icons

Pass an array of raw SVG strings via the `icons` prop.

<demo src="../../src/example/icon-cloud/icons-demo.vue" srcCode="../../src/spark-ui-demos/icon-cloud/icons-demo.vue" />

## Props

| Prop     | Type       | Default     | Description                                   |
| -------- | ---------- | ----------- | --------------------------------------------- |
| `images` | `string[]` | `undefined` | Array of image URLs to render in the cloud.   |
| `icons`  | `string[]` | `undefined` | Array of raw SVG strings to render.           |
| `class`  | `string`   | `undefined` | Additional classes applied to the canvas.     |
