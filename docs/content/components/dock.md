# Dock

An implementation of the macOS dock with a cursor-distance-based icon magnification effect.

<demo src="../../src/example/dock/demo.vue" srcCode="../../src/spark-ui-demos/dock/dock.vue" />

## Installation

Copy the following files into `src/components/spark-ui/dock/`:

::: code-group

```vue [dock.vue]
<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { cn } from "@/lib/utils";

interface DockProps {
  class?: string;
  iconSize?: number;
  iconMagnification?: number;
  disableMagnification?: boolean;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
}

const props = withDefaults(defineProps<DockProps>(), {
  iconSize: 40,
  iconMagnification: 60,
  disableMagnification: false,
  iconDistance: 140,
  direction: "middle",
});

const mouseX = ref(Number.POSITIVE_INFINITY);

const dockConfig = computed(() => ({
  size: props.iconSize,
  magnification: props.iconMagnification,
  disableMagnification: props.disableMagnification,
  distance: props.iconDistance,
}));

provide("dockMouseX", mouseX);
provide("dockConfig", dockConfig);

function onMouseMove(e: MouseEvent) {
  mouseX.value = e.clientX;
}

function onMouseLeave() {
  mouseX.value = Number.POSITIVE_INFINITY;
}
</script>

<template>
  <div
    :class="
      cn(
        'supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border border-solid border-neutral-200 dark:border-neutral-800 p-2 backdrop-blur-md',
        {
          'items-start': props.direction === 'top',
          'items-center': props.direction === 'middle',
          'items-end': props.direction === 'bottom',
        },
        props.class,
      )
    "
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </div>
</template>
```

```vue [dock-icon.vue]
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
import { cn } from "@/lib/utils";

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
    nextV = e * ((b * wd - zeta * w0 * a) * cos - (a * wd + zeta * w0 * b) * sin);
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
```

:::

## Usage

```vue
<script setup lang="ts">
import Dock from "@/components/spark-ui/dock/dock.vue";
import DockIcon from "@/components/spark-ui/dock/dock-icon.vue";
</script>

<template>
  <Dock>
    <DockIcon>
      <!-- icon -->
    </DockIcon>
    <DockIcon>
      <!-- icon -->
    </DockIcon>
    <DockIcon>
      <!-- icon -->
    </DockIcon>
  </Dock>
</template>
```

## Examples

The direction and magnification examples import `./brand-icons.vue`. Save this complete helper beside your copied example component:

```vue [brand-icons.vue]
<script setup lang="ts">
defineProps<{
  name: "github" | "googleDrive" | "notion" | "whatsapp";
  class?: string;
}>();
</script>

<template>
  <svg v-if="name === 'github'" viewBox="0 0 438.549 438.549" :class="$props.class">
    <path
      fill="currentColor"
      d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
    />
  </svg>
  <svg
    v-else-if="name === 'googleDrive'"
    viewBox="0 0 87.3 78"
    xmlns="http://www.w3.org/2000/svg"
    :class="$props.class"
  >
    <path
      d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
      fill="#0066da"
    />
    <path
      d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
      fill="#00ac47"
    />
    <path
      d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
      fill="#ea4335"
    />
    <path
      d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
      fill="#00832d"
    />
    <path
      d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
      fill="#2684fc"
    />
    <path
      d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
      fill="#ffba00"
    />
  </svg>
  <svg
    v-else-if="name === 'notion'"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="$props.class"
  >
    <path
      d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
      fill="#fff"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
      fill="#000"
    />
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 175.216 175.552"
    :class="$props.class"
  >
    <defs>
      <linearGradient
        id="dock-wa-b"
        x1="85.915"
        x2="86.535"
        y1="32.567"
        y2="137.092"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#57d163" />
        <stop offset="1" stop-color="#23b33a" />
      </linearGradient>
      <filter
        id="dock-wa-a"
        width="1.115"
        height="1.114"
        x="-.057"
        y="-.057"
        color-interpolation-filters="sRGB"
      >
        <feGaussianBlur stdDeviation="3.531" />
      </filter>
    </defs>
    <path
      fill="#b3b3b3"
      d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
      filter="url(#dock-wa-a)"
    />
    <path
      fill="#fff"
      d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
    />
    <path
      fill="url(#dock-wa-b)"
      d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
    />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
    />
  </svg>
</template>
```

### Custom Direction

<demo src="../../src/example/dock/direction-demo.vue" srcCode="../../src/spark-ui-demos/dock/direction-dock.vue" />

### Custom Magnification

<demo src="../../src/example/dock/magnification-demo.vue" srcCode="../../src/spark-ui-demos/dock/magnification-dock.vue" />

## Props

### Dock

| Prop                   | Type                            | Default    | Description                            |
| ---------------------- | ------------------------------- | ---------- | -------------------------------------- |
| `class`                | `string`                        | `-`        | Custom CSS class for styling.          |
| `iconSize`             | `number`                        | `40`       | Base size of the icons.                |
| `iconMagnification`    | `number`                        | `60`       | Level of icon magnification on hover.  |
| `disableMagnification` | `boolean`                       | `false`    | Disable the magnification effect.      |
| `iconDistance`         | `number`                        | `140`      | Distance from cursor to magnify icons. |
| `direction`            | `"top" \| "middle" \| "bottom"` | `"middle"` | Vertical alignment of the dock icons.  |

### Dock Slots

| Slot      | Description                            |
| --------- | -------------------------------------- |
| `default` | The dock icons (typically `DockIcon`). |

### DockIcon

Per-icon overrides. When omitted, the values are inherited from the parent `Dock` via provide/inject.

| Prop                   | Type      | Default | Description                           |
| ---------------------- | --------- | ------- | ------------------------------------- |
| `size`                 | `number`  | `40`    | Base size of the icon.                |
| `magnification`        | `number`  | `60`    | Level of icon magnification on hover. |
| `disableMagnification` | `boolean` | `false` | Disable the magnification effect.     |
| `distance`             | `number`  | `140`   | Distance from cursor to magnify icon. |
| `class`                | `string`  | `-`     | Custom CSS class for styling.         |

### DockIcon Slots

| Slot      | Description              |
| --------- | ------------------------ |
| `default` | The content of the icon. |

## Credits

- Credits to [Magic UI](https://magicui.design/docs/components/dock) for the original React implementation.
- Credits to [Build UI](https://buildui.com/recipes/magnified-dock) for this fantastic component.
