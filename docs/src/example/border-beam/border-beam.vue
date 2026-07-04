<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed } from "vue";
import { cn } from "../../lib/utils";

interface BorderBeamProps {
  /** The class name of the border beam. */
  class?: string;
  /** The size of the border beam. */
  size?: number;
  /** The duration of the border beam animation in seconds. */
  duration?: number;
  /** The delay of the border beam animation in seconds. */
  delay?: number;
  /** The start color of the border beam gradient. */
  colorFrom?: string;
  /** The end color of the border beam gradient. */
  colorTo?: string;
  /** Custom inline styles applied to the beam. */
  style?: CSSProperties;
  /** Whether to reverse the animation direction. */
  reverse?: boolean;
  /** The initial offset position (0-100). */
  initialOffset?: number;
  /** The border width of the beam. */
  borderWidth?: number;
}

const props = withDefaults(defineProps<BorderBeamProps>(), {
  size: 50,
  duration: 6,
  delay: 0,
  colorFrom: "#ffaa40",
  colorTo: "#9c40ff",
  reverse: false,
  initialOffset: 0,
  borderWidth: 1,
});

const containerStyle = computed<CSSProperties>(() => ({
  "--border-beam-width": `${props.borderWidth}px`,
  borderWidth: "var(--border-beam-width)",
  maskImage: "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
  WebkitMaskImage: "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
  maskClip: "padding-box, border-box",
  WebkitMaskClip: "padding-box, border-box",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in, xor",
}));

const beamStyle = computed<CSSProperties>(() => ({
  "--color-from": props.colorFrom,
  "--color-to": props.colorTo,
  "--duration": props.duration,
  "--delay": props.delay,
  "--initial-offset": props.initialOffset,
  width: `${props.size}px`,
  offsetPath: `rect(0 auto auto 0 round ${props.size}px)`,
  animationDelay: "calc((var(--delay) + var(--initial-offset) / 100 * var(--duration)) * -1s)",
  animationDirection: props.reverse ? "reverse" : "normal",
  ...props.style,
}));
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent"
    :style="containerStyle"
  >
    <div
      :class="
        cn(
          'animate-border-beam absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent',
          props.class,
        )
      "
      :style="beamStyle"
    />
  </div>
</template>
