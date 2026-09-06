<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../lib/utils";

interface AnimatedCircularProgressBarProps {
  max?: number;
  min?: number;
  value?: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  class?: string;
}

const props = withDefaults(defineProps<AnimatedCircularProgressBarProps>(), {
  max: 100,
  min: 0,
  value: 0,
});

const circumference = 2 * Math.PI * 45;
const percentPx = circumference / 100;

const range = computed(() => {
  const { min, max } = props;
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) {
    return { min: 0, max: 100 };
  }
  return { min, max };
});

const currentValue = computed(() => {
  const { min, max } = range.value;
  return Number.isFinite(props.value) ? Math.min(max, Math.max(min, props.value)) : min;
});

const currentPercent = computed(() => {
  const { min, max } = range.value;
  // Scaling first also keeps finite ranges spanning both numeric extremes safe.
  const scale = Math.max(Math.abs(min), Math.abs(max), 1);
  const percent = ((currentValue.value / scale - min / scale) / (max / scale - min / scale)) * 100;
  return Math.min(100, Math.max(0, Math.round(percent)));
});

const rootStyle = computed(() => ({
  "--circle-size": "100px",
  "--circumference": `${circumference}`,
  "--percent-to-px": `${percentPx}px`,
  "--gap-percent": "5",
  "--offset-factor": "0",
  "--transition-length": "1s",
  "--transition-step": "200ms",
  "--delay": "0s",
  "--percent-to-deg": "3.6deg",
  transform: "translateZ(0)",
}));

const secondaryStyle = computed(() => ({
  stroke: props.gaugeSecondaryColor,
  "--stroke-percent": `${Math.max(0, 90 - currentPercent.value)}`,
  "--offset-factor-secondary": "calc(1 - var(--offset-factor))",
  strokeDasharray: "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
  transform:
    "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)",
  transition: "all var(--transition-length) ease var(--delay)",
  transformOrigin: "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
}));

const primaryStyle = computed(() => ({
  stroke: props.gaugePrimaryColor,
  "--stroke-percent": `${currentPercent.value}`,
  strokeDasharray: "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
  transition:
    "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
  transitionProperty: "stroke-dasharray,transform",
  transform:
    "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
  transformOrigin: "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
}));
</script>

<template>
  <div
    :class="cn('relative size-40 text-2xl font-semibold', props.class)"
    :style="rootStyle"
    role="progressbar"
    :aria-valuemin="range.min"
    :aria-valuemax="range.max"
    :aria-valuenow="currentValue"
  >
    <svg aria-hidden="true" fill="none" class="size-full" stroke-width="2" viewBox="0 0 100 100">
      <circle
        v-if="currentPercent <= 90 && currentPercent >= 0"
        cx="50"
        cy="50"
        r="45"
        stroke-width="10"
        stroke-dashoffset="0"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="opacity-100"
        :style="secondaryStyle"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke-width="10"
        stroke-dashoffset="0"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="opacity-100"
        :style="primaryStyle"
      />
    </svg>
    <span
      :data-current-value="currentPercent"
      class="animate-in fade-in absolute inset-0 m-auto size-fit ease-linear"
      :style="{ animationDelay: 'var(--delay)', animationDuration: 'var(--transition-length)' }"
    >
      {{ currentPercent }}
    </span>
  </div>
</template>
