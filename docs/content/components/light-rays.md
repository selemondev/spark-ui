# Light Rays

A component with animated light rays which shine down from above, filling any container with a soft ambient glow.

<demo src="../../src/example/light-rays/demo.vue" srcCode="../../src/spark-ui-demos/light-rays/light-rays.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [light-rays.vue]
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { cn } from "@/lib/utils";

interface LightRaysProps {
  class?: string;
  count?: number;
  color?: string;
  blur?: number;
  speed?: number;
  length?: string;
  [key: string]: any;
}

interface LightRay {
  id: string;
  left: number;
  rotate: number;
  width: number;
  swing: number;
  delay: number;
  duration: number;
  intensity: number;
}

const props = withDefaults(defineProps<LightRaysProps>(), {
  count: 7,
  color: "rgba(160, 210, 255, 0.2)",
  blur: 36,
  speed: 14,
  length: "70vh",
});

const cycleDuration = computed(() => Math.max(props.speed, 0.1));

const createRays = (count: number, cycle: number): LightRay[] => {
  if (count <= 0) return [];

  return Array.from({ length: count }, (_, index) => {
    const left = 8 + Math.random() * 84;
    const rotate = -28 + Math.random() * 56;
    const width = 160 + Math.random() * 160;
    const swing = 0.8 + Math.random() * 1.8;
    const delay = Math.random() * cycle;
    const duration = cycle * (0.75 + Math.random() * 0.5);
    const intensity = 0.6 + Math.random() * 0.5;

    return {
      id: `${index}-${Math.round(left * 10)}`,
      left,
      rotate,
      width,
      swing,
      delay,
      duration,
      intensity,
    };
  });
};

const rays = ref<LightRay[]>([]);

onMounted(() => {
  rays.value = createRays(props.count, cycleDuration.value);
});

watch([() => props.count, cycleDuration], ([count, cycle]) => {
  rays.value = createRays(count, cycle);
});

const wrapperStyle = computed(() => ({
  "--light-rays-color": props.color,
  "--light-rays-blur": `${props.blur}px`,
  "--light-rays-length": props.length,
}));

const rayStyle = (ray: LightRay) => ({
  "--ray-left": `${ray.left}%`,
  "--ray-width": `${ray.width}px`,
  "--ray-rotate": `${ray.rotate}deg`,
  "--ray-swing": `${ray.swing}deg`,
  "--ray-intensity": `${ray.intensity}`,
  // Total animation time folds motion's repeatDelay (duration * 0.1) into the cycle.
  "--ray-duration": `${ray.duration * 1.1}s`,
  "--ray-delay": `${ray.delay}s`,
});
</script>

<template>
  <div
    :class="
      cn(
        'pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]',
        props.class,
      )
    "
    :style="wrapperStyle"
    v-bind="$attrs"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        aria-hidden="true"
        class="absolute inset-0 opacity-60"
        style="
          background: radial-gradient(
            circle at 20% 15%,
            color-mix(in srgb, var(--light-rays-color) 45%, transparent),
            transparent 70%
          );
        "
      />
      <div
        aria-hidden="true"
        class="absolute inset-0 opacity-60"
        style="
          background: radial-gradient(
            circle at 80% 10%,
            color-mix(in srgb, var(--light-rays-color) 35%, transparent),
            transparent 75%
          );
        "
      />
      <div v-for="ray in rays" :key="ray.id" class="light-ray" :style="rayStyle(ray)" />
    </div>
  </div>
</template>

<style scoped>
.light-ray {
  pointer-events: none;
  position: absolute;
  top: -12%;
  left: var(--ray-left);
  height: var(--light-rays-length);
  width: var(--ray-width);
  transform-origin: top;
  border-radius: 9999px;
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--light-rays-color) 70%, transparent),
    transparent
  );
  opacity: 0;
  mix-blend-mode: screen;
  filter: blur(var(--light-rays-blur));
  animation: light-ray-swing var(--ray-duration) ease-in-out var(--ray-delay) infinite;
}

@keyframes light-ray-swing {
  0% {
    opacity: 0;
    transform: translateX(-50%) rotate(calc(var(--ray-rotate) - var(--ray-swing)));
  }
  45.45% {
    opacity: var(--ray-intensity);
    transform: translateX(-50%) rotate(calc(var(--ray-rotate) + var(--ray-swing)));
  }
  90.9% {
    opacity: 0;
    transform: translateX(-50%) rotate(calc(var(--ray-rotate) - var(--ray-swing)));
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) rotate(calc(var(--ray-rotate) - var(--ray-swing)));
  }
}
</style>
```

:::

## Usage

Place the component inside a `relative`, `overflow-hidden` container. It absolutely fills its parent, so give the parent an explicit height:

```vue
<template>
  <div class="relative h-[400px] w-full overflow-hidden rounded-xl border">
    <LightRays />
  </div>
</template>
```

## Props

| Prop     | Type     | Default                      | Description                                         |
| -------- | -------- | ---------------------------- | --------------------------------------------------- |
| `count`  | `number` | `7`                          | Total number of animated rays.                      |
| `color`  | `string` | `"rgba(160, 210, 255, 0.2)"` | Base colour used for the gradients.                 |
| `blur`   | `number` | `36`                         | Pixel radius applied to the blur filter.            |
| `speed`  | `number` | `14`                         | Average seconds each ray takes to complete a cycle. |
| `length` | `string` | `"70vh"`                     | CSS length for the ray height.                      |
| `class`  | `string` | `undefined`                  | Additional class names applied to the wrapper.      |
