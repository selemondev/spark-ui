<script setup lang="ts">
import { computed } from "vue";

interface AuroraTextProps {
  className?: string;
  colors?: string[];
  speed?: number;
}
const props = withDefaults(defineProps<AuroraTextProps>(), {
  colors: () => ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
  speed: 1,
});
const gradientStyle = computed(() => ({
  backgroundImage: `linear-gradient(135deg, ${props.colors.join(", ")}, ${props.colors[0]})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animationDuration: `${10 / props.speed}s`,
}));
</script>

<template>
  <span :class="`relative inline-block ${props.className}`">
    <span class="sr-only">
      <slot />
    </span>
    <span
      class="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
      :style="gradientStyle"
      aria-hidden="true"
    >
      <slot />
    </span>
  </span>
</template>
