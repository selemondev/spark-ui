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
// to mirror framer-motion's useSpring feel.
const width = ref(config.value.size);
let velocity = 0;
let frame: number | null = null;

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

function tick() {
  const target = computeTarget();
  const stiffness = 150;
  const damping = 12;
  const mass = 0.1;
  const dt = 1 / 60;

  const springForce = -stiffness * (width.value - target);
  const dampingForce = -damping * velocity;
  const acceleration = (springForce + dampingForce) / mass;

  velocity += acceleration * dt;
  width.value += velocity * dt;

  if (Math.abs(velocity) < 0.01 && Math.abs(width.value - target) < 0.01) {
    width.value = target;
    velocity = 0;
    frame = null;
    return;
  }
  frame = requestAnimationFrame(tick);
}

function ensureRunning() {
  if (frame == null && typeof requestAnimationFrame !== "undefined") {
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
