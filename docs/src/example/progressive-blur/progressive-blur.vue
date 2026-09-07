<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { cn } from "../../lib/utils";

interface ProgressiveBlurProps {
  class?: string;
  height?: string;
  position?: "top" | "bottom" | "both";
  blurLevels?: number[];
}
const props = withDefaults(defineProps<ProgressiveBlurProps>(), {
  height: "30%",
  position: "bottom",
  blurLevels: () => [0.5, 1, 2, 4, 8, 16, 32, 64],
});
const edges = computed(() =>
  props.position === "both" ? (["top", "bottom"] as const) : [props.position],
);
const layers = computed(() => {
  const count = props.blurLevels.length;
  return props.blurLevels.map((blur, index) => {
    const step = 100 / count;
    const stops =
      index === count - 1
        ? `transparent ${index * step}%, black 100%`
        : `transparent ${index * step}%, black ${(index + 1) * step}%, black ${(index + 2) * step}%, transparent ${(index + 3) * step}%`;
    return { blur, stops, zIndex: index + 1 };
  });
});
function layerStyle(
  layer: { blur: number; stops: string; zIndex: number },
  edge: string,
): CSSProperties {
  const mask = `linear-gradient(to ${edge}, ${layer.stops})`;
  return {
    zIndex: layer.zIndex,
    backdropFilter: `blur(${layer.blur}px)`,
    WebkitBackdropFilter: `blur(${layer.blur}px)`,
    maskImage: mask,
    WebkitMaskImage: mask,
  };
}
</script>

<template>
  <div
    :class="
      cn(
        'pointer-events-none absolute inset-x-0 z-10',
        props.class,
        position === 'top' ? 'top-0' : position === 'bottom' ? 'bottom-0' : 'inset-y-0',
      )
    "
    :style="{ height: position === 'both' ? '100%' : height }"
  >
    <div
      v-for="edge in edges"
      :key="edge"
      aria-hidden="true"
      class="absolute inset-x-0"
      :class="edge === 'top' ? 'top-0' : 'bottom-0'"
      :style="{ height: position === 'both' ? height : '100%' }"
    >
      <div
        v-for="(layer, index) in layers"
        :key="index"
        class="absolute inset-0"
        :style="layerStyle(layer, edge)"
      />
    </div>
    <div v-if="$slots.default" class="relative" :style="{ zIndex: blurLevels.length + 1 }">
      <slot />
    </div>
  </div>
</template>
