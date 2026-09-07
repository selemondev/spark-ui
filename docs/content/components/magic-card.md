# Magic Card

A card with a pointer-following spotlight and a colored border.

<demo src="../../src/example/magic-card/demo.vue" srcCode="../../src/spark-ui-demos/magic-card/demo.vue" />

## Installation

Install `motion-v` before you copy the component.

Copy the file below into `src/components/spark-ui/magic-card/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [magic-card.vue]
<script setup lang="ts">
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion-v";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  class?: string;
  mode?: "gradient" | "orb";
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowFrom?: string;
  glowTo?: string;
  glowAngle?: number;
  glowSize?: number;
  glowBlur?: number;
  glowOpacity?: number;
}
const props = withDefaults(defineProps<MagicCardProps>(), {
  mode: "gradient",
  gradientSize: 200,
  gradientColor: "#262626",
  gradientOpacity: 0.8,
  gradientFrom: "#9E7AFF",
  gradientTo: "#FE8BBB",
  glowFrom: "#ee4f27",
  glowTo: "#6b21ef",
  glowAngle: 90,
  glowSize: 420,
  glowBlur: 60,
  glowOpacity: 0.9,
});
const hovered = ref(false);
const mouseX = useMotionValue(-props.gradientSize);
const mouseY = useMotionValue(-props.gradientSize);
const orbX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.6 });
const orbY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.6 });
const orbVisible = useSpring(0, { stiffness: 300, damping: 35 });
const borderBackground = useMotionTemplate`linear-gradient(hsl(var(--background, 0 0% 100%)) 0 0) padding-box, radial-gradient(var(--magic-size) circle at ${mouseX}px ${mouseY}px, var(--magic-from), var(--magic-to), hsl(var(--border, 0 0% 85%)) 100%) border-box`;
const spotlight = useMotionTemplate`radial-gradient(var(--magic-size) circle at ${mouseX}px ${mouseY}px, var(--magic-color), transparent 100%)`;

function reset() {
  hovered.value = false;
  orbVisible.set(0);
  mouseX.set(-props.gradientSize);
  mouseY.set(-props.gradientSize);
}
function move(event: PointerEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  mouseX.set(event.clientX - rect.left);
  mouseY.set(event.clientY - rect.top);
}
function enter(event: PointerEvent) {
  move(event);
  hovered.value = true;
  orbVisible.set(props.mode === "orb" ? props.glowOpacity : 0);
}
function leave() {
  hovered.value = false;
  orbVisible.set(0);
  if (props.mode === "gradient") reset();
}
function pointerOut(event: PointerEvent) {
  if (!event.relatedTarget) reset();
}
function visibilityChange() {
  if (document.visibilityState !== "visible") reset();
}
watch(
  () => [props.mode, props.glowOpacity],
  () => {
    orbVisible.set(hovered.value && props.mode === "orb" ? props.glowOpacity : 0);
  },
);
onMounted(() => {
  window.addEventListener("pointerout", pointerOut);
  window.addEventListener("blur", reset);
  document.addEventListener("visibilitychange", visibilityChange);
});
onBeforeUnmount(() => {
  window.removeEventListener("pointerout", pointerOut);
  window.removeEventListener("blur", reset);
  document.removeEventListener("visibilitychange", visibilityChange);
});
</script>

<template>
  <motion.div
    :class="
      cn(
        'relative isolate overflow-hidden rounded-[inherit] border border-solid border-transparent',
        props.class,
      )
    "
    :style="{
      background: borderBackground,
      '--magic-size': `${gradientSize}px`,
      '--magic-from': gradientFrom,
      '--magic-to': gradientTo,
      '--magic-color': gradientColor,
    }"
    @pointermove="move"
    @pointerenter="enter"
    @pointerleave="leave"
    @pointercancel="reset"
  >
    <div class="pointer-events-none absolute inset-px z-20 rounded-[inherit] bg-background" />
    <motion.div
      v-if="mode === 'gradient'"
      aria-hidden="true"
      class="pointer-events-none absolute inset-px z-30 rounded-[inherit] transition-opacity duration-300"
      :style="{ background: spotlight, opacity: hovered ? gradientOpacity : 0 }"
    />
    <motion.div
      v-else
      aria-hidden="true"
      class="magic-card-orb pointer-events-none absolute left-0 top-0 z-30"
      :style="{
        width: glowSize,
        height: glowSize,
        x: orbX,
        y: orbY,
        translateX: '-50%',
        translateY: '-50%',
        borderRadius: 9999,
        filter: `blur(${glowBlur}px)`,
        opacity: orbVisible,
        background: `linear-gradient(${glowAngle}deg, ${glowFrom}, ${glowTo})`,
        willChange: 'transform, opacity',
      }"
    />
    <div class="relative z-40"><slot /></div>
  </motion.div>
</template>

<style scoped>
.magic-card-orb {
  mix-blend-mode: multiply;
}
:global(.dark) .magic-card-orb {
  mix-blend-mode: screen;
}
</style>
```

:::

## Usage

```vue
<script setup lang="ts">
import MagicCard from "@/components/spark-ui/magic-card/magic-card.vue";
</script>

<template>
  <MagicCard class="rounded-xl">
    <div class="p-6">Move your pointer over this card.</div>
  </MagicCard>
</template>
```

## Behavior

The default slot holds the card content. `class` replaces the upstream `className` prop.

The gradient follows the pointer without delay. Orb mode uses a spring, a motion effect that eases toward the pointer. Both modes highlight the border.

The orb uses screen blending under a `.dark` ancestor and multiply blending in light mode. Colors use the existing `--background` and `--border` theme variables.

The effect resets when the pointer leaves the window, the window loses focus, or the page becomes hidden. The component removes its listeners on unmount. Gradient props only affect gradient mode. Glow props only affect orb mode.

## Props

| Prop              | Type                  | Default      | Description                        |
| ----------------- | --------------------- | ------------ | ---------------------------------- |
| `class`           | `string`              | —            | Classes for the card.              |
| `mode`            | `"gradient" \| "orb"` | `"gradient"` | The surface effect.                |
| `gradientSize`    | `number`              | `200`        | The gradient radius in pixels.     |
| `gradientColor`   | `string`              | `"#262626"`  | The spotlight color.               |
| `gradientOpacity` | `number`              | `0.8`        | The spotlight opacity.             |
| `gradientFrom`    | `string`              | `"#9E7AFF"`  | The first border color.            |
| `gradientTo`      | `string`              | `"#FE8BBB"`  | The second border color.           |
| `glowFrom`        | `string`              | `"#ee4f27"`  | The first orb color.               |
| `glowTo`          | `string`              | `"#6b21ef"`  | The second orb color.              |
| `glowAngle`       | `number`              | `90`         | The orb gradient angle in degrees. |
| `glowSize`        | `number`              | `420`        | The orb diameter in pixels.        |
| `glowBlur`        | `number`              | `60`         | The orb blur radius in pixels.     |
| `glowOpacity`     | `number`              | `0.9`        | The orb opacity while hovered.     |

## Source

Ported from [Magic UI Magic Card](https://magicui.design/docs/components/magic-card). The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/magic-card.tsx) uses the MIT license.
