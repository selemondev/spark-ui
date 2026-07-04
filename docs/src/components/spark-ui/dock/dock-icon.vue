<script setup lang="ts">
import {
  computed,
  type ComputedRef,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  type Ref,
  watch,
} from "vue";
import { cn } from "../../../lib/utils";

interface DockConfig {
  size: number;
  magnification: number;
  disableMagnification: boolean;
  distance: number;
}

interface DockIconProps {
  size?: number;
  magnification?: number;
  disableMagnification?: boolean;
  distance?: number;
  class?: string;
}

const props = defineProps<DockIconProps>();

const injectedMouseX = inject<Ref<number>>("dockMouseX", ref(Number.POSITIVE_INFINITY));
const injectedConfig = inject<ComputedRef<DockConfig> | undefined>("dockConfig", undefined);

const config = computed<DockConfig>(() => ({
  size: props.size ?? injectedConfig?.value.size ?? 40,
  magnification: props.magnification ?? injectedConfig?.value.magnification ?? 60,
  disableMagnification:
    props.disableMagnification ?? injectedConfig?.value.disableMagnification ?? false,
  distance: props.distance ?? injectedConfig?.value.distance ?? 140,
}));

const iconRef = ref<HTMLDivElement | null>(null);

const padding = computed(() => Math.max(6, config.value.size * 0.2));

// Animated width/height driven by a spring (mass 0.1, stiffness 150, damping 12)
// to mirror framer-motion's useSpring feel. Instead of an explicit-Euler
// integrator (which diverges for these stiff params at a 1/60 s step), we
// advance the spring with its exact closed-form solution, so it stays stable
// for any real-frame delta.
const SPRING_MASS = 0.1;
const SPRING_STIFFNESS = 150;
const SPRING_DAMPING = 12;

const width = ref(config.value.size);
let velocity = 0;
let frame: number | null = null;
let lastTime = 0;

function computeTarget(): number {
  const { size, magnification, disableMagnification, distance } = config.value;
  const targetSize = disableMagnification ? size : magnification;
  const el = iconRef.value;
  if (!el) return size;

  const bounds = el.getBoundingClientRect();
  const delta = injectedMouseX.value - bounds.x - bounds.width / 2;

  // Equivalent to framer's useTransform with clamping across
  // [-distance, 0, distance] -> [size, targetSize, size].
  if (delta <= -distance || delta >= distance || !Number.isFinite(delta)) {
    return size;
  }
  const progress = 1 - Math.abs(delta) / distance;
  return size + (targetSize - size) * progress;
}

// Advance a damped harmonic oscillator (spring toward `target`) by `dt`
// seconds using its exact analytic solution. Handles under-, critically- and
// over-damped regimes; unconditionally stable for any dt.
function stepSpring(
  current: number,
  target: number,
  v: number,
  dt: number,
): { position: number; velocity: number } {
  const w0 = Math.sqrt(SPRING_STIFFNESS / SPRING_MASS);
  const zeta = SPRING_DAMPING / (2 * Math.sqrt(SPRING_STIFFNESS * SPRING_MASS));
  const x0 = current - target;

  let position: number;
  let nextV: number;

  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    const e = Math.exp(-zeta * w0 * dt);
    const cos = Math.cos(wd * dt);
    const sin = Math.sin(wd * dt);
    const a = x0;
    const b = (v + zeta * w0 * x0) / wd;
    position = e * (a * cos + b * sin);
    nextV =
      e * ((b * wd - zeta * w0 * a) * cos - (a * wd + zeta * w0 * b) * sin);
  } else if (zeta === 1) {
    const e = Math.exp(-w0 * dt);
    const a = x0;
    const b = v + w0 * x0;
    position = (a + b * dt) * e;
    nextV = (b - w0 * (a + b * dt)) * e;
  } else {
    const s = w0 * Math.sqrt(zeta * zeta - 1);
    const r1 = -zeta * w0 + s;
    const r2 = -zeta * w0 - s;
    const c1 = (v - r2 * x0) / (r1 - r2);
    const c2 = x0 - c1;
    const e1 = Math.exp(r1 * dt);
    const e2 = Math.exp(r2 * dt);
    position = c1 * e1 + c2 * e2;
    nextV = c1 * r1 * e1 + c2 * r2 * e2;
  }

  return { position: position + target, velocity: nextV };
}

function tick(now: number) {
  if (!lastTime) lastTime = now;
  // Clamp the step so a backgrounded tab (huge delta) can't jump the spring.
  let dt = (now - lastTime) / 1000;
  lastTime = now;
  if (dt <= 0) {
    frame = requestAnimationFrame(tick);
    return;
  }
  if (dt > 1 / 30) dt = 1 / 30;

  const target = computeTarget();
  const next = stepSpring(width.value, target, velocity, dt);
  velocity = next.velocity;

  // Guard against any numerical drift: width never leaves [size, magnification].
  const lo = Math.min(config.value.size, config.value.magnification);
  const hi = Math.max(config.value.size, config.value.magnification);
  width.value = Math.min(hi, Math.max(lo, next.position));

  if (Math.abs(velocity) < 0.01 && Math.abs(width.value - target) < 0.01) {
    width.value = target;
    velocity = 0;
    frame = null;
    lastTime = 0;
    return;
  }
  frame = requestAnimationFrame(tick);
}

function ensureRunning() {
  if (frame == null && typeof requestAnimationFrame !== "undefined") {
    lastTime = 0;
    frame = requestAnimationFrame(tick);
  }
}

watch(
  [injectedMouseX, config],
  () => {
    ensureRunning();
  },
  { deep: true },
);

onMounted(() => {
  width.value = config.value.size;
});

onBeforeUnmount(() => {
  if (frame != null) {
    cancelAnimationFrame(frame);
    frame = null;
  }
});

const style = computed(() => ({
  width: `${width.value}px`,
  height: `${width.value}px`,
  padding: `${padding.value}px`,
}));
</script>

<template>
  <div
    ref="iconRef"
    :style="style"
    :class="
      cn(
        'flex aspect-square cursor-pointer items-center justify-center rounded-full',
        config.disableMagnification && 'hover:bg-muted-foreground transition-colors',
        props.class,
      )
    "
  >
    <div>
      <slot />
    </div>
  </div>
</template>
