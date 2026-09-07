# Floating 3D Particles

A canvas particle field rotates and drifts with simulated depth.

<demo src="../../src/example/floating-3d-particles/demo.vue" srcCode="../../src/spark-ui-demos/floating-3d-particles/demo.vue" />

## Installation

Copy the component files below into `src/components/spark-ui/floating-3d-particles/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [floating-3d-particles.vue]
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { cn } from "@/lib/utils";

interface Floating3DParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  size?: number;
  opacity?: number;
  drift?: number;
  depth?: number;
}
interface Particle {
  angle: number;
  radius: number;
  y: number;
  size: number;
  angularSpeed: number;
  opacity: number;
  screenX: number;
  screenY: number;
  projectedScale: number;
}

const props = withDefaults(defineProps<Floating3DParticlesProps>(), {
  quantity: 400,
  color: "#8B5CF6",
  size: 5,
  opacity: 0.3,
  drift: 0.8,
  depth: 0.5,
});
const canvasRef = ref<HTMLCanvasElement | null>(null);
const particleColor = computed(() => {
  const clean = props.color.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((character) => character + character)
          .join("")
      : clean;
  if (!/^[0-9a-f]{6}$/i.test(full)) return "rgb(139, 92, 246)";
  const value = Number.parseInt(full, 16);
  return `rgb(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255})`;
});
const projection = computed(() => {
  const depth = Math.max(0, Math.min(1, props.depth));
  const fov = 800 - depth * 600;
  const perspectiveDistance = 100 + depth * 700;
  const depthRange = depth * Math.min(400, fov + perspectiveDistance - 1);
  return { fov, perspectiveDistance, depthRange };
});
let cleanup: (() => void) | undefined;

onMounted(() => {
  const canvas = canvasRef.value;
  const ctx = canvas?.getContext("2d", { alpha: true });
  if (!canvas || !ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 0;
  let mobile = false;
  let particles: Particle[] = [];
  let rafId: number | null = null;
  let active = true;
  let visible = true;
  let hidden = document.hidden;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reducedMotion = motionQuery.matches;

  function spawnParticle(): Particle {
    const sizeVariance = props.size * 0.4;
    return {
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * Math.max(width, height) * 1.2,
      y: (Math.random() - 0.5) * height * 2,
      size: Math.max(0.5, props.size - sizeVariance + Math.random() * sizeVariance * 2),
      angularSpeed: 0.0015 + Math.random() * 0.001,
      opacity: Math.min(1, Math.max(0, props.opacity - 0.2 + Math.random() * 0.4)),
      screenX: 0,
      screenY: 0,
      projectedScale: 1,
    };
  }

  function requestFrame() {
    if (active && visible && !hidden && rafId === null) {
      rafId = window.requestAnimationFrame(tick);
    }
  }

  function cancelFrame() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function tick() {
    rafId = null;
    if (!active || !visible || hidden) return;
    const { fov, perspectiveDistance, depthRange } = projection.value;
    ctx!.clearRect(0, 0, width, height);
    const cx = width / 2;
    const cy = height / 2;

    for (const particle of particles) {
      if (!reducedMotion) {
        particle.angle += particle.angularSpeed;
        particle.y -= props.drift;
        if (particle.y < -height) {
          particle.y = height;
          particle.radius = Math.random() * Math.max(width, height) * 1.2;
        } else if (particle.y > height) {
          particle.y = -height;
          particle.radius = Math.random() * Math.max(width, height) * 1.2;
        }
      }
      const z = reducedMotion ? 0 : Math.sin(particle.angle) * depthRange;
      const scale = fov / Math.max(1, fov + perspectiveDistance + z);
      particle.screenX = cx + Math.cos(particle.angle) * particle.radius * scale;
      particle.screenY = cy + particle.y * scale;
      particle.projectedScale = scale;
    }

    particles.sort((a, b) => a.projectedScale - b.projectedScale);
    ctx!.fillStyle = particleColor.value;
    for (const particle of particles) {
      const radius = Math.max(0, particle.size * particle.projectedScale);
      if (radius <= 0) continue;
      ctx!.beginPath();
      ctx!.globalAlpha = particle.opacity;
      ctx!.arc(particle.screenX, particle.screenY, radius, 0, Math.PI * 2);
      ctx!.fill();
    }
    ctx!.globalAlpha = 1;
    if (!reducedMotion) requestFrame();
  }

  function resize(force = false) {
    const rect = canvas!.getBoundingClientRect();
    const nextWidth = Math.max(1, Math.round(rect.width));
    const nextHeight = Math.max(1, Math.round(rect.height));
    const nextDpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    const nextMobile = window.innerWidth < 768;
    if (
      !force &&
      nextWidth === width &&
      nextHeight === height &&
      nextDpr === dpr &&
      nextMobile === mobile
    )
      return;
    width = nextWidth;
    height = nextHeight;
    dpr = nextDpr;
    mobile = nextMobile;
    canvas!.width = Math.round(width * dpr);
    canvas!.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = mobile ? Math.round(props.quantity * 0.2) : props.quantity;
    particles = Array.from({ length: Math.max(0, count) }, spawnParticle);
    requestFrame();
  }

  function onResize() {
    resize();
  }

  function onVisibilityChange() {
    hidden = document.hidden;
    if (hidden) cancelFrame();
    else requestFrame();
  }

  function onMotionChange() {
    reducedMotion = motionQuery.matches;
    requestFrame();
  }

  const resizeObserver =
    typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
  resizeObserver?.observe(canvas);
  const intersectionObserver =
    typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(
          ([entry]) => {
            if (!entry) return;
            visible = entry.isIntersecting;
            if (visible) requestFrame();
            else cancelFrame();
          },
          { threshold: 0 },
        )
      : null;
  intersectionObserver?.observe(canvas);
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibilityChange);
  motionQuery.addEventListener("change", onMotionChange);
  const stopConfigurationWatch = watch(
    () => [props.quantity, props.size, props.opacity, props.drift, props.depth],
    () => resize(true),
  );
  const stopColorWatch = watch(particleColor, requestFrame);
  resize(true);

  cleanup = () => {
    active = false;
    cancelFrame();
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    motionQuery.removeEventListener("change", onMotionChange);
    stopConfigurationWatch();
    stopColorWatch();
  };
});

onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <canvas
    ref="canvasRef"
    aria-hidden="true"
    :class="cn('pointer-events-none absolute inset-0 h-full w-full', props.className)"
  />
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import Floating3DParticles from "@/components/spark-ui/floating-3d-particles/floating-3d-particles.vue";
</script>

<template>
  <div
    class="relative flex h-[500px] items-center justify-center overflow-hidden rounded-lg border"
  >
    <Floating3DParticles color="#8B5CF6" :quantity="400" :depth="0.5" />
    <h2 class="relative z-10 text-3xl font-bold">Build something magical</h2>
  </div>
</template>
```

## Props

| Prop        | Type     | Default     | Description                                                                             |
| ----------- | -------- | ----------- | --------------------------------------------------------------------------------------- |
| `className` | `string` | —           | Extra canvas classes. Native `class` also works.                                        |
| `quantity`  | `number` | `400`       | Particle count on viewports at least 768 pixels wide.                                   |
| `color`     | `string` | `"#8B5CF6"` | Particle color as a three-digit or six-digit hex string.                                |
| `size`      | `number` | `5`         | Mean radius in pixels, with random variation of 40 percent.                             |
| `opacity`   | `number` | `0.3`       | Mean opacity, with random variation of 0.2 and limits of zero and one.                  |
| `drift`     | `number` | `0.8`       | Vertical speed in pixels per frame. Positive values move up. Negative values move down. |
| `depth`     | `number` | `0.5`       | Depth intensity from zero for a flat plane to one for strong perspective.               |

## Behavior

Place the canvas inside a positioned container with an explicit height. Put content in a sibling with `relative z-10` to display it above the particles.

Perspective projection scales particles based on their simulated distance. The canvas draws distant particles before nearby particles. Particles wrap to the opposite vertical edge for either drift direction.

On viewports below 768 pixels, the count becomes `Math.round(quantity * 0.2)`. Canvas dimensions follow the container and the device pixel ratio, capped at two.

Changes to quantity, size, opacity, drift, or depth create a new particle field. Color changes repaint the existing field without moving its particles. Invalid hex colors use the default violet.

The animation pauses when the canvas leaves the viewport or the document is hidden. A reduced-motion preference displays a static frame and redraws only when needed.

The component creates browser resources after mounting. It cancels the animation frame, disconnects observers, and removes listeners and watchers when it unmounts.

Standard canvas attributes and styles pass to the root element. Do not set canvas `width` or `height` attributes because the component manages the drawing resolution. Set its CSS dimensions instead.

## Source

This component is a Vue port of [Magic UI Floating 3D Particles](https://magicui.design/docs/components/floating-3d-particles).
The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/floating-3d-particles.tsx) defines the original behavior.
