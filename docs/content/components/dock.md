# Dock

An implementation of the macOS dock with a cursor-distance-based icon magnification effect.

<demo src="../../src/example/dock/demo.vue" srcCode="../../src/spark-ui-demos/dock/dock.vue" />

## Installation

Copy and paste the following code into your project:

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
  mouseX.value = e.pageX;
}

function onMouseLeave() {
  mouseX.value = Number.POSITIVE_INFINITY;
}
</script>

<template>
  <div
    :class="
      cn(
        'supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md',
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

### Custom Direction

<demo src="../../src/example/dock/direction-demo.vue" srcCode="../../src/spark-ui-demos/dock/direction-dock.vue" />

### Custom Magnification

<demo src="../../src/example/dock/magnification-demo.vue" srcCode="../../src/spark-ui-demos/dock/magnification-dock.vue" />

## Props

### Dock

| Prop                   | Type                            | Default    | Description                             |
| ---------------------- | ------------------------------- | ---------- | --------------------------------------- |
| `class`                | `string`                        | `-`        | Custom CSS class for styling.           |
| `iconSize`             | `number`                        | `40`       | Base size of the icons.                 |
| `iconMagnification`    | `number`                        | `60`       | Level of icon magnification on hover.   |
| `disableMagnification` | `boolean`                       | `false`    | Disable the magnification effect.       |
| `iconDistance`         | `number`                        | `140`      | Distance from cursor to magnify icons.  |
| `direction`            | `"top" \| "middle" \| "bottom"` | `"middle"` | Vertical alignment of the dock icons.   |

### Dock Slots

| Slot      | Description                                  |
| --------- | ------------------------------------------- |
| `default` | The dock icons (typically `DockIcon`).      |

### DockIcon

Per-icon overrides. When omitted, the values are inherited from the parent `Dock` via provide/inject.

| Prop                   | Type      | Default | Description                            |
| ---------------------- | --------- | ------- | -------------------------------------- |
| `size`                 | `number`  | `40`    | Base size of the icon.                 |
| `magnification`        | `number`  | `60`    | Level of icon magnification on hover.  |
| `disableMagnification` | `boolean` | `false` | Disable the magnification effect.      |
| `distance`             | `number`  | `140`   | Distance from cursor to magnify icon.  |
| `class`                | `string`  | `-`     | Custom CSS class for styling.          |

### DockIcon Slots

| Slot      | Description                        |
| --------- | --------------------------------- |
| `default` | The content of the icon.          |

## Credits

- Credits to [Magic UI](https://magicui.design/docs/components/dock) for the original React implementation.
- Credits to [Build UI](https://buildui.com/recipes/magnified-dock) for this fantastic component.
