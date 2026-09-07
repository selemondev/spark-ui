<script setup lang="ts">
import { computed, useId } from "vue";
import { cn } from "../../../lib/utils";

interface StripedPatternProps {
  className?: string;
  direction?: "left" | "right";
  width?: number | string;
  height?: number | string;
  x?: number;
  y?: number;
}

const props = withDefaults(defineProps<StripedPatternProps>(), {
  direction: "left",
  width: 10,
  height: 10,
  x: -1,
  y: -1,
});
const id = `stripes-${useId()}`;
const w = computed(() => Number(props.width));
const h = computed(() => Number(props.height));
</script>

<template>
  <svg
    aria-hidden="true"
    :class="
      cn('pointer-events-none absolute inset-0 z-10 h-full w-full stroke-[0.5]', props.className)
    "
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        :id="id"
        :width="w"
        :height="h"
        :x="props.x"
        :y="props.y"
        patternUnits="userSpaceOnUse"
      >
        <template v-if="props.direction === 'left'">
          <line x1="0" :y1="h" :x2="w" y2="0" stroke="currentColor" />
          <line :x1="-w" :y1="h" x2="0" y2="0" stroke="currentColor" />
          <line :x1="w" :y1="h" :x2="w * 2" y2="0" stroke="currentColor" />
        </template>
        <template v-else>
          <line x1="0" y1="0" :x2="w" :y2="h" stroke="currentColor" />
          <line :x1="-w" y1="0" x2="0" :y2="h" stroke="currentColor" />
          <line :x1="w" y1="0" :x2="w * 2" :y2="h" stroke="currentColor" />
        </template>
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${id})`" />
  </svg>
</template>
