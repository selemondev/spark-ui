<script setup lang="ts">
import { useId } from "vue";
import { cn } from "../../lib/utils";

interface NoiseTextureProps {
  className?: string;
  frequency?: number;
  octaves?: number;
  slope?: number;
  noiseOpacity?: number;
}

const props = withDefaults(defineProps<NoiseTextureProps>(), {
  frequency: 0.4,
  octaves: 6,
  slope: 0.15,
  noiseOpacity: 0.6,
});
const filterId = `noise-${useId()}`;
</script>

<template>
  <svg
    aria-hidden="true"
    :class="
      cn(
        'pointer-events-none absolute inset-0 z-0 size-full select-none opacity-50 dark:opacity-[0.75]',
        props.className,
      )
    "
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter :id="filterId">
      <feTurbulence
        type="fractalNoise"
        :baseFrequency="props.frequency"
        :numOctaves="props.octaves"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncR type="linear" :slope="props.slope" />
        <feFuncG type="linear" :slope="props.slope" />
        <feFuncB type="linear" :slope="props.slope" />
      </feComponentTransfer>
    </filter>
    <rect width="100%" height="100%" :filter="`url(#${filterId})`" :opacity="props.noiseOpacity" />
  </svg>
</template>
