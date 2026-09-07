<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../../lib/utils";

interface ShineBorderProps {
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
  className?: string;
}

const props = withDefaults(defineProps<ShineBorderProps>(), {
  borderWidth: 1,
  duration: 14,
  shineColor: "#000000",
});

const borderStyle = computed(() => ({
  "--border-width": `${props.borderWidth}px`,
  "--duration": `${props.duration}s`,
  backgroundImage: `radial-gradient(transparent, transparent, ${Array.isArray(props.shineColor) ? props.shineColor.join(",") : props.shineColor}, transparent, transparent)`,
}));
</script>

<template>
  <div
    aria-hidden="true"
    :class="
      cn(
        'shine-border pointer-events-none absolute inset-0 h-full w-full rounded-[inherit] will-change-[background-position]',
        props.className,
      )
    "
    :style="borderStyle"
  />
</template>

<style scoped>
.shine-border {
  padding: var(--border-width);
  background-size: 300% 300%;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

@media (prefers-reduced-motion: no-preference) {
  .shine-border {
    animation: shine var(--duration) infinite linear;
  }
}

@keyframes shine {
  0%,
  100% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
}
</style>
