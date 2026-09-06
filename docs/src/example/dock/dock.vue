<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { cn } from "../../lib/utils";

interface DockProps {
  class?: string;
  iconSize?: number;
  iconMagnification?: number;
  disableMagnification?: boolean;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
}

const props = withDefaults(defineProps<DockProps>(), {
  iconSize: 40,
  iconMagnification: 60,
  disableMagnification: false,
  iconDistance: 140,
  direction: "middle",
});

const mouseX = ref(Number.POSITIVE_INFINITY);

const dockConfig = computed(() => ({
  size: props.iconSize,
  magnification: props.iconMagnification,
  disableMagnification: props.disableMagnification,
  distance: props.iconDistance,
}));

provide("dockMouseX", mouseX);
provide("dockConfig", dockConfig);

function onMouseMove(e: MouseEvent) {
  mouseX.value = e.clientX;
}

function onMouseLeave() {
  mouseX.value = Number.POSITIVE_INFINITY;
}
</script>

<template>
  <div
    :class="
      cn(
        'supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border border-solid border-neutral-200 dark:border-neutral-800 p-2 backdrop-blur-md',
        {
          'items-start': props.direction === 'top',
          'items-center': props.direction === 'middle',
          'items-end': props.direction === 'bottom',
        },
        props.class,
      )
    "
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </div>
</template>
