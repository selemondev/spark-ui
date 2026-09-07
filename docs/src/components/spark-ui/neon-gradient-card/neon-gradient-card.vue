<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, onUpdated, ref, watch } from "vue";
import { cn } from "../../../lib/utils";

interface NeonColors {
  firstColor: string;
  secondColor: string;
}

interface NeonGradientCardProps {
  as?: string;
  className?: string;
  borderSize?: number;
  borderRadius?: number;
  neonColors?: NeonColors;
}

const props = withDefaults(defineProps<NeonGradientCardProps>(), {
  as: "div",
  borderSize: 2,
  borderRadius: 20,
  neonColors: () => ({ firstColor: "#ff00aa", secondColor: "#00FFF1" }),
});

const container = ref<HTMLElement | null>(null);
const width = ref(0);
const height = ref(0);
let observer: ResizeObserver | undefined;
let stopWatching: (() => void) | undefined;

function updateDimensions() {
  if (!container.value) return;
  width.value = container.value.offsetWidth;
  height.value = container.value.offsetHeight;
}

onMounted(() => {
  if (typeof ResizeObserver !== "undefined") {
    observer = new ResizeObserver(updateDimensions);
  } else {
    window.addEventListener("resize", updateDimensions);
  }
  stopWatching = watch(
    container,
    (element) => {
      observer?.disconnect();
      updateDimensions();
      if (element) observer?.observe(element);
    },
    { immediate: true, flush: "post" },
  );
});

onUpdated(() => {
  if (!observer) updateDimensions();
});

onBeforeUnmount(() => {
  stopWatching?.();
  observer?.disconnect();
  window.removeEventListener("resize", updateDimensions);
});

const cardStyle = computed(() => ({
  "--border-size": `${props.borderSize}px`,
  "--border-radius": `${props.borderRadius}px`,
  "--neon-first-color": props.neonColors.firstColor,
  "--neon-second-color": props.neonColors.secondColor,
  "--card-width": `${width.value}px`,
  "--card-height": `${height.value}px`,
  "--card-content-radius": `${props.borderRadius - props.borderSize}px`,
  "--pseudo-element-background-image": `linear-gradient(0deg, ${props.neonColors.firstColor}, ${props.neonColors.secondColor})`,
  "--pseudo-element-width": `${width.value + props.borderSize * 2}px`,
  "--pseudo-element-height": `${height.value + props.borderSize * 2}px`,
  "--after-blur": `${width.value / 3}px`,
}));
</script>

<template>
  <component
    :is="props.as"
    ref="container"
    :class="cn('relative z-10 h-full w-full rounded-[var(--border-radius)]', props.className)"
    :style="cardStyle"
  >
    <div
      class="neon-content relative h-full w-full min-h-[inherit] break-words rounded-[var(--card-content-radius)] bg-gray-100 p-6 dark:bg-neutral-900"
    >
      <slot />
    </div>
  </component>
</template>

<style scoped>
.neon-content::before,
.neon-content::after {
  content: "";
  position: absolute;
  top: calc(-1 * var(--border-size));
  left: calc(-1 * var(--border-size));
  z-index: -10;
  display: block;
  width: var(--pseudo-element-width);
  height: var(--pseudo-element-height);
  border-radius: var(--border-radius);
  background-image: var(--pseudo-element-background-image);
  background-size: 100% 200%;
  pointer-events: none;
  animation: background-position-spin 3000ms infinite alternate;
}

.neon-content::after {
  filter: blur(var(--after-blur));
  opacity: 0.8;
}

@keyframes background-position-spin {
  0% {
    background-position: top center;
  }
  100% {
    background-position: bottom center;
  }
}
</style>
