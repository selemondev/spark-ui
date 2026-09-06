<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../lib/utils";

interface GlareHoverProps {
  class?: string;
  width?: string;
  height?: string;
  background?: string;
  color?: string;
  opacity?: number;
  angle?: number;
  size?: number;
  duration?: number;
  playOnce?: boolean;
}

const props = withDefaults(defineProps<GlareHoverProps>(), {
  background: "#000",
  color: "#ffffff",
  opacity: 0.5,
  angle: -45,
  size: 250,
  duration: 650,
  playOnce: false,
});

function parseHEX(color: string, opacity: number): string {
  const hex = color.replace("#", "");
  const parse = (h: string) => Number.parseInt(h, 16);
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return `rgba(${parse(hex.slice(0, 2))},${parse(hex.slice(2, 4))},${parse(hex.slice(4, 6))},${opacity})`;
  }
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    return `rgba(${parse(hex[0] + hex[0])},${parse(hex[1] + hex[1])},${parse(hex[2] + hex[2])},${opacity})`;
  }
  return color;
}

const rgba = computed(() => parseHEX(props.color, props.opacity));

const cssVars = computed(() => ({
  "--gh-angle": `${props.angle}deg`,
  "--gh-duration": `${props.duration}ms`,
  "--gh-size": `${props.size}%`,
  "--gh-rgba": rgba.value,
  background: props.background,
  ...(props.width !== undefined ? { width: props.width } : {}),
  ...(props.height !== undefined ? { height: props.height } : {}),
}));

const rootClass = computed(() =>
  cn(
    "relative grid w-fit h-fit cursor-pointer place-items-center overflow-hidden bg-transparent",
    "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-no-repeat before:content-['']",
    "before:[background-image:linear-gradient(var(--gh-angle),transparent_60%,var(--gh-rgba)_70%,transparent,transparent_100%)]",
    "before:[background-size:var(--gh-size)_var(--gh-size),100%_100%]",
    "before:[background-position:-100%_-100%,0_0]",
    !props.playOnce &&
      "before:[transition-property:background-position] before:[transition-duration:var(--gh-duration)] before:ease-in-out",
    props.playOnce &&
      "before:[transition-property:none] hover:before:[transition-property:background-position] hover:before:[transition-duration:var(--gh-duration)] hover:before:ease-in-out",
    "hover:before:[background-position:100%_100%,0_0]",
    props.class,
  ),
);
</script>

<template>
  <div :class="rootClass" :style="cssVars">
    <slot />
  </div>
</template>
