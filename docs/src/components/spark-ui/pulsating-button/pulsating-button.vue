<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { cn } from "../../../lib/utils";

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
