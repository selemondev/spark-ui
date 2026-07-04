<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed } from "vue";
import { cn } from "../../../lib/utils";

interface ComicTextProps {
  class?: string;
  style?: CSSProperties;
  fontSize?: number;
}

const props = withDefaults(defineProps<ComicTextProps>(), {
  fontSize: 5,
});

const dotColor = "#EF4444";
const backgroundColor = "#FACC15";

const comicStyle = computed<CSSProperties>(() => ({
  fontSize: `${props.fontSize}rem`,
  fontFamily: "'Bangers', 'Comic Sans MS', 'Impact', sans-serif",
  fontWeight: "900",
  WebkitTextStroke: `${props.fontSize * 0.35}px #000000`,
  transform: "skewX(-10deg)",
  textTransform: "uppercase",
  filter: `
    drop-shadow(5px 5px 0px #000000)
    drop-shadow(3px 3px 0px ${dotColor})
  `,
  backgroundColor,
  backgroundImage: `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 0)`,
  backgroundSize: "8px 8px",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  ...props.style,
}));
</script>

<template>
  <div :class="cn('animate-comic-text text-center select-none', props.class)" :style="comicStyle">
    <slot />
  </div>
</template>
