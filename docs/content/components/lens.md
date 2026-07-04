# Lens

An interactive component that enables zooming into images, videos and other elements with a magnifying lens.

<demo src="../../src/example/lens/demo.vue" srcCode="../../src/spark-ui-demos/lens/demo.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [lens.vue]
<script setup lang="ts">
import { computed, ref } from "vue";
import { cn } from "@/lib/utils";

interface Position {
  x: number;
  y: number;
}

interface LensProps {
  class?: string;
  zoomFactor?: number;
  lensSize?: number;
  position?: Position;
  defaultPosition?: Position;
  isStatic?: boolean;
  duration?: number;
  lensColor?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<LensProps>(), {
  zoomFactor: 1.3,
  lensSize: 170,
  position: () => ({ x: 0, y: 0 }),
  isStatic: false,
  duration: 0.1,
  lensColor: "black",
  ariaLabel: "Zoom Area",
});

if (props.zoomFactor < 1) {
  throw new Error("zoomFactor must be greater than 1");
}
if (props.lensSize < 0) {
  throw new Error("lensSize must be greater than 0");
}

const isHovering = ref(false);
const mousePosition = ref<Position>({ ...props.position });

const currentPosition = computed<Position>(() => {
  if (props.isStatic) return props.position;
  if (props.defaultPosition && !isHovering.value) return props.defaultPosition;
  return mousePosition.value;
});

const maskImage = computed(
  () =>
    `radial-gradient(circle ${props.lensSize / 2}px at ${currentPosition.value.x}px ${currentPosition.value.y}px, ${props.lensColor} 100%, transparent 100%)`,
);

const lensContentStyle = computed(() => ({
  maskImage: maskImage.value,
  WebkitMaskImage: maskImage.value,
  transformOrigin: `${currentPosition.value.x}px ${currentPosition.value.y}px`,
  zIndex: 50,
  "--lens-duration": `${props.duration}s`,
}));

const zoomStyle = computed(() => ({
  transform: `scale(${props.zoomFactor})`,
  transformOrigin: `${currentPosition.value.x}px ${currentPosition.value.y}px`,
}));

function handleMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  mousePosition.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape") isHovering.value = false;
}

const showStatic = computed(() => props.isStatic || Boolean(props.defaultPosition));
</script>

<template>
  <div
    :class="cn('relative z-20 overflow-hidden rounded-xl', props.class)"
    role="region"
    :aria-label="props.ariaLabel"
    :tabindex="0"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @mousemove="handleMouseMove"
    @keydown="handleKeyDown"
  >
    <slot />

    <div
      v-if="showStatic"
      class="absolute inset-0 overflow-hidden"
      :style="lensContentStyle"
    >
      <div class="absolute inset-0" :style="zoomStyle">
        <slot />
      </div>
    </div>

    <Transition v-else name="lens">
      <div
        v-if="isHovering"
        class="absolute inset-0 overflow-hidden"
        :style="lensContentStyle"
      >
        <div class="absolute inset-0" :style="zoomStyle">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lens-enter-active,
.lens-leave-active {
  transition:
    opacity var(--lens-duration, 0.1s) ease,
    transform var(--lens-duration, 0.1s) ease;
}
.lens-enter-from {
  opacity: 0;
  transform: scale(0.58);
}
.lens-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
```

:::

## Usage

```vue
<script setup lang="ts">
import Lens from "@/components/spark-ui/lens/lens.vue";
</script>

<template>
  <Lens>
    <img src="/images/lens-demo.jpg" alt="Lens Demo" />
  </Lens>
</template>
```

## Examples

### Static Lens

Set `is-static` with a fixed `position` to render the lens in place without following the cursor.

<demo src="../../src/example/lens/static-demo.vue" srcCode="../../src/spark-ui-demos/lens/static-demo.vue" />

### Lens with a Default Position

Provide a `default-position` so the lens starts in a given spot and follows the cursor on hover.

<demo src="../../src/example/lens/default-position-demo.vue" srcCode="../../src/spark-ui-demos/lens/default-position-demo.vue" />

## Props

| Prop              | Type       | Default          | Description                                                    |
| ----------------- | ---------- | ---------------- | -------------------------------------------------------------- |
| `zoomFactor`      | `number`   | `1.3`            | The magnification factor of the lens (must be greater than 1). |
| `lensSize`        | `number`   | `170`            | The size of the lens in pixels (works as a diameter).          |
| `position`        | `Position` | `{ x: 0, y: 0 }` | The current position of the lens (used with `isStatic`).       |
| `defaultPosition` | `Position` | `undefined`      | The initial position of the lens before hovering.              |
| `isStatic`        | `boolean`  | `false`          | Determines if the lens remains in a fixed position.            |
| `duration`        | `number`   | `0.1`            | Duration of the fade animation when the lens appears (seconds).|
| `lensColor`       | `string`   | `"black"`        | The color of the lens mask (CSS color value).                  |
| `ariaLabel`       | `string`   | `"Zoom Area"`    | Accessibility label for the lens region.                       |
| `class`           | `string`   | `undefined`      | Additional classes merged onto the container.                  |

## Slots

| Slot      | Description                                        |
| --------- | -------------------------------------------------- |
| `default` | The content that will be magnified by the lens.    |
