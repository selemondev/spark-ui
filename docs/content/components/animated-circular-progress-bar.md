# Animated Circular Progress Bar

A circular gauge that animates smoothly between values, displaying the current percentage with configurable primary and secondary colors.

<demo src="../../src/example/animated-circular-progress-bar/demo.vue" srcCode="../../src/spark-ui-demos/animated-circular-progress-bar/animated-circular-progress-bar.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [animated-circular-progress-bar.vue]
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

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

const currentPercent = computed(() =>
  Math.round(((props.value - props.min) / (props.max - props.min)) * 100),
);

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
  "--stroke-percent": `${90 - currentPercent.value}`,
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
  <div :class="cn('relative size-40 text-2xl font-semibold', props.class)" :style="rootStyle">
    <svg fill="none" class="size-full" stroke-width="2" viewBox="0 0 100 100">
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
```

:::

## Props

| Prop                  | Type     | Default | Description                                   |
| --------------------- | -------- | ------- | --------------------------------------------- |
| `max`                 | `number` | `100`   | The maximum value of the gauge.               |
| `min`                 | `number` | `0`     | The minimum value of the gauge.               |
| `value`               | `number` | `0`     | The current value of the gauge.               |
| `gaugePrimaryColor`   | `string` | `-`     | The primary color of the gauge (the fill).    |
| `gaugeSecondaryColor` | `string` | `-`     | The secondary color of the gauge (the track). |
| `class`               | `string` | `-`     | The class name to apply to the component.     |
