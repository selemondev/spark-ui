# Pulsating Button

A button with a repeating pulse or an expanding ring.

<demo src="../../src/example/pulsating-button/demo.vue" srcCode="../../src/spark-ui-demos/pulsating-button/demo.vue" />

## Installation

Copy the component below into `src/components/spark-ui/pulsating-button/pulsating-button.vue`.
The animation styles are part of the component. No global CSS is needed.

::: code-group

```vue [pulsating-button.vue]
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { cn } from "@/lib/utils";

interface PulsatingButtonProps {
  class?: string;
  pulseColor?: string;
  duration?: string;
  distance?: string;
  variant?: "pulse" | "ripple";
}

const props = withDefaults(defineProps<PulsatingButtonProps>(), {
  duration: "1.5s",
  distance: "8px",
  variant: "pulse",
});

const button = ref<HTMLButtonElement | null>(null);
const background = ref("transparent");
let stopSync: (() => void) | undefined;

onMounted(() => {
  stopSync = watch(
    () => props.pulseColor,
    (color, _, onCleanup) => {
      const element = button.value;
      if (!element || color) return;

      let frame = 0;
      const updateBackground = () => {
        frame = 0;
        background.value = getComputedStyle(element).backgroundColor;
      };
      const scheduleUpdate = () => {
        if (!frame) frame = requestAnimationFrame(updateBackground);
      };
      const events = ["blur", "focus", "pointerenter", "pointerleave", "transitionend"] as const;
      const observer = new MutationObserver(scheduleUpdate);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "style"],
      });
      observer.observe(element, { attributes: true });
      events.forEach((event) => element.addEventListener(event, scheduleUpdate));
      updateBackground();

      onCleanup(() => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        events.forEach((event) => element.removeEventListener(event, scheduleUpdate));
      });
    },
    { immediate: true },
  );
});

onBeforeUnmount(() => stopSync?.());
defineExpose({ button });
</script>

<template>
  <button
    ref="button"
    type="button"
    :class="
      cn(
        'relative flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 text-center text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        props.class,
      )
    "
    :style="{
      '--pulse-color': props.pulseColor,
      '--duration': props.duration,
      '--distance': props.distance,
      '--bg': background,
    }"
  >
    <span class="relative z-10"><slot /></span>
    <span
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-[inherit] bg-inherit"
      :class="props.variant === 'pulse' ? 'pulse' : 'pulse-ripple'"
    />
  </button>
</template>

<style scoped>
.pulse {
  animation: pulse var(--duration) ease-out infinite;
}
.pulse-ripple {
  animation: pulse-ripple var(--duration) cubic-bezier(0.16, 1, 0.3, 1) infinite;
}
@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 var(--pulse-color, oklch(from var(--bg) l c h / 0.5));
  }
  50% {
    box-shadow: 0 0 0 var(--distance) var(--pulse-color, oklch(from var(--bg) l c h / 0.5));
  }
}
@keyframes pulse-ripple {
  0% {
    box-shadow: 0 0 0 0 oklch(from var(--pulse-color, var(--bg)) l c h / 1);
  }
  100% {
    box-shadow: 0 0 0 var(--distance) oklch(from var(--pulse-color, var(--bg)) l c h / 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .pulse,
  .pulse-ripple {
    animation: none;
  }
}
</style>
```

:::

## Usage

```vue
<script setup lang="ts">
import PulsatingButton from "@/components/spark-ui/pulsating-button/pulsating-button.vue";
</script>

<template>
  <PulsatingButton>Join Affiliate Program</PulsatingButton>
  <PulsatingButton variant="ripple" pulse-color="#2563eb" duration="2s" distance="12px">
    Get started
  </PulsatingButton>
</template>
```

## Behavior

The default slot holds the button content. Use `variant="ripple"` for a ring that expands and fades.
If `pulseColor` is absent, the component reads the button background color. It updates the color after theme and button changes.
The component removes its observers, listeners, and pending animation frame when it unmounts.

Native attributes and listeners reach the button, including `disabled`, `type`, `name`, `aria-label`, and `@click`.
The default type is `button`. Set `type="submit"` to submit a form.
Enter and Space activate the focused button. A disabled button does not activate.
The animation stops when the user requests reduced motion.

## Props

| Prop         | Type                  | Default           | Description                      |
| ------------ | --------------------- | ----------------- | -------------------------------- |
| `class`      | `string`              | None              | Extra button classes.            |
| `pulseColor` | `string`              | Button background | Any CSS color for the pulse.     |
| `duration`   | `string`              | `"1.5s"`          | Time for one animation cycle.    |
| `distance`   | `string`              | `"8px"`           | Distance that the pulse expands. |
| `variant`    | `"pulse" \| "ripple"` | `"pulse"`         | Animation style.                 |

## Source

Ported from [Magic UI Pulsating Button](https://magicui.design/docs/components/pulsating-button).
The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/pulsating-button.tsx) defines the button behavior.
